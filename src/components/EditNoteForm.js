import { useState } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom";

const EditNoteForm = (props) => {

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        "title": props.note.title,
        "body": props.note.body,
        "shared": props.note?.sentTo ? true: false
    })

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => {
          return {
            ...prevFormData,
            [name]: value
          }
        })
    }

    function toggleShared () {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                "shared": !prevFormData.shared
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axiosPrivate.patch(`/notes/${props.note._id}`,
                JSON.stringify(formData),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                 }
            )
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <main className="main-edit">
            <form className="form-edit" onSubmit={handleSubmit}>
                <h1 className="form-edit--title">Edit Note</h1>
                <label className="form-edit--label" htmlFor="title">Title:</label>
                <input 
                    className="form-edit--input"
                    autoComplete="off"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange} 
                />
                
                <label className="form-edit--label" htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    name="body"
                    autoComplete="off"
                    value={formData.body}
                    onChange={handleChange}
                    className="form-edit--textarea"
                ></textarea>
                <div className="form-edit--shared">
                    <input 
                        type="checkbox"
                        id="shared"
                        onChange={toggleShared}
                        checked={formData.shared} 
                    />
                    <label htmlFor="shared">Share Note</label>
                </div>

            <button className='form-edit--button'>Save Changes</button>
                
            </form>
        </main>
    )
}

export default EditNoteForm