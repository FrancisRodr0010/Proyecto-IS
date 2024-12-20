<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Conectar a la base de datos
$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

// Obtener datos desde el request
$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $data->id;
    $nombre_comun = $data->nombre_comun;
    $descripcion = $data->descripcion;
    $frecuencia_riego = (int)$data->frecuencia_riego;
    $frecuencia_fertilizacion = (int)$data->frecuencia_fertilizacion;

    // Consultar para modificar la planta
    $sql = "UPDATE plantas SET nombre_comun = ?, descripcion = ?, frecuencia_riego = ?, frecuencia_fertilizacion = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiii", $nombre_comun, $descripcion, $frecuencia_riego, $frecuencia_fertilizacion, $id); // Cambia a "ssi"

    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => "Error al modificar la planta"));
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Faltan datos"));
}

$conn->close();
?>
