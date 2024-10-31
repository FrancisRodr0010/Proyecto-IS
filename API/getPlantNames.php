<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
header("Content-Type: application/json; charset=UTF-8");

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // usuario de RDS
$password = "root_0010"; //contraseña de RDS
$dbname = "dbis"; // RDS DB

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consultar los nombres de las plantas
$sql = "SELECT nombre_comun FROM plantas";
$result = $conn->query($sql);

$plantas = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $plantas[] = $row['nombre_comun'];
    }
}
echo json_encode($plantas);

$conn->close();
?>
