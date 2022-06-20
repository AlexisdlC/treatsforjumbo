import { Link, Navigate, useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import CatFull from "../components/CatFull"

const Home = () => {
    const navigate = useNavigate()
    const logout= useLogout()

    const signOut = async () => {
        await logout()
        navigate('/login')
    }

    return(
        <main className="main-home">
            < CatFull
                catHeight = "1000"
                catColor = "#666366"
            />
            <div className="info-home">
                <h2 className="info-home--title">Welcome to Treats For Jumbo!</h2>
                <p className="info-home--text">
                    Hello!
                    <br></br> <br></br>  
                    My name is Jumbo, and this is my website! I love Treats and am always looking for generous donators to provide me Treats.
                    <br></br><br></br>
                    My trusted Treat Lady and Butler have special priviledges on this website, but anyone is welcome to play the Treat Game with me!
                    <br></br><br></br>
                    JUMBO
                </p>
            </div>
        </main>
    )
}

export default Home