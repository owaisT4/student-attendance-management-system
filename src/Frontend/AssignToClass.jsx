import React from 'react'
import './Assign_To_Class.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//This file does 2 different jobs. It fetches classes from the table and database (usefffect) and also assigns the student to the class.

export const AssignToClass = () => {
    //we use useparams because we get the ID that we used in app.js on file route.
    //for example we click on OwaisS the URL would be http://localhost:3000/Assign_To_Class/1. So we get the 1 using useparams as that gets it from app.js.
    // params are also a portion of the URL 
    const { studentId } = useParams();
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
            formData.append("class_id", selectedClass);
            formData.append("student_id", studentId); 

            try {
                const response = await fetch("http://localhost/student-attendance-managment-system/Backend/Assign_Student_To_Class.php", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    alert("Student assigned to class successfully!");
                } else {
                    alert("Failed to assign student to class.");
                }
            } catch (error) {
                console.error("Error assigning student to class:", error);
            }
        };



  return (
    <div>
        <div className='container'>
            <button className='back-button' onClick={() => navigate('/View_Students')}>Back</button>
            <div className='header'>
                <h1>Assign Student to Class</h1>
            </div>
            <div className='content'>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">Select Class </option>

        {assignclass.map((cls) => (
        <option key={cls.class_id} value={cls.class_id}>
        {cls.class_name}
         </option>
        ))}
        </select>

            </div>
            <input type="submit" onClick={handleSubmit} value="Assign" className='assign-button' />
        </div>
    </div>
  )
}

