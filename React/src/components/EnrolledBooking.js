import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnrolledBooking() {

    const log_part = JSON.parse(localStorage.getItem("loggedParticipant"));
    const log_event = JSON.parse(localStorage.getItem("specific_details"));
    const part_id = log_part.participant_id;
    const eve_id = log_event.event_id;
    // console.log(part_id);
    // console.log(eve_id);


    const [ebook, setEbookid] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        
        fetch("http://localhost:8080/getenrolled_booking?participant_id="+part_id+"&event_id="+eve_id)
            .then(resp => resp.json())
            .then(ebook => setEbookid(ebook))
    }, [])
    //console.log(ebook);

    const handleChange = ()=>{
        localStorage.setItem("en_booking",JSON.stringify(ebook))
        navigate("/participant_home/booking_enrollement");
    }

    return (
        <div class="mx-auto col-10 col-md-8 col-lg-6">
            <br/>
            <h5>Booking Info</h5>
            <br/>
               
                        <div>
                            <table className="table table-bordered">
                                <tr>
                                    <th>Booking Id</th>
                                    <th>total_enrollment</th>
                                    <th>total_amount</th>
                                    {/* <th>Date</th> */}
                                </tr>
                                <tr>
                                    <td>{ebook.booking_id}</td>
                                    
                                    <td>{ebook.total_enrollment}</td>
                                    <td>{ebook.total_amount}</td>
                                    {/* <td>{ebook.date}</td> */}
                                </tr>
                            </table>
                        </div>

            <button type="submit" class="btn btn-info ms-2" onClick={()=>{handleChange()}} >Add Participant</button>
            {/* </table> */}
            {/* {JSON.stringify(log_part)} */}
            <p></p>
            {/* {JSON.stringify(log_event)} */}
            {/* {JSON.stringify(ebook)} */}
        </div>
    )
}