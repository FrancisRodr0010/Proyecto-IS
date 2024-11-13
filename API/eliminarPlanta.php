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
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;




if ($id > 0) {
    // Eliminar las tareas asociadas con la planta
    $sqlDeleteTareas = "DELETE FROM Tareas WHERE id_planta = ?";
    $stmtTareas = $conn->prepare($sqlDeleteTareas);
    $stmtTareas->bind_param("i", $id);
    
    if ($stmtTareas->execute()) {
        // Después de eliminar las tareas, eliminar la planta
        $sqlDeletePlanta = "DELETE FROM plantas WHERE id = ?";
        $stmtPlanta = $conn->prepare($sqlDeletePlanta);
        $stmtPlanta->bind_param("i", $id);

        if ($stmtPlanta->execute()) {
            echo json_encode(array("success" => true, "message" => "Planta y tareas asociadas eliminadas con éxito"));
        } else {
            echo json_encode(array("success" => false, "message" => "Error al eliminar la planta"));
        }

        $stmtPlanta->close();
    } else {
        echo json_encode(array("success" => false, "message" => "Error al eliminar las tareas asociadas"));
    }

    $stmtTareas->close();
} else {
    echo json_encode(array("success" => false, "message" => "ID inválido"));
}

$conn->close();
?>
