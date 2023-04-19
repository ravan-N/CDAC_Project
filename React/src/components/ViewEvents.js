import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewEvents(){

    const log_org = JSON.parse(localStorage.getItem("loggedOrganizer"));
    const orgid =log_org.organizer_id;

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    //const[eventid, setEventid]=useState([]);
    // const [bseat, setBseat]=useState();
    // const [tseat, setTseat] = useState();
   
    useEffect(() => {
        
        fetch("http://localhost:8080/getEventsByOrgid?organizer_id="+orgid)
            .then(resp => resp.json())
            .then(obj => setEvents(obj))
    }, [])

    const handleChange2=(e)=>{
        localStorage.setItem("local_tseat",e);
    }

    const handleChange1=(e)=>{

        //setEventid(e);
        localStorage.setItem("local_eveid",e);
        navigate("/organizer_home/viewbookings") 
    }

   


    return(
        <div class="mx-auto col-10 col-md-8 col-lg-8">
            <br/>
            <h5>Events List </h5>
            <br/>
            <table className="table table-bordered">
                        <tr>
                            <th>Event Id</th>
                            <th>Event Name </th>
                            <th>Location</th>
                            <th>Date-Time</th>
                            <th>Duration</th>
                            <th>Action</th>
                            </tr>
                        {
                           events.map((eve)=>{
                           
                        
                               return(
                             
                            
                                <tr>
                                    <td>{eve.event_id}</td>
                                    <td>{eve.event_name}</td>
                                    <td>{eve.location} </td>
                                    <td>{eve.datetime}</td>
                                    <td>{eve.duration}</td>
                                    <td><button type="submit" class="btn btn-info ms-2" onMouseDown={()=>{return handleChange2(eve.total_seat)}} onMouseUp={()=>{return handleChange1(eve.event_id)}}  >View Booking</button></td>

                                    {/* <td><button type="submit" class="btn btn-warning btn-lg ms-2" onMouseOver={()=>{return handleChange4(eve.total_seat)}} onMouseDown={()=>{return handleChange1(eve.event_id)}}  >Bookings Status</button></td> */}
                                    
                                </tr>
                               
                            ) })
                        }
                    </table>

        {/* {JSON.stringify(events)} */}
        {/* {JSON.stringify(bseat)}
        <p></p>
        {JSON.stringify(tseat)} */}
        </div>
    )
}