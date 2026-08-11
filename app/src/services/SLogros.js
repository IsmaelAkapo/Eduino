const API = '/api.php'

export async function listarLogros(id_nene) {
    const res = await fetch(`${API}?recurso=logros&id_nene=${id_nene}`)
    const datos = await res.json()
    return datos.data
}

export async function reclamarLogro(id_nene, id_logro) {
    const res = await fetch(`${API}?accion=reclamarLogro&id_nene=${id_nene}&id_logro=${id_logro}`, {
        method: 'POST',
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error al reclamar')
    return datos.data
}
