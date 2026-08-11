const API = '/api.php'

export async function listarTodosEduinos() {
    const res = await fetch(`${API}?recurso=listar&tipo=eduinos`)
    const json = await res.json()
    return Array.isArray(json.data) ? json.data : []
}

export async function listarEduinos(id_nene) {
    const [todosRes, nenesRes] = await Promise.all([
        fetch(`${API}?recurso=listar&tipo=eduinos`).then(res => res.json()),
        fetch(`${API}?recurso=listar&tipo=eduinos&id_nene=${id_nene}`).then(res => res.json())
    ])

    const copiasPor = {}
    ;(Array.isArray(nenesRes.data) ? nenesRes.data : []).forEach(e => {
        if (!copiasPor[e.id_eduino]) copiasPor[e.id_eduino] = []
        copiasPor[e.id_eduino].push({ id_eduino_unico: e.id_eduino_unico, nivel: e.nivel, porcentaje: e.porcentaje, vida_actual: e.vida_actual, fuerza_actual: e.fuerza_actual })
    })

    return (Array.isArray(todosRes.data) ? todosRes.data : []).map(eduino => ({
        ...eduino,
        desbloqueado: !!copiasPor[eduino.id_eduino],
        copias: copiasPor[eduino.id_eduino] ?? [],
    }))
}

export async function listarComidaNene(id_nene) {
    const [todosRes, neneRes] = await Promise.all([
        fetch(`${API}?recurso=comida`).then(res => res.json()),
        fetch(`${API}?recurso=listar&tipo=comidaNene&id_nene=${id_nene}`).then(res => res.json())
    ])

    const almacen = new Map((Array.isArray(neneRes.data) ? neneRes.data : []).map(e => [e.id_comida, e.cantidad]))

    const disponible = todosRes.data
        .filter(c => almacen.has(c.id_comida))
        .map(c => ({ ...c, cantidad: almacen.get(c.id_comida)}))

    return disponible
    
}

export async function darComida(id_nene, comida, eduino, copiaIdx) {
    const copiaActual = eduino.copias[copiaIdx]
    if (!copiaActual) return null
    const res = await fetch(
        `${API}?accion=darComida&id_nene=${id_nene}&id_eduino=${eduino.id_eduino}&id_eduino_unico=${copiaActual.id_eduino_unico}&cantidad=${comida.alimentacion}&id_comida=${comida.id_comida}`,
        { method: 'POST' }
    )
    return res.json()
}