import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import './App.css'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }

    },[])
    const collectData = async () => {
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json()
        console.log(result)
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
         navigate('/')
        
    }

    return (
        <div className="signup">
            <h1>Register </h1>
            <input className="inputBox" type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            <input className="inputBox" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            <input className="inputBox" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            <button className="signupBtn" onClick={collectData}>Sign up</button>
        </div>

    )
}
export default Signup;
