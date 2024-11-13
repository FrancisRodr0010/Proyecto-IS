<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Activar reporte de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configuración de conexión
$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com";
$username = "admin";
$password = "rootaws123.";
$dbname = "databaseis";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta para obtener todos los registros de la tabla libraryPlants
$sql = "SELECT * FROM libraryPlants";
$result = $conn->query($sql);

// Array para almacenar los resultados
$categorias = array();

// Verificar si hay registros y agregarlos al array
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $categorias[] = $row;
    }
    // Devolver el array como JSON
    echo json_encode($categorias);
} else {
    // Si no hay registros o la consulta falla, mostrar mensaje de error
    echo json_encode(["message" => "No se encontraron datos en la tabla libraryPlants o error en la consulta."]);
}

// Cerrar la conexión
$conn->close();
?>
