import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeTrack.css";

function EmployeeTrack() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      // Using JSONPlaceholder as a mock API
      const response = await axios.get("http://127.0.0.1:8000/api/employees/");
      
      // Transform API data to match our structure
      const employeeData = response.data.map(user => ({
        id: user.employee_id,
        name: user.name,  
        department: user.role|| "General",
        email: user.email,
        Active: Math.floor(Math.random() * 10), // Random data for demo
        closed: Math.floor(Math.random() * 10)  // Random data for demo
      }));
      
      setEmployees(employeeData);
    } catch (err) {
      setError("Failed to fetch employee data. Please try again later.");
      console.error("API Error:", err);
      
      // Fallback to sample data if API fails
      setEmployees([
        { id: 101, name: "John Doe", department: "HR", email: "john@company.com", Active: "3", closed: "5" },
        { id: 102, name: "Jane Smith", department: "Finance", email: "jane@company.com", Active: "3", closed: "5" },
        { id: 103, name: "Robert Brown", department: "IT", email: "robert@company.com", Active: "3", closed: "5" },
        { id: 104, name: "Emily Davis", department: "Marketing", email: "emily@company.com", Active: "3", closed: "5" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toString().includes(search)
  );

  return (
    <div className="employee-container">
      <h1 className="employee-title">Employee Tracker</h1>
      
      <div className="employee-header">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="employee-search"
        />
        
        <button onClick={fetchEmployees} className="refresh-btn">
          <i className="fas fa-sync-alt"></i> Refresh Data
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i> Loading employee data...
        </div>
      ) : error ? (
        <div className="error">
          <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Active Tasks</th>
              <th>Closed Tasks</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>
                  <td>
                    <span className="status-badge status-active">
                      {emp.Active}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge status-closed">
                      {emp.closed}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeTrack;