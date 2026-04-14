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

$Username = $_POST['Username'] ?? '';
$Password = $_POST['Password'] ?? '';

// Validation
if (empty($Username) || empty($Password)) {
    echo json_encode(["success" => false, "message" => "Please fill in all fields"]);
    exit();
}

// Hash password
$hashed = password_hash($Password, PASSWORD_BCRYPT);

// Insert into DB
$sql = "INSERT INTO users (Username, Password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $Username, $hashed);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Signup failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
