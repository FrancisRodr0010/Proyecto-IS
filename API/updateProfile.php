<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

// Conexión a la base de datos
$servername = "databaseis.c3g4iieacsm1.us-west-1.rds.amazonaws.com"; // Cambia esto por el endpoint de tu base de datos RDS
$username = "admin"; // Cambia esto por tu usuario de RDS
$password = "rootaws123."; // Cambia esto por tu contraseña de RDS
$dbname = "databaseis"; // Cambia esto por el nombre de tu base de datos en RDS
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Conexión fallida")));
}

// Obtiene el ID del usuario logueado de la sesión
$idUsuario = (int)$_SESSION['user_id'];

// Consulta para obtener la contraseña actual del usuario
$sql = "SELECT password FROM Usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$stmt->bind_result($hashedPassword);
$stmt->fetch();
$stmt->close();

// Decodificar el JSON recibido
$data = json_decode(file_get_contents("php://input"));

// Verificar que los datos necesarios estén presentes
if (isset($data->userId) && isset($data->username) && isset($data->password) && isset($data->actualPsw)) {
    $userId = (int)$data->userId;
    $newUsername = $data->username;
    $newPassword = password_hash($data->password, PASSWORD_DEFAULT);
    $actualPsw = $data->actualPsw;

    // Comparar la contraseña actual ingresada con la contraseña hasheada de la base de datos
    if (!password_verify($actualPsw, $hashedPassword)) {
        echo json_encode(array("success" => false, "message" => "La contraseña actual es incorrecta"));
        $conn->close();
        exit();
    }

    // Actualizar el nombre de usuario y la contraseña en la base de datos
    $sql = "UPDATE Usuarios SET username = ?, password = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $newUsername, $newPassword, $userId);

    if ($stmt->execute()) {
        // Actualizar la sesión con el nuevo nombre de usuario
        $_SESSION['username'] = $newUsername;

        echo json_encode(array("success" => true, "message" => "Perfil actualizado exitosamente"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error al actualizar el perfil"));
    }
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Faltan datos"));
}

$conn->close();
