<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

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
