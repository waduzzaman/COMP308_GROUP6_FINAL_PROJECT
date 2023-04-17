import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NurseHomepage from './components/NurseHomepage';
import PatientHomepage from './components/PatientHomepage';

import AddVitalSigns from './components/AddVitalSigns';
import Checklist from './components/Checklist';
import EmergencyAlert from './components/EmergencyAlert';
import MotivationalVideos from './components/MotivationalVideos';
import Game from './components/Game';
import CreateMotivationalTip from './components/CreateMotivationalTip';
import PatientInfo from './components/PatientInfo';
import ShowMotivationalTip from './components/ShowMotivationalTip';
import AddVitalSignsByNurse from './components/AddVitalSignsByNurse';
import ShowEmergencyAlert from './components/ShowEmergencyAlert';
import Results from './components/Results';
import Logout from './components/Logout'
//
function App() {

  const userCategory = localStorage.getItem('userCategory');
  return (
    <Router>
      <Navbar className='navbar navbar-dark bg-dark' >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home" >Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signUp">Sign Up</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < SignUp />} path="/signUp" />
          <Route render ={()=> < NurseHomepage />} path="/nurse" />
          <Route render ={()=> < PatientHomepage />} path="/patient" />

          <Route render ={()=> userCategory === 'patient' && < AddVitalSigns />} path="/addVitalSigns" />
          <Route render ={()=> userCategory === 'patient' && < Checklist />} path="/checklist" />
          <Route render ={()=> userCategory === 'patient' && < EmergencyAlert />} path="/emergencyAlert" />
          <Route render ={()=> userCategory === 'patient' && < MotivationalVideos />} path="/motivationalVideos" />
          <Route render ={()=> userCategory === 'patient' && < Game />} path="/game" />

          <Route render ={()=> userCategory === 'nurse' && < CreateMotivationalTip />} path="/createTip" />
         < Route render ={()=> userCategory === 'nurse' && < ShowMotivationalTip />} path="/showTip" />
          <Route render ={()=> userCategory === 'nurse' && < PatientInfo />} path="/patientInfo" />
          <Route render ={()=> userCategory === 'nurse' && < AddVitalSignsByNurse />} path="/vitals" />
          <Route render ={()=> userCategory === 'nurse' && < ShowEmergencyAlert />} path="/alert" />
          <Route render ={()=> < Results />} path="/run" />
          <Route render ={()=> < Logout />} path="/logout" />

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
