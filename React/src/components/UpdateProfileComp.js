import { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';

export default function UpdateProfileComp() {


    //const [profile, setProfile]=useState([]);
    //const [user,setUser]=useState([]);
    const navigate = useNavigate();
    const userid = JSON.parse(localStorage.getItem("loggedUser"));
    const participantid = JSON.parse(localStorage.getItem("loggedParticipant"));

    // useEffect(()=>{

    //     setProfile(participantid);
    //     console.log(participantid);
    //     setUser(userid);
    //     console.log(userid);
    //     }, []);

    const init = {


        user_name: userid.user_name,
        password: userid.password,
        first_name: participantid.first_name,
        last_name: participantid.last_name,
        birthdate: participantid.birthdate,
        gender: participantid.gender,
        city: participantid.city,
        mobile: participantid.mobile,
        email: participantid.email
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val }
            case 'reset':
                return init;
        }
    }

    const [info, dispatch] = useReducer(reducer, init);


    //setProfile(userid);
    //console.log(userid);


    const sendData = (e) => {

        e.preventDefault();

        const reqOptions = {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(info)
        }
        console.log(userid.user_id);
        fetch("http://localhost:8080/setUserinfo?userid=" + userid.user_id, reqOptions)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();

                }
                else {
                    throw new Error("server error");

                }
            })
            .then((obj) => {
                <h4>user profile updated</h4>
            })
        fetch("http://localhost:8080/setParticipantinfo?userid=" + userid.user_id, reqOptions)
            .then(resp => {
                if (resp.ok) {
                    alert("your profile updated successfully");
                    navigate("/participant_home");
                    return resp.json();


                }
                else {
                    throw new Error("server error");

                }
            })
            .then((obj) => {
                <h1>participant profile updated</h1>
            })
    }

    return (
        <div class="mx-auto col-10 col-md-8 col-lg-6">
            <br />
            <h5>Update Profile</h5>
            <br />
            <div className="container">

                <form>

                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="user_name"> User Name : </label>
                            <input type="text" name="user_name" className="form-control" value={info.user_name}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'user_name', val: e.target.value }) }} />

                        </div>

                        <div className="col-md-6">
                            <label htmlFor="password"> Password : </label>
                            <input type="password" name="password" className="form-control" value={info.password}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'password', val: e.target.value }) }} />

                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="first_name"> First Name : </label>
                            <input type="text" name="first_name" className="form-control" value={info.first_name}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'first_name', val: e.target.value }) }} />


                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="last_name"> Last Name : </label>
                            <input type="text" name="last_name" className="form-control" value={info.last_name}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'last_name', val: e.target.value }) }} />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="birthdate"> Birthdate : </label>
                            <input type="date" name="birthdate" className="form-control" value={info.birthdate}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'birthdate', val: e.target.value }) }} />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="gender">Please Select Gender</label>

                            <label>
                                <input type='radio' name='gender' value='Male'
                                    onChange={(e) => { dispatch({ type: 'update', fld: 'gender', val: e.target.value }) }}
                                />
                                Male
                            </label>

                            <label >
                                <input type='radio' name='gender' value='Female'
                                    onChange={(e) => { dispatch({ type: 'update', fld: 'gender', val: e.target.value }) }}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="city">city: </label>
                            <input type="text" name="city" className="form-control" value={info.city}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'city', val: e.target.value }) }} />


                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="mobile"> mobile: </label>
                            <input type="text" name="mobile" className="form-control" value={info.mobile}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'mobile', val: e.target.value }) }} />


                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="email"> Email: </label>
                            <input type="text" name="email" className="form-control" value={info.email}
                                onChange={(e) => { dispatch({ type: 'update', fld: 'email', val: e.target.value }) }} />


                        </div>
                    </div>

                    <div className="mb-3">
                        <br />
                        <button type="submit" value="update" onClick={(e) => { sendData(e) }}>Update</button>
                    </div>

                    {/*
    <h5>name {profile.first_name}{profile.last_name}</h5> 
    <p>{JSON.stringify(info)}</p>
        
    <p>{JSON.stringify(info)}</p>
    */}


                </form></div>
        </div>


    )

}


