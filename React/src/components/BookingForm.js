import { useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

export default function BookingForm() {

    const log_part = JSON.parse(localStorage.getItem("loggedParticipant"));
    const log_event = JSON.parse(localStorage.getItem("specific_details"));
    const navigate = useNavigate();
    const current = new Date();
    //const [no,setNo]=useState(10);
    // Original state/data
    const init = {
        //date: current.getDate()+"-"+(current.getMonth()+1)+"-"+current.getFullYear(),
        //date:(new Date().toLocaleString()).format("DD-MM-YYYY"),
        //date: "",
        total_enrollment: 0,
        total_amount: 0,
        participant_id: log_part.participant_id,
        event_id: log_event.event_id

    }

    //Defination of reducer 
    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'reset':
                return init;
        }
    }

    //useReducer Hook
    const [form, dispatch] = useReducer(reducer, init);
    const [total, setTotal] = useState();

    // const handlechange = (t)=>{
    //     setTotal(t);
    // }

    const sendData = (e) => {
        e.preventDefault();


        //oject for REST Api 
        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(form)

        }

        fetch("http://localhost:8080/bookEvent", reqOptions)
            // .then(resp => resp.text())
            // alert("Booking Confirmed");
            .then(resp => {
                if (resp.ok) {
                    alert("Booking Confirmed");
                    if (form.total_enrollment == 1) {
                        navigate("/participant_home/viewevent");
                    }
                    else {

                        navigate("/participant_home/enrolledbooking");
                        //navigate("/participant_home/booking_enrollment");

                    }

                    //return resp.text();

                }
                else {
                    throw new Error("server error");

                }

            })
            .catch((error) => alert("server error "));
    }
    return (
        <div class="mx-auto col-10 col-md-8 col-lg-4">
            <br />
            <h5>Booking Form</h5>
            <br />
            <form>
                {/* <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="date"> Date : </label>
                        <input type="date" name="date" className="form-control"
                            onChange={(e) => { dispatch({ type: 'update', fld: 'date', val: e.target.value }) }} />
                    </div>
                </div> */}

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="total_enrollment"> Total Booking enrollments  : </label>
                        <input type="number" name="total_enrollment" className="form-control" min={1} max={2} value={form.total_enrollment}
                            onChange={(e) => dispatch({ type: 'update', fld: 'total_enrollment', val: e.target.value })} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="total_amount"> Total Amount : </label>
                        <input type="number" name="total_amount" className="form-control" value={(form.total_enrollment * log_event.price)}
                            // onMouseOver ={()=>{return handlechange((form.total_enrollment * log_event.price))}}
                            onMouseOver={(e) => { dispatch({ type: 'update', fld: 'total_amount', val: e.target.value }) }} />
                    </div>
                </div>
                <div className="row">
                    <br />
                    <div className="col-md-12">
                        <br />
                        <Button variant="primary" type="submit" onClick={(e) => { sendData(e) }}>
                            Confirm
                        </Button>&nbsp;&nbsp;
                        <Button variant="primary" type="reset" onClick={() => { dispatch({ type: 'reset' }) }}>
                            Clear
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <br />
                        <div className="col-md-12">
                            <br/>
                            <p>Max Enrollment should be 2</p>
                        </div>
                    </div>
                </div>

            </form >


            {/* {JSON.stringify(log_part)} */}
            {/* {JSON.stringify(log_event)}
            <p></p> */}
            {/* {JSON.stringify(form)} */}


        </div >
    )
}
