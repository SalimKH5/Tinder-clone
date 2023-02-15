import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../component/ChatContainer'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
function Dashboard() {
  
  
  
  const [user,setUser]=useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()

  const [cookies,setCookie,removeCookie]=useCookies(["user"])
  
  const userId=cookies.UserId
 



  const getUser=async ()=>{
    try{

      const response=await axios.get("http://localhost:8000/user",{
        params:{userId}
      })
    
      setUser(response.data)

    }catch(err){
      console.log(err)
    }
  }
  
  


    const getGenderUsers=async ()=>{
        try {
          const response= await axios.get("http://localhost:8000/genered_users",{
            params:{gender:user?.gender_interest}
          })
         
          setGenderedUsers(response.data)
        }
        catch(err){

        }
  }


  useEffect(() => {
   
    getUser()
  
    }, [])


    useEffect(()=>{
      if(user){
        getGenderUsers()
      }
      },[user])
  

 



  const updateMatches=async (matchuserId)=>{
    try{
        const response=await axios.put("http://localhost:8000/addMatches",{
          userId,
          matchuserId
        })
        getUser()
    }catch(err){
      console.log(err)
    }
  }


  
  
  const swiped = (direction, swipedUserId) => {
   if(direction==="right"){
    updateMatches(swipedUserId)
   }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  } 


  const matchesUserIds= user?.matches.map(({user_id})=>user_id).concat(userId)
  
  

  const filteredGenderedUsers =genderedUsers?.filter(
    usergender =>!matchesUserIds.includes(usergender.user_id)
  )




  return (
    <>
     {user &&
    <div className="Dashboard">
        <ChatContainer user={user}/> 
      
        <div className="swipe-container">
          
            <div className="card-container">
            
                    {filteredGenderedUsers?.map((character) =>
                      
                      
                      <TinderCard 
                      className='swipe' 
                      key={character.user_id} 
                      
                      onSwipe={(dir) => swiped(dir, character.user_id)} 
                      onCardLeftScreen={() => outOfFrame(character.first_name)}>
                        
                        <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                        className='card'>
                          <h3>{character.first_name}</h3>
                        </div>
                      
                      </TinderCard>
                    )}

                    <div className="last-direct">
                      {lastDirection? <p>You swiped {lastDirection}</p>:<p/>}
                    </div>
            </div>
        </div>
    </div>
  } 
  </>  
  )
}

export default Dashboard