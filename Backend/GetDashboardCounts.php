<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'db.php';

$data = [];

// 1. Total Students
$result = $conn->query("SELECT COUNT(*) AS total FROM students");
$row = $result->fetch_assoc();
$data['totalStudents'] = $row['total'];

// 2. Total Teachers
$result = $conn->query("SELECT COUNT(*) AS total FROM teachers");
$row = $result->fetch_assoc();
$data['totalTeachers'] = $row['total'];

// 3. Total Classes
$result = $conn->query("SELECT COUNT(*) AS total FROM classes");
$row = $result->fetch_assoc();
$data['totalClasses'] = $row['total'];

echo json_encode($data);
$conn->close();
?>