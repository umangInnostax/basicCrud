import { Link } from "react-router-dom";
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteUserInfo } from "../../store/slice/userSlice";

export function Home({setUser}){

    const userInfo = useSelector(state => state.users);
    const dispatch = useDispatch();

    const deleteData =async (user) =>{
        await fetch(`http://localhost:8080/practiceCrud/deleteUserInfo/${user.userId}`, {
            method: 'DELETE',
          })
             .then((response) => response.text())
             .then((data) => {
                console.log(data);
                if(data === "SUCCESS"){
                    dispatch(deleteUserInfo(user.userId));
                    alert("Data deleted successfully of "+ user.name);
                }
                else{
                    alert("Data fetching failed");
                }
             })
             .catch((err) => {
                console.log(err.message);
                alert("Data fetching failed");
             });
        
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
                    <td><Link onClick={()=>{deleteData(user)}}>D</Link></td>
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