<?php

function assertTest($condition, $message) {
    if ($condition) {
        echo "PASS: $message\n";
    } else {
        echo "FAIL: $message\n";
    }
}

//DB 
class student_management_db {
    public $students = [];
    public $classes = [];
    public $teachers = [];
    public $teacher_class = [];
    public $lastId = 0;

    public function nextId() {
        return ++$this->lastId;
    }
}

$db = new student_management_db();


// ---------------- FUNCTIONS ----------------

// Create Student
function createStudent($db, $username, $dob) {
    $id = $db->nextId();
    $db->students[] = [
        "ID" => $id,
        "Username" => $username,
        "DOB" => $dob,
        "class_id" => null
    ];
    return $id;
}

// Create Class
function createClass($db, $name) {
    $id = $db->nextId();
    $db->classes[] = [
        "class_id" => $id,
        "class_name" => $name
    ];
    return $id;
}

// Create Teacher
function createTeacher($db, $username) {
    $id = $db->nextId();
    $db->teachers[] = [
        "ID" => $id,
        "Username" => $username
    ];
    return $id;
}

// Assign student to class
function assignStudentToClass($db, $studentId, $classId) {
    foreach ($db->students as &$student) {
        if ($student["ID"] == $studentId) {
            $student["class_id"] = $classId;
            return true;
        }
    }
    return false;
}

// Assign teacher to class
function assignTeacherToClass($db, $teacherId, $classId) {
    $db->teacher_class[] = [
        "teacher_id" => $teacherId,
        "class_id" => $classId
    ];
    return true;
}

// Get students in class
function getStudentsInClass($db, $classId) {
    return array_filter($db->students, function($s) use ($classId) {
        return $s["class_id"] == $classId;
    });
}

// ---------------- TESTS ----------------

// 1. Create Student
$studentId = createStudent($db, "OwaisS", "2000-01-01");
assertTest(is_int($studentId), "Student created");

// 2. Create Class
$classId = createClass($db, "Maths");
assertTest(is_int($classId), "Class created");

// 3. Assign Student to Class
$assigned = assignStudentToClass($db, $studentId, $classId);
assertTest($assigned === true, "Student assigned to class");

// 4. Create Teacher
$teacherId = createTeacher($db, "MrSmith");
assertTest(is_int($teacherId), "Teacher created");

// 5. Assign Teacher to Class
$teacherAssigned = assignTeacherToClass($db, $teacherId, $classId);
assertTest($teacherAssigned === true, "Teacher assigned to class");

// 6. Check student is in class
$studentsInClass = getStudentsInClass($db, $classId);
assertTest(count($studentsInClass) === 1, "Student appears in class");

// 7. Check correct student
$student = array_values($studentsInClass)[0];
assertTest($student["Username"] === "OwaisS", "Correct student in class");

echo "\nAll tests completed.\n";