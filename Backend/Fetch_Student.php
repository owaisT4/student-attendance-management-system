<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include 'db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'teacher') {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$class_id = $_GET['class_id'] ?? 0;

// Verify teacher owns this class
$stmtCheck = $conn->prepare("SELECT * FROM teacher_class WHERE teacher_id = ? AND class_id = ?");
$stmtCheck->bind_param("ii", $_SESSION['user_id'], $class_id);
$stmtCheck->execute();
if ($stmtCheck->get_result()->num_rows === 0) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

// Fetch students
$stmt = $conn->prepare("SELECT ID, Username, DOB FROM students WHERE class_id = ?");
$stmt->bind_param("i", $class_id);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);