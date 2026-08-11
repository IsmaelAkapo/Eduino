const API = '/api.php'

export async function listarOperaciones(){
    const res = await fetch(`${API}?recurso=operaciones`)
    if (!res.ok) throw new Error('Error al cargar las operaciones')
    const datos = await res.json()
    return datos.data
}