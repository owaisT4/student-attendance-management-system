<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // your database connection

$sql = "SELECT class_id, class_name FROM classes";
$result = $conn->query($sql);

$classes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $classes[] = $row;
    }
}

echo json_encode($classes);

$conn->close();
?>