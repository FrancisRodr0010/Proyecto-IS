<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
header("Content-Type: application/json; charset=UTF-8");


$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";


$conn = new mysqli($servername, $username, $password, $dbname);


if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("success" => false, "message" => "Usuario no autenticado"));
    exit; // Terminar el script si el usuario no está autenticado
}

$usuario_id = $_SESSION['user_id'];



$sql = "SELECT t.id_t, t.tarea, t.fecha_registro, p.nombre_comun FROM Tareas t JOIN plantas p ON t.id_planta = p.id WHERE p.usuario_id = ? ORDER BY fecha_registro DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$tareas = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tareas[] = $row;
    }
    echo json_encode(array("success" => true, "data" => $tareas));
} else {
    echo json_encode(array("success" => true, "data" => [])); // También devolver una lista vacía
}

$stmt->close();
$conn->close();



?>