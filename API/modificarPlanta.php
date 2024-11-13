<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Conectar a la base de datos
$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "rootaws123."; // Cambia esto por tu contraseña de RDS
$dbname = "databaseis"; // Cambia esto por el nombre de tu base de datos en RDS

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
