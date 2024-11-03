<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
header("Content-Type: application/json; charset=UTF-8");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // usuario de RDS
$password = "root_0010"; //contraseña de RDS
$dbname = "dbis"; // RDS DB

$connection = new mysqli($servername, $username, $password, $dbname);


if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("success" => false, "message" => "Usuario no autenticado"));
    exit; // Terminar el script si el usuario no está autenticado
}

$usuario_id = $_SESSION['user_id'];


$sql = "SELECT COUNT(*) as Cant_Notificaciones
FROM Recordatorios r
JOIN Tareas t ON r.tarea_id = t.id_t
JOIN plantas p ON t.id_planta = p.id
WHERE p.usuario_id = ?";

$stmt = $connection->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();



$Cant_Notificaciones = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $Cant_Notificaciones[] = $row;
    }
    echo json_encode(array("success" => true, "data" => $Cant_Notificaciones));
} else {
    echo json_encode(array("success" => true, "data" => [])); // Lista vacia, es decir no hay notificaciones para este usuario.
}

$stmt->close();
$connection->close();

?>
