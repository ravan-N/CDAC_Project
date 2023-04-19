import { useDebugValue, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function NewPartReg() {

    const init = {
        first_name: { value: "", touched: false, valid: false, error: "" },
        last_name: { value: "", touched: false, valid: false, error: "" },
        email: { value: "", touched: false, valid: false, error: "" },
        birthdate: { value: "", touched: false, valid: false, error: "" },
        gender: { value: "", touched: false, valid: false, error: "" },
        city: { value: "", touched: false, valid: false, error: "" },
        mobile: { value: "", touched: false, valid: false, error: "" },
        question_id: { value: 0, touched: false, valid: false, error: "" },
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

    const [info, dispatch] = useReducer(reducer, init);
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
        console.log(name + " : " + value)
        let valid = false;
        let error = "";
        let touched = true;
        switch (name) {
            case 'first_name': var pattern = /^[A-Z]{1}[a-z]{2,15}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "First name invalid"
                }
                break;
            case 'last_name': var pattern = /^[A-Z]{1}[a-z]{2,15}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "Last name invalid"
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
            case 'birthdate':
                console.log("in birthdate case")
                const date = new Date(value);
                const curdate=new Date();
                if(curdate.getFullYear()-date.getFullYear() < 15 )
                {
                    error = 'Not Allowed....Age should be above 15 years';
                    valid = false;
                }
                else {
                    error = "";
                    valid = true;
                }
                break;


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


            case 'password': var pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{5,}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "Password invalid"
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
            case 'gender':
                console.log("in gender case")
                if (value === "") {
                    error = 'select one';
                    valid = false;
                }
                else {
                    error = "";
                    valid = true;
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
            case 'city': var pattern = /^[A-Za-z]{3,15}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "User name invalid"
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
    // console.log(formvalid)
    //dispatch({ type: 'update', data: { name, value  } })
    //dispatch({ type: 'update', data: { name, value, touched: true, valid, error, formvalid } })
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
    //    //dispatch({ type: 'update', data: { name, value, touched: true, valid, error, formvalid } })
    // }

    const sendData = (e) => {
        e.preventDefault();
        console.log(info);
        //oject for REST Api 
        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                first_name: info.first_name.value, last_name: info.last_name.value,
                email: info.email.value, birthdate: info.birthdate.value, gender: info.gender.value,
                city: info.city.value, mobile: info.mobile.value, question_id: info.question_id.value, answer: info.answer.value,
                user_name: info.user_name.value, password: info.password.value
            })


        }

        fetch("http://localhost:8080/regParticipant", reqOptions)
            // .then(resp => resp.text())
            // alert("Account req raised");
            .then(resp => {
                if (resp.ok) {
                    alert("Registration Successfull!!!!");
                    navigate("/login");
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
            <h5>Participant Registration</h5>
            <br />
            <div className="container">

                <form>

                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="first_name"> First Name : </label>
                            <input type="text" name="first_name" className="form-control" placeholder="First Name"
                                value={info.first_name.value} onChange={(e) => { validateData("first_name", e.target.value) }} />
                            <div id="first_nameHelp" className="form-text" style={{ display: (!info.first_name.valid && info.first_name.touched) ? "block" : "none" }}>
                                {info.first_name.error}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="last_name"> Last Name : </label>
                            <input type="text" name="last_name" className="form-control" placeholder="Last Name"
                                onChange={(e) => { validateData("last_name", e.target.value) }} />
                            <div id="last_nameHelp" className="form-text" style={{ display: (!info.last_name.valid && info.last_name.touched) ? "block" : "none" }}>
                                {info.last_name.error}
                            </div>
                            {/* onChange={handleChange("last_name")} />    */}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="email"> Email : </label>
                            <input type="email" name="email" className="form-control" placeholder="E-mail"
                                onChange={(e) => { validateData("email", e.target.value) }} />

                            <div id="email" className="form-text" style={{ display: (!info.email.valid && info.email.touched) ? "block" : "none" }}>
                                {info.email.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="birthdate"> Birthdate: </label>
                            <input type="date" name="birthdate" className="form-control"
                                onChange={(e) => { validateData("birthdate", e.target.value) }} />

                            <div id="birthdateHelp" className="form-text" style={{ display: (!info.birthdate.valid && info.birthdate.touched) ? "block" : "none" }}>
                                {info.birthdate.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="gender">Please Select Gender</label>

                            <label>
                                <input type='radio' name='gender' value='male'
                                    onChange={(e) => { validateData("gender", e.target.value) }}
                                />
                                Male
                            </label>

                            <label >
                                <input type='radio' name='gender' value='female'
                                    onChange={(e) => { validateData("gender", e.target.value) }}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="mobile"> mobile: </label>
                            <input type="text" name="mobile" className="form-control"
                                onChange={(e) => { validateData("mobile", e.target.value) }} />

                            <div id="mobileHelp" className="form-text" style={{ display: (!info.mobile.valid && info.mobile.touched) ? "block" : "none" }}>
                                mobile            {info.mobile.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="city"> Enter city: </label>
                            <input type="text" name="city" className="form-control"
                                onChange={(e) => { validateData("city", e.target.value) }} />

                            <div id="cityHelp" className="form-text" style={{ display: (!info.city.valid && info.city.touched) ? "block" : "none" }}>
                                {info.city.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="question_id"> Select Security Que: </label>
                            <select name="question_id" className="form-select" onChange={(e) => { validateData("question_id", e.target.value) }} >
                                <option>Select</option>
                                {
                                    allque.map(que => {
                                        return <option key={que.question_id} value={que.question_id}>{que.question}</option>
                                    })
                                }
                            </select>
                            <div id="question_idHelp" className="form-text" style={{ display: (!info.question_id.valid && info.question_id.touched) ? "block" : "none" }}>
                                {info.first_name.error}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="answer"> Enter answer: </label>
                            <input type="text" name="answer" className="form-control"
                                onChange={(e) => { validateData("answer", e.target.value) }} />

                            <div id="answerHelp" className="form-text" style={{ display: (!info.answer.valid && info.answer.touched) ? "block" : "none" }}>
                                {info.answer.error}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="user_name">  User Name: </label>
                        <input type="text" name="user_name" className="form-control" placeholder="User Name"
                            onChange={(e) => { validateData("user_name", e.target.value) }} />
                        <div id="user_nameHelp" className="form-text" style={{ display: (!info.user_name.valid && info.user_name.touched) ? "block" : "none" }}>
                            {info.user_name.error}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="password"> Password : </label>
                            <div className="input-group">
                                <input type="password" name="password" className="form-control" onChange={(e) => { validateData("password", e.target.value) }} placeholder="Password" />

                            </div>
                            <div id="passwordHelp" className="form-text" style={{ display: (!info.password.valid && info.password.touched) ? "block" : "none" }}>
                                {info.password.error}
                            </div>
                        </div>
                    </div>



                    <div className="mb-3">
                        <br />
                        <button type="submit" class="btn btn-success" disabled={info.first_name.valid && info.last_name.valid && info.email.valid && info.birthdate.valid && info.gender.valid && info.city.valid
                            && info.mobile.valid && info.question_id.valid && info.answer.valid && info.user_name.valid && info.password.valid ? false : true} onClick={(e) => { sendData(e) }}>Create Account</button>
                    </div>

                </form>

                {/* {JSON.stringify(info)} */}
            </div>

        </div>
    )
}
export default NewPartReg;