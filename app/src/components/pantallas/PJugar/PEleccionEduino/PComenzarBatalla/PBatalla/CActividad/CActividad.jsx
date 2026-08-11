import { useState, useEffect } from 'react'
import { listarOperaciones } from '../../../../../../../services/matematicas/SOperaciones'
import { listarProblemas }   from '../../../../../../../services/matematicas/SProblemas'
import { listarPalabras }    from '../../../../../../../services/lengua/SPalabras'
import { listarGeografia }   from '../../../../../../../services/SGeografia'
import { listarHistoria }    from '../../../../../../../services/SHistoria'
import COperacion    from '../../../../PEleccionAsignarura/PEleccionMatematicas/PEJuegosMates/PEJOperaciones/COperacion/COperacion'
import CProblema     from '../../../../PEleccionAsignarura/PEleccionMatematicas/PEJuegosMates/PEJProblemas/CProblemas/CProblema'
import CJuegoPalabra from '../../../../PEleccionAsignarura/PEleccionLengua/PEJuegosLengua/PEJPalabras/CJuegoPalabra/CJuegoPalabra'
import CTestPreguntaGeo  from '../../../../PEleccionAsignarura/PEleccionGeografia/PEJuegosGeografia/PEJTestGeo/CTestPregunta/CTestPregunta'
import CTestPreguntaHist from '../../../../PEleccionAsignarura/PEleccionHistoria/PEJuegosHistoria/PEJTestHistoria/CTestPregunta/CTestPregunta'

// const TIPOS = ['operaciones', 'problemas', 'palabras', 'geografia', 'historia']

const TIPOS = ['operaciones', 'problemas', 'palabras']

const cache = {}

async function cargarDatos(tipo) {
    if (cache[tipo]) return cache[tipo]
    if (tipo === 'operaciones') cache[tipo] = await listarOperaciones()
    if (tipo === 'problemas')   cache[tipo] = await listarProblemas()
    if (tipo === 'palabras')    cache[tipo] = await listarPalabras()
    // if (tipo === 'geografia')   cache[tipo] = await listarGeografia()
    // if (tipo === 'historia')    cache[tipo] = await listarHistoria()
    return cache[tipo] ?? []
}

function tipoAleatorio() {
    return TIPOS[Math.floor(Math.random() * TIPOS.length)]
}

export default function CActividad({ onResponder }) {
    const [tipo]                                     = useState(tipoAleatorio)
    const [pregunta, setPregunta]                    = useState(null)
    const [respuestaElegida, setRespuestaElegida]    = useState(null)

    useEffect(() => {
        cargarDatos(tipo).then(lista => {
            setPregunta(lista[Math.floor(Math.random() * lista.length)] ?? null)
        }).catch(console.error)
    }, [tipo])

    function manejarElegir(letra) {
        if (respuestaElegida || !pregunta) return
        setRespuestaElegida(letra)
        setTimeout(() => onResponder(letra === pregunta.respuesta), 1000)
    }

    function manejarElegirProblema(esCorrecta) {
        if (respuestaElegida || !pregunta) return
        setRespuestaElegida('respondido')
        onResponder(esCorrecta)
    }

    function manejarElegirPalabra(esCorrecta) {
        setTimeout(() => onResponder(esCorrecta), 900)
    }

    if (!pregunta) return null

    if (tipo === 'operaciones') return (
        <COperacion pregunta={pregunta} respuestaElegida={respuestaElegida} onElegir={manejarElegir} />
    )

    if (tipo === 'problemas') return (
        <CProblema pregunta={pregunta} respuestaElegida={respuestaElegida} onElegir={manejarElegirProblema} />
    )

    if (tipo === 'palabras') return (
        <CJuegoPalabra pregunta={pregunta} onResultado={manejarElegirPalabra} />
    )

    // if (tipo === 'geografia') return (
    //     <CTestPreguntaGeo pregunta={pregunta} respuestaElegida={respuestaElegida} onElegir={manejarElegir} />
    // )

    // if (tipo === 'historia') return (
    //     <CTestPreguntaHist pregunta={pregunta} respuestaElegida={respuestaElegida} onElegir={manejarElegir} />
    // )

    return null
}
