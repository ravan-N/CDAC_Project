import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function ParticipantReg() {

    const init = {
        first_name: { value: "", touched: false, valid: false, error: "" },
        last_name: { value: "", touched: false, valid: false, error: "" },
        email: { value: "", touched: false, valid: false, error: "" },
        birthdate: { value: "", touched: false, valid: false, error: "" },
        gender: { value: "", touched: false, valid: false, error: "" },
        city: { value: "", touched: false, valid: false, error: "" },
        mobile: { value: "", touched: false, valid: false, error: "" },
        question_id: { value: "", touched: false, valid: false, error: "" },
        answer: { value: "", touched: false, valid: false, error: "" },
        user_name: { value: "", touched: false, valid: false, error: "" },
        password: { value: "", touched: false, valid: false, error: "" },
        //confirmpassword: { value: "", touched: false, valid: false, error: "" },
        //status:1,
        formvalid: false
    }



    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                const { name, value, touched, valid, error, formvalid } = action.data
                //console.log(formvalid)
                return { ...state, [name]: value, formvalid }
                //return { ...state, [name]: { value, touched, valid, error }, formvalid }

            case 'reset':
                return init;

        }
    }

    const [state, dispatch] = useReducer(reducer, init);
    const [pwdtype, setPwdtype] = useState("password");
    const [allque, setAllque] = useState([]);
    const navigate=useNavigate();

    //To fetch question List
    useEffect(()=>{
                    fetch("http://localhost:8080/getQueList")
                    .then(resp => resp.json()) 
                    .then(que => setAllque(que))
                    }, []);

    const validateData = (name, value) => {
        let valid = false;
        let error = "";
        switch (name) {
            case 'first_name': var pattern = /^[A-Z][a-z]{2,15}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "First name invalid"
                }
                break;
            case 'last_name': var pattern = /^[A-Z][a-z]{2,15}$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "Last name invalid"
                }
                break;
            case 'email': var pattern = /^[A-Za-z0-9_.-]{3,15}@gmail.com$/
                if (pattern.test(value)) {
                    valid = true;
                    error = "";
                }
                else {
                    valid = false;
                    error = "Email invalid"
                }
                break;


            case 'user_name': var pattern = /^[A-Za-z0-9_.-]{3,10}$/
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
            // case 'confirmpassword':
            //     if (state.password.value === value) {
            //         valid = true;
            //         error = "";
            //     }
            //     else {
            //         valid = false;
            //         error = "Passwords do not match"
            //     }
            //     break;

        }
        return { valid, error };
    }

    const handleChange = (name, value) => {
        const { valid, error } = validateData(name, value)
        let formvalid = true;
        /*if(state.firstName.valid === true && state.lastName.valid === true && state.email.valid === true && state.password.valid === true && state.confirmpassword.valid === true)
            formvalid = true;*/
        for (const key in state) {
            console.log(key + " : " + state[key].valid)
            if (state[key].valid === false) {
                formvalid = false;
                break;
            }
        }
        console.log(formvalid)
        dispatch({ type: 'update', data: { name, value  } })
        //dispatch({ type: 'update', data: { name, value, touched: true, valid, error, formvalid } })
    }

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
        console.log(state);
        //oject for REST Api 
        const reqOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(state)
                // user_name: user.user_name,
                // password: user.password
        
        }
    
        fetch("http://localhost:8080/regParticipant", reqOptions)
        // .then(resp => resp.text())
        // alert("Account req raised");
        .then(resp=>{
            if(resp.ok)
            {
                alert("Registration Successfull!!!!");
                navigate("/login");
                //return resp.text();

            }
            else{
                throw new Error("server error");

            }
            
        })
        .catch((error)=>alert("server error "));
    }

    return (
        <div>
            <h3>Participant Registration</h3>
            <div class="mx-auto col-10 col-md-8 col-lg-6">

                <form>

                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="first_name"> First Name : </label>
                            <input type="text" name="first_name" className="form-control" placeholder="First Name"
                                onChange={(e) => handleChange("first_name", e.target.value)} />
                            <div className="error-msg"> {state.first_name.error}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="last_name"> Last Name : </label>
                            <input type="text" name="last_name" className="form-control" placeholder="Last Name"
                                onChange={(e) => handleChange("last_name", e.target.value)} />
                            <div className="error-msg"> {state.last_name.error}</div>
                        </div>
                        {/* onChange={handleChange("last_name")} />    */}
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="email"> Email : </label>
                            <input type="email" name="email" className="form-control" placeholder="E-mail"
                                onChange={(e) => handleChange("email", e.target.value)} />

                            <div className="error-msg"> {state.email.error}</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="birthdate"> Birthdate: </label>
                            <input type="date" name="birthdate" className="form-control"
                                onChange={(e) => handleChange("birthdate", e.target.value)} />

                            <div className="error-msg"> {state.birthdate.error}</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="gender">Please Select Gender</label>

                            <label>
                                <input type='radio' name='gender' value='Male'
                                    onChange={(e) => handleChange("gender", e.target.value)}
                                />
                                Male
                            </label>

                            <label >
                                <input type='radio' name='gender' value='Female'
                                    onChange={(e) => handleChange("gender", e.target.value)}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="mobile"> mobile: </label>
                            <input type="text" name="mobile" className="form-control"
                                onChange={(e) => handleChange("mobile", e.target.value)} />

                            <div className="error-msg"> {state.mobile.error}</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="city"> Enter city: </label>
                            <input type="text" name="city" className="form-control"
                                onChange={(e) => handleChange("city", e.target.value)} />

                            <div className="error-msg"> {state.city.error}</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="question_id"> Select Security Que: </label>
                            <select name="question_id" className="form-select" onChange={(e) => handleChange("question_id", e.target.value)} > 
                            <option>Select</option>
                            {
                                allque.map(que => {
                                            return <option key={que.question_id} value={que.question_id}>{que.question}</option>
                                            })
                            }
                            </select>
                            <div className="error-msg"> {state.question_id.error}</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="answer"> Enter answer: </label>
                            <input type="text" name="answer" className="form-control"
                                onChange={(e) => handleChange("answer", e.target.value)} />

                            <div className="error-msg"> {state.answer.error}</div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="user_name">  User Name: </label>
                        <input type="text" name="user_name" className="form-control" placeholder="User Name"
                            onChange={(e) => handleChange("user_name", e.target.value)} />
                        <div className="error-msg"> {state.user_name.error}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="password"> Password : </label>
                            <div className="input-group">
                                <input type={pwdtype} name="password" className="form-control" onChange={(e) => handleChange("password", e.target.value)}  placeholder="Password" />
                                <button type="button" className="btn btn-primary" onClick={() => { setPwdtype(pwdtype === "password" ? "text" : "password") }} >
                                    {pwdtype === "password" ? <i className="fa fa-eye-slash" /> : <i className="fa fa-eye" />}
                                </button>
                            </div>
                            <div className="error-msg"> {state.password.error} </div>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="confirmpassword"> Confirm Password : </label>
                            <input type="password" name="confirmpassword" className="form-control" placeholder="Confirm Password"
                                onChange={(e) => handleChange("confirmpassword", e.target.value)}
                                onBlur={(e) => onFocusout("confirmpassword", e.target.value)} />
                            <div className="error-msg"> {state.confirmpassword.error}</div>
                        </div>
                    </div>  */}
                    
                    <div className="mb-3">
                        <button type="submit" disabled={state.formvalid} onClick={(e)=>{sendData(e)}}>Create Account</button>  
                    </div>

                </form>
                {JSON.stringify(state)}
            </div>
            {/* < div>
            <Link to="/" className='nav-link px-3'>Click here to login &nbsp;&nbsp;&nbsp;&nbsp; </Link>
            </div>            */}
        </div>
    )
}
export default ParticipantReg;