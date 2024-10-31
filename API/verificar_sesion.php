<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Verificar si la sesión está activa
$response = [];

if (!isset($_SESSION['user_id'])) {
    $response = ['success' => false, 'message' => 'Usuario no autenticado', 'sesion_activa' => false];
} else {
    // Si la sesión está activa, puedes incluir el user_id si lo necesitas
    $response = [
        'success' => true,
        'sesion_activa' => true,
        'user_id' => $_SESSION['user_id'], // Solo si necesitas enviar esto
    ];
}

// Enviar la respuesta JSON
echo json_encode($response);
exit;

?>
