import React from "react"
import { useNavigate } from "react-router-dom"

const Note = (props) => {

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate('/editNote', {state: {from: '/dashboard',id: props.id}, replace: true})
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.body}</p>
            <button onClick={handleEdit}>Edit</button>
            <button>Delete</button>
        </div>
    )
}

export default Note