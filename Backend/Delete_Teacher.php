<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$teacherId = $_POST['ID'] ?? '';

$sql = "DELETE FROM teachers WHERE ID = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $teacherId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Teacher deleted successfully"]);
} else {
    echo json_encode(["message" => "Failed to delete teacher"]);
}

$stmt->close();
$conn->close();
?>