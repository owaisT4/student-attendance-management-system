<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // your database connection

$sql = "SELECT t.ID, t.Username, c.class_id, c.class_name
FROM teachers t
INNER JOIN teacher_class tc ON t.ID = tc.teacher_id
INNER JOIN classes c ON tc.class_id = c.class_id;
";
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
