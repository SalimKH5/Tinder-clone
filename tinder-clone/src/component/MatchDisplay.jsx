import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

function MatchDisplay({matches,setClickedUser}) {
  
  const [cookies,setCookie,removeCookie]=useCookies(["user"])
  const userId = cookies.UserId;

  const matchesUserId=matches.map(({user_id})=>user_id)

   const [matchesProfiles,setMatchesProfiles]=useState(null) 



  const getMatches=async()=>{
    try{
      const response=await axios.get("http://localhost:8000/users",{
        params:{userId:JSON.stringify(matchesUserId)}
      })
      
      setMatchesProfiles(response.data)
    }catch(err){
      console.log(err)
    }
  }
  

  useEffect(()=>{
    getMatches()

  },[matches])
  

  const filteredMatchedProfiles = matchesProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id === userId)
        .length > 0
  );
    console.log(filteredMatchedProfiles)

  return (
    <div className="matchDiplay">
      {filteredMatchedProfiles?.map((match,_index)=>(
        <div key={{_index}} 
        
        className="match-card" 
        onClick={()=>setClickedUser(match)}>

            <div className="img-container">
              <img src={match?.url} alt={match.first_name +" profile"} />
            </div>
            <h4>{match?.first_name}</h4>
        </div>
      ))}
    </div>
  )
}

export default MatchDisplay