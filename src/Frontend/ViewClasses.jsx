import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './View_Classes.css'

export const ViewClasses = () => {
  //we added this students const because it works with useeffect to show the data in frontend. 
  //useffect fetches the data students state holds it and updates it when appropriate. 
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost/student-attendance-managment-system/Backend/View_Class.php");
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

  const deleteClass = async (id) => {
  const formData = new FormData();
  formData.append("class_id", id); 

  try {
    const response = await fetch(
      "http://localhost/student-attendance-managment-system/Backend/Delete_Class.php",
      {
        method: "POST",
        body: formData
      }
    );
    const data = await response.json();
    alert(data.message);

  } catch (error) {
    console.error("Error deleting class:", error);
  }
};


  //You see the teachers.map. teachers is the table name in the database and you see ID this is also from the db. 
  // Basically its saying fetch all the fileds and data from teachers table.  
  //<button onClick={() => navigate(`/Assign_To_Class/${teacher.ID}`)}>  this means....
  //load the URL http://localhost:3000/Assign_To_Class/1 when we click on the button. 1 is the ID of the teacher. So we get the ID from the database and pass it to app.js and then to assigntoclass.jsx.

  return (
    <div className="view-classes-container">
      <button className='back-button' onClick={() => navigate('/AdminDashboard')}>Back</button>
      <h2 className="view-classes-header">All Classes</h2>
      <input
      type="text"
      placeholder="Search classes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
      />
      <table className="classes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Class</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
{filteredClasses.map((cls) => (
  <tr key={cls.class_id}>
    <td>{cls.class_id}</td>
    <td>{cls.class_name}</td>
    <td>{cls.teacher_username || "Not Assigned"}</td>

    <td>
      <button onClick={() => navigate(`/AssignClassToTeacher/${cls.class_id}`)}>
        Assign Class to Teacher
      </button>
      <button onClick={() => navigate(`/Update_Class/${cls.class_id}`)}> 
      Update Class
      </button>
      <button onClick={() => deleteClass(cls.class_id)}> 
      Delete Class
      </button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};
