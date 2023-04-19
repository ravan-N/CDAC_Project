import { useEffect, useState } from "react";

export default function ViewBookingsOrg() {

    const eveid = localStorage.getItem("local_eveid");
    const tseat = localStorage.getItem("local_tseat");
    const [allbook, setAllbook] = useState([]);
    const [bseat, setBseat]=useState();
    const [status, setStatus]=useState("");

    useEffect(() => {
        fetch("http://localhost:8080/getBookingsByEventid?event_id=" + eveid)
            .then(resp => resp.json())
            .then(obj => setAllbook(obj))
    }, [eveid]);

    const handleChange=()=>{
        fetch("http://localhost:8080/getTotalBookings?event_id="+eveid)
        //.then(resp=>resp.json())
        //alert("req send to REST")
        .then(resp=>{
            if(resp.ok)
            {
                //alert("");
                return resp.text();
            }
            // else{
            //     throw new Error("server error");

            // }
            
        })
        .then(text=>JSON.parse(text))
        .then(obj => setBseat(obj))
        //.catch((error)=>alert("server error "));
        if(bseat==tseat)
        {
            setStatus("All "+tseat+" Seats Booked");
        }
        else{
            setStatus((tseat-bseat)+" seats of "+tseat+" are available")
        }
        
    }

    // useEffect(() => {

    //     fetch("http://localhost:8080/getTotalBookings?event_id="+eveid)
    //     //.then(resp=>resp.json())
    //     //alert("req send to REST")
    //     .then(resp=>{
    //         if(resp.ok)
    //         {
    //             //alert("");
    //             return resp.text();
    //         }
    //         else{
    //             throw new Error("server error");

    //         }
            
    //     })
    //     .then(text=>JSON.parse(text))
    //     .then(bseat => setBseat(bseat))
    //     .catch((error)=>alert("server error "));
    //     if(bseat==tseat)
    //     {
    //         setStatus("All "+tseat+" Seats Booked");
    //     }
    //     else{
    //         setStatus((tseat-bseat)+" seats of "+tseat+" are available")
    //     }
    // }, [eveid])


    return (
        <div class="mx-auto col-10 col-md-8 col-lg-8">
            <div>
            <br/>
            <h5>Booking List</h5>
            <br/>
            <table className="table table-bordered">
                <tr>
                    <th>Booking Id</th>
                    {/* <th>Date</th> */}
                    <th>Participant Name</th>
                    <th>Event Name</th>
                    <th>Enrollment</th>
                    <th>Amount</th>
                </tr>

                {
                    allbook.map((app) => {


                        return (


                            <tr>
                                {/* <td>{app.date}</td> */}
                                <td>{app.booking_id}</td>
                                <td>{app.participant_id.first_name+" "+app.participant_id.last_name}</td>
                                <td>{app.event_id.event_name}</td>
                                <td>{app.total_enrollment}</td>
                                <td>{app.total_amount} </td>

                            </tr>

                        )
                    })
                }
            </table>
            </div>
            
            <div className="mx-auto col-10 col-md-8 col-lg-2">
            <td><button type="submit" class="btn btn-info ms-2" to="#bstatus" onMouseDown={()=>{ handleChange()}} onMouseUp={()=>{ handleChange()}}   >Bookings Status</button></td>
            </div>
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <br/>
                <p id="#bstatus" ><b>{status}</b></p>
            </div>
            {/* JSON.stringify({tseat-bseat}) */}
        </div>
    )
}