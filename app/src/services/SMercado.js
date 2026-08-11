const API = '/api.php'

// export async function listarMercado() {
//     const res = await fetch(`${API}?recurso=listar&tipo=mercado`)
//     if (!res.ok) throw new Error('Error al cargar la comida')
//     const datos = await res.json()
//     return datos.data
// }

export async function listarMercado() {
    const [todosRes, eduinoRes] = await Promise.all([
        fetch(`${API}?recurso=listar&tipo=mercado`).then(res => res.json()),
        fetch(`${API}?recurso=listar&tipo=eduinos`).then(res => res.json())
    ])

    const ventas   = todosRes.data  ?? []
    const eduinos  = eduinoRes.data ?? []

    return ventas.map(venta => ({
        ...venta,
        ...eduinos.find(e => e.id_eduino === venta.id_eduino)
    }))
}

export async function venderEduino(id_nene, eduino, precio) {
    const copia = eduino.copiaVender
    const res = await fetch(
        `${API}?accion=venderEduino&id_nene=${id_nene}&id_eduino=${eduino.id_eduino}&id_eduino_unico=${copia.id_eduino_unico}&nivel=${copia.nivel}&precio=${precio}`,
        { method: 'POST' }
    )
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.data?.mensaje ?? 'Error al poner en venta')
    }
    return res.json()
}

export async function comprarEduino(id_nene_comprador, eduino) {
    const res = await fetch(
        `${API}?accion=comprarEduino&id_nene_comprador=${id_nene_comprador}&id_nene_vendedor=${eduino.id_nene}&id_venta=${eduino.id_venta}&id_eduino_unico=${eduino.id_eduino_unico}&precio=${eduino.precio}`,
        { method: 'POST' }
    )
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.data?.mensaje ?? 'Error al comprar el eduino')
    }
    return res.json()
}

export async function recuperar(id_nene, eduino) {
    const res = await fetch(
        `${API}?accion=recuperarEduino&id_nene=${id_nene}&id_venta=${eduino.id_venta}`,
        { method: 'POST' }
    )
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.data?.mensaje ?? 'Error al recuperar el eduino')
    }
    return res.json()
}