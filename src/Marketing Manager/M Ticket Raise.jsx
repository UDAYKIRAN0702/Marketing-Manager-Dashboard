import React, { useState } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import './M Ticket Raise.css'; // Use your existing CSS

function MTicketRaise() {
  const [view, setView] = useState('raise'); // 'raise' or 'status'
  const [tickets, setTickets] = useState([]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticket, setTicket] = useState({ subject: '', description: '', priority: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!ticket.subject.trim()) formErrors.subject = 'Subject is required';
    if (!ticket.description.trim()) formErrors.description = 'Description is required';
    if (!ticket.priority) formErrors.priority = 'Priority is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTicket = { 
      ...ticket, 
      id: Date.now(), 
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };

    setTickets([newTicket, ...tickets]);
    setShowTicketForm(false);
    setTicket({ subject: '', description: '', priority: '' });
    setErrors({});
  };

  return (
    <div className="business-analysis">
      <h1>Ticket Dashboard</h1>

      {/* Navigation */}
      <div className="ticket-nav">
        <button className={view === 'raise' ? 'active' : ''} onClick={() => setView('raise')}>Raise Ticket</button>
        <button className={view === 'status' ? 'active' : ''} onClick={() => setView('status')}>Ticket Status</button>
      </div>

      {/* Raise Ticket */}
      {view === 'raise' && (
        <div className="analysis-cards">
          <div className="analysis-card">
            <FaTicketAlt className="icon" />
            <h2>Ticket Raise</h2>
            <p>Log customer issues and monitor their resolution status.</p>
            <button onClick={() => setShowTicketForm(true)}>Raise Ticket</button>

            {showTicketForm && (
              <div className="ticket-form">
                <h3>Raise a New Ticket</h3>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Ticket Subject"
                    value={ticket.subject}
                    onChange={handleInputChange}
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}

                  <textarea
                    name="description"
                    placeholder="Describe the issue"
                    value={ticket.description}
                    onChange={handleInputChange}
                  />
                  {errors.description && <span className="error-text">{errors.description}</span>}

                  {/* Priority Dropdown */}
                  <select
                    name="priority"
                    value={ticket.priority}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Priority</option>
                    <option value="Critical">Critical</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.priority && <span className="error-text">{errors.priority}</span>}

                  <input type="file" />

                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">Submit Ticket</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ticket Status */}
      {view === 'status' && (
        <div className="ticket-status-table">
          {tickets.length === 0 ? (
            <p>No tickets submitted yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td>{t.subject}</td>
                    <td>{t.description}</td>
                    <td><span className={`priority-badge ${t.priority.toLowerCase()}`}>{t.priority}</span></td>
                    <td><span className={`status-badge ${t.status.toLowerCase()}`}>{t.status}</span></td>
                    <td>{t.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default MTicketRaise;
