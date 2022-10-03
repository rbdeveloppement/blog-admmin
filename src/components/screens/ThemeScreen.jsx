import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFileUpload } from "../../hooks/useFileUpload";


function ThemeScreen() {

    const [themes, setThemes] = useState([]);
    const [newTheme, setNewTheme] = useState(null);
    const [isValid,setIsValid] = useState(false);
    const inputRef = useRef(null);

    const [file, selectFile, clearFile] = useFileUpload();

    const getAllData = () => fetch("http://blog.api/theme")
    .then(resp => resp.json())
    .then(json => {
        json = json.sort((a,b) => {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        });
        setThemes(json);
        setTimeout(()=> {
            setNewTheme(null);
        }, 1000)
    });

    useEffect(() => {
        getAllData();
    }, [])

    useEffect(()=> {
        inputRef.current?.focus()
    })

    const navigate = useNavigate();

    const addTheme = () => {
        setIsValid(false);
        clearFile();
        const allThemes = [...themes];
        allThemes.unshift({Id_theme:null, title:"", is_deleted:0});
        setThemes(allThemes);
    }

    const cancelTheme = () => {
        const allThemes = [...themes];
        allThemes.shift();
        setThemes(allThemes);
    }
    
    const createTheme = () => {
        
        const formData = new FormData();
        formData.append('0', file.file);
        fetch("http://blog.api/upload/theme", {
             method: 'POST',
             body: formData
        }).then(resp => resp.json())
        .then(json => {
            console.log(json);
            if(json){
                const body = JSON.stringify({title:inputRef.current?.value, img_src:json.src ,is_deleted:0})
                fetch("http://blog.api/theme/", {
                    method: "POST",
                    body: body
                }).then(resp => resp.json())
                .then(json => {
                    setNewTheme(json);
                    getAllData();
                })
            }
        })
    }

    return ( <>
        <h1>Liste des thèmes</h1>
        <button type="button" className="btn btn-success" onClick={addTheme} disabled={themes.find(item => !item.Id_theme)}>Nouveau thème</button>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">nom</th>
                    <th scope="col">image</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody>
            {themes.map(theme => {
                    return(
                    theme.Id_theme ?
                        <tr key={theme.Id_theme} onClick={()=>{navigate(`/theme/${theme.Id_theme}`);}} className={newTheme?.Id_theme === theme.Id_theme ? "bg-success opacity-75" : ""}>
                            <td>{theme.title}</td>
                            <td>{theme.img_src ? <img src={theme.img_src} 
                                                    alt={theme.title} 
                                                    style={{height: '60px'}}/> 
                                                : "pas d'image"
                                }
                            </td>
                            <td></td>
                        </tr>
                        :
                        <tr key={0} >
                            <td><input type="text" ref={inputRef} placeholder="Nouveau thème" className="w-100" onChange={()=>setIsValid(inputRef.current?.value)}/></td>
                            <td>
                                <button className="btn btn-sm btn-info me-1"
                                        onClick={() =>
                                        selectFile({ accept: 'image/*' }, ({ name, size, src, file }) => {
                                            console.log('Files Selected', { name, size, src, file })
                                        })
                                        }
                                    >
                                    Upload
                                </button>
                                {file?.src ? <img src={file?.src} alt={"preview"} style={{height: '60px'}}/> : ""}
                            </td>
                            <td>
                            <button type="button" className="btn btn-sm btn-success me-1" onClick={createTheme} disabled={!isValid}>V</button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={cancelTheme}>X</button>
                            </td>
                            
                        </tr>
                        
                        )
                })}
            </tbody>
        </table>
    </> );
}

export default ThemeScreen;