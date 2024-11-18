<?php
session_start();
header("Access-Control-Allow-Origin: https://greenmanage-react.s3.us-west-1.amazonaws.com/index.html");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
header("Content-Type: application/json; charset=UTF-8");

$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "rootaws123."; // Cambia esto por tu contraseña de RDS
$dbname = "databaseis"; // Cambia esto por el nombre de tu base de datos en RDS

$connection = new mysqli($servername, $username, $password, $dbname);


if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("success" => false, "message" => "Usuario no autenticado"));
    exit; // Terminar el script si el usuario no está autenticado
}

$usuario_id = $_SESSION['user_id'];


$sql = "SELECT r.id_r, r.fecha_recordatorio, r.descripcion, t.tarea, p.nombre_comun
FROM Recordatorios r
JOIN Tareas t ON r.tarea_id = t.id_t
JOIN plantas p ON t.id_planta = p.id
WHERE p.usuario_id = ?
ORDER BY fecha_recordatorio DESC";

$stmt = $connection->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$notificaciones = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notificaciones[] = $row;
    }
    echo json_encode(array("success" => true, "data" => $notificaciones));
} else {
    echo json_encode(array("success" => true, "data" => [])); // Lista vacia, es decir no hay notificaciones para este usuario.
}

$stmt->close();
$connection->close();

?>
