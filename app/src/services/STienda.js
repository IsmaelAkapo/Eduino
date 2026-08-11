const API = '/api.php'

export async function getMonedas(id_nene) {
    const res = await fetch(`${API}?recurso=monedas&id_nene=${id_nene}`)
    if (!res.ok) throw new Error('Error al cargar las monedas')
    const datos = await res.json()
    return datos.data.monedas_actual
}

export async function getCapsulas() {
    const res = await fetch(`${API}?recurso=capsulas`)
    if (!res.ok) throw new Error('Error al cargar las cápsulas')
    const datos = await res.json()
    return datos.data
}

export async function perderMonedas(id_nene, cantidad) {
    const res = await fetch(
        `${API}?accion=perderMonedas&id_nene=${id_nene}&cantidad=${cantidad}`,
        { method: 'POST' }
    )
    if (!res.ok) throw new Error('Error al gastar monedas')
    return res.json()
}

export async function getEduinos() {
    const res = await fetch(`${API}?recurso=eduinos`)
    if (!res.ok) throw new Error('Error al cargar los eduinos')
    const datos = await res.json()
    return datos.data
}

export async function guardarEduino(id_nene, id_eduino) {
    const res = await fetch(
        `${API}?accion=guardarEduino&id_nene=${id_nene}&id_eduino=${id_eduino}`,
        { method: 'POST' }
    )
    if (!res.ok) throw new Error('Error al guardar el eduino')
    return res.json()
}

export async function getComida() {
    const res = await fetch(`${API}?recurso=comida`)
    if (!res.ok) throw new Error('Error al cargar la comida')
    const datos = await res.json()
    return datos.data
}

export async function comprarComida(id_nene, id_comida, precio) {
    const res = await fetch(
        `${API}?accion=comprarComida&id_nene=${id_nene}&id_comida=${id_comida}&precio=${precio}`,
        { method: 'POST' }
    )
    if (!res.ok) throw new Error('Error al comprar comida')
    return res.json()
}
