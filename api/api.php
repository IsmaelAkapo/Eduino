<?php
require_once "config.php";

$metodo = $_SERVER["REQUEST_METHOD"];
$pdo = conectar_bd();

switch($metodo){
    case 'GET':
        $recurso = $_GET['recurso'] ?? null;

        if ($recurso === 'listar') {
            $tipo = $_GET['tipo'] ?? null;
            if($tipo === 'nenesDeTutor'){
                $id = $_GET['id_tutor'];
                listarNenesDeTutor($pdo, $id);
            }else if($tipo === 'eduinos'){
                $id_nene = $_GET['id_nene'] ?? null;
                if ($id_nene === null) {
                    listarTodosEduinos($pdo);
                }else{
                    listarEduinosNene($pdo, $id_nene);
                }
            }else if($tipo === 'comidaNene'){
                $id_nene = $_GET['id_nene'] ?? null;
                listarComidaNene($pdo, $id_nene);
            }else if ($tipo === 'mercado'){
                listarMercado($pdo);
            }

        }else if($recurso === 'monedas'){
            $id_nene = $_GET['id_nene'] ?? null;
            getMonedas($pdo, $id_nene);

        }else if($recurso === 'capsulas'){
            listarCapsulas($pdo);

        }else if($recurso === 'eduinos'){
            listarTodosEduinos($pdo);

        }else if($recurso === 'comida'){
            listarComida($pdo);

        }else if($recurso === 'datos'){
            $tipo = $_GET['tipo'];
            if($tipo === 'nene'){
                $eleccion = $_GET['eleccion'];
                $id = $_GET['id_nene'];
                if ($eleccion === 'foto') {
                    traerImagen($pdo, $id);
                }
            }
        }else if( $recurso === 'operaciones'){
            listarOperaciones($pdo);
        }else if( $recurso === 'perfil'){
            $id_nene = $_GET['id_nene'];
            datosNene($pdo, $id_nene);
        }else if( $recurso === 'problemas'){
            listarProblemas($pdo);
        }else if ( $recurso === 'rankin'){
            $tipo = $_GET['tipo'];
            listarRanking($pdo, $tipo);
        }else if( $recurso === 'palabras'){
            listarPalabras($pdo);
        }else if( $recurso === 'geografia'){
            listarGeografia($pdo);
        }else if( $recurso === 'historia'){
            listarHistoria($pdo);
        }else if( $recurso === 'logros'){
            $id_nene = $_GET['id_nene'] ?? null;
            listarLogros($pdo, $id_nene);
        }

        break;

    case 'POST':
        $recurso = $_GET['recurso'] ?? null;
        $accion  = $_GET['accion']  ?? null;

        if($accion === 'perderMonedas'){
            $id_nene  = $_GET['id_nene']  ?? null;
            $cantidad = $_GET['cantidad'] ?? null;
            perderMonedas($pdo, $id_nene, $cantidad);

        }else if( $accion === 'ganarMonedas'){
            $id_nene = $_GET['id_nene'] ?? null;
            $cantidad = $_GET['cantidad'] ?? null;

            ganarMonedas($pdo, $id_nene, $cantidad);
        }else if($accion === 'sumarPuntuacion'){
            $id_nene  = $_GET['id_nene']   ?? null;
            $materia  = $_GET['materia']   ?? null;
            $ejercicio = $_GET['ejercicio'] ?? null;
            sumarPuntuacion($pdo, $id_nene, $materia, $ejercicio);

        }else if($accion === 'guardarEduino'){
            $id_nene  = $_GET['id_nene']  ?? null;
            $id_eduino = $_GET['id_eduino'] ?? null;
            guardarEduino($pdo, $id_nene, $id_eduino);

        }else if($accion === 'comprarComida'){
            $id_nene  = $_GET['id_nene']  ?? null;
            $id_comida = $_GET['id_comida'] ?? null;
            $precio    = $_GET['precio']    ?? null;
            comprarComida($pdo, $id_nene, $id_comida, $precio);

        }else if($accion === 'venderEduino'){
            $id_nene        = $_GET['id_nene']        ?? null;
            $id_eduino      = $_GET['id_eduino']      ?? null;
            $id_eduino_unico = $_GET['id_eduino_unico'] ?? null;
            $nivel          = $_GET['nivel']          ?? null;
            $precio         = $_GET['precio']         ?? null;
            venderEduino($pdo, $id_nene, $id_eduino, $id_eduino_unico, $nivel, $precio);

        }else if($accion === 'comprarEduino'){
            $id_nene_comprador = $_GET['id_nene_comprador'] ?? null;
            $id_nene_vendedor  = $_GET['id_nene_vendedor']  ?? null;
            $id_venta          = $_GET['id_venta']          ?? null;
            $id_eduino_unico   = $_GET['id_eduino_unico']   ?? null;
            $precio            = $_GET['precio']            ?? null;
            comprarEduino($pdo, $id_nene_comprador, $id_nene_vendedor, $id_venta, $id_eduino_unico, $precio);

        }else if($accion === 'reclamarLogro'){
            $id_nene  = $_GET['id_nene']  ?? null;
            $id_logro = $_GET['id_logro'] ?? null;
            reclamarLogro($pdo, $id_nene, $id_logro);

        }else if ($accion === 'recuperarEduino'){
            $id_nene  = $_GET['id_nene']  ?? null;
            $id_venta = $_GET['id_venta'] ?? null;
            recuperarEduino($pdo, $id_nene, $id_venta);


        }else if($accion === 'actualizarNene'){
            $id_nene = $_GET['id_nene'] ?? null;
            actualizarNene($pdo, $id_nene);

        }else if($accion === 'actualizarTrofeos'){
            $id_nene  = $_GET['id_nene']  ?? null;
            $cantidad = $_GET['cantidad'] ?? null;
            actualizarTrofeos($pdo, $id_nene, $cantidad);

        }else if($accion === 'darComida'){

            $id_nene = $_GET["id_nene"] ?? null;
            $id_eduino = $_GET["id_eduino"] ?? null;
            $id_eduino_unico = $_GET["id_eduino_unico"] ?? null;
            $cantidad = $_GET["cantidad"] ?? null;
            $id_comida = $_GET["id_comida"] ?? null;

            darComidaEduino($pdo, $id_nene, $id_eduino, $id_eduino_unico, $cantidad, $id_comida);

        }else if($recurso === 'login'){
            $tipo = $_GET['tipo'] ?? null;

            if($tipo === 'nene'){
                loginNene($pdo);
            }else if($tipo === 'tutor'){
                loginTutor($pdo);
            }
        }else if($recurso === 'crear'){
            $tipo = $_GET['tipo'] ?? null;
            if($tipo === 'tutor'){
                crearTutor($pdo);
            }
        }else if($recurso === 'implementar'){
            $tipo = $_GET['tipo'] ?? null;
            if($tipo === 'neneAtutor'){
                implementarNeneTutor($pdo);
            }
        }else if($recurso === 'subirFoto'){
            subirFoto();
        }
        
        break;
}

