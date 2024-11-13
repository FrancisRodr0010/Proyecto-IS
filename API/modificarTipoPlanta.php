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
    $nombre = $data->nombre;
    $descripcion = $data->descripcion;


    $sql = "UPDATE tipoPlanta SET Nombre = ?, Descripcion = ? WHERE id_Tipo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $nombre, $descripcion, $id); 

    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => "Error al modificar el tipo de planta planta"));
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Faltan datos"));
}

$conn->close();
?>
