<?php
session_start();

// ✅ Headers must come before any output
header("Access-Control-Allow-Origin: http://localhost:3000"); // React dev server
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

// Check if teacher is logged in
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'teachers') {
    http_response_code(403);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$teacher_id = $_SESSION['user_id'];

// Fetch teacher's classes with total students
$sql = "
    SELECT c.class_id, c.class_name, COUNT(s.ID) AS total_students
    FROM teacher_class tc
    JOIN classes c ON tc.class_id = c.class_id
    LEFT JOIN students s ON s.class_id = c.class_id
    WHERE tc.teacher_id = ?
    GROUP BY c.class_id
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => $conn->error]);
    exit;
}

$stmt->bind_param("i", $teacher_id);
$stmt->execute();
$result = $stmt->get_result();

$classes = [];
while ($row = $result->fetch_assoc()) {
    $classes[] = $row;
}

// ✅ Return classes as JSON
echo json_encode($classes);

// Close DB connections
$stmt->close();
$conn->close();