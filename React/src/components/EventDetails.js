import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function EventDetails() {

    const mystate = useSelector((state) => state.logged);
    const navigate = useNavigate();

    const eveid = localStorage.getItem("local_eveid");
    console.log(eveid);
    const[details, setDetails]=useState([]);
    const [bseat, setBseat]=useState();
    const tseat=details.total_seat;
    //const[status, setStatus]=useState("true");

    useEffect(()=>{
        fetch("http://localhost:8080/getEventById?event_id="+eveid)
        .then(resp=>resp.json())
        .then(obj=>setDetails(obj))

        fetch("http://localhost:8080/getTotalBookings?event_id="+eveid)
        .then(resp=>resp.json())
        .then(obj => setBseat(obj))
    }, [eveid]);
    console.log(details);

    // if(bseat==tseat)
    // {
    //     setStatus("false");
    // }
    // else{
    //     setStatus("true")
    // }

    const handleChange = () => {
        if (!(mystate.loggedIn)) {
            alert("You are not Logged in yet...Please Login to proceed further")
            navigate("/login")
            
        }
        else{
            localStorage.setItem("specific_details",JSON.stringify(details));
            navigate("/participant_home/bookingform");
        }
        
    }
    // console.log(tseat)
    
    
    

    return (
        <div class="mx-auto col-10 col-md-8 col-lg-8">
          <br/>
        <div className="table">
          <button type="submit"className="btn btn-info ms-2" disabled={bseat==tseat?true:false} onClick={() => { handleChange()}}  >
            Book Event
          </button>
          <br/>
          <br/>
          <table className="table table-bordered " >
                                <tr>
                                    <th>Event Name</th>
                                    <td>{details.event_name}</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                      <td>{details.location}</td>   
                                </tr>
                                <tr>
                                    <th>Date and Time</th>
                                      <td>{details.datetime}</td>   
                                </tr>
                                <tr>
                                    <th>Duration</th>
                                    <td>{details.duration}</td>   
                                </tr>
                                {/* <tr>cd      
                                    <th>Organize by</th>
                                    <td>{details.organizer_id.organization_name}</td>   
                                </tr> */}
                                <tr>
                                    <th>Price per head</th>
                                    <td>{details.price}</td>   
                                </tr>
                                <tr>
                                    <th>Overview</th>
                                    <td>{details.overview}</td>   
                                </tr>
                                <tr>
                                    <th>Difficulty Level</th>
                                    <td>{details.difficulty_level}</td>   
                                </tr>
                                <tr>
                                    <th>Thing to Carry</th>
                                    <td>{details.thing_to_carry}</td>   
                                </tr>
                                <tr>
                                    <th>Pickup Location</th>
                                    <td>{details.pickup_location}</td>   
                                </tr>
                                <tr>
                                    <th>Pickup Time</th>
                                    <td>{details.pickup_time}</td>   
                                </tr>
                                <tr>
                                    <th>Drop Location</th>
                                    <td>{details.drop_location}</td>   
                                </tr>
                                <tr>
                                    <th>Drop Time</th>
                                    <td>{details.drop_time}</td>   
                                </tr>
                                <tr>
                                    <th>Inclusion</th>
                                    <td>{details.inclusion}</td>   
                                </tr>
                                <tr>
                                    <th>Exclusion</th>
                                    <td>{details.exclusion}</td>   
                                </tr>
                                <tr>
                                    <th>Safety Guideline</th>
                                    <td>{details.safety_guideline}</td>   
                                </tr>
                                <tr>
                                    <th>Rulebook</th>
                                    <td>{details.rulebook}</td>   
                                </tr>
                                <tr>
                                    <th>Cancellation Policy</th>
                                    <td>{details.cancellation_policy}</td>   
                                </tr>
                                <tr>
                                    <th>Seats</th>
                                    <td>{details.total_seat}</td>   
                                </tr>
                            </table>  
        </div>
        {/* {JSON.stringify(bseat)} */}
      </div>
    
    )
}









