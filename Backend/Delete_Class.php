<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$cls = $_POST['class_id'] ?? '';

$sql = "DELETE FROM classes WHERE class_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $cls);

if ($stmt->execute()) {
    echo json_encode(["message" => "Class deleted successfully"]);
} else {
    echo json_encode(["message" => "Failed to delete class"]);
}

$stmt->close();
$conn->close();
?>