<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cambia el origen según sea necesario
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
header("Content-Type: application/json; charset=UTF-8");

if (!isset($_SESSION['user_id'])) { // Asegúrate de que este sea el nombre correcto de la sesión
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

$conn = new mysqli($servername, $username, $password, $dbname);



$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'];
$descripcion = $data['descripcion'];
$usuario_id = $_SESSION['user_id']; // Debe coincidir con el nombre de la variable de sesión




$sql = "INSERT INTO tipoPlanta (Nombre, Descripcion)
        VALUES (?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nombre, $descripcion);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Tipo de planta agregada exitosamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al agregar la planta']);
}

$stmt->close();
$conn->close();
?>
