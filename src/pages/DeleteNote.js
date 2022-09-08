import { useEffect, useState } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link, useLocation, useNavigate } from "react-router-dom";

const DeleteNote = () => {

    const location = useLocation()
    const noteId = location?.state?.id

    const axiosPrivate = useAxiosPrivate()
    const [note, setNote] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getNotes = async () => {
            try{
                const response = await axiosPrivate.get(`/notes/${noteId}`, {
                    signal: controller.signal
                })
                isMounted && setNote(response.data.note)
            } catch(error) {
                console.error(error)
                navigate('/dashboard', {state: {from: location}, replace: true})
            }
        }
        getNotes()

        return () => {
            isMounted = false
            controller.abort()
        }
    },[])

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(`/notes/${noteId}`)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    const handleGoBack = () => {
        navigate('/dashboard', {state: {from:location}})
    }

    return (
        <main className='main-delete'>
            <section className='section-delete'>
                <div className='prompt-delete'>
                    <h2 className='title-delete'>Are you sure you want to delete this note?</h2>
                    <h3 className="subtitle-delete">Title:</h3>
                    <p className="content-delete">{note?.title}</p>
                    <h3 className="subtitle-delete">Body:</h3>
                    <p className="content-delete">{note?.body}</p>
                    <div className="buttonSection-delete">
                        <button className="deleteButton-delete" onClick={handleDelete}>Delete</button>
                        <button className="goBackButton-delete" onClick={handleGoBack}>Go Back</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DeleteNote;
