import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketingDashboard from "./Marketing Manager/Marketing Dashboard";
import ManagerDashboard from "./Marketing Manager/M Dashboard";
import MRefferal from "./Marketing Manager/M Refferal";
import MTodayBusines from "./Marketing Manager/M today business";
import MCrm from "./Marketing Manager/M crm";
import MPayments from "./Marketing Manager/M Payment";
import MBusiness from "./Marketing Manager/M Business Analysis";
import MTicketRaise from "./Marketing Manager/M Ticket Raise";
import MOrgTree from "./Marketing Manager/M Catelist";
import EmployeeRegister from "./Marketing Manager/Employee Register";
import EmployeeCRM from "./Marketing Manager/Employee CRM";
import EmployeeLogout from "./Marketing Manager/Employee Logout";
import Profile from "./profile/profile";
import EmployeeTrack from "./Marketing Manager/EmployeeTrack";
import IndividualCRM from "./Marketing Manager/E Individual CRM";



function App() {
  return (
    <Router>
      <Routes>
        {/* Emp Login */}

        {/* Dashboard Routes */}
         *<Route element={<MarketingDashboard/>}>
         <Route path="/" element={<ManagerDashboard/>} />
        <Route path="/Mtodaybusiness" element={<MTodayBusines/>} />
         <Route path="/Mcrm" element={<MCrm/>} />
         <Route path="/Mreferral" element={<MRefferal/>} />
         <Route path="/Mpayment" element={<MPayments/>} />
         <Route path="/Mbusiness" element={<MBusiness/>} />
         <Route path="/Mticket" element={<MTicketRaise/>} />
         <Route path="/Mcatelist" element={<MOrgTree/>} />
         <Route path="/Memployee-register" element={<EmployeeRegister/>} />
         <Route path="/Memployee-track" element={<EmployeeTrack/>} />
         <Route path="/Memployee-crm" element={<EmployeeCRM/>} />
                  <Route path="/profile" element={<Profile/>} />
         <Route path="/track" element={<EmployeeTrack/>} />
         <Route path="/individual-crm" element={<IndividualCRM/>} />
         <Route path="/Memployee-crm" element={<EmployeeCRM/>} />


        </Route>
       
      </Routes>
      
    </Router>
  );
}

export default App;
