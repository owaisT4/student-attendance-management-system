<?php
session_start();

// Set session cookie correctly for localhost
setcookie(session_name(), session_id(), 0, "/", "localhost", false, true);

header("Access-Control-Allow-Origin: http://localhost:3000"); // React dev server
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "POST required"]);
    exit();
}

$Username = $_POST['Username'] ?? '';
$Password = $_POST['Password'] ?? '';
$Role = $_POST['Role'] ?? '';

if ($Role === "Admin") {
    $stmt = $conn->prepare("SELECT * FROM users WHERE Username = ?");
} else if ($Role === "Teachers") {
    $stmt = $conn->prepare("SELECT * FROM teachers WHERE Username = ?");
} else {
    echo json_encode(["success" => false, "message" => "Invalid role"]);
    exit();
}

$stmt->bind_param("s", $Username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($Password, $user['Password']) || $Password === $user['Password']){
        // ✅ Save user info in session
        $_SESSION['user_id'] = $user['ID'];      // or whatever column holds the teacher ID
        $_SESSION['username'] = $user['Username'];
        $_SESSION['role'] = strtolower($Role);  // "teacher" or "admin"

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "role" => $Role,
            "username" => $user['Username']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();