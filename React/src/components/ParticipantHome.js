import { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function ParticipantHome(){

  const [participant,setParticipant]=useState([]);
  useEffect(()=>{

    const userid=JSON.parse(localStorage.getItem("loggedUser"));
    console.log(userid);
    fetch("http://localhost:8080/getParticipant?userid="+userid.user_id)
    .then(resp=>resp.json())
    .then(obj=>{
      console.log(obj);

      localStorage.setItem("loggedParticipant", JSON.stringify(obj))
      setParticipant(obj);
    })

  },[]);

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
        navigate("/participant_home/viewevent")  
    }

    // const handleChange2=(e)=>{

    //     fetch("http://localhost:8080/getEventsByCatId?category_id="+catid)
    //     .then(resp=>resp.json())
    //     .then(obj=>{  
    //                 setEvents(obj)
    //                 localStorage.setItem("eventsby_cat",JSON.stringify(obj))
    //                 })
        
    //      navigate("/participant_home/viewevent")   
    //        onMouseUp={handleChange2} 

    // }

return (
    <div>
        <nav class="navbar navbar-expand-sm bg-light">
        <div class="container-fluid">
          <ul class="navbar-nav">
          <li>
              <Nav>
              <NavDropdown className="justify-content-end text-light" title="View Event" id="basic-nav-dropdown">
                {
                  allcat.map(cat => {
                    return (
                      <NavDropdown.Item href="#action/3.1"><Link className='nav-link'  to="/participant_home/viewevent"
                      onClick={()=>{return handleChange1(cat.category_id)}} >{cat.category_name}</Link></NavDropdown.Item>

                    )
                  })

                }


              </NavDropdown>
            </Nav>
              </li>
            
            {/* <li class="nav-item">
              <Link to="searchevent" className='nav-link px-3'> Search Event&nbsp;&nbsp;&nbsp;&nbsp; </Link>

            </li> */}
            
            <li class="nav-item">
              <Link to="updateprofile" className='nav-link px-3'>Update Profile&nbsp;&nbsp;&nbsp;&nbsp; </Link>
            </li>
            <li class="nav-item">
              <Link to="viewbookings" className='nav-link px-3'>View Booking&nbsp;&nbsp;&nbsp;&nbsp; </Link>
            </li>
            <li class="nav-item">
              <Link to="/logout" className='nav-link px-3'> Logout&nbsp;&nbsp;&nbsp;&nbsp; </Link>
            </li>
            {/* <li class="nav-text ny-2 my-sm-0" ><b>Welcome {participant && participant.first_name}</b></li> */}
            
          </ul>
          <span><b>Welcome {participant && participant.first_name}</b></span>
        </div>
      </nav>
    

    

    <Outlet>

    </Outlet>

    </div>
)

}