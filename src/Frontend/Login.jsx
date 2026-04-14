import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css'

export const Login = () => {

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Role, setRole] = useState('');
 

   const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("Username", Username);
  formData.append("Password", Password);
  formData.append("Role", Role); // IMPORTANT

  try {
    const response = await fetch(
      "http://localhost/student-attendance-managment-system/Backend/Login.php",
      {
        method: "POST",
        body: formData,
        credentials: "include", // Important for session cookies
      }
    );

    const data = await response.json();

    if (data.success === true) {
      localStorage.setItem("Username", Username);
      localStorage.setItem("Role", Role);
      localStorage.setItem("teacher_id", 5);

      if (Role === "Admin") {
        navigate("/AdminDashboard");
      } else if (Role === "Teachers") {
        navigate("/TeachersDashboard");
      }
    } else {
      alert(data.message);
    }

  } catch (error) {
    alert("An error occurred during login");
  }
};




  return (
    <div>
      <div className='login-container'>
        <div className='login-header'>
          <h2>Login</h2>
        </div>
        <div className='login-form'>
          <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
          <select value={Role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Teachers">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
          <button onClick={handleSubmit}>Login</button>
      </div>
      </div>






    </div>
  )
}

export default Login