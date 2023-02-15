import React from 'react'
import whitelogo from "../images/tinder_logo_white.png"
import colorlogo from "../images/color-logo-tinder.png"

import { useNavigate } from "react-router-dom";
function Nav({authToken,minimal,setShowModal,showModal,setIsSignup}) {
  
  const handleClick =()=>{

  setShowModal(true)
  setIsSignup(false)
  }


  const navigate=useNavigate()
  
 

  const hadelredirect=()=>{
    navigate("/");
  }



  return (
    <nav>
      <div className="logo-container" 
      onClick={hadelredirect}>
         <img className='logo' src={minimal? colorlogo:whitelogo} alt="" />
      </div>

      {!authToken && !minimal && 
      <button className='nav-button' 
      onClick={handleClick}
      disabled={showModal}
      >Log in</button>}
    </nav>
  )
}

export default Nav