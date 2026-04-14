<?php
session_start();
header("Content-Type: text/csv");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

// Include DB
include 'db.php';

// Check teacher login
if (!isset($_SESSION['user_id']) || $_SESSION['role'] != 'teachers') {
    http_response_code(403);
    echo "Unauthorized";
    exit;
}

$teacher_id = $_SESSION['user_id'];
$class_id = $_GET['class_id'] ?? null;
$from = $_GET['from'] ?? null;
$to = $_GET['to'] ?? null;

if (!$class_id || !$from || !$to) {
    echo "Missing parameters";
    exit;
}

// Fetch students and attendance
$sql = "
SELECT s.Username, s.ID, a.date, a.attendance, a.engagement
FROM attendance_engagement a
JOIN students s ON a.student_id = s.ID
JOIN teacher_class tc ON tc.class_id = a.class_id
WHERE tc.teacher_id = ? AND a.class_id = ? AND a.date BETWEEN ? AND ?
ORDER BY s.Username, a.date
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiss", $teacher_id, $class_id, $from, $to);
$stmt->execute();
$result = $stmt->get_result();

// CSV headers
$filename = "Attendance_Report_Class{$class_id}_".date("Ymd_His").".csv";
header("Content-Disposition: attachment; filename=\"$filename\"");
$output = fopen("php://output", "w");

// Write CSV column headers
fputcsv($output, ["Student ID", "Student Name", "Date", "Attendance", "Engagement", "Participation Score"]);

// Map engagement to points
$engagement_points = ["high" => 2, "medium" => 1, "low" => 0];

while ($row = $result->fetch_assoc()) {
    $score = $row['attendance'] === "present" ? 2 : 0; // attendance gives 2 points if present
    $score += $engagement_points[$row['engagement']] ?? 0;

    fputcsv($output, [
        $row['ID'],
        $row['Username'],
        $row['date'],
        $row['attendance'],
        $row['engagement'],
        $score
    ]);
}

fclose($output);
$conn->close();
exit;