<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$Username = $_POST['Username'] ?? '';
$Password = $_POST['Password'] ?? '';
$teacherId = $_POST['ID'] ?? '';
$SelectedClass = $_POST['class_id'] ?? '';

$hashed = password_hash($Password, PASSWORD_BCRYPT);

// 1. Update teacher info
$sql = "UPDATE teachers SET Username = ?, Password = ? WHERE ID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $Username, $hashed, $teacherId);
$stmt->execute();

// 2. Update class link
$sql2 = "UPDATE teacher_class SET class_id = ? WHERE teacher_id = ?";
$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param("ss", $SelectedClass, $teacherId);
$stmt2->execute();

echo json_encode([
    "success" => true,
    "message" => "Teacher updated successfully"
]);

$stmt->close();
$stmt2->close();
$conn->close();
?>