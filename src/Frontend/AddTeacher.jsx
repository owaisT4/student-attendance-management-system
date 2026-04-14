import React from 'react'
import './Add_Student.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const AddTeacher = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [assignclass, setassignclass] = useState([]);
   const [selectedClass, setSelectedClass] = useState("");
   const navigate = useNavigate();

    useEffect(() => {
          const fetchClasses = async () => {
            try {
              const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Assign_To_Class.php");
              const data = await response.json();
              setassignclass(data);
            } catch (error) {
              console.error("Error fetching students:", error);
            }
          };
      
          fetchClasses();
        }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Username", Username);
    formData.append("Password", Password);
    formData.append("class_id", selectedClass);


    try{
        const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Add_Teacher.php", {
          method: "POST",
          body: formData,
        })

        const data = await response.json();

        
    if (data.success) {
        alert("Teacher added successfully");
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('An error occurred during signup');
  }
};
  return (
    <div>
         <div>
      <div className='add-student-container'>
        <button className='back-button' onClick={() => navigate('/AdminDashboard')}>Back</button>
        <div className='add-student-header'>
          <h2>Add Teacher</h2>
        </div>
        <div className='Student-form'>
          <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
           <div className='content'>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">Assign To Class </option>

        {assignclass.map((cls) => (
        <option key={cls.class_id} value={cls.class_id}>
        {cls.class_name}
         </option>
        ))}
        </select>

            </div>
        
          <button onClick={handleSubmit}>Add Teacher</button>
      </div>
      </div>






    </div>
        
        </div>
  )
}
