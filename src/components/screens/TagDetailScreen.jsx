import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TagDetailScreen() {

    const {id} = useParams();
    const [tag, setTag] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/tag/"+id, {
                method: "POST",
                body: JSON.stringify({with:[{article: "article_tag"}]})
            })
            .then(resp => resp.json())
            .then(json => {
                setTag(json)
            });

    }, [id]);

    return ( <>
        <h1>Détail du mot-clé : {tag?.title}</h1>
        <h4>Liste des articles reliés</h4>
        <div>
            {
                tag?.articles_list.map(art => {
                    return <div className=""><b>{art.title}</b> publié le : {art.created_at}</div>;
                })
            }
        </div>
    </> );
}

export default TagDetailScreen;