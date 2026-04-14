<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "POST required"]);
    exit();
}

$class_id = $_POST["class_id"] ?? null;
$teacher_id = $_POST["teacher_id"] ?? null;

if (!$class_id || !$teacher_id) {
    echo json_encode(["success" => false, "message" => "Missing class_id or teacher_id"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO teacher_class (teacher_id, class_id) VALUES (?, ?)");
$stmt->bind_param("ii", $teacher_id, $class_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Teacher assigned successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
