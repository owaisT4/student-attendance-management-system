<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "student_management_db";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    // Always return JSON if used with React fetch
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit();
}

// No echo statements, no HTML, no whitespace
?>

