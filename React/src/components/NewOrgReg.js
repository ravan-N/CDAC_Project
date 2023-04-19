import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewOrgReg() {

    const init = {
        organization_name: { value: "", touched: false, valid: false, error: "" },
        registration_no: { value: "", touched: false, valid: false, error: "" },
        email: { value: "", touched: false, valid: false, error: "" },
        city: { value: "", touched: false, valid: false, error: "" },
        mobile: { value: "", touched: false, valid: false, error: "" },
        question_id: { value: "", touched: false, valid: false, error: "" },
        answer: { value: "", touched: false, valid: false, error: "" },
        user_name: { value: "", touched: false, valid: false, error: "" },
        password: { value: "", touched: false, valid: false, error: "" },

    }



    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: { ...state[action.fld], value: action.value, error: action.error, valid: action.valid, touched: action.touched } }
            case 'reset':
                return init;
        }
    }
    const [state, dispatch] = useReducer(reducer, init);
    // const [pwdtype, setPwdtype] = useState("password");
    const [allque, setAllque] = useState([]);
    const navigate = useNavigate();

    //To fetch question List
    useEffect(() => {
        fetch("http://localhost:8080/getQueList")
            .then(resp => resp.json())
            .then(que => setAllque(que))
    }, []);



    const validateData = (name, value) => {
        let valid = false;
        let error = "";
        let touched = true;
        switch (name) {

            case 'user_name': var pattern = /^[A-Za-z]{1}[A-Za-z0-9_.-]{3,10}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "User name invalid"
                }
                break;


            case 'password': var pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{5,15}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "Password invalid"
                }
                break;
            case 'organization_name': var pattern = /^[A-Za-z\s]{2,30}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "User name invalid"
                }
                break;
            case 'registration_no': var pattern = /^[A-Za-z0-9]{2,10}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "User name invalid...it should be only 4 charecters no"
                }
                break;
            case 'email': var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "Email invalid"
                }
                break;
            case 'city': var pattern = /^[A-Za-z]{3,10}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "User name invalid"
                }
                break;
            case 'mobile':
                const exp5 = /^\d{10}$/
                if (!exp5.test(value)) {
                    error = "Invalid contact";
                }
                else {
                    error = "";
                    valid = true;
                }
                break;
            case 'question_id':
                console.log("in question case")
                if (value === 0) {
                    error = 'select one';
                    valid = false;
                }
                else {
                    error = "";
                    valid = true;
                }
                break;
            case 'answer':
                if (value === "") {
                    error = 'can not be blank';
                    valid = false;
                }
                else {
                    error = "";
                    valid = true;
                }
                break;


        }
        console.log(value + "," + error + "," + valid)
        dispatch({ type: 'update', fld: name, value: value, error, valid, touched })
        return { valid, error };

    }

    // const handleChange = (name, value) => {
    //     const { valid, error } = validateData(name, value)
    //     let formvalid = true;
    //     /*if(state.firstName.valid === true && state.lastName.valid === true && state.email.valid === true && state.password.valid === true && state.confirmpassword.valid === true)
    //         formvalid = true;*/
    //     for (const key in state) {
    //         console.log(key + " : " + state[key].valid)
    //         if (state[key].valid === false) {
    //             formvalid = false;
    //             break;
    //         }
    //     }
    //     console.log(formvalid)
    //     dispatch({ type: 'update', data: { name, value, touched: true, valid, error, formvalid } })
    // }

    // const onFocusout = (name, value) => {
    //     const { valid, error } = validateData(name, value)
    //     let formvalid = true;
    //     /*if(state.firstName.valid === true && state.lastName.valid === true && state.email.valid === true && state.password.valid === true && state.confirmpassword.valid === true)
    //         formvalid = true;*/
    //     for (const key in state) {
    //         console.log(key + " : " + state[key].valid)
    //         if (state[key].valid === false) {
    //             formvalid = false;
    //             break;
    //         }
    //     }
    //     dispatch({ type: 'update', data: { name, value, touched: true, valid, error, formvalid } })
    // }

    const sendData = (e) => {
        e.preventDefault();
        console.log(state);
        //oject for REST Api 
        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // body: JSON.stringify(state)
            body: JSON.stringify({
                organization_name: state.organization_name.value, registration_no: state.registration_no.value,
                email: state.email.value, city: state.city.value, mobile: state.mobile.value, question_id: state.question_id.value, answer: state.answer.value, user_name: state.user_name.value,
                password: state.password.value
            })

        }

        fetch("http://localhost:8080/regOrganizer", reqOptions)
            // .then(resp => resp.text())
            // alert("Account req raised");
            .then(resp => {
                if (resp.ok) {
                    alert("Request raised to Approval.");
                    navigate("/");
                    //return resp.text();

                }
                else {
                    throw new Error("server error");

                }

            })
            .catch((error) => alert("server error "));
    }

    return (
        <div class="mx-auto col-10 col-md-8 col-lg-6">
            <br />
            <h5>Organizer Registration</h5>
            <br />
            <div className="container">

                <form>

                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="organization_name"> Organization Name : </label>
                            <input type="text" name="organization_name" className="form-control" placeholder="Organization Name"
                                value={state.organization_name.value} onChange={(e) => { validateData("organization_name", e.target.value) }} />
                            <div id="organization_name" className="form-text" style={{ display: (!state.organization_name.valid && state.organization_name.touched) ? "block" : "none" }}>
                                {state.organization_name.error}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="registration_no"> Registration Number : </label>
                            <input type="text" name="registration_no" className="form-control" placeholder="Registration Number"
                                value={state.registration_no.value} onChange={(e) => { validateData("registration_no", e.target.value) }} />
                            <div id="registration_noHelp" className="form-text" style={{ display: (!state.registration_no.valid && state.registration_no.touched) ? "block" : "none" }}>
                                {state.registration_no.error}
                            </div>
                        </div>
                        {/* onChange={handleChange("last_name")} />    */}
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="email"> Email : </label>
                            <input type="email" name="email" className="form-control" placeholder="E-mail"
                                value={state.email.value} onChange={(e) => { validateData("email", e.target.value) }} />
                            <div id="email2" className="form-text" style={{ display: (!state.email.valid && state.email.touched) ? "block" : "none" }}>
                                {state.email.error}
                            </div>


                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="mobile"> mobile: </label>
                            <input type="text" name="mobile" className="form-control"
                                value={state.mobile.value} onChange={(e) => { validateData("mobile", e.target.value) }} />
                            <div id="mobileHelp" className="form-text" style={{ display: (!state.mobile.valid && state.mobile.touched) ? "block" : "none" }}>
                                {state.mobile.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="city"> Enter city: </label>
                            <input type="text" name="city" className="form-control"
                                value={state.city.value} onChange={(e) => { validateData("city", e.target.value) }} />
                            <div id="cityeHelp" className="form-text" style={{ display: (!state.city.valid && state.city.touched) ? "block" : "none" }}>
                                {state.city.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="question_id"> Select Security Que: </label>
                            <select name="question_id" className="form-select" onChange={(e) => { validateData("question_id", e.target.value) }}  >

                                <option>Select</option>
                                {allque.map(que => {
                                    return <option key={que.question_id} value={que.question_id}>{que.question}</option>
                                })
                                }
                            </select>
                            <div id="question_idHelp" className="form-text" style={{ display: (!state.question_id.valid && state.question_id.touched) ? "block" : "none" }}>
                                {state.question_id.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="answer"> Enter answer: </label>
                            <input type="text" name="answer" className="form-control"
                                onChange={(e) => { validateData("answer", e.target.value) }} />

                            <div id="answerHelp" className="form-text" style={{ display: (!state.answer.valid && state.answer.touched) ? "block" : "none" }}>
                                {state.answer.error}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="user_name">  User Name: </label>
                        <input type="text" name="user_name" className="form-control" placeholder="User Name"
                            value={state.user_name.value} onChange={(e) => { validateData("user_name", e.target.value) }} />
                        <div id="user_nameHelp" className="form-text" style={{ display: (!state.user_name.valid && state.user_name.touched) ? "block" : "none" }}>
                            {state.user_name.error}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="password"> Password : </label>
                            <div className="input-group">
                                <input type="password" name="password" className="form-control" placeholder="Password" value={state.password.value} onChange={(e) => { validateData("password", e.target.value) }} />
                                <div id="passwordHelp" className="form-text" style={{ display: (!state.password.valid && state.password.touched) ? "block" : "none" }}>
                                    {state.password.error}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <br />
                        <button type="submit" class="btn btn-success" disabled={state.organization_name.valid && state.registration_no.valid && state.email.valid && state.city.valid
                            && state.mobile.valid && state.question_id.valid && state.answer.valid && state.user_name.valid && state.password.valid ? false : true} onClick={(e) => { sendData(e) }}>Create Account</button>
                    </div>
                </form>
                {/* {JSON.stringify(state)} */}
            </div>
        </div>
    )
}
export default NewOrgReg;