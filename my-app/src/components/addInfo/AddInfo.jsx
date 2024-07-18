import { useState } from "react"
import "./AddInfo.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../store/slice/userSlice";

export function AddInfo(){

    //dispatch is use if we have to send some data.
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [position, setPosition] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        if(name==="" || address === "" || mobileNo === "" || position ===""){
            alert("Data is incompleted");
        }
        else{
            fetch('http://localhost:8080/practiceCrud/addUserInfo', {
                method: 'POST',
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
                 .then(response => response.json())
                 .then((json) => {
                    if(json){
                        dispatch(addNewUser(json));
                        alert("Data saved successfully");
                        setAddress("");
                        setName("");
                        setMobileNo("");
                        setPosition("");
                    }
                    else{
                        alert("Failed to save the data");
                    }
                 })
                 .catch((err) => {
                    console.log(err.message);
                    alert("Failed to save the data");
                    return;
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