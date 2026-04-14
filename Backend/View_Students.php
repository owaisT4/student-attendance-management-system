<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // your database connection

$sql = "SELECT s.ID, s.Username, s.DOB, s.class_id, c.class_name 
        FROM students s
        LEFT JOIN classes c ON s.class_id = c.class_id";
$result = $conn->query($sql);

$students = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

echo json_encode($students);

$conn->close();
?>
