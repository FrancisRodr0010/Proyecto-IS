<?php

// Encabezado para que la respuesta sea en formato JSON
header('Content-Type: application/json');

// Simulación de conexión a la base de datos (asegúrate de usar tu propia lógica de conexión)
$mysqli = new mysqli("localhost", "usuario", "contraseña", "nombre_base_datos");

if ($mysqli->connect_error) {
    die("Error de conexión a la base de datos: " . $mysqli->connect_error);
}

// Verificar si se recibió el parámetro 'nombre'
if (isset($_GET['nombre'])) {
    $nombre = $mysqli->real_escape_string($_GET['nombre']);

    // Consulta para buscar la planta en la base de datos
    $query = "SELECT * FROM plantas WHERE nombre_comun LIKE '%$nombre%'";

    // Ejecutar la consulta
    $result = $mysqli->query($query);

    if ($result->num_rows > 0) {
        // Obtener resultados y almacenarlos en la variable $resultado
        $resultado = $result->fetch_all(MYSQLI_ASSOC);
    } else {
        // Si no se encuentran resultados
        $resultado = ["error" => "No se encontraron plantas con ese nombre"];
    }

    // Liberar los recursos de la consulta
    $result->free();
} else {
    // Si no se recibe el parámetro 'nombre'
    $resultado = ["error" => "No se proporcionó el parámetro 'nombre'"];
}

// Cerrar la conexión a la base de datos
$mysqli->close();

// Devolver el resultado en formato JSON
echo json_encode($resultado);

?>
