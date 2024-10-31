<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$servername = "dbis.cpmigq8o8do7.us-east-2.rds.amazonaws.com";
$username = "admin";
$password = "root_0010";
$dbname = "dbis";

$conn = new mysqli($servername, $username, $password, $dbname);

$data = json_decode(file_get_contents("php://input"), true);

$planta_id = (int)$data['id_planta']; 
$tarea = $data['tarea']; 



if($tarea == 'Riego'){
    // Obtenemos la frecuencia_riego de la planta
    $sql = "SELECT frecuencia_riego FROM plantas WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $planta_id);
    $stmt->execute();
    $stmt->bind_result($frecuencia_riego);
    $stmt->fetch();
    $stmt->close();


    if ($frecuencia_riego) {
        $fechaRegistro = new DateTime(); // Fecha actual
        $fechaRegistroStr = $fechaRegistro->format('Y-m-d'); // Formato DATE para la base de datos

        // Sumar frecuencia_riego días a la fecha actual para obtener fecha_programada
        $fechaRegistro->add(new DateInterval("P{$frecuencia_riego}D"));
        $fechaProgramada = $fechaRegistro->format('Y-m-d'); // Formato DATE para la base de datos

        // Insertar en la tabla `tareas`
        $sqlInsert = "INSERT INTO Tareas (tarea, fecha_registro, fecha_programada, id_planta)
                    VALUES (?, ?, ?, ?)";
        $stmtInsert = $conn->prepare($sqlInsert);


        $stmtInsert->bind_param("sssi", $tarea, $fechaRegistroStr, $fechaProgramada, $planta_id);

        if ($stmtInsert->execute()) {
            echo json_encode(['success' => true, 'message' => 'Tarea programada exitosamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al programar la tarea']);
        }
        $stmtInsert->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró la frecuencia de riego para la planta']);
    }
} elseif ($tarea == 'Fertilización'){
    $sql = "SELECT frecuencia_fertilizacion FROM plantas WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $planta_id);
    $stmt->execute();
    $stmt->bind_result($frecuencia_fertilizacion);
    $stmt->fetch();
    $stmt->close();


    if ($frecuencia_fertilizacion) {
        $fechaRegistro = new DateTime(); // Fecha actual
        $fechaRegistroStr = $fechaRegistro->format('Y-m-d'); // Formato DATE para la base de datos

        // Sumar frecuencia_riego días a la fecha actual para obtener fecha_programada
        $fechaRegistro->add(new DateInterval("P{$frecuencia_fertilizacion}D"));
        $fechaProgramada = $fechaRegistro->format('Y-m-d'); // Formato DATE para la base de datos

        // Insertar en la tabla `tareas`
        $sqlInsert = "INSERT INTO Tareas (tarea, fecha_registro, fecha_programada, id_planta)
                    VALUES (?, ?, ?, ?)";
        $stmtInsert = $conn->prepare($sqlInsert);


        $stmtInsert->bind_param("sssi", $tarea, $fechaRegistroStr, $fechaProgramada, $planta_id);

        if ($stmtInsert->execute()) {
            echo json_encode(['success' => true, 'message' => 'Tarea programada exitosamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al programar la tarea']);
        }
        $stmtInsert->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró la frecuencia de fertilizacion para la planta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Ocurrio un error']);
}



$conn->close();
?>
