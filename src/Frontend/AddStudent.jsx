import React from 'react'
import './Add_Student.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddStudent = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [DOB, setDOB] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Username", Username);
    formData.append("Password", Password);
    formData.append("DOB", DOB);

    try{
        const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Add_Student.php", {
          method: "POST",
          body: formData,
        })

        const data = await response.json();

        
    if (data.success) {
        alert("Student added successfully");
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
          <h2>Add Student</h2>
        </div>
        <div className='Student-form'>
          <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
          <input type ="date" placeholder='DOB' value={DOB} onChange={(e) => setDOB(e.target.value)} />
          <button onClick={handleSubmit}>Add Student</button>
      </div>
      </div>
    </div>
        
        </div>
  )
}
