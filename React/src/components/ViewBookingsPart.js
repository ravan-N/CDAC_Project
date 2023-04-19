import { useEffect, useState } from "react";

export default function ViewBookingsPart(){

    const log_part = JSON.parse(localStorage.getItem("loggedParticipant"));
    const partid = log_part.participant_id;
    const[allbook, setAllbook]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/getBookingsByPartid?participant_id="+partid)
        .then(resp=>resp.json())
        .then(obj=>setAllbook(obj))
    }, []);

    return(
        <div class="mx-auto col-10 col-md-8 col-lg-8">
            <br/>
            <h5>Your Bookings</h5>
            <br/>
            <table className="table table-bordered">
                                <tr>
                                    {/* <th>Date</th> */}
                                    <th>Booking Id</th>
                                    <th>Event Id</th>
                                    <th>Date</th>
                                    <th>Enrollment</th>
                                    <th>Amount</th>
                                </tr>

                                {
                           allbook.map((app)=>{
                           
                        
                               return(
                             
                            
                                <tr>
                                    {/* <td>{app.date}</td> */}
                                    <td>{app.booking_id}</td>
                                    <td>{app.event_id.event_name}</td>
                                    <td>{app.event_id.datetime}</td>
                                    <td>{app.total_enrollment}</td>
                                    <td>{app.total_amount} </td>
                                    
                                </tr>
                               
                            ) })
                        }
            </table>
        </div>
    )
}