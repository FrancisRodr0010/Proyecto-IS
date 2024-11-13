<?php
session_start();
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


$idUsuario = (int)$_SESSION['user_id'];

// Consultar los nombres de las plantas
/*$sql = "SELECT t.consejo, p.nombre_comun
FROM tips t
JOIN  plantas p ON t.planta_id = p.id
WHERE p.usuario_id = $idUsuario";*/

$sql = "SELECT tips.consejo AS consejo, tips.planta_id, libraryPlants.nombre_comun AS nombre_comun
FROM tips
JOIN libraryPlants ON tips.planta_id = libraryPlants.id
JOIN plantas ON plantas.nombre_comun = libraryPlants.nombre_comun
WHERE plantas.usuario_id = $idUsuario;";

$result = $conn->query($sql);

$tips = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tips[] = $row;
    }
    echo json_encode(array("success" => true, "data" => $tips));
} else {
    echo json_encode(array("success" => true, "data" => [])); // También devolver una lista vacía
}

$conn->close();
?>
