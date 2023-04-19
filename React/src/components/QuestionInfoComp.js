import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionInfoComp() {

    const questionUser = JSON.parse(localStorage.getItem("userinfo"));
    console.log(questionUser.answer);

    const init = {

        answer: ""
    }
    const reducer = (state, action) => {

        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val }
            case 'reset':
                return init;
        }
    }

    //const [answer,setanswer]=useState([]);
    const [info, dispatch] = useReducer(reducer, init);
    const navigate = useNavigate();
    const sendData = (e) => {
        console.log("in send data")
        e.preventDefault();
        //setanswer(info);
        console.log(info.answer + " : " + questionUser.answer);
        if (info.answer === questionUser.answer) {
            alert("answer matched..successfully")
            navigate("/resetpassword");

        }
        else {
            alert("Wrong answer pls enter correct answer")
            navigate("/questioninfo");
        }

    }

    return (
        <div class="mx-auto col-10 col-md-8 col-lg-4">
            <br />
            <table className="table table-border table-striped text-primary" >
                <tr colSpan="2">
                    <td>{questionUser && questionUser.question_id.question}</td>
                    <td></td>

                </tr>
                <tr>
                    <td>Enter your Answer:</td>
                    <td><input type="text" name="answer" value={info.answer}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'answer', val: e.target.value }) }} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td ><input type="button" value="submit" onClick={(e) => { sendData(e) }} /></td>
                </tr>
            </table>


        </div>
    )
}
