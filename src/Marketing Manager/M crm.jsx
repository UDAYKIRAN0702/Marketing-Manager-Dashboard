import React, { useState, useEffect } from "react";
import axios from "axios";
import "./M crm.css";

const EmployeeCRM = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newClient, setNewClient] = useState({
    name: "",
    client: "",
    projectValue: "",
    software: "Billing",
    status: "Open",
    startDate: "",
  });

  // API base URL
  const API_URL = "http://127.0.0.1:8000/api/crm/";

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch employees: " + (err.response?.data?.message || err.message));
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new employee
  const addEmployee = async (employeeData) => {
    try {
      const response = await axios.post(API_URL, employeeData);
      return response.data;
    } catch (err) {
      setError("Failed to add employee: " + (err.response?.data?.message || err.message));
      console.error("Error adding employee:", err);
      throw err;
    }
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = async () => {
    try {
      const addedEmployee = await addEmployee(newClient);
      setEmployees([...employees, addedEmployee]);
      setNewClient({
        name: "",
        client: "",
        projectValue: "",
        software: "Billing",
        status: "Open",
        startDate: "",
      });
      setShowForm(false);
    } catch (err) {
      // Error is already handled in addEmployee function
    }
  };

const query = (searchQuery || '').toLowerCase();
const filteredEmployees = employees.filter((emp) =>
  (emp.name?.toLowerCase() || '').includes(query) ||
  (emp.client?.toLowerCase() || '').includes(query) ||
  (emp.software?.toLowerCase() || '').includes(query)
);


  return (
    <div className="crm-container">
      <h1 className="crm-title">CRM</h1>

      {/* Error message */}
      {error && <div className="crm-error">{error}</div>}

      {/* Search + Add Button */}
      <div className="crm-actions">
        <input
          type="text"
          placeholder="Search by name, client, software..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="crm-add-btn" onClick={() => setShowForm(true)}>
          + Add Client
        </button>
      </div>

      {/* Loading state */}
      {loading && <div className="crm-loading">Loading employees...</div>}

      {/* Add Client Popup Form */}
      {showForm && (
        <div className="crm-modal">
          <div className="crm-modal-content">
            <h2>Add Client</h2>

            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Employee Name"
              value={newClient.name}
              onChange={handleChange}
            />

            <label>Client Name</label>
            <input
              type="text"
              name="client"
              placeholder="Enter Client Name"
              value={newClient.client}
              onChange={handleChange}
            />

            <label>Project Value</label>
            <input
              type="text"
              name="projectValue"
              placeholder="Enter Project Value"
              value={newClient.projectValue}
              onChange={handleChange}
            />

            <label>Software</label>
            <select
              name="software"
              value={newClient.software}
              onChange={handleChange}
            >
              <option>Billing</option>
              <option>CRM</option>
              <option>HMS</option>
              <option>CRN</option>
              <option>Other</option>
            </select>

            <label>Status</label>
            <select
              name="status"
              value={newClient.status}
              onChange={handleChange}
            >
              <option>Open</option>
              <option>Follow-up</option>
              <option>Long</option>
              <option>Close</option>
            </select>

            <label>Start Date & Time:</label>
            <input
              type="datetime-local"
              name="startDate"
              value={newClient.startDate}
              onChange={handleChange}
            />

            <div className="crm-modal-actions">
              <button onClick={handleAddClient}>Save</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Table */}
      {!loading && (
        <table className="crm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Client</th>
              <th>Project Value</th>
              <th>Software</th>
              <th>Status</th>
              <th>Start Date & Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.client_name}</td>
                <td>{emp.project_value}</td>
                <td>{emp.software}</td>
                <td>{emp.status}</td>
                <td>{emp.start_date_time}</td>
                <td>
                  <button
                    onClick={() => setShowDetails(emp)}
                    className="color"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No results message */}
      {!loading && filteredEmployees.length === 0 && (
        <div className="crm-no-results">No employees found.</div>
      )}

      {/* Details Popup in Table Format */}
      {showDetails && (
        <div className="crm-modal">
          <div className="crm-modal-content">
            <h2>Employee Details</h2>
            <table className="crm-details-table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{showDetails.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{showDetails.name}</td>
                </tr>
                <tr>
                  <th>Client</th>
                  <td>{showDetails.client}</td>
                </tr>
                <tr>
                  <th>Project Value</th>
                  <td>{showDetails.projectValue}</td>
                </tr>
                <tr>
                  <th>Software</th>
                  <td>{showDetails.software}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{showDetails.status}</td>
                </tr>
                <tr>
                  <th>Start Date & Time</th>
                  <td>{showDetails.startDate}</td>
                </tr>
              </tbody>
            </table>

            <div className="crm-modal-actions">
              <button onClick={() => setShowDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCRM; 