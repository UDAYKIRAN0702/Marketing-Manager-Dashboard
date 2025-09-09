import React, { useState } from 'react';
import axios from 'axios';
import './Employee Register.css';

function EmployeeRegister() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      // API endpoint - replace with your actual API URL
      const response = await axios.post('http://127.0.0.1:8000/api/employees/', employee);
      
      setMessage({ 
        text: `Employee ${response.data.name} registered successfully!`, 
        type: 'success' 
      });
      
      // Reset form
      setEmployee({ name: '', email: '', role: '', phone: '' });
      
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Failed to register employee. Please try again.';
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-register">
      <div className="header">
        <h1>Employee Register</h1>
        <p>Add new employees to your organization</p>
      </div>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={employee.role}
            onChange={handleChange}
            required
          >
            <option value="">Select a role</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
            <option value="Analyst">Analyst</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Registering...
            </>
          ) : (
            'Register Employee'
          )}
        </button>
      </form>
    </div>
  );
}

export default EmployeeRegister;