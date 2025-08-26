import React, { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaSearch } from "react-icons/fa";
import "./E Individual CRM.css";

const employeeData = {
  Johnu: [
    { month: "Jan", Completed: 12, Pending: 5 },
    { month: "Feb", Completed: 18, Pending: 3 },
    { month: "Mar", Completed: 14, Pending: 7 },
  ],
  Srinu: [
    { month: "Jan", Completed: 20, Pending: 2 },
    { month: "Feb", Completed: 22, Pending: 1 },
    { month: "Mar", Completed: 19, Pending: 5 },
  ],
  Jabi: [
    { month: "Jan", Completed: 9, Pending: 6 },
    { month: "Feb", Completed: 15, Pending: 4 },
    { month: "Mar", Completed: 17, Pending: 3 },
  ],
};

function IndividualCRM() {
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = Object.keys(employeeData);
  const filteredEmployees = employees.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    if (filteredEmployees.length === 1) {
      setSelectedEmployee(filteredEmployees[0]);
      setSearch("");
    } else {
      setSelectedEmployee(null);
    }
  };

  return (
    <div className="crm-container">
      <h1 className="crm-title">Employee CRM Details</h1>

      {/* ===== Search Bar ===== */}
      <div className="crm-search">
        <div className="crm-search-input-wrapper">
          <input
            type="text"
            placeholder="Search Eg johnu,srinu,jabi"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="crm-search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        {search && (
          <div className="crm-search-results">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((name) => (
                <div
                  key={name}
                  className="crm-search-item"
                  onClick={() => {
                    setSelectedEmployee(name);
                    setSearch("");
                  }}
                >
                  {name}
                </div>
              ))
            ) : (
              <div className="crm-no-results">No employees found</div>
            )}
          </div>
        )}
      </div>

      {/* ===== Employee Data ===== */}
      {selectedEmployee && (
        <div className="crm-employee">
          <h2>{selectedEmployee}'s Performance</h2>
          <div className="crm-chart">
            <ResponsiveContainer width="100%" minWidth={800} height={400}>
              <BarChart data={employeeData[selectedEmployee]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Completed" fill="#4CAF50" />
                <Bar dataKey="Pending" fill="#FF5722" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndividualCRM;
