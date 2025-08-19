import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUser,
  FaBusinessTime,
  FaShareSquare,
  FaCcAmazonPay,
} from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { MdSpatialTracking } from "react-icons/md";
import { RiLogoutBoxLine, RiInformation2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { SiCivicrm } from "react-icons/si";
import { LuBriefcaseBusiness, LuLogOut } from "react-icons/lu";
import { TiTicket } from "react-icons/ti";
import "./Marketing Dashboard.css";

export default function MarketingDashboard() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".dashboard-header");
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="dashboard-container">
      {/* ===== Header ===== */}
   <header className="dashboard-header">
  <h2 className="header-title">Welcome</h2>
  <div className="dashboard-header-wrapper">
    <div className="profile-section" ref={dropdownRef}>
      <button
        className="profile-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaUserCircle className="profile-icon" />
        <span className="profile-text">NRL Swamy</span>
      </button>
      {open && (
        <ul className="dropdown-content">
          <li>
            <NavLink to="/profile">
              <FaUser className="icon" /> Profile
            </NavLink>
          </li>
          <li onClick={onLogout}>
            <RiLogoutBoxLine className="icon" /> Logout
          </li>
        </ul>
      )}
    </div>
  </div>
</header>


      {/* ===== Sidebar + Main Content ===== */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            <li>
              <NavLink to="/" end>
                <RxDashboard /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mtodaybusiness">
                <FaBusinessTime /> Today Business
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mcrm">
                <SiCivicrm /> CRM
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mreferral">
                <FaShareSquare /> Referral
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mpayment">
                <FaCcAmazonPay /> Payments
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mbusiness">
                <LuBriefcaseBusiness /> Business Analysis
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mticket">
                <TiTicket /> Ticket Raise
              </NavLink>
            </li>
            <li>
              <NavLink to="/Mcatelist">
                <RiInformation2Line /> Catalyst
              </NavLink>
            </li>
            <li>
              <NavLink to="/Memployee-register">
                <GiArchiveRegister /> Employee Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/track">
                <MdSpatialTracking /> Employee Track
              </NavLink>
            </li>
            <li>
              <NavLink to="/individual-crm">
                <SiCivicrm /> Employee CRM
              </NavLink>
            </li>
            <li>
              <button className="Mlogout-btn" onClick={onLogout}>
                <LuLogOut /> Logout
              </button>
            </li>
          </ul>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
