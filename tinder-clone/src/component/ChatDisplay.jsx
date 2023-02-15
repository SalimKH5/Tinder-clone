import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'
function ChatDisplay({user,clickedUser}) {

  const userId=user?.user_id
  const clickedUserId=clickedUser?.user_id

  const [userMessages,setUserMessages]=useState(null)
  const [ClickeduserMessages,setClickeduserMessages]=useState(null)



  const getUssersMessages=async ()=>{
   
    try{
    const response=await axios.get("http://localhost:8000/messages",{
      params:{userId:userId,correspondinguser:clickedUserId}
    })
    
    setUserMessages(response.data)
    
    }catch(err){
      console.log(err)
    }

  }

  const getClickedUssersMessages=async ()=>{
    
    try{
    const response=await axios.get("http://localhost:8000/messages",{
      params:{userId:clickedUserId,correspondinguser:userId}
    })
    
    setClickeduserMessages(response.data)
    
    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    getUssersMessages()
    getClickedUssersMessages()
  },[])

  const messages=[]

  userMessages?.forEach(message=>{
      const formattedMessage={}
      formattedMessage['name']=user?.first_name
      formattedMessage['img']=user?.url
      formattedMessage['message']=message?.message
      formattedMessage['timestamp']=message?.timestamp
      messages.push(formattedMessage)
    })


    ClickeduserMessages?.forEach(message=>{
      const formattedMessage={}
      formattedMessage['name']=clickedUser?.first_name
      formattedMessage['img']=clickedUser?.url
      formattedMessage['message']=message?.message
      formattedMessage['timestamp']=message?.timestamp
      messages.push(formattedMessage)
    })
  
    
    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

   
  return (
    <>
    <Chat descendingOrderMessages={descendingOrderMessages}/>
    <ChatInput
     user={user}
     clickedUser={clickedUser} getUssersMessages={getUssersMessages} getClickedUssersMessages={getClickedUssersMessages}
    />
    </>
  )
}

export default ChatDisplay