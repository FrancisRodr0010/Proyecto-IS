<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "rootaws123."; // Cambia esto por tu contraseña de RDS
$dbname = "databaseis"; // Cambia esto por el nombre de tu base de datos en RDS

$conn = new mysqli($servername, $username, $password, $dbname);

$planta_id = 1; // Supón que el ID de la planta es 1

// Obtenemos la frecuencia_riego de la planta
$sqlFrecuencia = "SELECT frecuencia_riego FROM plantas WHERE id = ?";
$stmtFrecuencia = $conn->prepare($sqlFrecuencia);
$stmtFrecuencia->bind_param("i", $planta_id);
$stmtFrecuencia->execute();
$stmtFrecuencia->bind_result($frecuencia_riego);
$stmtFrecuencia->fetch();
$stmtFrecuencia->close();

if ($frecuencia_riego) {
    // Calcular la fecha_programada en PHP
    $fechaRegistro = new DateTime(); // Fecha actual
    $fechaRegistroStr = $fechaRegistro->format('Y-m-d');
    $fechaRegistro->add(new DateInterval("P{$frecuencia_riego}D")); // Sumar frecuencia_riego días
    $fechaProgramada = $fechaRegistro->format('Y-m-d');

    // Insertar en la tabla `tareas`
    $sqlInsert = "INSERT INTO tareas (planta_id, fecha_registro, fecha_programada)
                  VALUES (?, ?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("iss", $planta_id, $fechaRegistroStr, $fechaProgramada);

    if ($stmtInsert->execute()) {
        echo json_encode(['success' => true, 'message' => 'Tarea programada exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al programar la tarea']);
    }
    $stmtInsert->close();
} else {
    echo json_encode(['success' => false, 'message' => 'No se encontró la frecuencia de riego para la planta']);
}

$conn->close();
?>
