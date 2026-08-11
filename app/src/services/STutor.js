const API = '/api.php'

export async function loginTutor(correo, contra) {
    const res = await fetch(`${API}?recurso=login&tipo=tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contra }),
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Correo o contraseña incorrectos')
    return datos
}

export async function crearTutor(correo, contra, nombreCompleto, numeroTelefono) {
    const res = await fetch(`${API}?recurso=crear&tipo=tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({correo, contra, nombreCompleto, numeroTelefono}),
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error desconocido')
    return datos
}

export async function actualizarNene(id_nene, datos) {
    const res = await fetch(`${API}?accion=actualizarNene&id_nene=${id_nene}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.data?.mensaje ?? 'Error al actualizar')
    return json.data
}

export async function listarNenes(idTutor) {
    const res = await fetch(`${API}?recurso=listar&tipo=nenesDeTutor&id_tutor=${idTutor}`)
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error al cargar los niños')
    return Array.isArray(datos.data) ? datos.data : []
}