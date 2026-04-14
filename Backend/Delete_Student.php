<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$StudentId = $_POST['ID'] ?? '';

$sql = "DELETE FROM students WHERE ID = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $StudentId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Student deleted successfully"]);
} else {
    echo json_encode(["message" => "Failed to delete student"]);
}

$stmt->close();
$conn->close();
?>