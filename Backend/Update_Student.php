<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$Username = $_POST['Username'] ?? '';
$Password = $_POST['Password'] ?? '';
$StudentId = $_POST['ID'] ?? '';
$DOB = $_POST['DOB'] ?? '';
$SelectedClass = $_POST['class_id'] ?? '';

$hashed = password_hash($Password, PASSWORD_BCRYPT);

$sql = "UPDATE students SET Username = ?, Password = ?, DOB = ?, class_id = ? WHERE ID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $Username, $hashed, $DOB, $SelectedClass, $StudentId);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Student updated successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error updating student: " . $stmt->error
    ]);
}


$stmt->close();
$conn->close();




?>