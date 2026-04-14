<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'db.php';

$classId = $_POST['class_id'];
$className = $_POST['class_name'];
$teacherId = $_POST['teacher_id'];

// 1. Update class name
$sql1 = "UPDATE classes SET class_name = ? WHERE class_id = ?";
$stmt1 = $conn->prepare($sql1);
$stmt1->bind_param("ss", $className, $classId);
$stmt1->execute();

// Append new teacher to class thats what the 1st line means
$sql2 = "UPDATE teacher_class SET teacher_id = ? WHERE class_id = ?";
$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param("ss", $teacherId, $classId);
$stmt2->execute();

echo json_encode([
    "success" => true,
    "message" => "Class and teacher updated successfully!"
]);

$conn->close();
?>