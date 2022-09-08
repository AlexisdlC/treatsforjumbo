import { useState } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom";

const CreateNote = () => {

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        "title": '',
        "body": '',
        "shared": false
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
        console.log(formData)

        try {
            const response = await axiosPrivate.post(`/notes`,
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
        <main className='main-create'>
            <section className="section-create">
                <form className="form-create" onSubmit={handleSubmit}>
                    <h1 className="form-create--title">Create New Note</h1>
                    <label className="form-create--label" htmlFor="title">Title:</label>
                    <input 
                        className="form-create--input"
                        autoComplete="off"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Type Note Title Here"
                        value={formData.title}
                        onChange={handleChange} 
                    />
                    
                    <label className="form-create--label" htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        autoComplete="off"
                        placeholder="Type Note Content Here"
                        value={formData.body}
                        onChange={handleChange}
                        className="form-create--textarea"
                    ></textarea>
                    <div className="form-create--shared">
                        <input 
                            type="checkbox"
                            id="shared"
                            onChange={toggleShared}
                            checked={formData.shared} 
                        />
                        <label htmlFor="shared">Share Note</label>
                    </div>

                <button className='form-create--button'>Save Note</button>
                    
                </form>
            </section>
        </main>
    );
}

export default CreateNote;
