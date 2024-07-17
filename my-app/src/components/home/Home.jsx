import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Home.css'

export function Home({setUser}){
    const [userInfo, setUserInfo] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:8080/practiceCrud/getInfo')
        .then(response => response.json())
        .then(json => setUserInfo(json))
        .catch(error => console.error(error));
    },[])

    const deleteData =async (id) =>{
        await fetch(`http://localhost:8080/practiceCrud/deleteUserInfo/${id}`, {
            method: 'DELETE',
          })
             .then((response) => response.text())
             .then((data) => {
                console.log(data);
                // Handle data
             })
             .catch((err) => {
                console.log(err.message);
             });

        fetch('http://localhost:8080/practiceCrud/getInfo')
        .then(response => response.json())
        .then(json => {console.log('JSON', json);setUserInfo(json)})
        .catch(error => console.error(error));
        
        // window.location.reload();
        alert("Data deleted successfully");
        
    }

    return(
        <>
        <table>
            <thead>
            <tr>
                <th>S.No.</th>
                <th>Name.</th>
                <th>Address</th>
                <th>Mobile No.</th>
                <th>Position</th>
                <th>Delete User</th>
                <th>Edit User</th>
            </tr>
            </thead>
            <tbody>
            {userInfo.map((user, index)=>(
                <tr key={user.userId}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.address}</td>
                    <td>{user.mobileNo}</td>
                    <td>{user.position}</td>
                    <td><Link onClick={()=>{deleteData(user.userId)}}>D</Link></td>
                    <td key={index}><Link to={"../editUser"} onClick={()=>{console.log(user);setUser(user)}}>E</Link></td>
                </tr>
            ))}

            <tr>
                <td colSpan={7}><Link to={"../addNewUser"} className="button">Add New Info</Link></td>
            </tr>
            </tbody>
        </table>
        </>
    )
}