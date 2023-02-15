import React, { useState } from 'react'
import Chatheader from './Chatheader'
import MatchDisplay from './MatchDisplay'
import ChatDisplay from './ChatDisplay' 
function ChatContainer({user}) {

  const [clickedUser,setClickedUser]=useState(null)

  return (
    <div className="chat-Container">
      <Chatheader
      user={user} />
      <div className='option-btn'>
        <button className='optione' onClick={()=>
          setClickedUser(null)
        } >matches</button>
        <button className='chat' disabled={!clickedUser}>chat</button>
      </div>
     {!clickedUser && <MatchDisplay  matches={user.matches}  
     setClickedUser={setClickedUser}/>} 
    
    
    {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}  
    </div>
  )
}

export default ChatContainer