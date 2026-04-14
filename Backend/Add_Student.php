<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "POST required"
    ]);
    exit();
}

$Username = $_POST['Username'];
$Password = $_POST['Password'];
$DOB = $_POST['DOB'];

// Hash password
$hashed = password_hash($Password, PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO students (Username, Password, DOB) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $Username, $hashed, $DOB);
if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Student added successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error adding student: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>