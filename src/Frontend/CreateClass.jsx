import React from 'react'
import './CreateClass.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateClass = () => {
    const [className, setClassName] = useState('');
    const navigate = useNavigate();

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('className', className);

  try {
    const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Create_Class.php", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert('Class created successfully!');
      setClassName('');
    } else {
      alert('Failed to create class.');
    }

  } catch (error) {
    console.error("Error creating class:", error);
  }
};

    
  return (
    <div>
        <div className='container'>
            <button className='back-button' onClick={() => navigate('/AdminDashboard')}>Back</button>
            <div className='header'>
                <h2>Create Class</h2>
            </div>
            <input type="text" placeholder='Class Name' className='input-field' value={className} onChange={(e) => setClassName(e.target.value)} />
            <button className='btn' onClick={handleSubmit}>Create</button>



        </div>
      
        </div>
  )
}
