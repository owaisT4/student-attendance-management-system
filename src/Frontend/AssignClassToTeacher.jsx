import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AssignClassToTeacher = () => {
    const { classId } = useParams();
    const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
     // Fetch teachers list
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "http://localhost/student-attendance-managment-system/Backend/View_Teachers.php"
        );

        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleAssign = async () => {
    const formData = new FormData();
    formData.append("class_id", classId);
    formData.append("teacher_id", selectedTeacher);

    try {
      const response = await fetch(
        "http://localhost/student-attendance-managment-system/Backend/Assign_Class_To_Teacher.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Teacher assigned successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error assigning teacher:", error);
    }
  };
  return (
    <div>
        <div className='container'>
            <button className='back-button' onClick={() => navigate('/View_Classes')}>Back</button>
            <div className='header'>
                <h2>Assign Class to Teacher</h2>
            </div>
            <div className='form'>
                <label htmlFor="teacher">Select Teacher:</label>
               <select
        value={selectedTeacher}
        onChange={(e) => setSelectedTeacher(e.target.value)}
      >
        <option value="">Select Teacher</option>

        {teachers.map((teacher) => (
          <option key={teacher.ID} value={teacher.ID}>
            {teacher.Username}
          </option>
        ))}
      </select>
       <button onClick={handleAssign}>Assign Teacher</button>
                </div>

        </div>

    </div>
  )
}
