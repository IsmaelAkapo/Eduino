const API = '/api.php'

export async function listarProblemas(){
    const res = await fetch(`${API}?recurso=problemas`)
    if (!res.ok) throw new Error('Error al cargar los problemas')
    const datos = await res.json()
    return datos.data
}