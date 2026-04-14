import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './View_Students.css'

export const ViewStudents = () => {
  //we added this students const because it works with useeffect to show the data in frontend. 
  //useffect fetches the data students state holds it and updates it when appropriate. 
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost/student-attendance-managment-system/Backend/View_Students.php");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
  student.Username.toLowerCase().includes(search.toLowerCase())
);

  const deleteStudent = async (id) => {
  const formData = new FormData();
  formData.append("ID", id);

  try {
    const response = await fetch(
      "http://localhost/student-attendance-managment-system/Backend/Delete_Student.php",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();
    alert(data.message);

  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

  //You see the students.map. students is the table name in the database and you see ID this is also from the db. 
  // Basically its saying fetch all the fileds and data from students table.  
  //<button onClick={() => navigate(`/Assign_To_Class/${student.ID}`)}>  this means....
  //load the URL http://localhost:3000/Assign_To_Class/1 when we click on the button. 1 is the ID of the student. So we get the ID from the database and pass it to app.js and then to assigntoclass.jsx.

  return (
    <div className="view-student-container">
      <button className='back-button' onClick={() => navigate('/AdminDashboard')}>Back</button>
      <h2 className="view-student-header">All Students</h2>
      <input
      type="text"
      placeholder="Search students..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
      />
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Current Class</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          
          {filteredStudents.map((student) => (
            <tr key={student.ID}>
              <td>{student.ID}</td>
              <td>{student.Username}</td>
              <td>{student.DOB}</td>
              <td>{student.class_name || "Not Assigned"}</td>
              <td> 
                <button onClick={() => navigate(`/Assign_To_Class/${student.ID}`)}> 
                  Assign to Class
                </button>
                <button onClick={() => navigate(`/Update_Student/${student.ID}`)}> 
                  Update Student
                </button>
                <button onClick={() => deleteStudent(student.ID)}> 
                  Delete Student
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
