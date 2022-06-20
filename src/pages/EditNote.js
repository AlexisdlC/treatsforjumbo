import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import EditNoteForm from "../components/EditNoteForm";

const EditNote = (props) => {

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

    return (<>
            {note?.title
                ? (
                    <EditNoteForm
                        note={note}
                    />
                ) : <h2>No note to display</h2>
            }
        
        <Link to='/home' className="form--button">Home</Link>
        <Link to='/dashboard' className="form--button">Dashboard</Link>
    </>)
}

export default EditNote