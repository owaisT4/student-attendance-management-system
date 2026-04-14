<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

// Check if teacher is logged in
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'teachers') {
    echo json_encode([]);
    exit;
}

$teacher_id = $_SESSION['user_id'];
$class_id = $_GET['class_id'] ?? null;

if (!$class_id) {
    echo json_encode([]);
    exit;
}



// SQL: Only fetch students in classes assigned to this teacher
$sql = "
    SELECT s.ID, s.Username, s.DOB, s.class_id
    FROM students s
    JOIN teacher_class tc ON tc.class_id = s.class_id
    WHERE tc.teacher_id = ? AND s.class_id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $teacher_id, $class_id);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);

$stmt->close();
$conn->close();
?>