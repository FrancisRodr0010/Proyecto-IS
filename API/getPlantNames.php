<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
header("Content-Type: application/json; charset=UTF-8");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consultar los nombres de las plantas
$sql = "";
$result = $conn->query($sql);

$plantasConConsejos = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $plantasConConsejos[] = $row; // Almacena los resultados
    }
} else {
    echo "No se encontraron consejos.";
}

echo json_encode($plantasConConsejos); // Devuelve el resultado en formato JSON

$conn->close();
?>
