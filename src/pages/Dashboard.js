import {useState, useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Note from '../components/Note'

const Dashboard = () => {
    const [notes, setNotes] = useState()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getNotes = async () => {
            try{
                const response = await axiosPrivate.get('/notes', {
                    signal: controller.signal
                })
                isMounted && setNotes(response.data.createdNotes)
            } catch(error) {
                console.error(error)
                navigate('/login', {state: {from: location}, replace: true})
            }
        }
        getNotes()

        return () => {
            isMounted = false
            controller.abort()
        }
    },[])

    return (
        <main className='main--dashboard'>
            <h2>Notes List</h2>
            {notes?.length
                ? (
                    <ul>
                        {notes.map((note) => <Note
                            key={note._id}
                            id={note._id}
                            body={note.body}
                            title={note.title}
                        />)}
                    </ul>
                ) : <p>No notes to display</p>
            }

            <Link to='/' className='form-login--button'>Home</Link>
        </main>
    );
};

export default Dashboard;
