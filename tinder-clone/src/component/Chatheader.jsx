import React from 'react'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"
function Chatheader({user}) {
  
  const [cookies,setCookie,removeCookie]=useCookies(["user"])
  const navigate=useNavigate()
 
 
 
  const logout=(e)=>{
    
    e.preventDefault()
   
    removeCookie("UserId",cookies.userId)
    removeCookie("AuthToken",cookies.token)
   
    navigate("/")
    window.location.reload()
      
  }



  

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.url} alt={"photo of "+user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <ArrowCircleLeftOutlinedIcon  onClick={logout} sx={{color:"#ffff",padding:"20px",cursor:"pointer"}}/>
    </div>
  )
}

export default Chatheader