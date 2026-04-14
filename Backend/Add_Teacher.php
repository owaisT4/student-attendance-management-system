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
$class_id = $_POST['class_id'] ?? null; // get the selected class

// Hash password
$hashed = password_hash($Password, PASSWORD_BCRYPT);

// 1️⃣ Insert teacher
$stmt = $conn->prepare("INSERT INTO teachers (Username, Password) VALUES (?, ?)");
$stmt->bind_param("ss", $Username, $hashed);

if ($stmt->execute()) {
    $teacher_id = $stmt->insert_id; // get the newly created teacher's ID

    // 2️⃣ Assign teacher to class if selected
    if ($class_id) {
        $stmt2 = $conn->prepare("INSERT INTO teacher_class (teacher_id, class_id) VALUES (?, ?)");
        $stmt2->bind_param("ii", $teacher_id, $class_id);
        $stmt2->execute();
        $stmt2->close();
    }

    echo json_encode([
        "success" => true,
        "message" => "Teacher added and assigned successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error adding teacher: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>