import {useState } from "react"
import "./EditInfo.css"
import { Link } from "react-router-dom";

export function EditInfo({user}){
    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState(user.address);
    const [mobileNo, setMobileNo] = useState(user.mobileNo);
    const [position, setPosition] = useState(user.position);

    // console.log(props);
    const onSubmit = (event) => {
        event.preventDefault();
        if(name==="" || address === "" || mobileNo === "" || position ===""){
            alert("Data is incompleted");
        }
        else{
            fetch(`http://localhost:8080/practiceCrud/editUserInfo/${user.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  "name": name,
                  "address": address,
                  "mobileNo": mobileNo,
                  "position": position
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                 .then((response) => response.text())
                 .then((data) => {
                    console.log(data);
                    // Handle data
                 })
                 .catch((err) => {
                    console.log(err.message);
                 });
        }
    }
    return(
        <>
            <div className="addInfo">
            <Link className="linkButton" to={"../"}><div className="backButton">{"<<"}Back</div></Link>
            <h1>Add the user Information</h1>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <th>Name:</th>
                        <td><input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/></td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td><input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}/></td>
                    </tr>
                    <tr>
                        <th>Mobile No:</th>
                        <td><input type="text" value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}}/></td>
                    </tr>
                    <tr>
                        <th>Position:</th>
                        <td><input type="text" value={position} onChange={(e)=>{setPosition(e.target.value)}}/></td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit" >Submit</button>
            </form>
            </div>
        </>
    )
}