import { useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

export default function BookingForm2() {

    const log_part = JSON.parse(localStorage.getItem("loggedParticipant"));
    const log_event = JSON.parse(localStorage.getItem("specific_details"));
    const navigate = useNavigate();
    //const current = new Date();
    //const [no,setNo]=useState(10);
    console.log(log_event.price)
    // Original state/data
    const init = {
        //date: current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate(),
        //date:(new Date().toLocaleString()).format("DD-MM-YYYY"),
        date: { value: "", touched: false, valid: false, error: "" },
        total_enrollment:{ value: 1, touched: false, valid: false, error: "" },
        total_amount:{ value: 0, touched: false, valid: false, error: "" },
        participant_id: {value:log_part.participant_id,touched: false, valid: false, error: ""},
        event_id: {value:log_event.event_id,touched: false, valid: false, error: ""}

    }

    //Defination of reducer 
    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: { ...state[action.fld], value: action.value, error: action.error, valid: action.valid, touched: action.touched } }
            case 'reset':
                return init;
        }
    }
    //useReducer Hook
    const [form, dispatch] = useReducer(reducer, init);
    // const [total, setTotal] = useState();

    // const handlechange = (t)=>{
    //     setTotal(t);
    // }
    const validateData = (name, value) => {
        console.log(name + " : " + value)
        let valid = false;
        let error = "";
        let touched = true;
        switch (name) {
            case 'date': 
            const date1 = new Date(value);
            const curdate=new Date();
            if(date1.getDate()< curdate.getDate())
            {
                error = 'Not Allowed....date should be today are after it';
                valid = false;
            }
            else {
                error = "";
                valid = true;
            }
            break;

               
            case 'total_enrollment': 
                if (value<=2) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = " not allowed more than 2"
                }
                break;
            // case 'total_amount': 
            //     if (!value==0) {
            //         valid = true;
            //         error = "";
            //     }
            //     else {
            //         valid = false;
            //         error = " invalid amount"
            //     }
            //     break;
           


            

        }
        console.log(value + "," + error + "," + valid)
        dispatch({ type: 'update', fld: name, value: value, error, valid, touched })
        return { valid, error };
    }
    const [total,setTotal]=useState()
    const handleChange=(e)=>{
        setTotal(e);
    }
    const sendData = (e) => {
        e.preventDefault();


        //oject for REST Api 
        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                date: form.date.value, total_enrollment: form.total_enrollment.value,
                total_amount: form.total_amount.value,participant_id: form.participant_id.value,
                event_id: form.event_id.value})

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
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="date"> Date : </label>
                        <input type="date" name="date" className="form-control"
                            value={form.date.value} onChange={(e) => { validateData("date", e.target.value) }} />
                            <div id="dateeHelp" className="form-text" style={{ display: (!form.date.valid && form.date.touched) ? "block" : "none" }}>
                                {form.date.error}
                            </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="total_enrollment"> Total Booking enrollments  : </label>
                        <input type="number" name="total_enrollment" className="form-control" min={1} max={2} value={form.total_enrollment.value} 
                             onChange={(e) => { validateData("total_enrollment", e.target.value) }} />
                            <div id="total_enrollmentHelp" className="form-text" style={{ display: (!form.total_enrollment.valid && form.total_enrollment.touched) ? "block" : "none" }}>
                                {form.total_enrollment.error}
                            </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="total_amount"> Total Amount : </label>
                        <input type="number" name="total_amount" className="form-control" value={form.total_enrollment * log_event.price}
                            // onMouseOver ={()=>{return handlechange((form.total_enrollment * log_event.price))}}
                            onMouseOver={()=>{handleChange(form.total_enrollment*log_event.price)}}
                            onMouseOut={(e) => { dispatch({ type: 'update', fld: 'total_amount', val: total }) }} />
                    </div>
                </div>
                <div className="row">
                    <br />
                    <div className="col-md-12">
                        <br />
                        <Button variant="primary"  disabled={form.date.valid && form.total_enrollment.valid ? false : true} type="submit" onClick={(e) => { sendData(e) }}>
                            Confirm
                        </Button>&nbsp;&nbsp;
                        <Button variant="primary" type="reset" onClick={() => { dispatch({ type: 'reset' }) }}>
                            Clear
                        </Button>
                    </div>
                </div>
                <div>
                    {/* <div className="row">
                        <br />
                        <div className="col-md-12">
                            <br/>
                            <p>Max Enrollment should be 2</p>
                        </div>
                    </div> */}
                </div>

            </form >


            {JSON.stringify(log_part)} 
            {/* {/* {JSON.stringify(log_event)}
            <p></p> */}
            {JSON.stringify(form)}


        </div >
    )
}
