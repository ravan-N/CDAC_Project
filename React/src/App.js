import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import LoginComp from './components/LoginComp';
import AdminHome from './components/AdminHome';
import ParticipantHome from './components/ParticipantHome';
import OrganizerHome from './components/OrganizerHome';
import { useSelector } from 'react-redux';
import LogoutComp from './components/LogoutComp';
import AuthorizeOrganizerComp from './components/AuthorizeOrganizerComp';
import ParticipantReg from './components/ParticipantReg';
import OrganizerReg from './components/OrganizerReg';
import AllEvent from './components/AllEvent';
import AddEvent from './components/AddEvent';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import Home from './components/Home';
import BookingEnrollment from './components/BookingEnrollment';
import ViewBookingsPart from './components/ViewBookingsPart';
import EnrolledBooking from './components/EnrolledBooking';
import ViewEvents from './components/ViewEvents';
import ViewBookingsOrg from './components/ViewBookingsOrg';
import RemoveEvent from './components/RemoveEvent';
import Home1 from './components/Home1';
import AllEventHome from './components/AllEventHome';

import { Nav, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ForgotPasswordComp from './components/ForgotPasswordComp';
import QuestionInfoComp from './components/QuestionInfoComp';
import ResetPasswordComp from './components/ResetPasswordComp';
import UpdateProfileComp from './components/UpdateProfileComp';
import NewOrgReg from './components/NewOrgReg';
import NewPartReg from './components/NewPartReg';
import LoginComp2 from './components/LoginComp2';
import BookingForm2 from './components/BookingForm2';



function App() {

  const mystate= useSelector((state)=>state.logged);

  const[allcat, setAllcat]=useState([]);
  const[catid, setCatid]=useState([]);
  //const[events, setEvents]=useState([]);
  const navigate= useNavigate();

  useEffect(()=>{
      fetch("http://localhost:8080/getCategoryList")
      .then(resp=>resp.json())
      .then(obj=>setAllcat(obj))
  }, []);
  console.log(allcat);

  //
  const handleChange1=(e)=>{

      setCatid(e);
      localStorage.setItem("local_catid",e);
      navigate("/vieweventhome")  
  }

  return (
    <div className="App">
      <div style={{display:mystate.loggedIn?"none":"block"}}>
        <nav class="navbar navbar-expand-sm bg-light">
          <div class="container-fluid">
            <ul class="navbar-nav">
            <li class="nav-item">
                <Link to="/" className='nav-link px-3'> Home&nbsp;&nbsp;&nbsp;&nbsp; </Link> 
              </li>

              <li>
              <Nav>
              <NavDropdown className="justify-content-end text-light" title="View Event" id="basic-nav-dropdown">
                {
                  allcat.map(cat => {
                    return (
                      <NavDropdown.Item href="#action/3.1"><Link className='nav-link'  to="/vieweventhome"
                      onClick={()=>{return handleChange1(cat.category_id)}} >{cat.category_name}</Link></NavDropdown.Item>

                    )
                  })

                }


              </NavDropdown>
            </Nav>
              </li>

              <li class="nav-item">
                <Link to="login" className='nav-link px-3'> Login&nbsp;&nbsp;&nbsp;&nbsp; </Link> 
              </li>
              <li class="nav-item">
                <Link to="participant_register" className='nav-link px-3'>Participant registration&nbsp;&nbsp;&nbsp;&nbsp; </Link>

              </li>
              <li class="nav-item">
                <Link to="organizer_register" className='nav-link px-3'>Organizer registration&nbsp;&nbsp;&nbsp;&nbsp; </Link>
              </li>
              
              
            </ul>
        </div>
      </nav>
    </div>

      
      
      <Routes>
        <Route path="/" element={<Home1/>} />
        <Route path="vieweventhome" element={ <AllEventHome/> } />
        <Route path="eventdetails" element={ <EventDetails/> } />
       
        <Route path='login' element={<LoginComp2/>}/>
        <Route path="/logout" element={<LogoutComp/>}/>
        <Route path="/forgotpassword" element={<ForgotPasswordComp/> } />
        <Route path="/questioninfo" element={<QuestionInfoComp/> } />
        <Route path="/resetpassword" element={<ResetPasswordComp/> } />

        <Route path="participant_register" element={<NewPartReg/>}/>
        {/* <Route path="participant_register" element={<ParticipantReg/>}/> */}
        {/* <Route path="organizer_register" element={<OrganizerReg/>} /> */}
        <Route path="organizer_register" element={<NewOrgReg/>} />

        <Route path='admin_home/*' element={<AdminHome/>} >
            <Route path="Athorize_organizer" element={<AuthorizeOrganizerComp/>} />
        </Route>

        <Route path='participant_home/*' element={<ParticipantHome/>}>
            <Route path="viewevent" element={ <AllEvent/> } />
            <Route path="eventdetails" element={ <EventDetails/> } />
            <Route path="viewbookings" element={<ViewBookingsPart/>} />
            <Route path="bookingform" element={ <BookingForm /> } />
            {/* <Route path="bookingform" element={ <BookingForm2 /> }/> */}
            <Route path="booking_enrollment" element={<BookingEnrollment/>} />
            <Route path="enrolledbooking" element={<EnrolledBooking/>} />
            <Route path="booking_enrollement" element={<BookingEnrollment/>} />
            <Route path="updateprofile" element={<UpdateProfileComp/> } />
        </Route>
        <Route path='organizer_home/*' element={<OrganizerHome/>}>
            <Route path="addevent" element={ <AddEvent/> } />
            <Route path="viewevents" element={<ViewEvents/>} />
            <Route path="viewbookings" element={<ViewBookingsOrg/>} />
            <Route path="remove_event" element={<RemoveEvent/>} />
        </Route>

      </Routes>
    </div>
  )
}

export default App;
