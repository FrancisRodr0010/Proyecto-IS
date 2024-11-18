<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "rootaws123."; // Cambia esto por tu contraseña de RDS
$dbname = "databaseis"; // Cambia esto por el nombre de tu base de datos en RDS

$user_id = $_SESSION['user_id'];

if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("success" => false, "message" => "Usuario no autenticado"));
    exit;
}

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}

$sql = "SELECT COUNT(*) AS Plantas_Necesitadas FROM plantas WHERE usuario_id = ? AND estado = 'Se requiere atención'";
$stmt = $connection->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();

echo json_encode(array("success" => true, "data" => $count));

$stmt->close();
$connection->close();
?>
