<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeceras permitidas
header("Content-Type: application/json; charset=UTF-8");


// Conexión a la base de datos
$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "root_0010"; // Cambia esto por tu contraseña de RDS
$dbname = "dbis"; // Cambia esto por el nombre de tu base de datos en RDS

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

// Obtener los datos desde la solicitud
$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password) && isset($data->email)) {
    $email = $data->email;
    $username = $data->username;
    $password = $data->password;

    // Verificar si el usuario ya existe
    $sql = "SELECT * FROM Usuarios WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // El usuario ya existe
        echo json_encode(array("success" => false, "message" => "El nombre de usuario ya está en uso"));
    } else {
        // Encriptar la contraseña y crear el nuevo usuario
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $insertSql = "INSERT INTO Usuarios (email, username, password) VALUES (?, ?, ?)";
        $insertStmt = $conn->prepare($insertSql);
        $insertStmt->bind_param("sss", $email, $username, $hashedPassword);

        if ($insertStmt->execute()) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false, "message" => "Error al crear el usuario"));
        }

        $insertStmt->close();
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Faltan datos"));
}

$conn->close();
?>
