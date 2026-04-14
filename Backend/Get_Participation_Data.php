<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

$teacher_id = $_SESSION['user_id'] ?? null;
$class_id = $_GET['class_id'] ?? null;
$from = $_GET['from'] ?? null;
$to = $_GET['to'] ?? null;

if (!$teacher_id || !$class_id || !$from || !$to) {
    echo json_encode([]);
    exit;
}


$sql = "
SELECT 
    s.Username AS student,
    COALESCE(AVG(a.engagement), 0) AS score
FROM attendance_engagement a
JOIN students s ON s.ID = a.student_id
WHERE a.class_id = ?
AND DATE(a.date) BETWEEN ? AND ?
GROUP BY s.ID, s.Username
";

$stmt = $conn->prepare($sql);

// ✅ FIXED bind_param (THIS fixes your fatal error)
$stmt->bind_param("iss", $class_id, $from, $to);

$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = [
        "student" => $row["student"],
        "score" => (int)$row["score"]
    ];
}

echo json_encode($data);

$stmt->close();
$conn->close();
?>