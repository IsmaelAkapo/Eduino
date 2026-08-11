const API = '/api.php'

export async function listarGeografia() {
    const res = await fetch(`${API}?recurso=geografia`)
    if (!res.ok) throw new Error('Error al cargar geografía')
    const datos = await res.json()
    return datos.data
}