// *******************
//      GET
// *******************

function datosNene($pdo, $id_nene){
    try{
        $stmt = $pdo->prepare("SELECT * FROM nenes WHERE id_nene = ?");
        $stmt->execute([$id_nene]);
        $nene = $stmt->fetch(PDO::FETCH_ASSOC);
        responder($nene);

    }catch(PDOException $e) {
        responderError("Error en base de datos", 500);
    }
}
function listarNenesDeTutor($pdo, $id){
    try{
        $stmt = $pdo->prepare("SELECT * FROM nenes WHERE id_tutor = ?");
        $stmt->execute([$id]);
        $nenes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        responder($nenes);

    }catch(PDOException $e) {
        responderError("Error en base de datos", 500);
    }
}

function traerImagen($pdo, $id){
    try{
        $stmt = $pdo->prepare("SELECT foto FROM nenes WHERE id_nene = ?");
        $stmt->execute([$id]);
        $foto = $stmt->fetch(PDO::FETCH_ASSOC);
        responder($foto);

    }catch(PDOException $e) {
        responderError("Error en base de datos", 500);
    }
}

function listarTodosEduinos($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM eduinos ORDER BY nombre ASC");
        $stmt->execute();
        $eduinos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        responder($eduinos);
    }catch(PDOException $e) {
        responderError("Error en base de datos", 500);
    }
}

