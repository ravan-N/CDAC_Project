import { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordComp() {

    const init =
    {
        user_name: " ",
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val }
            case 'reset':
                return init;
        }
    }
    const [uname, setUname] = useState([]);
    const [info, dispatch] = useReducer(reducer, init);
    const navigate = useNavigate();
    console.log(info);

    const sendData = (e) => {

        e.preventDefault();
        setUname(info);

        fetch("http://localhost:8080/getQuestions?username="+uname.user_name)
            .then(resp => {
                if (resp.ok) {

                    return resp.json();



                }
                else {
                    throw new Error("server error");

                }
            })
            .then(obj => {
                //JSON.stringify(obj);
                console.log(obj);
                localStorage.setItem("userinfo", JSON.stringify(obj));
                navigate("/questioninfo");

            }
            )
    }

    return (
        <div class="mx-auto col-10 col-md-8 col-lg-4">
            <Form.Group className="mb-3" controlId="user_name" name="user_name" value={info.user_name}>
                <Form.Label>User Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter uername"
                    onChange={(e) => { dispatch({ type: 'update', fld: 'user_name', val: e.target.value }) }}
                />

            </Form.Group>
            <div>
                <Button variant="info" type="submit" onClick={(e) => { sendData(e) }}>
                    submit
                </Button>&nbsp;&nbsp;
                <Button variant="info" type="reset" onClick={() => { dispatch({ type: 'reset' }) }}>
                    Clear
                </Button>
            </div>
        </div>
    )

}

