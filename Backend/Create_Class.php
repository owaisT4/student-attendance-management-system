<?php 
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "POST required"]);
    exit();
}
$className = $_POST['className'] ?? '';
// Insert into DB
$sql = "INSERT INTO classes (class_name) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $className);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Class created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to create class: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
