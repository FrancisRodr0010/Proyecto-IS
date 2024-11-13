<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com";
$username = "admin";
$password = "rootaws123.";
$dbname = "databaseis";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Obtener los datos enviados desde el componente React
$data = json_decode(file_get_contents("php://input"), true);
$plant_id = $data['plant_id'];
$tip = $data['tip'];

// Verificar si el plant_id existe en la tabla plantas
$checkPlantIdQuery = "SELECT id FROM plantas WHERE id = ?";
$checkStmt = $conn->prepare($checkPlantIdQuery);
$checkStmt->bind_param("i", $plant_id);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    // Preparar la consulta para insertar el tip
    $query = "INSERT INTO tips (consejo, planta_id) VALUES (?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("si", $tip, $plant_id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Tip guardado exitosamente."]);
        } else {
            echo json_encode(["error" => "Error al guardar el tip: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Error en la preparación de la consulta: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Error: el ID de planta no existe en la tabla 'plantas'."]);
}

$checkStmt->close();
$conn->close();

?>
