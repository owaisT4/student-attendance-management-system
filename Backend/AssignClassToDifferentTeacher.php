<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'db.php';

$sql = "SELECT ID, Username FROM teachers";
$result = $conn->query($sql);

$teachers = [];

while ($row = $result->fetch_assoc()) {
    $teachers[] = $row;
}

echo json_encode($teachers);

$conn->close();
?>