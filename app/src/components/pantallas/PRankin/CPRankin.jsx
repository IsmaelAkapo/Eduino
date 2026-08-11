import { useState, useEffect } from 'react'
import { listarRanking } from '../../../services/SRankin'
import { datosNene, listarNenesDeTutor } from '../../../services/SNenes'
import './CPRankin.css'

export default function CPRankin() {
    const id_nene = parseInt(sessionStorage.getItem('id_nene'))
    const [tipo, setTipo] = useState('trofeos')
    const [lista, setLista] = useState([])
    const [cargando, setCargando] = useState(true)
    const [soloAmigos, setSoloAmigos] = useState(false)
    const [idsAmigos, setIdsAmigos] = useState(new Set())

    useEffect(() => {
        datosNene(id_nene).then(nene => {
            if (!nene?.id_tutor) return
            listarNenesDeTutor(nene.id_tutor).then(hermanos => {
                setIdsAmigos(new Set(hermanos.map(h => h.id_nene)))
            })
        })
    }, [])

    useEffect(() => {
        setCargando(true)
        listarRanking(tipo).then(data => {
            setLista(data)
            setCargando(false)
        })
    }, [tipo])

    const listaFiltrada = soloAmigos && idsAmigos.size > 0
        ? lista.filter(n => idsAmigos.has(n.id_nene)).map((n, i) => ({ ...n, top: i + 1 }))
        : lista

    const yo = listaFiltrada.find(n => n.id_nene === id_nene)
    const valorKey = tipo === 'trofeos' ? 'trofeos_actual' : 'numero_eduinos_total'
    const valorLabel = tipo === 'trofeos' ? 'trofeos' : 'eduinos'

    return (
        <div className="CPRankin-contenedor">
            <div className="CPRankin-tabs">
                <button
                    className={`CPRankin-tab ${tipo === 'trofeos' ? 'CPRankin-tab--activo' : ''}`}
                    onClick={() => setTipo('trofeos')}
                >
                    Trofeos
                </button>
                <button
                    className={`CPRankin-tab ${tipo === 'eduinos' ? 'CPRankin-tab--activo' : ''}`}
                    onClick={() => setTipo('eduinos')}
                >
                    Eduinos
                </button>
                <button
                    className={`CPRankin-checkAmigos ${soloAmigos ? 'CPRankin-checkAmigos--activo' : ''}`}
                    onClick={() => setSoloAmigos(prev => !prev)}
                >
                    <span className="CPRankin-checkBox">
                        {soloAmigos && <span className="CPRankin-checkMarca">✓</span>}
                    </span>
                    Solo amigos
                </button>
            </div>

            {cargando ? (
                <div className="CPRankin-cargando">Cargando ranking...</div>
            ) : (
                <>
                    {yo ? (
                        <div className="CPRankin-miPosicion">
                            <div className="CPRankin-miTop">
                                <span className="CPRankin-miTopNumero">#{yo.top}</span>
                                <span className="CPRankin-miTopLabel">Tu posición</span>
                            </div>
                            <div className="CPRankin-miInfo">
                                <img
                                    src={yo.foto || '/icons/sin_foto.jpg'}
                                    alt=""
                                    className="CPRankin-miAvatar"
                                />
                                <span className="CPRankin-miApodo">{yo.apodo}</span>
                            </div>
                            <div className="CPRankin-miValor">
                                <span className="CPRankin-miValorNum">{yo[valorKey]}</span>
                                <span className="CPRankin-miValorLabel">{valorLabel}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="CPRankin-sinPosicion">
                            {soloAmigos ? 'Ningún amigo en el ranking aún' : 'Aún no apareces en el ranking'}
                        </div>
                    )}

                    <div className="CPRankin-separador" />

                    <div className="CPRankin-lista">
                        {listaFiltrada.map(nene => {
                            const esSelf = nene.id_nene === id_nene
                            const top = nene.top
                            return (
                                <div
                                    key={nene.id_nene}
                                    className={`CPRankin-fila ${esSelf ? 'CPRankin-fila--yo' : ''} ${top <= 3 ? `CPRankin-fila--top${top}` : ''}`}
                                >
                                    <span className="CPRankin-posicion">#{top}</span>
                                    <img
                                        src={nene.foto || '/icons/sin_foto.jpg'}
                                        alt=""
                                        className="CPRankin-avatar"
                                    />
                                    <span className="CPRankin-apodo">{nene.apodo}</span>
                                    <span className="CPRankin-valor">{nene[valorKey]} {valorLabel}</span>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
