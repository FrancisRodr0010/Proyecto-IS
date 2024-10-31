<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

$idUsuario = (int)$_SESSION['user_id'];

// Consulta para obtener la contraseña actual del usuario
$sql = "SELECT password FROM Usuarios WHERE id = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$stmt->bind_result($hashedPassword);
$stmt->fetch();
$stmt->close();

// Decodificar el JSON recibido
$data = json_decode(file_get_contents("php://input"));

$userId = (int)$data->userId;
$actualPsw = $data->actualPsw;


if (!password_verify($actualPsw, $hashedPassword)) {
    echo json_encode(array("success" => false, "message" => "La contraseña actual es incorrecta"));
    $connection->close();
    exit();
} else {
    $sql = 'DELETE FROM Usuarios WHERE id = ?';
    $stmtTareas = $connection->prepare($sql);
    $stmtTareas->bind_param("i", $idUsuario);

    if ($stmtTareas->execute()) {
        echo json_encode(array("success" => true, "message" => "Usuario eliminado con exito"));
    } else {
        echo json_encode(array("success" => false, "message" => "Ocurrio un error"));
    }
} 



session_unset(); // Opcional: limpiar las variables de sesión
session_destroy(); // Destruir la sesión

$connection->close();

?>
