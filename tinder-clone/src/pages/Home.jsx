import React,{useState} from 'react'
import Nav from '../component/Nav'
import AuthModel from '../component/AuthModel'
import { useCookies } from 'react-cookie'
function Home() {

  const [cookies,setCookie,removeCookie]=useCookies(["user"])
  const authToken=cookies.authToken

  
  const [showModal,setShowModal]=useState(false)
  const [isSignup,setIsSignup]=useState(true)
  
  const handlClick=()=>{


    if(authToken){
      removeCookie("UserId",cookies.userId)
      removeCookie("AuthToken",cookies.token)
     
      window.location.reload()
    }
  
    setShowModal(true)
    setIsSignup(true)
    
  }





  return (
    <div className='overlay'>
      
      <Nav minimal={false} 
      authToken={authToken}
      setShowModal={setShowModal} 
      showModal={showModal}
      setIsSignup={setIsSignup}/>

      <div className="home">
        <h1 className="primary-title" >Swipe Right®</h1>
        <button className='primary-button' onClick={handlClick}>
          {authToken? "Sign out" :"Create an acount"}
        </button>

          {showModal && (<AuthModel setShowModal={setShowModal} isSignup={isSignup}/>)}
        
      </div>
    </div>
  )
}

export default Home