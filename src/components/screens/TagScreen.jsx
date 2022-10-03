import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomMessageAlert from "../customs/CustomMessageAlert";
import CustomYesNoModal from "../customs/CustomYesNoModal";

function TagScreen() {

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState(null);
    const [isValid,setIsValid] = useState(false);
    const [editedTag, setEditedTag] = useState(null);
    const inputRef = useRef(null);

    const getAllData = () => fetch("http://blog.api/tag")
    .then(resp => resp.json())
    .then(json => {
        json = json.sort((a,b) => {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        });
        setTags(json);
        setTimeout(()=> {
            setNewTag(null);
        }, 1000)
    });

    useEffect(() => {
        getAllData();
    }, [])

    useEffect(()=> {
        inputRef.current?.focus()
    })

    const navigate = useNavigate();

    const addTag = () => {
        setIsValid(false);
        const allTags = [...tags];
        allTags.unshift({Id_tag:null, title:"", is_deleted:0});
        setTags(allTags);
    }

    const cancelCreateTag = () => {
        const allTags = [...tags];
        allTags.shift();
        setTags(allTags);
    }
    
    const validCreateTag = () => {
        fetch("http://blog.api/tag/", {
                method: "POST",
                body: JSON.stringify({title:inputRef.current?.value, is_deleted:0})
            }).then(resp => resp.json())
            .then(json => {
                setNewTag(json);
                getAllData();
            })
    }

    const editTag = (tag) => {
        setIsValid(true);
        setEditedTag(tag);
    }

    const validUpdateTag = (tag) => {
        setEditedTag(null);
        fetch("http://blog.api/tag/" + tag.Id_tag, {
                method: "PUT",
                body: JSON.stringify(tag)
            }).then(resp => resp.json())
            .then(json => {
                setNewTag(json);
                getAllData();
            })
    }

    const cancelUpdateTag = () => {
        setEditedTag(null);
    }

    const [modalProps, setModalProps] = useState(null);
    const [alertProps, setAlertProps] = useState(null);
    const deleteTag = (tag) => {
        console.log("deleting tag with id " + tag.Id_tag)
        setModalProps({
            title:"Supression du tag "+tag.title+" ?",
            confirm:()=>{
                fetch("http://blog.api/tag/" + tag.Id_tag, {
                    method: "PATCH",
                })
                .then(resp => resp.json())
                .then(json => {
                    if(json){
                        console.log("tag with id " + tag.Id_tag + " deleted");
                        setAlertProps({
                            type:"danger",
                            message:"Le tag "+tag.title+" à été supprimé.",
                            show:true
                        });
                    }
                    getAllData();
                    setTimeout(()=> {
                        setAlertProps({show:false})
                    }, 1500)
                })
            }
        })
    }

    return ( <>

        <h1>Liste des mots-clés</h1>
        <button type="button" className="btn btn-success mb-2" onClick={addTag} disabled={tags.find(item => !item.Id_tag) || editedTag}>Nouveau mot-clé</button>
        <CustomMessageAlert type={alertProps?.type} message={alertProps?.message} show={alertProps?.show}/>
        <table className="table table-striped mb-5">
            <thead>
                <tr>
                    <th scope="col">mot-clé</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody>
                {tags.map(tag => {
                    if(tag.Id_tag && editedTag?.Id_tag !== tag.Id_tag){
                        return (
                            <tr key={tag.Id_tag} className={newTag?.Id_tag === tag.Id_tag ? "bg-success opacity-75" : ""}>
                                <td>{tag.title}</td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-info me-1" 
                                            onClick={()=>{navigate(`/tag/${tag.Id_tag}`);}} 
                                            disabled={tags.find(item => !item.Id_tag) || editedTag}>
                                        Voir
                                    </button>
                                    <button type="button" className="btn btn-sm btn-primary me-1" 
                                            onClick={() => editTag(tag)} 
                                            disabled={tags.find(item => !item.Id_tag) || editedTag}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-sm btn-danger" 
                                            data-bs-toggle="modal" data-bs-target="#customCheckModal"
                                            onClick={() => deleteTag(tag)} 
                                            disabled={tags.find(item => !item.Id_tag) || editedTag}>
                                        Del.
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    else if(tag.Id_tag && editedTag?.Id_tag === tag.Id_tag){
                        return (
                            <tr key={editedTag?.Id_tag} >
                                <td><input type="text" ref={inputRef} placeholder={tag.title} 
                                        value={editedTag?.title} className="w-100" 
                                        onChange={()=> {
                                            setEditedTag({...tag, title: inputRef.current?.value})
                                            setIsValid(inputRef.current?.value.trim() !== "")
                                        } }/>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-success me-1" 
                                        onClick={() => validUpdateTag(editedTag)} disabled={!isValid}>V</button>
                                    <button type="button" className="btn btn-sm btn-danger" 
                                        onClick={cancelUpdateTag}>X</button>
                                </td>
                            </tr>
                        );
                    }
                    else{ //if(!tag.Id_tag)
                        return (
                            <tr key={0} >
                                <td><input type="text" ref={inputRef} placeholder="Nouveau mot clé" className="w-100" onChange={()=>setIsValid(inputRef.current?.value.trim() !== "")}/></td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-success me-1" 
                                        onClick={validCreateTag} disabled={!isValid}>V</button>
                                    <button type="button" className="btn btn-sm btn-danger" 
                                        onClick={cancelCreateTag}>X</button>
                                </td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
        <CustomYesNoModal title={modalProps?.title} confirm={modalProps?.confirm}/>
    </> );
}

export default TagScreen;