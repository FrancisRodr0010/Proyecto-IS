<?php
session_start(); // Iniciar la sesión
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cambia el origen según sea necesario
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el uso de credenciales
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

// Verificar si el usuario está logueado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("success" => false, "message" => "Usuario no autenticado"));
    exit; // Terminar el script si el usuario no está autenticado
}

// Obtener el ID del usuario logueado
$usuario_id = $_SESSION['user_id'];

// Preparar la consulta para obtener las plantas del usuario logueado
$sql = "SELECT l.id, l.nombre_comun, l.nombre_cientifico, l.descripcion, l.estado, l.frecuencia_riego, l.frecuencia_fertilizacion, tp.Nombre
FROM libraryPlants l
JOIN  tipoPlanta tp ON l.id_Tipo = tp.id_Tipo
WHERE l.usuario_id = ?
ORDER BY fecha_creacion DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$plantas = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $plantas[] = $row;
    }
    echo json_encode(array("success" => true, "data" => $plantas));
} else {
    echo json_encode(array("success" => true, "data" => [])); // También devolver una lista vacía
}

$stmt->close();
$conn->close();
?>
