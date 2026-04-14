import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './TeachersDashboard.css'

export const TeachersDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  // Fetch logged-in teacher's classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          "http://localhost/student-attendance-managment-system/Backend/Get_Teacher_Classes.php",
          { credentials: "include" } //send session cookie
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const filteredClasses = classes.filter((cls) =>
    cls.class_name.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch students for a selected class
  const viewStudents = async (class_id, class_name) => {
    try {
      const response = await fetch(
        `http://localhost/student-attendance-managment-system/Backend/Fetch_Student.php?class_id=${class_id}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setStudents(data);
      setSelectedClass(class_name);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="view-teachersdashboard-container">
       <button className="logout-button" onClick={() => navigate('/Login')}>
        Logout
      </button>

      <h2 className="view-teachersdashboard-header">My Classes</h2>

      <input
        type="text"
        placeholder="Search classes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <table className="teachersdashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Class</th>
            <th>Total Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((cls) => (
            <tr key={cls.class_id}>
              <td>{cls.class_id}</td>
              <td>{cls.class_name}</td>
              <td>{cls.total_students}</td>
              <td>
                <button onClick={() => navigate(`/TeacherViewStudents/${cls.class_id}/${cls.class_name}`)}>
                  View Students
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedClass && students.length > 0 && (
        <div>
          <h3 className="view-teachersdashboard-header">Students in {selectedClass}</h3>
          <table className="teachersdashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DOB</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.ID}>
                  <td>{s.ID}</td>
                  <td>{s.Username}</td>
                  <td>{s.DOB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};