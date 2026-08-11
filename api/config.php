<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

if($_SERVER["REQUEST_METHOD"]==="OPTIONS"){
    http_response_code(200);
    exit;
}

function conectar_bd(){
    $dbname = getenv('DB_NAME') ?: 'eduino_db';
    $host = getenv('DB_HOST') ?: 'localhost';
    $username = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';

    $dns= "mysql:host=$host;dbname=$dbname;charset=utf8mb4"; // siempre es buena práctica utf8

    $opciones= [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, 
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    try{
        $pdo = new PDO($dns, $username, $pass, $opciones);
    } catch (PDOException $e){ // ojo mayúscula en Exception
        echo json_encode(["error"=>$e->getMessage()]);
        exit;  
    }
    return $pdo;
}

function responder($data = null, $status = "ok", $codigo = 200) {
    http_response_code($codigo);
    echo json_encode([
        "status" => $status,
        "codigo" => $codigo,
        "data"   => $data
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

function responderError($mensaje, $codigo = 400) {
    responder(["mensaje" => $mensaje], "error", $codigo);
}
?>
