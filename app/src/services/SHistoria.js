const API = '/api.php'

export async function listarHistoria() {
    const res = await fetch(`${API}?recurso=historia`)
    if (!res.ok) throw new Error('Error al cargar historia')
    const datos = await res.json()
    return datos.data
}
