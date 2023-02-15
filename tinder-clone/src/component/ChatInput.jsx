import axios from 'axios'
import React, { useState } from 'react'

function ChatInput({ user, clickedUser, getUssersMessages, getClickedUssersMessages }) {

    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userid: userId,
            to_userid: clickedUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', { message })
            getUssersMessages()
            getClickedUssersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button" onClick={addMessage}>Submit</button>
        </div>
  )
}

export default ChatInput