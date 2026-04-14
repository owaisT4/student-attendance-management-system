import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export const Signup = () => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('Username', Username);
  formData.append('Password', Password);

  try {
    const response = await fetch(
      'http://localhost/student-attendance-managment-system/Backend/Signup.php',
      { method: 'POST', body: formData }
    );

    const data = await response.json();

    if (data.success) {
      // Store username in localStorage and redirect to dashboard and also show welcome message in dashboard with the username 
      localStorage.setItem("Username", Username);
      // Redirect to dashboard
      navigate('/Dashboard');
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('An error occurred during signup');
  }
};



  return (
    <div>
      <div className='container'>
        <div className='header'>
          <h2>Signup</h2>
        </div>
        <div className='form'>
          <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={handleSubmit}>Signup</button>
          <label>Already have an account?</label>
          <a href="/Login"><button className='login'>Login</button></a>
      </div>
      </div>






    </div>
  )
}
