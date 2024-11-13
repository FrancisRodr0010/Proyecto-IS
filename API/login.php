<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

// Conexión a la base de datos
$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

// Obtener los datos desde la solicitud
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // Filtrar el usuario por correo electrónico
    $sql = "SELECT * FROM Usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Crear la sesión
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            $_SESSION['rol'] = $row['rol'];
            echo json_encode(array("success" => true, "user_id" => $row['id'], "session" => $_SESSION));
        } else {
            echo json_encode(array("success" => false, "message" => "Contraseña incorrecta"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Usuario no encontrado"));
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Faltan datos"));
}

$conn->close();
