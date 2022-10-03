import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AccountDetailScreen() {

    const {id} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/appuser/"+id, {
                method: "POST",
                body: JSON.stringify({with:['account','role','article','comment']})
            })
            .then(resp => resp.json())
            .then(json => { 
                setUser(json)
            });
        

    }, [id]);

    return ( <>
        <h1>Détail de l'utilisateur : {user?.pseudo}</h1>
        <b>email :</b> {user?.account?.login}<br/>
        <b>role :</b> {user?.role?.title}<br/>
        <hr/>
        {user?.Id_role === '1' && <>
            <h3>Articles rédigés</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">titre</th>
                        <th scope="col">date publication</th>
                    </tr>
                </thead>
                <tbody>
                    {user?.articles_list.map(article => {
                        return(<tr key={article.Id_article} >
                            <td>{article.title}</td>
                            <td>{new Date(article.created_at).toLocaleString()}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </>}
        {user?.Id_role === '2' && <>
            <h3>Commentaires rédigés</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">titre</th>
                        <th scope="col">date publication</th>
                    </tr>
                </thead>
                <tbody>
                    {user?.comments_list.map(comment => {
                        return(<tr key={comment.Id_comment} >
                            <td>{comment.title}</td>
                            <td>{new Date(comment.created_at).toLocaleString()}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </>}
    </> );
}

export default AccountDetailScreen;