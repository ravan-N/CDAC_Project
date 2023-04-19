import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
export default function OrganizerHome(){



  const [organizer,setOrganizer]=useState([]);
  const userid=JSON.parse(localStorage.getItem("loggedUser"));
  useEffect(()=>{

    
    console.log(userid);
    fetch("http://localhost:8080/getOrganizer?userid="+userid.user_id)
    .then(resp=>resp.json())
    .then(obj=>{
      console.log(obj);

      localStorage.setItem("loggedOrganizer", JSON.stringify(obj))
      setOrganizer(obj);
    })

  },[]);


return (
    <div>
        <nav class="navbar navbar-expand-sm bg-light">
        <div class="container-fluid">
          <ul class="navbar-nav">
          <li class="nav-item">
              <Link to="viewevents" className='nav-link px-3'>View event&nbsp;&nbsp;&nbsp;&nbsp; </Link> 
            </li>
            {/* <li class="nav-item">
              <Link to="updateprofile" className='nav-link px-3'>Update Profile&nbsp;&nbsp;&nbsp;&nbsp; </Link> 
            </li> */}
            <li class="nav-item">
              <Link to="addevent" className='nav-link px-3'>Add Event&nbsp;&nbsp;&nbsp;&nbsp; </Link>

            </li>
            
            <li class="nav-item">
              <Link to="remove_event" className='nav-link px-3'>Remove Event&nbsp;&nbsp;&nbsp;&nbsp; </Link>
            </li>
            <li class="nav-item">
              <Link to="/logout" className='nav-link px-3'> Logout&nbsp;&nbsp;&nbsp;&nbsp; </Link>
            </li>
            {/* <li class="nav-item"><b>Welcome {organizer && organizer.organization_name}</b></li> */}
          </ul>
          <span><b>Welcome {organizer && organizer.organization_name}</b></span>
        </div>
        
      </nav>
    
    

    <Outlet>
      
    </Outlet>

    </div>
)

}