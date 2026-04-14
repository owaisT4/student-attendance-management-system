<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // your database connection

$sql = "SELECT c.class_id, c.class_name, t.Username AS teacher_username
        FROM classes c
        LEFT JOIN teacher_class tc ON c.class_id = tc.class_id
        LEFT JOIN teachers t ON tc.teacher_id = t.ID";

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
