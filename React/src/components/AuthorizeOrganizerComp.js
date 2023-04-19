import { useEffect, useState } from "react";
export default function AuthorizeOrganizerComp() {

    const [userinfo, setUserinfo] = useState([]);
    //const userid=JSON.parse(localStorage.getItem("loggedUser"));
    useEffect(() => {


        //console.log(userid);
        fetch("http://localhost:8080/getAllUser")
            .then(resp => resp.json())
            .then(obj => {

                console.log(obj);

                //localStorage.setItem("loggedUser", JSON.stringify(obj))
                setUserinfo(obj);
            })

    }, []);


    const sendData = (e) => {
        // e.preventDefault();
        const reqOptions = {

            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userinfo)
        }
        //userinfo.map((v)=>{
        alert(e);
        fetch("http://localhost:8080/changeStatus?user_id=" + e, reqOptions)
            .then(resp => {
                if (resp.ok) {
                    return resp.text();


                }


            })
            .then(text => {
                return <h1>organizer approve</h1>
            })


        //})

    }

    return (

        <div >
            {

                userinfo.map((v) => {

                    return (
                    <div class="mx-auto col-10 col-md-8 col-lg-8">
                        <table class="table table-striped">


                            {/* <tr>
                        <th>User Id</th>
                        <th>Organizer</th>
                        <th>Status</th>
                    </tr> */}
                            <tr>
                                <td>{v.user_id}</td>
                                <td>{v.user_name}</td>
                                <td>{v.status}</td>

                                <td><input type="button" id="approve" value="approve" onClick={() => { sendData(v.user_id) }} /></td>

                            </tr>
                        </table>

                    </div>)
                }


                )}

            {/*   
*/}
        </div>

    )
}
