import { useEffect, useState } from "react";

export default function RemoveEvent(){

    const log_org = JSON.parse(localStorage.getItem("loggedOrganizer"));
    const orgid =log_org.organizer_id;

    const[eventid, setEventid]=useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        
        fetch("http://localhost:8080/getEventsByOrgid?organizer_id="+orgid)
            .then(resp => resp.json())
            .then(obj => setEvents(obj))
    }, [])

    const handleChange1=(e)=>{

        setEventid(e);
        
    }
    //alert(eventid);
    const handleChange2=(e)=>{

        fetch("http://localhost:8080/removeEventById?event_id="+eventid)
        //.then(resp=>resp.json())
        //alert("req send to REST")
        .then(resp=>{
            if(resp.ok)
            {
                alert("Event Removed Successfully!!");
               // navigate("organizer_home/viewevents");
                //return resp.text();

            }
            else{
                throw new Error("server error");

            }
            
        })
        .catch((error)=>alert("server error "));
    }

    return(
        <div class="mx-auto col-10 col-md-8 col-lg-8">
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
                                    <td><button type="submit" class="btn btn-warning  ms-2" onMouseDown={()=>{return handleChange1(eve.event_id)}}  onMouseUp={handleChange2}>Remove</button></td>
                                </tr>
                               
                            ) })
                        }
                    </table>
        </div>
    )
}