function listarEduinosNene($pdo, $id_nene){
    try {
        $stmt = $pdo->prepare("SELECT * FROM coleccionEduinos WHERE id_nene = ?");
        $stmt->execute([$id_nene]);
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarComida($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM comida");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarComidaNene($pdo, $id_nene){
    try {
        $stmt = $pdo->prepare("SELECT id_comida, cantidad FROM coleccionComida WHERE id_nene = ? AND cantidad >= 1");
        $stmt->execute([$id_nene]);
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    }catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarMercado($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM mercado");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    }catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarOperaciones($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM operaciones_matematicas");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    }catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarProblemas($pdo){
        try {
        $stmt = $pdo->prepare("SELECT * FROM problemas_matematicas");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    }catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarRanking($pdo, $tipo){
    try {
        if($tipo === 'trofeos'){
            $stmt = $pdo->prepare("
                SELECT id_nene, apodo, foto, trofeos_actual,
                       ROW_NUMBER() OVER (ORDER BY trofeos_actual DESC) AS top
                FROM nenes
                ORDER BY trofeos_actual DESC
                LIMIT 500
            ");
        }else if($tipo === 'eduinos'){
            $stmt = $pdo->prepare("
                SELECT id_nene, apodo, foto, numero_eduinos_total,
                       ROW_NUMBER() OVER (ORDER BY numero_eduinos_total DESC) AS top
                FROM nenes
                ORDER BY numero_eduinos_total DESC
                LIMIT 500
            ");
        }else{
            responderError("Tipo de ranking no válido", 400);
            return;
        }
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarPalabras($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM palabras_lengua");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    }catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarGeografia($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM test_geografia");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    }catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarHistoria($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM test_historia");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    }catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

// -------------------
//      POST
// -------------------


function loginTutor($pdo){
    try {
        $body   = json_decode(file_get_contents("php://input"), true);
        $correo = $body["correo"] ?? null;
        $contra = $body["contra"] ?? null;

        $stmt = $pdo->prepare("SELECT id_tutor, nombre, password_hash FROM tutores WHERE email = ? LIMIT 1");
        $stmt->execute([$correo]);
        $tutor = $stmt->fetch();

        if(!$tutor || !password_verify($contra, $tutor['password_hash'])){
            responderError('Correo o contraseña incorrectos', 401);
        }

        responder(["id_tutor" => $tutor["id_tutor"], "nombre" => $tutor["nombre"]]);

    } catch (\Throwable $th) {
        responderError("Error interno del servidor", 500);
    }
}

function loginNene($pdo){       

    try {
        $body = json_decode(file_get_contents("php://input"), true);
        $apodo = $body["apodo"] ?? null;
        $contra = $body["contra"] ?? null;

        $stmt = $pdo->prepare("SELECT n.id_nene, n.apodo, t.password_hash FROM nenes n LEFT JOIN tutores t ON n.id_tutor = t.id_tutor WHERE n.apodo = ? LIMIT 1");
        $stmt->execute([$apodo]);
        $nene = $stmt->fetch();

        if(!$nene || !password_verify($contra, $nene['password_hash'])){
            responderError('Apodo o contraseña incorrectos', 401);
        }

        $pdo->prepare("UPDATE nenes SET dias_de_sesion = dias_de_sesion + 1 WHERE id_nene = ?")
            ->execute([$nene["id_nene"]]);

        responder(["id_nene" => $nene["id_nene"], "apodo" => $nene["apodo"]]);

    } catch (\Throwable $th) {
        responderError("Error interno del servidor", 500);
    }
}

function crearTutor($pdo){
    try {
        $body = json_decode(file_get_contents("php://input"), true);
        $correo = $body["correo"] ?? null;
        $contra = $body["contra"] ?? null;
        $nombreTutor = $body["nombreCompleto"] ?? null;
        $numeroTelefono = $body["numeroTelefono"] ?? null;

        $check = $pdo->prepare("SELECT id_tutor FROM tutores WHERE email = ? LIMIT 1");
        $check->execute([$correo]);
        if($check->fetch()){
            responderError("Ya existe una cuenta con ese correo", 409);
        }

        $stmt = $pdo->prepare("INSERT INTO tutores (nombre, telefono, email, password_hash) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nombreTutor, $numeroTelefono, $correo, password_hash($contra, PASSWORD_DEFAULT)]);
        $idTutor = $pdo->lastInsertId();
        responder(["id_tutor" => $idTutor, "nombreTutor" => $nombreTutor]);

    } catch (\Throwable $th) {
        responderError("Error interno del servidor", 500);
    }
}

function subirFoto(){
    try {
        if(empty($_FILES['foto'])) responderError('No se recibió ningún archivo', 400);

        $archivo    = $_FILES['foto'];
        $extension  = strtolower(pathinfo($archivo['name'], PATHINFO_EXTENSION));
        $permitidas = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

        if(!in_array($extension, $permitidas)) responderError('Tipo de archivo no permitido', 400);

        $carpeta = __DIR__ . '/fotos/';
        if(!is_dir($carpeta)) mkdir($carpeta, 0777, true);

        $nombreArchivo = uniqid('foto_') . '.' . $extension;
        move_uploaded_file($archivo['tmp_name'], $carpeta . $nombreArchivo);

        responder(['ruta' => '/fotos/' . $nombreArchivo]);

    } catch (\Throwable $th) {
        responderError('Error al subir la foto', 500);
    }
}

function getMonedas($pdo, $id_nene){
    try {
        $stmt = $pdo->prepare("SELECT monedas_actual FROM nenes WHERE id_nene = ?");
        $stmt->execute([$id_nene]);
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$fila) { responderError("Nene no encontrado", 404); return; }
        responder($fila);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function listarCapsulas($pdo){
    try {
        $stmt = $pdo->prepare("SELECT * FROM educapsulas");
        $stmt->execute();
        responder($stmt->fetchAll(PDO::FETCH_ASSOC));
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function sumarPuntuacion($pdo, $id_nene, $materia, $ejercicio){
    try {
        if ($materia === 'matematicas') {
            if ($ejercicio === 'operaciones') {
                $stmt = $pdo->prepare("UPDATE nenes SET numero_ejercicios_matematicas = numero_ejercicios_matematicas + 1, numero_de_operaciones = numero_de_operaciones + 1 WHERE id_nene = ?");
                $stmt->execute([$id_nene]);
            } else if ($ejercicio === 'problemas') {
                $stmt = $pdo->prepare("UPDATE nenes SET numero_ejercicios_matematicas = numero_ejercicios_matematicas + 1, numero_de_problemas = numero_de_problemas + 1 WHERE id_nene = ?");
                $stmt->execute([$id_nene]);
            }
        } else if ($materia === 'geografia') {
            $stmt = $pdo->prepare("UPDATE nenes SET numero_ejercicios_geografia = numero_ejercicios_geografia + 1, numero_capitales_adivinadas = numero_capitales_adivinadas + 1 WHERE id_nene = ?");
            $stmt->execute([$id_nene]);
        } else if ($materia === 'historia') {
            $stmt = $pdo->prepare("UPDATE nenes SET numero_ejercicios_historia = numero_ejercicios_historia + 1, numero_test_historia = numero_test_historia + 1 WHERE id_nene = ?");
            $stmt->execute([$id_nene]);
        } else if ($materia === 'lengua') {
            if ($ejercicio === 'sopa') {
                $stmt = $pdo->prepare("UPDATE nenes SET numero_ejercicios_lengua = numero_ejercicios_lengua + 1, numero_de_sopas = numero_de_sopas + 1 WHERE id_nene = ?");
                $stmt->execute([$id_nene]);
            } else if ($ejercicio === 'palabras') {
                $stmt = $pdo->prepare("UPDATE nenes SET numero_ejercicios_lengua = numero_ejercicios_lengua + 1, numero_de_palabras_encontradas = numero_de_palabras_encontradas + 1 WHERE id_nene = ?");
                $stmt->execute([$id_nene]);
            } else {
                $stmt = $pdo->prepare("UPDATE nenes SET numero_ejercicios_lengua = numero_ejercicios_lengua + 1 WHERE id_nene = ?");
                $stmt->execute([$id_nene]);
            }
        }
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function actualizarTrofeos($pdo, $id_nene, $cantidad) {
    try {
        $cantidad = (int)$cantidad;
        if ($cantidad >= 0) {
            $stmt = $pdo->prepare("UPDATE nenes SET trofeos_actual = trofeos_actual + ?, trofeos_total = trofeos_total + ? WHERE id_nene = ?");
            $stmt->execute([$cantidad, $cantidad, $id_nene]);
        } else {
            $abs = abs($cantidad);
            $stmt = $pdo->prepare("UPDATE nenes SET trofeos_actual = GREATEST(0, trofeos_actual - ?) WHERE id_nene = ?");
            $stmt->execute([$abs, $id_nene]);
        }
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function ganarMonedas($pdo, $id_nene, $cantidad){
    try {
        $stmt = $pdo->prepare("UPDATE nenes SET monedas_actual = monedas_actual + ?, monedas_total = monedas_total + ? WHERE id_nene = ?");
        $stmt->execute([$cantidad, $cantidad, $id_nene]);
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function perderMonedas($pdo, $id_nene, $cantidad){
    try {
        $stmt = $pdo->prepare("UPDATE nenes SET monedas_actual = monedas_actual - ?, monedas_gastadas_capsulas = monedas_gastadas_capsulas + ? WHERE id_nene = ? AND monedas_actual >= ?");
        $stmt->execute([$cantidad, $cantidad, $id_nene, $cantidad]);
        if ($stmt->rowCount() === 0) { responderError("Monedas insuficientes", 400); return; }
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function guardarEduino($pdo, $id_nene, $id_eduino){
    try {
        $base = $pdo->prepare("SELECT vida, fuerza FROM eduinos WHERE id_eduino = ?");
        $base->execute([$id_eduino]);
        $baseRow    = $base->fetch(PDO::FETCH_ASSOC);
        $vidaBase   = $baseRow ? (int)$baseRow['vida']   : 0;
        $fuerzaBase = $baseRow ? (int)$baseRow['fuerza'] : 0;

        $stmt = $pdo->prepare("INSERT INTO coleccionEduinos (id_nene, id_eduino, nivel, porcentaje, vida_actual, fuerza_actual) VALUES (?, ?, 1, 0, ?, ?)");
        $stmt->execute([$id_nene, $id_eduino, $vidaBase, $fuerzaBase]);
        $pdo->prepare("UPDATE nenes SET numero_eduinos_total = numero_eduinos_total + 1 WHERE id_nene = ?")->execute([$id_nene]);
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function comprarComida($pdo, $id_nene, $id_comida, $precio){
    try {
        $upd = $pdo->prepare("UPDATE nenes SET monedas_actual = monedas_actual - ?, monedas_gastadas_comida = monedas_gastadas_comida + ? WHERE id_nene = ? AND monedas_actual >= ?");
        $upd->execute([$precio, $precio, $id_nene, $precio]);
        if ($upd->rowCount() === 0) { responderError("Monedas insuficientes", 400); return; }
        $ins = $pdo->prepare("INSERT INTO coleccionComida (id_nene, id_comida, cantidad) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE cantidad = cantidad + 1");
        $ins->execute([$id_nene, $id_comida]);
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function implementarNeneTutor($pdo){
    try {
        $body = json_decode(file_get_contents("php://input"), true);

        $idTutor        = $body["id_tutor"]        ?? null;
        $nombre         = $body["nombre"]          ?? null;
        $apodo          = $body["apodo"]           ?? null;
        $foto           = $body["foto"]            ?? null;
        $fechaNac       = $body["fecha_nac"]       ?? null;
        $nivel          = $body["nivel"]           ?? null;
        $diasPermitidos = $body["dias_permitidos"] ?? null;
        $tiempoPantalla = $body["tiempo_pantalla"] ?? null;
        $horarioInicio  = $body["horario_inicio"]  ?? null;
        $horarioFin     = $body["horario_fin"]     ?? null;

        $check = $pdo->prepare("SELECT id_nene FROM nenes WHERE apodo = ? LIMIT 1");
        $check->execute([$apodo]);
        if($check->fetch()) responderError('Ese apodo ya está en uso', 409);

        $stmt = $pdo->prepare("INSERT INTO nenes (id_tutor, nombre, apodo, foto, fecha_nac, nivel, dias_permitidos, tiempo_pantalla, horario_inicio, horario_fin, dias_de_sesion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");
        $stmt->execute([$idTutor, $nombre, $apodo, $foto, $fechaNac, $nivel, $diasPermitidos, $tiempoPantalla, $horarioInicio, $horarioFin]);
        $idNene = $pdo->lastInsertId();

        responder(["id_nene" => $idNene, "apodo" => $apodo]);

    } catch (\Throwable $th) {
        responderError("Error interno del servidor", 500);
    }
}

function darComidaEduino($pdo, $id_nene, $id_eduino, $id_eduino_unico, $cantidad, $id_comida){
    try {
        
        $pdo->beginTransaction();

        // Verificar y descontar comida
        $checkComida = $pdo->prepare("SELECT cantidad FROM coleccionComida WHERE id_nene = ? AND id_comida = ? FOR UPDATE");
        $checkComida->execute([$id_nene, $id_comida]);
        $filaComida = $checkComida->fetch(PDO::FETCH_ASSOC);

        if (!$filaComida || $filaComida['cantidad'] < 1) {
            $pdo->rollBack();
            responderError("No tienes esa comida", 400);
            return;
        }

        $pdo->prepare("UPDATE coleccionComida SET cantidad = cantidad - 1 WHERE id_nene = ? AND id_comida = ?")
            ->execute([$id_nene, $id_comida]);

        $stmt = $pdo->prepare("
            SELECT ce.nivel, ce.porcentaje, ce.vida_actual, ce.fuerza_actual,
                   e.vida AS vida_base, e.fuerza AS fuerza_base
            FROM coleccionEduinos ce
            JOIN eduinos e ON e.id_eduino = ce.id_eduino
            WHERE ce.id_eduino_unico = ? AND ce.id_nene = ?
        ");
        $stmt->execute([$id_eduino_unico, $id_nene]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            $pdo->rollBack();
            responderError("Eduino no encontrado", 404);
            return;
        }

        $nivel        = (int)   $row['nivel'];
        $porcentaje   = (float) $row['porcentaje'];
        $vidaActual   = (int)   $row['vida_actual'];
        $fuerzaActual = (int)   $row['fuerza_actual'];
        $vidaBase     = (int)   $row['vida_base'];
        $fuerzaBase   = (int)   $row['fuerza_base'];
        $alimentacion = (int)   $cantidad;

        // ── Nivel y porcentaje ────────────────────────────────────────────
        $comidaParaSubir = max(1, $nivel) * 100;
        $comidaActual    = ($porcentaje / 100) * $comidaParaSubir + $alimentacion;

        while ($nivel < 50 && $comidaActual >= $comidaParaSubir) {
            $comidaActual  -= $comidaParaSubir;
            $nivel++;
            $comidaParaSubir = $nivel * 100;
        }

        $porcentaje = $nivel >= 50 ? 100.0 : ($comidaActual / $comidaParaSubir) * 100;

        // ── Vida actual: % proporcional a la alimentación sobre la vida base
        $vidaIncremento = (int) round($vidaBase * $alimentacion / 500);
        $vidaMax        = $vidaBase + $nivel * (int) round($vidaBase * 0.2);
        $vidaActual     = min($vidaMax, $vidaActual + $vidaIncremento);

        // ── Fuerza actual: sube con la comida, tope = fuerza_base + 50% ──
        $fuerzaMax        = $fuerzaBase + (int) round($fuerzaBase * 0.5);
        $fuerzaIncremento = max(1, (int) round($alimentacion / 30));
        $fuerzaActual     = min($fuerzaMax, $fuerzaActual + $fuerzaIncremento);

        $pdo->prepare("UPDATE coleccionEduinos SET nivel = ?, porcentaje = ?, vida_actual = ?, fuerza_actual = ? WHERE id_eduino_unico = ?")
            ->execute([$nivel, $porcentaje, $vidaActual, $fuerzaActual, $id_eduino_unico]);

        $pdo->commit();
        responder(["ok" => true, "nivel" => $nivel, "porcentaje" => $porcentaje, "vida_actual" => $vidaActual, "fuerza_actual" => $fuerzaActual]);
    } catch (\Throwable $th) {
        $pdo->rollBack();
        responderError("Error en base de datos", 500);
    }
}

function venderEduino($pdo, $id_nene, $id_eduino, $id_eduino_unico, $nivel, $precio) {
    try {
        if (!$precio || (int)$precio <= 0) {
            responderError("El precio debe ser mayor que 0", 400);
            return;
        }
        $pdo->beginTransaction();

        // Quitar de la colección (desaparece del catálogo)
        $pdo->prepare("DELETE FROM coleccionEduinos WHERE id_eduino_unico = ? AND id_nene = ?")
            ->execute([$id_eduino_unico, $id_nene]);

        // Publicar en el mercado
        $stmt = $pdo->prepare("INSERT INTO mercado (id_nene, id_eduino, id_eduino_unico, nivel, precio) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$id_nene, $id_eduino, $id_eduino_unico, $nivel, (int)$precio]);

        // Actualizar contador
        $pdo->prepare("UPDATE nenes SET numero_eduinos_total = GREATEST(0, numero_eduinos_total - 1) WHERE id_nene = ?")
            ->execute([$id_nene]);

        $pdo->commit();
        responder(["ok" => true, "id_venta" => $pdo->lastInsertId()]);
    } catch (\Throwable $th) {
        $pdo->rollBack();
        responderError("Error en base de datos", 500);
    }
}

function comprarEduino($pdo, $id_nene_comprador, $id_nene_vendedor, $id_venta, $id_eduino_unico, $precio) {
    try {
        $pdo->beginTransaction();

        // Obtener datos del eduino desde el mercado
        $row = $pdo->prepare("SELECT id_eduino, nivel FROM mercado WHERE id_venta = ? LIMIT 1");
        $row->execute([$id_venta]);
        $mercadoRow = $row->fetch(PDO::FETCH_ASSOC);
        if (!$mercadoRow) {
            $pdo->rollBack();
            responderError("La venta ya no existe", 404);
            return;
        }

        // Restar monedas al comprador (falla si no tiene suficientes)
        $upd = $pdo->prepare("UPDATE nenes SET monedas_actual = monedas_actual - ?, monedas_gastadas_eduinos = monedas_gastadas_eduinos + ? WHERE id_nene = ? AND monedas_actual >= ?");
        $upd->execute([$precio, $precio, $id_nene_comprador, $precio]);
        if ($upd->rowCount() === 0) {
            $pdo->rollBack();
            responderError("Monedas insuficientes", 400);
            return;
        }

        // Sumar monedas al vendedor
        $pdo->prepare("UPDATE nenes SET monedas_actual = monedas_actual + ? WHERE id_nene = ?")
            ->execute([$precio, $id_nene_vendedor]);

        $pdo->prepare("UPDATE nenes SET monedas_total = monedas_total + ? WHERE id_nene = ?")
            ->execute([$precio, $id_nene_vendedor]);

        // Obtener stats base del eduino para restaurar vida y fuerza
        $baseStmt = $pdo->prepare("SELECT vida, fuerza FROM eduinos WHERE id_eduino = ?");
        $baseStmt->execute([$mercadoRow['id_eduino']]);
        $baseRow = $baseStmt->fetch(PDO::FETCH_ASSOC);
        $vidaBase   = $baseRow ? (int)$baseRow['vida']   : 0;
        $fuerzaBase = $baseRow ? (int)$baseRow['fuerza'] : 0;

        // Insertar el eduino en la colección del comprador
        $pdo->prepare("INSERT INTO coleccionEduinos (id_nene, id_eduino, nivel, porcentaje, vida_actual, fuerza_actual) VALUES (?, ?, ?, 0, ?, ?)")
            ->execute([$id_nene_comprador, $mercadoRow['id_eduino'], $mercadoRow['nivel'], $vidaBase, $fuerzaBase]);

        // Actualizar contadores
        $pdo->prepare("UPDATE nenes SET numero_eduinos_total = numero_eduinos_total + 1 WHERE id_nene = ?")
            ->execute([$id_nene_comprador]);

        // Eliminar del mercado
        $pdo->prepare("DELETE FROM mercado WHERE id_venta = ?")
            ->execute([$id_venta]);

        $pdo->commit();
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        $pdo->rollBack();
        responderError("Error en base de datos", 500);
    }
}

function recuperarEduino($pdo, $id_nene, $id_venta) {
    try {
        $pdo->beginTransaction();

        // Obtener datos del eduino en el mercado
        $row = $pdo->prepare("SELECT id_eduino, nivel FROM mercado WHERE id_venta = ? AND id_nene = ? LIMIT 1");
        $row->execute([$id_venta, $id_nene]);
        $mercadoRow = $row->fetch(PDO::FETCH_ASSOC);
        if (!$mercadoRow) {
            $pdo->rollBack();
            responderError("La venta no existe o no te pertenece", 404);
            return;
        }

        // Obtener stats base del eduino para restaurar vida y fuerza
        $baseStmt = $pdo->prepare("SELECT vida, fuerza FROM eduinos WHERE id_eduino = ?");
        $baseStmt->execute([$mercadoRow['id_eduino']]);
        $baseRow = $baseStmt->fetch(PDO::FETCH_ASSOC);
        $vidaBase   = $baseRow ? (int)$baseRow['vida']   : 0;
        $fuerzaBase = $baseRow ? (int)$baseRow['fuerza'] : 0;

        // Devolver el eduino a la colección
        $pdo->prepare("INSERT INTO coleccionEduinos (id_nene, id_eduino, nivel, porcentaje, vida_actual, fuerza_actual) VALUES (?, ?, ?, 0, ?, ?)")
            ->execute([$id_nene, $mercadoRow['id_eduino'], $mercadoRow['nivel'], $vidaBase, $fuerzaBase]);

        // Actualizar contador
        $pdo->prepare("UPDATE nenes SET numero_eduinos_total = numero_eduinos_total + 1 WHERE id_nene = ?")
            ->execute([$id_nene]);

        // Eliminar del mercado
        $pdo->prepare("DELETE FROM mercado WHERE id_venta = ?")
            ->execute([$id_venta]);

        $pdo->commit();
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        $pdo->rollBack();
        responderError("Error en base de datos", 500);
    }
}

function listarLogros($pdo, $id_nene) {
    try {
        $stmt = $pdo->prepare("
            SELECT l.*,
                   COALESCE(cl.reclamado, 0)         AS reclamado,
                   COALESCE(cl.fecha_reclamado, NULL) AS fecha_reclamado
            FROM logros l
            LEFT JOIN coleccion_logros cl ON cl.id_logro = l.id_logro AND cl.id_nene = ?
            ORDER BY l.tipo ASC, l.meta ASC
        ");
        $stmt->execute([$id_nene]);
        $logros = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $neneStmt = $pdo->prepare("SELECT * FROM nenes WHERE id_nene = ?");
        $neneStmt->execute([$id_nene]);
        $nene = $neneStmt->fetch(PDO::FETCH_ASSOC);

        foreach ($logros as &$logro) {
            $campo    = $logro['campo_seguimiento'];
            $progreso = isset($nene[$campo]) ? (int)$nene[$campo] : 0;
            $logro['progreso'] = min($progreso, (int)$logro['meta']);
        }

        responder($logros);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}

function reclamarLogro($pdo, $id_nene, $id_logro) {
    try {
        $logroStmt = $pdo->prepare("SELECT * FROM logros WHERE id_logro = ?");
        $logroStmt->execute([$id_logro]);
        $logro = $logroStmt->fetch(PDO::FETCH_ASSOC);
        if (!$logro) { responderError("Logro no encontrado", 404); return; }

        $checkStmt = $pdo->prepare("SELECT reclamado FROM coleccion_logros WHERE id_nene = ? AND id_logro = ?");
        $checkStmt->execute([$id_nene, $id_logro]);
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);
        if ($existing && $existing['reclamado']) { responderError("Ya reclamado", 400); return; }

        $neneStmt = $pdo->prepare("SELECT * FROM nenes WHERE id_nene = ?");
        $neneStmt->execute([$id_nene]);
        $nene = $neneStmt->fetch(PDO::FETCH_ASSOC);
        $campo    = $logro['campo_seguimiento'];
        $progreso = isset($nene[$campo]) ? (int)$nene[$campo] : 0;
        if ($progreso < (int)$logro['meta']) { responderError("Logro aún no completado", 400); return; }

        $pdo->beginTransaction();
        if ($existing) {
            $pdo->prepare("UPDATE coleccion_logros SET reclamado = 1, fecha_reclamado = NOW() WHERE id_nene = ? AND id_logro = ?")
                ->execute([$id_nene, $id_logro]);
        } else {
            $pdo->prepare("INSERT INTO coleccion_logros (id_nene, id_logro, reclamado, fecha_reclamado) VALUES (?, ?, 1, NOW())")
                ->execute([$id_nene, $id_logro]);
        }
        $pdo->prepare("UPDATE nenes SET monedas_actual = monedas_actual + ?, monedas_total = monedas_total + ?, logros_conseguidos = logros_conseguidos + 1 WHERE id_nene = ?")
            ->execute([$logro['recompensa_monedas'], $logro['recompensa_monedas'], $id_nene]);
        $pdo->commit();

        responder(["ok" => true, "monedas_ganadas" => $logro['recompensa_monedas']]);
    } catch (\Throwable $th) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        responderError("Error en base de datos", 500);
    }
}

function actualizarNene($pdo, $id_nene) {
    try {
        $body           = json_decode(file_get_contents("php://input"), true);
        $nombre         = $body["nombre"]          ?? null;
        $foto           = $body["foto"]            ?? null;
        $nivel          = $body["nivel"]           ?? null;
        $tiempoPantalla = $body["tiempo_pantalla"] ?? null;
        $horarioInicio  = $body["horario_inicio"]  ?? null;
        $horarioFin     = $body["horario_fin"]     ?? null;
        $diasPermitidos = $body["dias_permitidos"] ?? null;

        $apodo          = $body["apodo"]            ?? null;
        $stmt = $pdo->prepare("UPDATE nenes SET nombre = ?, apodo = ?, foto = ?, nivel = ?, tiempo_pantalla = ?, horario_inicio = ?, horario_fin = ?, dias_permitidos = ? WHERE id_nene = ?");
        $stmt->execute([$nombre, $apodo, $foto, $nivel, $tiempoPantalla, $horarioInicio, $horarioFin, $diasPermitidos, $id_nene]);
        responder(["ok" => true]);
    } catch (\Throwable $th) {
        responderError("Error en base de datos", 500);
    }
}