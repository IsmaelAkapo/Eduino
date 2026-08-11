import { useRef, useState } from 'react'
import './CJuegoPalabra.css'

function mezclar(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function CJuegoPalabra({ pregunta, onResultado }) {
    const letrasCorrectas = pregunta.palabra.toUpperCase().split('')

    const [chips, setChips] = useState(() =>
        mezclar(letrasCorrectas).map((letra, i) => ({ id: i, letra, usada: false }))
    )
    const [slots, setSlots] = useState(() => letrasCorrectas.map(() => ({ chipId: null })))
    const [comprobado, setComprobado] = useState(false)

    const dragChipId = useRef(null)
    const dragFromSlot = useRef(null)

    const todosLlenos = slots.every(s => s.chipId !== null)

    function onChipDragStart(e, chipId) {
        dragChipId.current = chipId
        dragFromSlot.current = null
        e.dataTransfer.effectAllowed = 'move'
    }

    function onSlotDragStart(e, i) {
        if (slots[i].chipId === null) { e.preventDefault(); return }
        dragChipId.current = slots[i].chipId
        dragFromSlot.current = i
        e.dataTransfer.effectAllowed = 'move'
    }

    function onDragOver(e) { e.preventDefault() }

    function onDropInSlot(e, slotIdx) {
        e.preventDefault()
        if (comprobado) return
        const chipId = dragChipId.current
        const fromSlot = dragFromSlot.current
        if (chipId === null) return
        const desplazado = slots[slotIdx].chipId
        setSlots(slots.map((s, i) => {
            if (i === slotIdx) return { chipId }
            if (fromSlot !== null && i === fromSlot) return { chipId: desplazado }
            return s
        }))
        setChips(chips.map(c => {
            if (c.id === chipId) return { ...c, usada: true }
            if (desplazado !== null && c.id === desplazado && fromSlot === null) return { ...c, usada: false }
            return c
        }))
        dragChipId.current = null
        dragFromSlot.current = null
    }

    function onDropInPool(e) {
        e.preventDefault()
        if (dragFromSlot.current === null || comprobado) return
        const chipId = dragChipId.current
        const fromSlot = dragFromSlot.current
        setSlots(slots.map((s, i) => i === fromSlot ? { chipId: null } : s))
        setChips(chips.map(c => c.id === chipId ? { ...c, usada: false } : c))
        dragChipId.current = null
        dragFromSlot.current = null
    }

    function onClickChip(chipId) {
        if (comprobado) return
        const chip = chips.find(c => c.id === chipId)
        if (!chip || chip.usada) return
        const primerVacio = slots.findIndex(s => s.chipId === null)
        if (primerVacio === -1) return
        setSlots(slots.map((s, i) => i === primerVacio ? { chipId } : s))
        setChips(chips.map(c => c.id === chipId ? { ...c, usada: true } : c))
    }

    function onClickSlot(i) {
        if (comprobado) return
        const { chipId } = slots[i]
        if (chipId === null) return
        setSlots(slots.map((s, j) => j === i ? { chipId: null } : s))
        setChips(chips.map(c => c.id === chipId ? { ...c, usada: false } : c))
    }

    function comprobar() {
        if (comprobado) return
        setComprobado(true)
        const esCorrecta = slots.every((s, i) => {
            const chip = chips.find(c => c.id === s.chipId)
            return chip?.letra === letrasCorrectas[i]
        })
        onResultado(esCorrecta)
    }

    return (
        <div className='CJuegoPalabra-contenedor'>
            <p className='CJuegoPalabra-instruccion'>Ordena las letras para formar la palabra</p>

            <div className='CJuegoPalabra-pool' onDragOver={onDragOver} onDrop={onDropInPool}>
                {chips.map(chip => (
                    <div
                        key={chip.id}
                        className={`CJuegoPalabra-chip${chip.usada ? ' CJuegoPalabra-chip--usada' : ''}`}
                        draggable={!chip.usada && !comprobado}
                        onDragStart={e => onChipDragStart(e, chip.id)}
                        onClick={() => onClickChip(chip.id)}
                    >
                        {chip.letra}
                    </div>
                ))}
            </div>

            <div className='CJuegoPalabra-slots'>
                {slots.map((slot, i) => {
                    const letraEnSlot = slot.chipId !== null
                        ? chips.find(c => c.id === slot.chipId)?.letra
                        : null
                    let clase = 'CJuegoPalabra-slot'
                    if (comprobado && letraEnSlot) {
                        clase += letraEnSlot === letrasCorrectas[i]
                            ? ' CJuegoPalabra-slot--correcto'
                            : ' CJuegoPalabra-slot--incorrecto'
                    }
                    return (
                        <div
                            key={i}
                            className={clase}
                            draggable={slot.chipId !== null && !comprobado}
                            onDragStart={e => onSlotDragStart(e, i)}
                            onDragOver={onDragOver}
                            onDrop={e => onDropInSlot(e, i)}
                            onClick={() => onClickSlot(i)}
                        >
                            {letraEnSlot}
                        </div>
                    )
                })}
            </div>

            {todosLlenos && !comprobado && (
                <p className='CJuegoPalabra-botonComprobar' onClick={comprobar}>Comprobar</p>
            )}
        </div>
    )
}
