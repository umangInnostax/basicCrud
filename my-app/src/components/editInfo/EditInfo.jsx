import {useState } from "react"
import "./EditInfo.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editUserInfo } from "../../store/slice/userSlice";

export function EditInfo({user}){
    // const [name, setName] = useState(user.name);
    // const [address, setAddress] = useState(user.address);
    // const [mobileNo, setMobileNo] = useState(user.mobileNo);
    // const [position, setPosition] = useState(user.position);
    
    const [editUser, setEditUser] = useState(user);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        if(editUser.name === ""){
            alert("Data is incompleted");
        }
        else{
            console.log(user);
            fetch(`http://localhost:8080/practiceCrud/editUserInfo/${user.userId}`, {
                method: 'PUT',
                body: JSON.stringify(editUser),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                 .then((response) => response.text())
                 .then((data) => {
                    console.log(data);
                    dispatch(editUserInfo(editUser));
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
                        <td><input type="text" value={editUser.name} onChange={(e)=>{setEditUser({...editUser, "name": e.target.value})}}/></td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td><input type="text" value={editUser.address} onChange={(e)=>{setEditUser({...editUser, "address": e.target.value})}}/></td>
                    </tr>
                    <tr>
                        <th>Mobile No:</th>
                        <td><input type="text" value={editUser.mobileNo} onChange={(e)=>{setEditUser({...editUser, "mobileNo": e.target.value})}}/></td>
                    </tr>
                    <tr>
                        <th>Position:</th>
                        <td><input type="text" value={editUser.position} onChange={(e)=>{setEditUser({...editUser, "position": e.target.value})}}/></td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit" >Submit</button>
            </form>
            </div>
        </>
    )
}