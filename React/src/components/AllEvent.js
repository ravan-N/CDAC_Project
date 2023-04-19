import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AllEvent(){

    const[allevent, setAllevent]=useState([]);
    const[eventid, setEventid]=useState([]);
    const[msg,setMsg]=useState("");
    const navigate= useNavigate();
    const catid = localStorage.getItem("local_catid");
    console.log(catid);

    useEffect(()=>{
        fetch("http://localhost:8080/getEventsByCatId?category_id="+catid)
        //.then(resp=>resp.json())
        .then(resp => {
            if (resp.ok) {
                return resp.text();

            }
            else {
                throw new Error("server error");

            }
        })
        .then(text => text.length ? JSON.parse(text) : {}) 
        .then(obj=>setAllevent(obj))
        // .then(obj => {
        //     //setAllevent(obj)
        //     if (Object.keys(allevent).length === 0) {
        //         console.log(Object.keys(obj).length)
        //         setMsg("Adventure activity is not organize by any Organizer");
        //     }
            
       // })
      
    }, [catid]);
    console.log(msg);
    console.log(allevent);

    
    const handleChange1=(e)=>{

        setEventid(e);
        localStorage.setItem("local_eveid",e);
        navigate("/participant_home/eventdetails") 
    }


    return(
        <div class="mx-auto col-10 col-md-8 col-lg-8">
            <hr/>
            {
                allevent.map(event => {
                    return(
                        <div className="col-md-12">
                            <p><b>{ event.event_name } </b></p>
                            <p><b>Organized by : </b><u>{event.organizer_id.organization_name}</u></p>
                            <p>{event.overview}</p>                           
                            {/* <img src={`data:image/jpeg,base64,${event && event.routemap}`} class="w-100" />
                            <br/> */}
                            <br/>
                            <button type="submit" class="btn btn-info ms-2" onClick={()=>{return handleChange1(event.event_id)}}  >View</button>
                            <hr/>
                        </div>    
                    )
                })
            }

        <p><b>{msg}</b></p>   
        {/* {JSON.stringify(allevent)} */}
        
        {/* {JSON.stringify(msg)}  */}
        <Outlet/>
        </div>
    )
}
export default AllEvent;