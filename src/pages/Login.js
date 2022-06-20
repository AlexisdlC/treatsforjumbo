import React from "react"
import axios from '../api/axios'
import useAuth from "../hooks/useAuth"

import CatFull from "../components/CatFull"

import {useNavigate, useLocation} from 'react-router-dom'

const LOGIN_URL = '/auth/login'


export default function Login() {

    const {setAuth, persist, setPersist} = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/login"

    const [loginData,setLoginData] = React.useState({
        "username": "",
        "password": ""
    })

    function handleChange(event){
        const {name, value} = event.target
        setLoginData(prevFormData => {
          return {
            ...prevFormData,
            [name]: value
          }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try{
            const response = await axios.post(LOGIN_URL,
                 JSON.stringify(loginData),
                 {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                 }
            )
            const accessToken = response?.data?.token
            setAuth({...loginData, accessToken})
            setLoginData({
                "username": "",
                "password": ""
            })
            navigate(from, {replace : true})

        } catch (error){
            if (!error?.response) {
                console.log('No Server Response')
            } else if (error.response?.status === 400) {
                console.log('Missing Username or Password')
            } else if (error.response?.status === 401){
                console.log('Unauthorized')
            } else {
                console.log('Login Failed')
            }
        }

        
    }

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    React.useEffect(() => {
        localStorage.setItem("persist", persist)
    },[persist])

    return (
        
        <main className="main-login">
            <div className="message-login">
                <CatFull 
                    catHeight="700"
                    catColor="black"
                />
                <p className="message-login--p">
                    Hi!
                    <br></br>
                    My name is Huxley, and I'm the Cat President!
                    <br></br>
                    I'm sorry, only Treat Ladies and Butlers appointed by myself can access this section, so please, let me see your ID!
                </p>
            </div>
            <div className="formContainer-login">
                <form className="form-login" onSubmit={handleSubmit}>
                <h1 className='form-login-title'>Login</h1>
                <label className='form-login--label' htmlFor="username">Your Username:</label>
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={handleChange}
                    autoComplete="off"
                    className='form-login--input' 
                />
                <label className='form-login--label' htmlFor="username">Your Password:</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    autoComplete="off"
                    className='form-login--input' 
                />
                <button className='form-login--button'>Login</button>
                <div className="form-login--persistCheck">
                    <input 
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist} 
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
                </form>
            </div>
        </main>
        
    )
}