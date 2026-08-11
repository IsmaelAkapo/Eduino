const API = '/api.php'

export async function listarPalabras(){
    const res = await fetch(`${API}?recurso=palabras`)
    if (!res.ok) throw new Error('Error al cargar las palabras')
    const datos = await res.json()
    return datos.data
}