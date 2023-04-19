import { useEffect, useReducer, useState } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BookingEnrollment() {

    const bookid = JSON.parse(localStorage.getItem("en_booking"));
   const count =bookid.total_enrollment-1;
   //count=count-1;

    const init={
        fname:"",
        lname:"",
        gender:"",
        age:0,
        booking_id:bookid.booking_id
    }
    const reducer=(state,action)=>{
        switch(action.type){
            case 'update':
                return {...state, [action.fld]: action.val}
            case 'reset':
                return init;
        }
    }

    const[enroll, dispatch]=useReducer(reducer,init);
    const navigate = useNavigate();
    
    const sendData = (e) => {
        e.preventDefault();
        //oject for REST Api 
        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(enroll)
                
        
        }
    
        fetch("http://localhost:8080/addEnrollments", reqOptions)
        // .then(resp => resp.text())
        // alert("Account req raised");
        .then(resp=>{
            if(resp.ok)
            {
                // while(count>0)
                // {
                //     navigate("/participant_home/booking_enrollement");
                //     count--;
                // }
                alert(" Successfully Enrolled!!!!");
                navigate("/participant_home/viewevent");
               //navigate("/participant_home/booking_enrollement");
            }
            else{
                throw new Error("server error");

            }
            
        })
        .catch((error)=>alert("server error "));
    }

    return (
        <div class="mx-auto col-10 col-md-8 col-lg-4">
            <br/>
            <h5>Participant Details</h5>
            <br/>
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="fname"> First Name : </label>
                        <input type="text" name="fname" className="form-control"
                            onChange={(e) => { dispatch({ type: 'update', fld: 'fname', val: e.target.value }) }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="lname"> Last Name : </label>
                        <input type="text" name="lname" className="form-control"
                            onChange={(e) => { dispatch({ type: 'update', fld: 'lname', val: e.target.value }) }} />
                    </div>
                </div>

                <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="gender">Select Gender</label>

                            <label>
                                <input type='radio' name='gender' value='male'
                                    onChange={(e) => { dispatch({ type: 'update', fld: 'gender', val: e.target.value }) }}
                                />
                                Male
                            </label>

                            <label >
                                <input type='radio' name='gender' value='female'
                                    onChange={(e) => { dispatch({ type: 'update', fld: 'gender', val: e.target.value }) }}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="age"> Age : </label>
                        <input type="number" name="age" className="form-control"
                            onChange={(e) => { dispatch({ type: 'update', fld: 'age', val: e.target.value }) }} />
                    </div>
                </div>

                
                <div className="row">
                    <div className="col-md-12">
                        <br/>
                        <Button variant="info" type="submit" onClick={(e) => { sendData(e) }}>
                            Confirm
                        </Button>&nbsp;&nbsp;
                        <Button variant="info" type="reset" onClick={() => { dispatch({ type: 'reset' }) }}>
                            Clear
                        </Button>
                    </div>
                </div>

            </form >
            {/* {JSON.stringify(enroll)} */}
        </div>
    )
}