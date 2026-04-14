import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './View_Teachers.css'

export const ViewTeachers = () => {
  //we added this students const because it works with useeffect to show the data in frontend. 
  //useffect fetches the data students state holds it and updates it when appropriate. 
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost/student-attendance-managment-system/Backend/View_Teachers.php");
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

   const filteredTeachers = teachers.filter((teacher) =>
  teacher.Username.toLowerCase().includes(search.toLowerCase())
);

const deleteTeacher = async (id) => {
  const formData = new FormData();
  formData.append("ID", id);

  try {
    const response = await fetch(
      "http://localhost/student-attendance-managment-system/Backend/Delete_Teacher.php",
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


  //You see the teachers.map. teachers is the table name in the database and you see ID this is also from the db. 
  // Basically its saying fetch all the fileds and data from teachers table.  
  //<button onClick={() => navigate(`/Assign_To_Class/${teacher.ID}`)}>  this means....
  //load the URL http://localhost:3000/Assign_To_Class/1 when we click on the button. 1 is the ID of the teacher. So we get the ID from the database and pass it to app.js and then to assigntoclass.jsx.

  return (
    <div className="view-teachers-container">
      <button className='back-button' onClick={() => navigate('/AdminDashboard')}>Back</button>
      <h2 className="view-teachers-header">All Teachers</h2>
      <input
      type="text"
      placeholder="Search teachers..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
      />
      <table className="teachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Current Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredTeachers.map((teacher) => (
            <tr key={teacher.ID}>
              <td>{teacher.ID}</td>
              <td>{teacher.Username}</td>
                <td>{teacher.class_name || "Not Assigned"}</td>
                
              <td> 
                <button onClick={() => navigate(`/Update_Teacher/${teacher.ID}`)}> 
                  Update Teacher
                </button>
                <button onClick={() => deleteTeacher(teacher.ID)}> 
                  Delete Teacher
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
