<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Permitir el envío de credenciales
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

// Cerrar sesión
session_unset(); // Opcional: limpiar las variables de sesión
session_destroy(); // Destruir la sesión

$isAuthenticated = isset($_SESSION['user_id']);
echo json_encode(["isAuthenticated" => $isAuthenticated]);
?>
