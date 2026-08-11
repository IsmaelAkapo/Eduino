import { useState } from 'react'
import './CLNCrearCuenta.css'
import CBIniciarGoogle from '../../../botones/BInciarGoogle/CBIniciarGoogle'
import { useNavigate } from 'react-router-dom'
import { crearTutor } from '../../../../services/STutor'
import { implementarNene, subirFoto } from '../../../../services/SNenes'

const PASOS_PANTALLA = ['10min', '30min', '1h00', '1h30', '2h00', '2h30', '3h00', '3h30', 'Sin límite']
const PASOS_MINUTOS  = [10, 30, 60, 90, 120, 150, 180, 210, 1440]
const DIAS     = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const DIAS_DB  = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
const NIVELES = ['Infantil', 'Junior', 'Pre-adolescente']

export default function CLNCrearCuenta() {

    const [correo, setCorreo] = useState('')
    const [contra, setContra] = useState('')
    const [contraR, setContraR] = useState('')
    const [nombreCompleto, setNombreCompleto] = useState('')
    const [numeroTelefono, setNumeroTelefono] = useState('')



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
    const [errorDatos, setErrorDatos] = useState('')
    const [errorKey, setErrorKey] = useState(0)

    const navigate = useNavigate()

    const toggleDia = (i) => {
        setDiasPermitidos(prev => prev.map((d, idx) => idx === i ? !d : d))
    }

    const onClickCrear = async () => {
        setErrorVacio('');
        setErrorKey(k => k + 1);


        if (!correo || !nombreCompleto || !contra || !contraR) {
            setErrorVacio('Rellena todos los campos obligatorios del tutor');
            return;
        }

        if (contra !== contraR) {
            setErrorVacio('Las contraseñas no coinciden');
            return;
        }

        const algunDia = diasPermitidos.some(d => d);
        if (!nombreNene || !apodo || !fechaNac || !algunDia || !horarioInicio || !horarioFin) {
            setErrorVacio('Rellena todos los campos obligatorios del niño');
            return;
        }

        try {
            // 1. Crear tutor
            const datosTutor = await crearTutor(correo, contra, nombreCompleto, numeroTelefono);

            // 2. Subir foto si hay una
            const fotoRuta = fotoFile ? await subirFoto(fotoFile) : null

            // 3. Crear nene
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
            );

            sessionStorage.setItem("id_nene", datosNene.data.id_nene)
            sessionStorage.setItem("apodo", datosNene.data.apodo)
            navigate('/indexNene');
        } catch (err) {
            setErrorVacio(err.message);
        }
    }

        return (
        <>
            <div className='CLNCrearCuenta-contenedorCrearCuenta'>
                <div className='CLNCrearCuenta-contenedorInputs-Tutor'>
                    <p>Correo del tutor <span className='CLNCrearCuenta-campoObligatorio'>*</span></p>
                    <input type="text" name='correo' id='CLNCrearCuenta-inputCorreo' value={correo} onChange={ (e) => setCorreo(e.target.value)}/>
                    <p>Nombre completo del tutor<span className='CLNCrearCuenta-campoObligatorio'>*</span></p>
                    <input type="text" name='nombreCompleto' id='CLNCrearCuenta-inputNombreCompleto' value={nombreCompleto} onChange={ (e) => setNombreCompleto(e.target.value)}/>
                    <p>Numero de telefono</p>
                    <input type="number" name='numeroTelefono' id='CLNCrearCuenta-inputNumeroTelefono' value={numeroTelefono} onChange={ (e) => setNumeroTelefono(e.target.value)}/>
                    <p>Escribe la contraseña<span className='CLNCrearCuenta-campoObligatorio'>*</span></p>
                    <input type="password" name='contra' id='CLNCrearCuenta-inputContra' value={contra} onChange={ (e) => setContra(e.target.value)}/>
                    <p>Repite la contraseña<span className='CLNCrearCuenta-campoObligatorio'>*</span></p>
                    <input type="password" name='contraR' id='CLNCrearCuenta-inputContraR' value={contraR} onChange={ (e) => setContraR(e.target.value)}/>
                    <p key={errorKey} id='CLNCrearCuenta-errorVacio' className={`CLNCrearCuenta-textoError${errorVacio ? ' CLNCrearCuenta-textoError--visible' : ''}`}>{errorVacio}</p>
                </div>

                <div className='CLNCrearCuenta-separador'>
                    <span className='CLNCrearCuenta-separador-badge'>y</span>
                </div>

                <div className='CLNCrearCuenta-contenedorInputs-Nene'>

                    <label className='CLNCrearCuenta-fotoPerfil'>
                            <input type="file" accept='image/*' onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                    setFoto(URL.createObjectURL(file))
                                    setFotoFile(file)
                                }
                            }} />
                            {foto ? <img src={foto} alt='foto' /> : <span>+</span>}
                        </label>
                    {/* Columna 1: foto + nombre */}
                    <div className='CLNCrearCuenta-columnaNene'>
                        
                        <p>Nombre real<span className='CLNCrearCuenta-campoObligatorio'>*</span></p>
                        <input type="text" name='nombreNene' id='CLNCrearCuenta-inputNombreNene' value={nombreNene} onChange={ (e) => setNombreNene(e.target.value)}/>
                        <p>Apodo del niño<span className='CLNCrearCuenta-campoObligatorio'>*</span></p>
                        <input type="text" name='apodo' id='CLNCrearCuenta-inputApodo' value={apodo} onChange={ (e) => setApodo(e.target.value)}/>
                    </div>

                    {/* Columna 2: fecha nacimiento + nivel */}
                    <div className='CLNCrearCuenta-columnaNene'>
                        <div className='CLNCrearCuenta-campoFechaNac'>
                            <label>Fecha de nacimiento<span className='CLNCrearCuenta-campoObligatorio'>*</span></label>
                            <input type="date" value={fechaNac} onChange={e => setFechaNac(e.target.value)} />
                        </div>
                        <div className='CLNCrearCuenta-campo'>
                            <label>Nivel de contenido<span className='CLNCrearCuenta-campoObligatorio'>*</span></label>
                            <div className='CLNCrearCuenta-nivelOpciones'>
                                {NIVELES.map(n => (
                                    <button key={n}
                                        className={`CLNCrearCuenta-nivelBoton${nivel === n ? ' CLNCrearCuenta-activo' : ''}`}
                                        onClick={() => setNivel(n)}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                    </div>

                    {/* Columna 3: días + pantalla + horario */}
                    <div className='CLNCrearCuenta-columnaNene'>
                        <div className='CLNCrearCuenta-campo'>
                            <label>Días permitidos<span className='CLNCrearCuenta-campoObligatorio'>*</span></label>
                            <div className='CLNCrearCuenta-diasContenedor'>
                                {DIAS.map((d, i) => (
                                    <button key={d}
                                        className={`CLNCrearCuenta-diaBoton${diasPermitidos[i] ? ' CLNCrearCuenta-activo' : ''}`}
                                        onClick={() => toggleDia(i)}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='CLNCrearCuenta-sliderPantalla'>
                            <label className='CLNCrearCuenta-labelPantalla'>
                                Tiempo de pantalla<span className='CLNCrearCuenta-campoObligatorio'>*</span>: <strong>{PASOS_PANTALLA[pantalla]}</strong>
                            </label>
                            <input type="range" min={0} max={PASOS_PANTALLA.length - 1} step={1} value={pantalla}
                                onChange={e => setPantalla(Number(e.target.value))} />
                        </div>
                        <div className='CLNCrearCuenta-filaHorario'>
                            <div className='CLNCrearCuenta-campo'>
                                <label>Desde<span className='CLNCrearCuenta-campoObligatorio'>*</span></label>
                                <input type="time" value={horarioInicio} onChange={e => setHorarioInicio(e.target.value)} />
                            </div>
                            <div className='CLNCrearCuenta-campo'>
                                <label>Hasta<span className='CLNCrearCuenta-campoObligatorio'>*</span></label>
                                <input type="time" value={horarioFin} onChange={e => setHorarioFin(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='CLNCrearCuenta-contenedorBotones'>
                <div className='CLNCrearCuenta-contenedorBotonesExternos'>
                    <CBIniciarGoogle />
                </div>
                <p className='CLNCrearCuenta-boton' id='CLNCrearCuenta-botonCrear' onClick={onClickCrear}>
                    ¡¡¡Crear!!!
                </p>
            </div>
        </>
    )
}
