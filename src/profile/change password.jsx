import React, { useState } from 'react';
import './change password.css'; // optional CSS file

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    // Example: Minimum 6 chars, must contain a number
    const regex = /^(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(formData.newPassword)) {
      setMessage('Password must be at least 6 characters and contain a number.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    // ✅ API call or logic to update password here
    setMessage('Password updated successfully! ✅');
    setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label>Old Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            /> Show Passwords
          </label>
        </div>

        <button 
          type="submit" 
          className="btn" 
          disabled={!formData.oldPassword || !formData.newPassword || !formData.confirmPassword}
        >
          Update Password
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ChangePassword;
