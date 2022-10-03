import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ThemeDetailScreen() {

    const {id} = useParams();
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/themeDetail/"+id)
            .then(resp => resp.json())
            .then(json => { 
                setTheme(json)
            });

    }, [id]);

    return ( <>
        <h1>Détail du thème : {theme?.title}</h1>
        <img src={theme?.img_src} alt={theme?.title} style={{width:'300px'}}/>
        <br/><br/>
        <h4>Liste des articles</h4>
        {theme?.articles_list.map(article => {
            return <div><b className="me-2">{article.title}</b> 
                publié le {new Date(article.created_at).toLocaleString()} 
                <span className="ms-2">par {article?.author?.pseudo}</span>
            </div>
        })

        }
    </> );
}

export default ThemeDetailScreen;