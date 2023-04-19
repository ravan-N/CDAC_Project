import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home(){

    const[allevent, setAllevent]=useState([]);
    const[eventid, setEventid]=useState([]);
    const navigate= useNavigate();

    useEffect(()=>{
        fetch("http://localhost:8080/getEventList")
        .then(resp=>resp.json())
        .then(obj=>setAllevent(obj))
    }, []);
    console.log(allevent);

    //
    const handleChange1=(e)=>{

        setEventid(e);
    }

    const handleChange2=(e)=>{

        fetch("http://localhost:8080/getEventById?event_id="+eventid)
        .then(resp=>resp.json())
        .then(obj=>{    
                    localStorage.setItem("eventdetails",JSON.stringify(obj))
                    })
        
         navigate("/eventdetails")   
       

    }

    return(
        <div>
            
            {
                allevent.map(event => {
                    return(
                        <div>
                            <p><b>{ event.event_name } </b></p>
                            <p>{event.overview}</p>
                            <button type="submit" class="btn btn-warning btn-lg ms-2" onMouseDown={()=>{return handleChange1(event.event_id)}}  onMouseUp={handleChange2}>View</button>
                        </div>    
                    )
                })
            }

            
        {/* {JSON.stringify(allevent)} */}
        
        {JSON.stringify(eventid)}
        {/* <Outlet/> */}
        </div>
    )
}