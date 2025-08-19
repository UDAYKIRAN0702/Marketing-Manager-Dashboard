import React, { useState } from "react";
import "./EmployeeTrack.css";

function EmployeeTrack() {
  const [search, setSearch] = useState("");

  const employees = [
    { id: 101, name: "John Doe", department: "HR", email: "john@company.com" ,Active:"3",closed:"5"},
    { id: 102, name: "Jane Smith", department: "Finance", email: "jane@company.com",Active:"3",closed:"5" },
    { id: 103, name: "Robert Brown", department: "IT", email: "robert@company.com",Active:"3",closed:"5" },
    { id: 104, name: "Emily Davis", department: "Marketing", email: "emily@company.com",Active:"3",closed:"5" },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toString().includes(search)
  );

  return (
    <div className="employee-container">
      <h1 className="employee-title">Employee Tracker</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="employee-search"
      />

      {/* Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Active</th>
            <th>Close</th>
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
                <td>{emp.Active}</td>
                <td>{emp.closed}</td>        
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTrack;
