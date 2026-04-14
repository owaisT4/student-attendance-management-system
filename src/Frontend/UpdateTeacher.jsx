import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdateTeacher = () => {
    const { teacherId } = useParams();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [assignclass, setassignclass] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const navigate = useNavigate();

     const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ID", teacherId);
        formData.append("Username", Username);
        formData.append("Password", Password);
        formData.append("class_id", selectedClass);

        try {
            const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Update_Teacher.php", {
                method: 'POST',
                body: formData
            });

           if (response.ok) {
                    alert("Teacher details updated successfully!");
                    fetchClasses(); // run again
                } else {
                    alert("Failed to update teacher details.");
                }
            } catch (error) {
                console.error("Error updating teacher details:", error);
            }
        };

    const fetchClasses = async () => {
                try {
                  const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Assign_To_Class.php");
                  const data = await response.json();
                  setassignclass(data);
                } catch (error) {
                  console.error("Error fetching students:", error);
                }
              };

               useEffect(() => {
                        fetchClasses();
                      }, []);
   
  return (
    <div>
        <div className='container'>
            <button className='back-button' onClick={() => navigate('/View_Teachers')}>Back</button>
        <div className='header'>
        <h1>Update Teacher</h1>
        </div>
        <div className='login-form'>
            <input type='text' placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)}/>
            <input type='password' placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)}/>
             <div className='content'>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">Change Class </option>

        {assignclass.map((cls) => (
        <option key={cls.class_id} value={cls.class_id}>
        {cls.class_name}
         </option>
        ))}
        </select>

            </div>
            <input type="submit" value="Update" className='update-button' onClick={handleSubmit} />

        </div>
         </div>
        </div>
  )
}
