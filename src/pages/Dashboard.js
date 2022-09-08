import {useState, useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Note from '../components/Note'
import CatFull from '../components/CatFull';

const Dashboard = () => {
    const [createdNotes, setCreatedNotes] = useState()
    const [receivedNotes, setReceivedNotes] = useState()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
      }

    useEffect(() => {
        function handleWindowResize() {
        setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getNotes = async () => {
            try{
                const response = await axiosPrivate.get('/notes', {
                    signal: controller.signal
                })
                isMounted && setCreatedNotes(response.data.createdNotes)
                isMounted && setReceivedNotes(response.data.receivedNotes)
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

    const handleCreate = () => {
        navigate('/createNote', {state: {from:'/dashboard'}})
    }

    return (
        <main className='main-dashboard'>
            <CatFull
                catHeight={windowSize.innerWidth*0.7}
                catColor= "#D09504"
            />
            <div className='allNotes-dashboard'>
                <div className='notes-dashboard'>
                    {createdNotes?.length
                        ? (
                            <>
                                <h2>Your personal Notes:</h2>
                                <ul>
                                    {createdNotes.map((note) => <Note
                                        key={note._id}
                                        id={note._id}
                                        body={note.body}
                                        title={note.title}
                                        shared={note?.sentTo}
                                        ownNote={true}
                                    />)}
                                </ul>
                            </>
                        ) : <h2>No created notes to display</h2>
                    }
                </div>
                <div className='notes-dashboard'>
                    {receivedNotes?.length
                        ? (
                            <>
                                <h2>Notes shared with you</h2>
                                <ul>
                                    {receivedNotes.map((note) => <Note
                                        key={note._id}
                                        id={note._id}
                                        body={note.body}
                                        title={note.title}
                                        shared={note?.sentTo}
                                        ownNote={false}
                                    />)}
                                </ul>
                            </>
                        ) : <h2>No received notes to display</h2>
                    }
                </div>
                <button className='notes-dashboard--createButton' onClick={handleCreate}>
                    <FontAwesomeIcon className='notes-dashboard--createButtonIcon' icon={faPlus}/>
                </button>
            </div>
        </main>
    );
};

export default Dashboard;
