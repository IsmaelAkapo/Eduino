// en dev la variable est vide et le proxy Vite prend le relais ; en prod elle pointe vers l'API déployée
const API = `${import.meta.env.VITE_API_URL ?? ''}/api.php`

export async function listarHistoria() {
    const res = await fetch(`${API}?recurso=historia`)
    if (!res.ok) throw new Error('Error al cargar historia')
    const datos = await res.json()
    return datos.data
}
