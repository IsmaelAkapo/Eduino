// en dev la variable est vide et le proxy Vite prend le relais ; en prod elle pointe vers l'API déployée
const API = `${import.meta.env.VITE_API_URL ?? ''}/api.php`

export async function listarRanking(rankeo) {
    const res = await fetch(`${API}?recurso=rankin&tipo=${rankeo}`)
    const json = await res.json()
    return Array.isArray(json.data) ? json.data : []
}