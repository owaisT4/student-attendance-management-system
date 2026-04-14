import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [classesCount, setClassesCount] = useState(0);
  const [username, setUsername] = useState('');
  const [attendanceReports, setAttendanceReports] = useState([]);

  // Get logged-in username
  useEffect(() => {
    const user = localStorage.getItem("Username");
    if (user) setUsername(user);
  }, []);

  const navigate = useNavigate();

useEffect(() => {
  const user = localStorage.getItem("Username");

  if (!user) {
    navigate("/Login");
  }
}, [navigate]);

  useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await fetch(
        "http://localhost/student-attendance-managment-system/Backend/Get_All_Attendance_Reports.php"
      );

      const data = await response.json();
      setAttendanceReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  fetchReports();
}, []);

  // Fetch dashboard counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("http://localhost/student-attendance-managment-system/Backend/GetDashboardCounts.php");
        const data = await response.json();
        setStudentsCount(data.totalStudents);
        setTeachersCount(data.totalTeachers);
        setClassesCount(data.totalClasses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-panel">
        <h2>Admin Panel</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li><a href="/Add_Student">Add Student</a></li>
          <li><a href="/View_Students">View Students</a></li>
          <li><a href="/AddTeacher">Add Teacher</a></li>
          <li><a href="/View_Teachers">View Teachers</a></li>
          <li><a href="/View_Classes">View Classes</a></li>
          <li><a href="/Create_Class">Create Class</a></li>
          <li style={{ cursor: "pointer", color: "red" }} onClick={() => {localStorage.clear(); sessionStorage.clear(); navigate("/Login", { replace: true }); }}>Logout</li>
        </ul>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-main">
        <h1>Welcome, {username}</h1>
        <p>Here’s a quick overview of your school system</p>

        <div className="dashboard-cards">
          <div className="card students-card">
            <h3>Total Students</h3>
            <p>{studentsCount}</p>
          </div>

          <div className="card teachers-card">
            <h3>Total Teachers</h3>
            <p>{teachersCount}</p>
          </div>

          <div className="card classes-card">
            <h3>Total Classes</h3>
            <p>{classesCount}</p>
          </div>
        </div>
      </div>
<div className="attendance-section">
  <h2>All Attendance Reports</h2>

  <div className="table-wrapper">
    <table className="attendance-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Class</th>
          <th>Date</th>
          <th>Attendance</th>
          <th>Engagement</th>
        </tr>
      </thead>

      <tbody>
        {attendanceReports.length > 0 ? (
          attendanceReports.map((r, i) => (
            <tr key={i}>
              <td>{r.student_name}</td>
              <td>{r.class_name}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>

              <td>
                <span className={r.attendance === "present" ? "present" : "absent"}>
                  {r.attendance}
                </span>
              </td>

              <td>{r.engagement || "N/A"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No attendance records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};