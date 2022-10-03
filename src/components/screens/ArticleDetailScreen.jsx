import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountScreen() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://blog.api/appuser/0", {
            method: "POST",
            body: JSON.stringify({with:['account','role']})
        })
        .then(resp => resp.json())
        .then(json => { 
            setUsers(json)
        });

    }, [])

    const navigate = useNavigate();

    return ( <>
        <h1>Liste des comptes utilisateurs</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">pseudo</th>
                    <th scope="col">email</th>
                    <th scope="col">role</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    return(<tr key={user.Id_appUser} onClick={()=>{navigate(`/account/${user.Id_appUser}`);}}>
                        <td>{user.pseudo}</td>
                        <td>{user.account?.login}</td>
                        <td>{user.role?.title}</td>
                        <td></td>
                    </tr>);
                })}
            </tbody>
        </table>
    </> );
}

export default AccountScreen;