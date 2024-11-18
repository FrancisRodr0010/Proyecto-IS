<?php
session_start();
header("Access-Control-Allow-Origin: https://greenmanage-react.s3.us-west-1.amazonaws.com/index.html"); // Cambia el origen según sea necesario
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
header("Content-Type: application/json; charset=UTF-8");

if (!isset($_SESSION['user_id'])) { // Asegúrate de que este sea el nombre correcto de la sesión
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "rootaws123."; // Cambia esto por tu contraseña de RDS
$dbname = "databaseis"; // Cambia esto por el nombre de tu base de datos en RDS

$conn = new mysqli($servername, $username, $password, $dbname);



$data = json_decode(file_get_contents("php://input"), true);
$nombre_comun = $data['nombre_comun'];
$nombre_cientifico = $data['nombre_cientifico'];
$descripcion = $data['descripcion'];
$estado = 'Aun no se ha realizado tareas sobre esta planta';
$frecuencia_riego = (int)$data['frecuencia_riego'];
$frecuencia_fertilizacion = (int)$data['frecuencia_fertilizacion'];
$usuario_id = $_SESSION['user_id']; // Debe coincidir con el nombre de la variable de sesión




$sql = "INSERT INTO plantas (nombre_comun, nombre_cientifico, descripcion, estado,  fecha_creacion, frecuencia_riego, frecuencia_fertilizacion, usuario_id)
        VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssiii", $nombre_comun, $nombre_cientifico, $descripcion, $estado, $frecuencia_riego, $frecuencia_fertilizacion, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Planta agregada exitosamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al agregar la planta']);
}

$stmt->close();
$conn->close();
?>
