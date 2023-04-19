import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordComp() {
    const userid = JSON.parse(localStorage.getItem("userinfo"));
    console.log(userid.user_id);

    const init = {

        password: "",
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
    const navigate = useNavigate();



    const sendData = (e) => {
        console.log("in send data")
        console.log(userid.user_id);
        e.preventDefault();
        //setanswer(info);
        const reqOptions =
        {

            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(info)
        }

        fetch("http://localhost:8080/resetPassword?userid=" + userid.user_id, reqOptions)
            .then(resp => {
                if (resp.ok) {
                    alert("password reset successfully")
                    return resp.json();

                }
                else {
                    throw new Error("server error");

                }
            })
            .then(obj => {

                navigate("/login");
            })





    }

    return (

        <div class="mx-auto col-10 col-md-8 col-lg-4">
            <br/>
            <form>
                <table className="table table-border table-striped text-primary" >

                    <tr>
                        <td>Enter New Password:</td>
                        <td><input type="password" name="password" value={info.password}
                            onChange={(e) => { dispatch({ type: 'update', fld: 'password', val: e.target.value }) }} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td ><input type="submit" value="submit" onClick={(e) => { sendData(e) }} /></td>
                    </tr>
                </table>
            </form>


        </div>

    )
}