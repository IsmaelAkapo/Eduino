const API = '/api.php'

export async function datosNene(id_nene){
    const res = await fetch(`${API}?recurso=perfil&id_nene=${id_nene}`)
    if (!res.ok) throw new Error('Error al cargar los datos')
    const datos = await res.json()
    return datos.data
}