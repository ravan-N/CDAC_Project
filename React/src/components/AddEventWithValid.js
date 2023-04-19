import { useEffect, useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap"





function AddEventWithValid() {

    const log_org = JSON.parse(localStorage.getItem("loggedOrganizer"));
    const init = {

        event_name: { value: "", touched: false, valid:false, error: "" },
        location: { value: "", touched: false, valid: false, error: "" },
        datetime: { value: "", touched: false, valid: false, error: "" },
        duration: { value: "", touched: false, valid: false, error: "" },
        overview: { value: "", touched: false, valid: false, error: "" },
        difficulty_level:{ value: "", touched: false, valid: false, error: "" },
        thing_to_carry: { value: "", touched: false, valid: false, error: "" },
        pickup_location: { value: "", touched: false, valid: false, error: "" },
        pickup_time: { value: "", touched: false, valid: false, error: "" },
        drop_location:{ value: "", touched: false, valid: false, error: "" },
        drop_time:{ value: "", touched: false, valid: false, error: "" },
        inclusion: { value: "", touched: false, valid: false, error: "" },
        exclusion:{ value: "", touched: false, valid: false, error: "" },
        safety_guideline:{ value: "", touched: false, valid: false, error: "" },
        rulebook: { value: "", touched: false, valid: false, error: "" },
        cancellation_policy:{ value: "", touched: false, valid: false, error: "" },
        price: { value: 0, touched: false, valid: false, error: "" },
        //routemap: "",
        total_seat: { value: 0, touched: false, valid: false, error: "" },
        category_id:{ value: 0, touched: false, valid: false, error: "" },
        organizer_id: {value:log_org.organizer_id,  touched: false, valid: false, error: ""}
        //organizer_id: log_org.organizer_id

    }

    //reducer function  
    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: { ...state[action.fld], value: action.value, error: action.error, valid: action.valid, touched: action.touched } }
            case 'reset':
                return init;
        }
    }

    const [event, dispatch] = useReducer(reducer, init);
    const [allcat, setAllcat] = useState([]);
    console.log(event)


    //To fetch question List
   

    const validateData = (name, value) => {
        console.log(name + " : " + value)
        let valid = false;
        let error = "";
        let touched = true;
        switch (name) {
            case 'category_id':
                if (value === 0) {
                        error = 'please select any';
                        valid = false;
                    }
                    else {
                        error = "";
                        valid = true;
                    }
                break;
            case 'event_name': var pattern = /^[A-Za-z]{2,20}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "invalid name"
                }
                break;
            case 'location': var pattern = /^[A-Za-z]{2,15}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "invalid location"
                }
                break;
            case 'datetime': 
                const date1 = new Date(value);
                const curdate1=new Date();
                
                if (date1.getDate()>curdate1.getDate()) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "invalid date"
                }
                break;
            case 'duration':var pattern = /^[A-Za-z0-9]{2,15}$/
                console.log("in duration case")

                if(pattern.test(value))
                {
                    error = '';
                    valid = true;
                }
                else {
                        error = "invalid duration";
                         valid = false;
                     }

                // if (value === 0) {
                //     error = 'please select any';
                //     valid = false;
                // }
                // else {
                //     error = "";
                //     valid = true;
                // }
                break;
                case 'overview':var pattern = /^[A-Za-z0-9]{2,15}$/
                console.log("in duration case")

                if(pattern.test(value))
                {
                    error = '';
                    valid = true;
                }
                else {
                        error = "invalid duration";
                         valid = false;
                     }
                     break;
                case 'safety_guideline':var pattern = /^[A-Za-z0-9]{2,15}$/
                     console.log("in duration case")
     
                     if(pattern.test(value))
                     {
                         error = '';
                         valid = true;
                     }
                     else {
                             error = "invalid duration";
                              valid = false;
                          }
                          break;
            case 'thing_to_carry':var pattern = /^[A-Za-z0-9]{2,15}$/
                console.log("in duration case")

                if(pattern.test(value))
                {
                    error = '';
                    valid = true;
                }
                else {
                        error = "invalid duration";
                         valid = false;
                     }
                     break;
            case 'inclusion': 
                if (value=="easy"||value=='moderate'||value=="hard") {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "invalid difficulty level"
                }
                break;
            case 'exclusion':var pattern = /^[A-Za-z0-9]{2,15}$/
                console.log("in duration case")

                if(pattern.test(value))
                {
                    error = '';
                    valid = true;
                }
                else {
                        error = "invalid duration";
                         valid = false;
                     }
                     break;
            case 'rulebook':var pattern = /^[A-Za-z0-9]{2,15}$/
                     console.log("in duration case")
     
                     if(pattern.test(value))
                     {
                         error = '';
                         valid = true;
                     }
                     else {
                             error = "invalid duration";
                              valid = false;
                          }
                          break;
            case 'cancellation_policy':var pattern = /^[A-Za-z0-9]{2,15}$/
                console.log("in duration case")

                if(pattern.test(value))
                {
                    error = '';
                    valid = true;
                }
                else {
                        error = "invalid duration";
                         valid = false;
                     }
                     break;
                     
            
            case 'pickup_location':
                console.log("in pickup case")
                if (value === "") {
                    error = 'can not be empty';
                    valid = false;
                }
                else {
                    error = "";
                    valid = true;
                }
                break;
            case 'pickup_time':
                const date2 = new Date(value);
                const curdate2=new Date();
                
                if (date2.getTime()>curdate2.getTime()) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "invalid time"
                }
                break;
            case 'drop_location':
                console.log("in drop location case")
                if (value === "") {
                    error = 'can not be empty';
                    valid = false;
                }
                else {
                    error = "";
                    valid = true;
                }
                break;
            case 'drop_time':
                const date3 = new Date(value);
                
                
                if (date3.getTime()>date2.getTime()) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "invalid time"
                }
                break;
            
            case 'price': 
                if (value>100) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "it should be greater than 100 "
                }
                break;
            
            case 'total_seat': 
                if (value>0) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "it should be greater than 0 "
                }
                break;
               


        }
        console.log(value + "," + error + "," + valid)
        dispatch({ type: 'update', fld: name, value: value, error, valid, touched })
        return { valid, error };
    }
    console.log(event)

    useEffect(() => {
        fetch("http://localhost:8080/getCategoryList")
            .then(resp => resp.json())
            .then(cat => setAllcat(cat))
    }, []);
    console.log(allcat);
    //event handling of Submit Button
    const sendData = (e) => {
        e.preventDefault();
        console.log(event);
        //console.log(JSON.stringify(event));
        //oject for REST Api 
        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({event_name: event.event_name.value, location: event.location.value,
                datetime: event.datetime.value, duration: event.duration.value, overview: event.overview.value,
                difficulty_level: event.difficulty_level.value, thing_to_carry: event.thing_to_carry.value, pickup_location: event.pickup_location.value, 
                pickup_time: event.pickup_time.value,drop_location: event.drop_location.value, 
                drop_time: event.drop_time.value,inclusion: event.inclusion.value,exclusion: event.exclusion.value,safety_guideline: event.safety_guideline.value,
                rulebook: event.rulebook.value,cancellation_policy: event.cancellation_policy.value,
                price: event.price.value,total_seat: event.total_seat.value,category_id: event.category_id.value,
                organizer_id: event.organizer_id.value})




        }
        fetch("http://localhost:8080/addEvent", reqOptions)  //fetch api
            .then(resp => resp.text())
        alert("Event Data Send To REST Api ");



    }

    return (

        <div class="mx-auto col-10 col-md-8 col-lg-6">
            <br />
            <h5>Event Details</h5>
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="category_id"> Select Category: </label>
                        <select name="category_id" className="form-select" onChange={(e) => { validateData("event_name", e.target.value) }} >
                            <option>Select</option>
                            {
                                allcat.map(cat => {
                                    return <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="event_name"> Event Name : </label>
                        <input type="text" name="event_name" className="form-control" placeholder="Event Name"
                             value={event.event_name.value} onChange={(e) => { validateData("event_name", e.target.value) }} />
                             <div id="eventnm" className="form-text" style={{ display: (!event.event_name.valid && event.event_name.touched) ? "block" : "none" }}>
                             {event.birthdate.error}
                             </div> 
                    </div>
                             
                </div>
                

                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="location"> location : </label>
                        <input type="text" name="location" className="form-control" placeholder="location Name"
                             value={event.location.value} onChange={(e) => { validateData("location", e.target.value) }} />
                             <div id="first_nameHelp" className="form-text" style={{ display: (!event.location.valid && event.location.touched) ? "block" : "none" }}>
                                 {event.location.error}
                             </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="datetime"> datetime : </label>
                        <input type="datetime-local" name="datetime" className="form-control"
                            value={event.datetime.value} onChange={(e) => { validateData("datetime", e.target.value) }} />
                            <div id="datetimemeHelp" className="form-text" style={{ display: (!event.datetime.valid && event.datetime.touched) ? "block" : "none" }}>
                                {event.datetime.error}
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="duration"> duration : </label>
                        <input type="text" name="duration" className="form-control"
                             value={event.duration.value} onChange={(e) => { validateData("duration", e.target.value) }} />
                             <div id="durationHelp" className="form-text" style={{ display: (!event.duration.valid && event.duration.touched) ? "block" : "none" }}>
                                 {event.duration.error}
                             </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="overview"> overview : </label>
                        <input type="text" name="overview" className="form-control" value={event.overview.value}
                           onChange={(e) => { validateData("event_name", e.target.value) }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="difficulty_level"> difficulty_level Name : </label>
                        <input type="text" name="difficulty_level" className="form-control" value={event.difficulty_level.value} onChange={(e) => { validateData("difficulty_level", e.target.value) }} />
                             <div id="fdifficulty_levelHelp" className="form-text" style={{ display: (!event.difficulty_level.valid && event.difficulty_level.touched) ? "block" : "none" }}>
                                 {event.difficulty_level.error}
                             </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="thing_to_carry"> thing_to_carry : </label>
                        <input type="text" name="thing_to_carry" className="form-control"
                           onChange={(e) => { validateData("event_name", e.target.value) }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="pickup_location"> pickup_location : </label>
                        <input type="text" name="pickup_location" className="form-control"
                            value={event.pickup_location.value} onChange={(e) => { validateData("pickup_location", e.target.value) }} />
                            <div id="pickup_locationHelp" className="form-text" style={{ display: (!event.pickup_location.valid && event.pickup_location.touched) ? "block" : "none" }}>
                                {event.pickup_location.error}
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="pickup_time"> pickup_time : </label>
                        <input type="datetime-local" name="pickup_time" className="form-control" value={event.pickup_time.value}
                            onChange={(e) => { validateData("pickup_time", e.target.value) }} />
                            <div id="pickup_timeHelp" className="form-text" style={{ display: (!event.pickup_time.valid && event.pickup_time.touched) ? "block" : "none" }}>
                                {event.pickup_time.error}
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="drop_location"> drop_location : </label>
                        <input type="text" name="drop_location" className="form-control" placeholder="Event Name"
                            value={event.drop_location.value} onChange={(e) => { validateData("drop_location", e.target.value) }} />
                            <div id="drop_locationHelp" className="form-text" style={{ display: (!event.drop_location.valid && event.drop_location.touched) ? "block" : "none" }}>
                                {event.drop_location.error}
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="drop_time"> drop_time : </label>
                        <input type="datetime-local" name="drop_time" className="form-control"
                            value={event.drop_time.value} onChange={(e) => { validateData("drop_time", e.target.value) }} />
                            <div id="drop_timeHelp" className="form-text" style={{ display: (!event.drop_time.valid && event.drop_time.touched) ? "block" : "none" }}>
                                {event.drop_time.error}
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="inclusion"> inclusion : </label>
                        <input type="text" name="inclusion" className="form-control"
                           onChange={(e) => { validateData("event_name", e.target.value) }}  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="exclusion"> exclusion : </label>
                        <input type="text" name="exclusion" className="form-control"
                           onChange={(e) => { validateData("event_name", e.target.value) }}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="safety_guideline"> safety_guideline : </label>
                        <input type="text" name="safety_guideline" className="form-control"
                           onChange={(e) => { validateData("event_name", e.target.value) }}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="rulebook"> rulebook : </label>
                        <input type="text" name="rulebook" className="form-control"
                           onChange={(e) => { validateData("event_name", e.target.value) }}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="cancellation_policy"> cancellation_policy : </label>
                        <input type="text" name="cancellation_policy" className="form-control"
                            onChange={(e) => { validateData("event_name", e.target.value) }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="price"> price : </label>
                        <input type="number" name="price" className="form-control"
                            value={event.price.value} onChange={(e) => { validateData("price", e.target.value) }} />
                            <div id="priceeHelp" className="form-text" style={{ display: (!event.price.valid && event.price.touched) ? "block" : "none" }}>
                                {event.first_name.error}
                            </div>
                    </div>
                </div>
                {/* <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="routemap"> routemap : </label>
                            <input type="file" name="routemap" className="form-control" 
                                onChange={(e) => { dispatch({ type: 'update', fld: 'routemap', val: e.target.value }) }} /> 
                        </div>
                    </div> */}
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="total_seat"> Total Seats : </label>
                        <input type="number" name="total_seat" className="form-control"
                            value={event.total_seat.value} onChange={(e) => { validateData("total_seat", e.target.value) }} />
                            <div id="first_nameHelp" className="form-text" style={{ display: (!event.total_seat.valid && event.total_seat.touched) ? "block" : "none" }}>
                                {event.total_seat.error}
                            </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <br/>
                        <div className="mb-3">
                        <br />
                        <button type="submit" class="btn btn-success" disabled={event.event_name.valid && event.location.valid && event.datetime.valid && event.duration.valid && event.difficulty_level.valid && event.pickup_location.valid
                            && event.pickup_time.valid && event.drop_location.valid && event.drop_time.valid && event.price.valid && event.total_seat.valid ? false : true} onClick={(e) => { sendData(e) }}>Create Account</button>
                        <Button variant="info" type="reset" onClick={() => { dispatch({ type: 'reset' }) }} >
                            Reset
                        </Button>
                    </div>
                    </div>
                </div>
            </form>

            <p>{JSON.stringify(event)}</p> 
            {/* <p>{msg}</p>  */}

        </div>
    )

}
export default AddEventWithValid;