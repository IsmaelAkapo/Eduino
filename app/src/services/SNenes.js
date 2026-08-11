const API = '/api.php'


export async function iniciarSesion(apodo, contra) {
    const res = await fetch(`${API}?recurso=login&tipo=nene`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({apodo, contra}),
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error desconocido')
    return datos
}  

export async function subirFoto(file) {
    const formData = new FormData()
    formData.append('foto', file)
    const res = await fetch(`${API}?recurso=subirFoto`, {
        method: 'POST',
        body: formData,
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error al subir la foto')
    return datos.data.ruta
}

export async function implementarNene(id_tutor, nombre, apodo, foto, fecha_nac, nivel, dias_permitidos, tiempo_pantalla, horario_inicio, horario_fin) {
    const res = await fetch(`${API}?recurso=implementar&tipo=neneAtutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
                id_tutor,
                nombre,
                apodo,
                foto,
                fecha_nac,
                nivel,
                dias_permitidos,
                tiempo_pantalla,
                horario_inicio,
                horario_fin
            })
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error desconocido')
    return datos
}

export async function traerImagen(id_nene) {
    const res = await fetch(`${API}?recurso=datos&tipo=nene&eleccion=foto&id_nene=${id_nene}`)
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error al cargar la imagen')
    return datos.data
}

export async function datosNene(id_nene) {
    const res = await fetch(`${API}?recurso=perfil&id_nene=${id_nene}`)
    const datos = await res.json()
    return datos.data
}

export async function listarNenesDeTutor(id_tutor) {
    const res = await fetch(`${API}?recurso=listar&tipo=nenesDeTutor&id_tutor=${id_tutor}`)
    const datos = await res.json()
    return Array.isArray(datos.data) ? datos.data : []
}

export async function ganarMonedas(id_nene, cantidad){
    const res = await fetch(`${API}?accion=ganarMonedas&id_nene=${id_nene}&cantidad=${cantidad}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({id_nene, cantidad}),
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error desconocido')
    return datos
}

export async function actualizarTrofeos(id_nene, cantidad) {
    const res = await fetch(`${API}?accion=actualizarTrofeos&id_nene=${id_nene}&cantidad=${cantidad}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_nene, cantidad }),
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error desconocido')
    return datos
}

export async function sumarPuntuacion(id_nene, materia, ejercicio) {
    const res = await fetch(`${API}?accion=sumarPuntuacion&id_nene=${id_nene}&materia=${materia}&ejercicio=${ejercicio}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({id_nene, materia, ejercicio}),
    })
    const datos = await res.json()
    if (!res.ok) throw new Error(datos.data?.mensaje ?? 'Error desconocido')
    return datos
}