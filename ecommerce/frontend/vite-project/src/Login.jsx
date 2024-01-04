import React from 'react'
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

const Login = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] =useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    })
    const handleLogin = async()=>{
        console.log(email,password)
        let result = await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.auth));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/")
        }
        else{
            alert("plese enter correct details")
        }

    }
    return (
     <div className="login">
            <h1>Login </h1>
            <input className="inputBox" type="text" onChange={(e)=> setEmail(e.target.value)}  placeholder="Enter email" />
            <input className="inputBox" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />
            <button className="signupBtn" onClick={handleLogin} >Login</button>
     </div>
    )

}

export default Login