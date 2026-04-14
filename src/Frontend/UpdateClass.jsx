import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdateClass = () => {
    const { classId } = useParams();
    const [ChangeClassName, setChangeClassName] = useState('');
    const [teachers, setTeachers] = useState([]); // list
    const navigate = useNavigate();
    const [selectedTeacher, setSelectedTeacher] = useState(""); // selected value and it remember the value

const fetchTeachers = async () => {
                try {
                  const response = await fetch("http://localhost/student-attendance-managment-system/Backend/AssignClassToDifferentTeacher.php");
                  const data = await response.json();
                  setTeachers(data);
                } catch (error) {
                  console.error("Error fetching students:", error);
                }
              };

              useEffect(() => {
  fetchTeachers();
}, []);
     
           

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        //so you see class_name, class_id, teacher_id that is from the table from database it should match the name
        //This is the fields you will append (change)
        formData.append("class_id", classId);
        formData.append("class_name", ChangeClassName);
        formData.append("teacher_id", selectedTeacher);
        
        try {
            const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Update_Class.php", {
                method: 'POST',
                body: formData
            });

           if (response.ok) {
                    alert("Class details updated successfully!"); // run again
                } else {
                    alert("Failed to update class details.");
                }
            } catch (error) {
                console.error("Error updating class details:", error);
            }
        };

  return (
    <div>
          <div className='container'>
            <button className='back-button' onClick={() => navigate('/View_Classes')}>Back</button>
        <div className='header'>
            <h1>Update Class {classId}</h1>
        </div>
        <div className='login-form'>
            <input type="text" placeholder="Change Class Name" value={ChangeClassName} onChange={(e) => setChangeClassName(e.target.value)} />
            <div className='content'>
                <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
        <option value="">Assign Class to different Teacher </option>

        {teachers.map((teacher) => (
        <option key={teacher.ID} value={teacher.ID}>
        {teacher.Username}
         </option>
        ))}
        </select>
            </div>
        </div>
        <input type="submit" value="Update" className='update-button' onClick={handleSubmit} />
    </div>
    </div>
  )
}
