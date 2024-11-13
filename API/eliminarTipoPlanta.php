<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

// Obtener el ID de la planta a eliminar desde la consulta
$id = isset($_GET['id_Tipo']) ? intval($_GET['id_Tipo']) : 0;




$sqlDeletePlanta = "DELETE FROM tipoPlanta WHERE id_Tipo = ?";
$stmtPlanta = $conn->prepare($sqlDeletePlanta);
$stmtPlanta->bind_param("i", $id);

if ($stmtPlanta->execute()) {
    echo json_encode(array("success" => true, "message" => "Se borro el tipo de planta"));
} else {
    echo json_encode(array("success" => false, "message" => "Error al eliminar el tipo de planta"));
}

$stmtPlanta->close();


$conn->close();
?>
