import { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { json, Link, useNavigate } from 'react-router-dom';
import { login} from './slice';
export default function LoginComp2(){

    const init={

      user_name: { value: "", touched: false, valid: false, error: "" },
      password: { value: "", touched: false, valid: false, error: "" },
    }
    
    const reducer = (state,action) => {
      switch(action.type)
      {
          case 'update':
              return {...state , [action.fld]: {  ...state[action.fld],value: action.value, error: action.error, valid: action.valid, touched: action.touched}}
          case 'reset' :
              return init;   
      }
  }
    const [info,dispatch]=useReducer(reducer,init);
    const [msg,setMsg]=useState("");
    const [allque, setAllque] = useState([]);
    const navigate=useNavigate();
    const reduxAction=useDispatch();


    const validateData = (name, value) => {
      console.log(name+" : "+value)
        let valid = false;
        let error = "";
        let touched = true;
        switch (name) 
        {
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
        }
        console.log(value+","+error+","+valid)
        dispatch({type: 'update', fld: name,value: value,error, valid, touched})
        return { valid, error };

    }

    const sendData=(e)=>
    {

        e.preventDefault();
        const reqOptions=
        {

            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({user_name:info.user_name.value,password:info.password.value})
        }
        fetch("http://localhost:8080/checkLogin",reqOptions)
        .then(resp=>{
            if(resp.ok)
            {
                return resp.text();

            }
            else{
                throw new Error("server error");

            }
        })
        .then(text=>text.length?JSON.parse(text):{})
        .then(obj=>{
            if(Object.keys(obj).length===0)
                    {
                        console.log(Object.keys(obj).length)
                        setMsg("wrong uername/password")
                    }
            else
            {
                localStorage.setItem("loggedUser",JSON.stringify(obj));
                if(obj.status===0)
                {
                    alert("req has not been approved");
                    //localStorage.setItem("status",JSON.stringify(obj.status));
                    


                }
                else
                {

                    reduxAction(login());
                    console.log(obj);
                   // localStorage.setItem("loggedUser",JSON.stringify(obj));
                    if(obj.user_type_id.user_type_id===1)
                    {
                        navigate("/participant_home");
                    }
                    else if(obj.user_type_id.user_type_id===2)
                    {
                        navigate("/organizer_home");
                    }
                    else if(obj.user_type_id.user_type_id===3)
                    {
                        navigate("/admin_home");
                    }
                }
            }



        })
    .catch((error)=>alert("server error try after some time"));
       
    }


return(

<div class="mx-auto col-10 col-md-8 col-lg-4" >
            <br />
            <h5>Login</h5>
            <br />
            <form action="" method="post">
                <Form.Group className="mb-3" controlId="user_name" name="user_name" value={info.user_name}>
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                        onChange={(e) => { validateData("user_name", e.target.value) }}
                        
                    />
                    <div id="user_nameHelp" className="form-text" style={{display: (!info.user_name.valid&&info.user_name.touched)?"block":"none"}}>
                            {info.user_name.error}
                    </div>

                </Form.Group>

                <Form.Group className="mb-3" controlId="password" name="password" value={info.password}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                        onChange={(e) => { validateData("password", e.target.value) }}
                    />
                    <div id="passwordHelp" className="form-text" style={{display: (!info.password.valid&&info.password.touched)?"block":"none"}}>
                            {info.password.error}
                        </div>
                </Form.Group>

                <Button variant="info" disabled={ info.user_name.valid && info.password.valid ? false:true } type="submit" onClick={(e) => { sendData(e) }}>
                    Login
                </Button>&nbsp;&nbsp;
                <Button variant="info" type="reset" onClick={() => { dispatch({ type: 'reset' }) }}>
                    Clear
                </Button>
            </form>
            <div>
                {/* <br /> */}
                <h6>Forgot Password
                    <Link to="/forgotpassword" className='nav-link px-3 text-primary'> Click here &nbsp;&nbsp;&nbsp;&nbsp; </Link>
                </h6>
            </div>
            {/* <p>{JSON.stringify(info)}</p>*/}
            <p>{msg}</p> 
        </div>
)


}