import React, { useState } from 'react';
import './Employee Register.css';

function EmployeeRegister() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee data:', employee);
    alert(`Employee Registered:\nName: ${employee.name}\nEmail: ${employee.email}\nRole: ${employee.role}\nPhone: ${employee.phone}`);
    setEmployee({ name: '', email: '', role: '', phone: '' });
  };

  return (
    <div className="employee-register">
      <h1>Employee Register</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        <label>
          Name:
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        </label>

        <label>
          Role:
          <input type="text" name="role" value={employee.role} onChange={handleChange} required />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={employee.phone} onChange={handleChange} required />
        </label>

        <button type="submit">Register Employee</button>
      </form>
    </div>
  );
}

export default EmployeeRegister;
