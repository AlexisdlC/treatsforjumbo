import React from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const Note = (props) => {

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate('/editNote', {state: {from: '/dashboard',id: props.id}, replace: true})
    }

    const handleDelete = () => {
        navigate('/deleteNote', {state: {from: '/dashboard',id: props.id}, replace: true})
    }

    const styles = {
        backgroundColor: props.shared ? "#57D962" : "#D98A41"
    }

    return (
        <div className="notes-dashboard--note" style={styles}>
            <details className="notes-dashboard--details">
                <summary className="notes-dashboard--title">{props.title}</summary>
                <div className="notes-dashboard--noteMeta">
                    <p className="notes-dashboard--body">{props.body}</p>
                    <div className="notes-dashboard--buttonsSection">
                        <button onClick={handleEdit} className="notes-dashboard--editButton">
                            <FontAwesomeIcon className='notes-dashboard--editButtonIcon' icon={faPenToSquare}/>
                        </button>
                        {props.ownNote && <button onClick={handleDelete} className="notes-dashboard--deleteButton">
                                <FontAwesomeIcon className='notes-dashboard--deleteButtonIcon' icon={faTrashCan}/>
                            </button>}
                    </div>
                </div>
            </details>
            
        </div>
    )
}

export default Note