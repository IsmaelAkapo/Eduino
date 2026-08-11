const API = '/api.php'

export async function listarRanking(rankeo) {
    const res = await fetch(`${API}?recurso=rankin&tipo=${rankeo}`)
    const json = await res.json()
    return Array.isArray(json.data) ? json.data : []
}