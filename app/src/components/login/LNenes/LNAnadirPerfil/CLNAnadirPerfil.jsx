import { useState } from 'react'
import './CLNAnadirPerfil.css'
import CBIniciarGoogle from '../../../botones/BInciarGoogle/CBIniciarGoogle'
import { useNavigate } from 'react-router-dom'
import { loginTutor } from '../../../../services/STutor'
import { implementarNene, subirFoto } from '../../../../services/SNenes'

const PASOS_PANTALLA = ['10min', '30min', '1h00', '1h30', '2h00', '2h30', '3h00', '3h30', 'Sin límite']
const PASOS_MINUTOS  = [10, 30, 60, 90, 120, 150, 180, 210, 1440]
const DIAS    = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const DIAS_DB = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
const NIVELES = ['Infantil', 'Junior', 'Pre-adolescente']

export default function CLNAnadirPerfil() {

    const [correo, setCorreo] = useState('')
    const [contra, setContra] = useState('')

    const [nombreNene, setNombreNene] = useState('')
    const [apodo, setApodo] = useState('')
    const [foto, setFoto] = useState(null)
    const [fotoFile, setFotoFile] = useState(null)
    const [fechaNac, setFechaNac] = useState('')
    const [nivel, setNivel] = useState(NIVELES[0])
    const [diasPermitidos, setDiasPermitidos] = useState(Array(7).fill(false))
    const [pantalla, setPantalla] = useState(0)
    const [horarioInicio, setHorarioInicio] = useState('')
    const [horarioFin, setHorarioFin] = useState('')

    const [errorVacio, setErrorVacio] = useState('')
    const [errorKey, setErrorKey] = useState(0)

    const navigate = useNavigate()

    const toggleDia = (i) => {
        setDiasPermitidos(prev => prev.map((d, idx) => idx === i ? !d : d))
    }

    const onClickAnadir = async () => {
        setErrorVacio('')
        setErrorKey(k => k + 1)

        if (!correo || !contra) {
            setErrorVacio('Rellena los datos del tutor')
            return
        }

        const algunDia = diasPermitidos.some(d => d)
        if (!nombreNene || !apodo || !fechaNac || !algunDia || !horarioInicio || !horarioFin) {
            setErrorVacio('Rellena todos los campos obligatorios del niño')
            return
        }

        try {
            // 1. Login tutor para obtener id_tutor
            const datosTutor = await loginTutor(correo, contra)

            // 2. Subir foto si hay una
            const fotoRuta = fotoFile ? await subirFoto(fotoFile) : null

            // 3. Añadir nene
            const diasStr = DIAS_DB.filter((_, i) => diasPermitidos[i]).join(',')
            const datosNene = await implementarNene(
                datosTutor.data.id_tutor,
                nombreNene,
                apodo,
                fotoRuta,
                fechaNac,
                nivel,
                diasStr,
                PASOS_MINUTOS[pantalla],
                horarioInicio,
                horarioFin
            )

            sessionStorage.setItem("id_nene", datosNene.data.id_nene)
            sessionStorage.setItem("apodo", datosNene.data.apodo)
            navigate('/indexNene')
        } catch (err) {
            setErrorVacio(err.message)
        }


        
    }

    return (
        <>
            <div className='CLNAnadirPerfil-contenedorCrearCuenta'>
                <div className='CLNAnadirPerfil-contenedorInputs-Tutor'>
                    <p>Correo del tutor</p>
                    <input type="text" name='correo' value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    <p>Contraseña del tutor</p>
                    <input type="password" name='contra' value={contra} onChange={(e) => setContra(e.target.value)} />
                    <p key={errorKey} className={`CLNAnadirPerfil-textoError${errorVacio ? ' CLNAnadirPerfil-textoError--visible' : ''}`}>{errorVacio}</p>
                </div>

                <div className='CLNAnadirPerfil-separador'>
                    <span className='CLNAnadirPerfil-separador-badge'>y</span>
                </div>

                <div className='CLNAnadirPerfil-contenedorInputs-Nene'>

                    <label className='CLNAnadirPerfil-fotoPerfil'>
                        <input type="file" accept='image/*' onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                setFoto(URL.createObjectURL(file))
                                setFotoFile(file)
                            }
                        }} />
                        {foto ? <img src={foto} alt='foto' /> : <span>+</span>}
                    </label>

                    {/* Columna 1: nombre + apodo */}
                    <div className='CLNAnadirPerfil-columnaNene'>
                        <p>Nombre real<span className='CLNAnadirPerfil-campoObligatorio'>*</span></p>
                        <input type="text" name='nombreNene' value={nombreNene} onChange={(e) => setNombreNene(e.target.value)} />
                        <p>Apodo del niño<span className='CLNAnadirPerfil-campoObligatorio'>*</span></p>
                        <input type="text" name='apodo' value={apodo} onChange={(e) => setApodo(e.target.value)} />
                    </div>

                    {/* Columna 2: fecha nacimiento + nivel */}
                    <div className='CLNAnadirPerfil-columnaNene'>
                        <div className='CLNAnadirPerfil-campoFechaNac'>
                            <label>Fecha de nacimiento<span className='CLNAnadirPerfil-campoObligatorio'>*</span></label>
                            <input type="date" value={fechaNac} onChange={e => setFechaNac(e.target.value)} />
                        </div>
                        <div className='CLNAnadirPerfil-campo'>
                            <label>Nivel de contenido<span className='CLNAnadirPerfil-campoObligatorio'>*</span></label>
                            <div className='CLNAnadirPerfil-nivelOpciones'>
                                {NIVELES.map(n => (
                                    <button key={n}
                                        className={`CLNAnadirPerfil-nivelBoton${nivel === n ? ' CLNAnadirPerfil-activo' : ''}`}
                                        onClick={() => setNivel(n)}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Columna 3: días + pantalla + horario */}
                    <div className='CLNAnadirPerfil-columnaNene'>
                        <div className='CLNAnadirPerfil-campo'>
                            <label>Días permitidos<span className='CLNAnadirPerfil-campoObligatorio'>*</span></label>
                            <div className='CLNAnadirPerfil-diasContenedor'>
                                {DIAS.map((d, i) => (
                                    <button key={d}
                                        className={`CLNAnadirPerfil-diaBoton${diasPermitidos[i] ? ' CLNAnadirPerfil-activo' : ''}`}
                                        onClick={() => toggleDia(i)}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='CLNAnadirPerfil-sliderPantalla'>
                            <label className='CLNAnadirPerfil-labelPantalla'>
                                Tiempo de pantalla<span className='CLNAnadirPerfil-campoObligatorio'>*</span>: <strong>{PASOS_PANTALLA[pantalla]}</strong>
                            </label>
                            <input type="range" min={0} max={PASOS_PANTALLA.length - 1} step={1} value={pantalla}
                                onChange={e => setPantalla(Number(e.target.value))} />
                        </div>
                        <div className='CLNAnadirPerfil-filaHorario'>
                            <div className='CLNAnadirPerfil-campo'>
                                <label>Desde<span className='CLNAnadirPerfil-campoObligatorio'>*</span></label>
                                <input type="time" value={horarioInicio} onChange={e => setHorarioInicio(e.target.value)} />
                            </div>
                            <div className='CLNAnadirPerfil-campo'>
                                <label>Hasta<span className='CLNAnadirPerfil-campoObligatorio'>*</span></label>
                                <input type="time" value={horarioFin} onChange={e => setHorarioFin(e.target.value)} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='CLNAnadirPerfil-contenedorBotones'>
                <div className='CLNAnadirPerfil-contenedorBotonesExternos'>
                    <CBIniciarGoogle />
                </div>
                <p className='CLNAnadirPerfil-boton' id='CLNAnadirPerfil-botonCrear' onClick={onClickAnadir}>
                    ¡¡¡Añadir!!!
                </p>
            </div>
        </>
    )
}
