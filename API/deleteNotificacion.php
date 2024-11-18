<?php

session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "rootaws123."; // Cambia esto por tu contraseña de RDS
$dbname = "databaseis"; // Cambia esto por el nombre de tu base de datos en RDS

$connection = new mysqli($servername, $username, $password, $dbname);


if ($connection->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}



$id_r = isset($_GET['id_r']) ? intval($_GET['id_r']) : 0;



$sql = 'DELETE FROM Recordatorios WHERE id_r = ?';
$stmtRecordatorios = $connection->prepare($sql);
$stmtRecordatorios->bind_param("i", $id_r);

if ($stmtRecordatorios->execute()) {
    echo json_encode(array("success" => true, "message" => "Se quitó la notificacion"));
} else {
    echo json_encode(array("success" => false, "message" => "Error al eliminar la tarea"));
}


$connection->close();

?>