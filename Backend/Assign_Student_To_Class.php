<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "POST required"]);
    exit();
}

$student_id = $_POST['student_id'] ?? null;
$class_id = $_POST['class_id'] ?? null;


$stmt = $conn->prepare("UPDATE students SET class_id = ? WHERE ID = ?");
$stmt->bind_param("ii", $class_id, $student_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Student assigned successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to assign student"]);
}

$stmt->close();
$conn->close();
?>
