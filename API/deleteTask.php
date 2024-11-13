<?php

session_start();
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

$connection = new mysqli($servername, $username, $password, $dbname);


if ($connection->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}



$id_t = isset($_GET['id_t']) ? intval($_GET['id_t']) : 0;



$sql = 'DELETE FROM Tareas WHERE id_t = ?';
$stmtTareas = $connection->prepare($sql);
$stmtTareas->bind_param("i", $id_t);

if ($stmtTareas->execute()) {
    echo json_encode(array("success" => true, "message" => "Tarea eliminada con exito"));
} else {
    echo json_encode(array("success" => false, "message" => "Error al eliminar la tarea"));
}


$connection->close();

?>