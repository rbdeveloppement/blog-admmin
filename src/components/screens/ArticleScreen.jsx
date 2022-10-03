import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ArticleScreen() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("http://blog.api/article/0", {
            method: "POST",
            body: JSON.stringify({with:['appuser','theme']})
        })
        .then(resp => resp.json())
        .then(json => { 
            setArticles(json)
        });

    }, [])

    const navigate = useNavigate();

    return ( <>
        <h1>Liste des articles</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">titre</th>
                    <th scope="col">date publication</th>
                    <th scope="col">auteur</th>
                    <th scope="col">thème</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody>
                {articles.map(article => { console.log(article)
                    return(<tr key={article.Id_article} onClick={()=>{navigate(`/article/${article.Id_article}`);}}>
                        <td>{article.title}</td>
                        <td>{new Date(article.created_at).toLocaleString()}</td>
                        <td>{article.author.pseudo}</td>
                        <td>{article.theme.title}</td>
                        <td></td>
                    </tr>);
                })}
            </tbody>
        </table>
    </> );
}

export default ArticleScreen;