<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Check teacher login
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'teachers') {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

// Get JSON body
$data = json_decode(file_get_contents("php://input"), true);
$class_id = $data['class_id'] ?? null;
$date = $data['date'] ?? null;
$attendance_list = $data['attendance'] ?? [];

if (!$class_id || !$date || !is_array($attendance_list)) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

try {
    $stmt = $conn->prepare("
    INSERT INTO attendance_engagement (student_id, class_id, date, attendance, engagement)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
        attendance = VALUES(attendance), 
        engagement = VALUES(engagement)
");

foreach ($attendance_list as $s) {

    $student_id = (int)$s['student_id'];
    $class_id = (int)$class_id;
    $attendance = $s['status'];
    $engagement = isset($s['engagement']) ? (int)$s['engagement'] : 1;

if ($engagement < 1 || $engagement > 5) {
    $engagement = 1;
}

    $stmt->bind_param(
        "iissi",
        $student_id,
        $class_id,
        $date,
        $attendance,
        $engagement
    );

    $stmt->execute();
}


    $stmt->close();
    $conn->close();

    echo json_encode(["success" => true, "message" => "Attendance saved successfully"]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}