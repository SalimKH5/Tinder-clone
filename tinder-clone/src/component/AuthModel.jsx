import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie"


function AuthModel({setShowModal,isSignup}) {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmePassword,setConfirmePassword]=useState("")
    const [error,setError]=useState("")

    const navigate = useNavigate();

    const [cookies,setCookie,removeCookie]=useCookies(["user"])

    const handleClick=()=>{
        setShowModal(false)
    }

  
    const handleSubmit=async (e)=>{
        e.preventDefault()

        try{
            if(isSignup &&(password !== confirmePassword)){
                setError("Password need to math")
                return 
            }else{

               try{
                const response= await axios.post(`http://localhost:8000/${isSignup? "signup":"login"}`,{email,password})
                
                setCookie("UserId",response.data.userId)
                setCookie("AuthToken",response.data.token)

                const success=response.status === 201

                if(success && isSignup) navigate("/oneboarding")
                if(success && !isSignup) navigate("/dashboard")

                window.location.reload()

            }catch(er){
                    alert(er)
               }
               
               
                setError("")
            }
        
        }catch(e){
            console.log(e)
        }
    }


     
    return (
    <div className='auth-modal'>
        <CloseIcon onClick={handleClick} sx={{
                                                border:"1px solid black",
                                                borderRadius:"50%",
                                                float:"right",
                                                cursor:"pointer"
                                        
                                                }}/>
        <h2>{isSignup?"CREATE ACCOUNT ":"LOG IN"}</h2>
      
        <p>By clicking <span className="Tt(c)">Log in</span>, you agree to our <a className="Cur(p) C($c-ds-text-link) Typs(button-2) Td(u) Td(n):h" href="https://policies.tinder.com/terms?lang=en" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-window">Terms</a>. Learn how we process your data in our <a className="Cur(p) C($c-ds-text-link) Typs(button-2) Td(u) Td(n):h" href="https://policies.tinder.com/privacy?lang=en" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-window">Privacy Policy</a> and <a className="Cur(p) C($c-ds-text-link) Typs(button-2) Td(u) Td(n):h" href="https://policies.tinder.com/cookie-policy?lang=en" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-window">Cookie Policy</a>.</p>
        <form onSubmit={handleSubmit}>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder='email'
            required={true}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            value={email}
            />
            <input 
            type="password"
            id="password"
            name="password"
            placeholder='password'
            required={true}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            value={password}
            />
            {isSignup &&<input 
            type="password"
            id="confirmepassword"
            name="confirmepassword"
            placeholder='confirmepassword'
            required={true}
            onChange={(e)=>{
                setConfirmePassword(e.target.value)
            }}
            value={confirmePassword}
            />}
            <p className='error-display'>{error}</p>
            <input className='secondary-button' type="submit" />
        </form>
        
        <hr/>
        <h2>Get app</h2>
    </div>
  )
}

export default AuthModel