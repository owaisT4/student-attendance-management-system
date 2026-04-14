<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'db.php';

$sql = "
SELECT 
    s.Username AS student_name,
    c.class_name,
    a.date,
    a.attendance,
    a.engagement
FROM attendance_engagement a
JOIN students s ON s.ID = a.student_id
JOIN classes c ON c.class_id = a.class_id
ORDER BY a.date DESC
";

$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>