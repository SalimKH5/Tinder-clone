import React,{useState} from 'react'
import Nav from "../component/Nav"
import {useCookies} from "react-cookie"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Oneboarding() {
  const [cookies,setCookie,removeCookie]=useCookies(["user"])
  const navigate=useNavigate()
  const [formdata,setFormdata]=useState({
    user_id:cookies.UserId,
    first_name:"",
    dob_day:"",
    dob_month:"",
    dob_year:"",
    gender_identity:"",
    show_gender:true,
    gender_interest:"",
    email:"",
    url:"",
    about_me:"", 
    matches:[]
  })
  
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
        const response=await axios.put('http://localhost:8000/user',{formdata})
        const success=response.status === 200
        console.log(response)
        if(success){
          navigate("/Dashboard")
        }

    }catch(err){
      console.log(err)
    }
    
  }


  const handleChange=(e)=>{
  
    const value=e.target.value === "checkbox"? e.target.checkbox : e.target.value
    const name=e.target.name
   
    setFormdata((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  
  return (
    <>
    <Nav 
    minimal={true} 
    setShowModal={handleChange}
    showModal={false}
    />
    <div className='Oneboarding'>
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First name</label>
            <input type="text" 
                   id="first_name"
                   name="first_name"
                   placeholder='first name'
                   required={true}
                   value={formdata.first_name}
                   onChange={handleChange}
                  
                   
            />
            <label>birthday</label>
            <div className="multiple-input-container">
                <input type="number" 
                      id="dob_day"
                      name="dob_day"
                      placeholder='DD'
                      required={true}
                      onChange={handleChange}
                      value={formdata.dob_day}
                />
                <input type="number" 
                      id="dob_month"
                      name="dob_month"
                      placeholder='MM'
                      required={true}
                      onChange={handleChange}
                      value={formdata.dob_month}
                />
                <input type="number" 
                      id="dob_year"
                      name="dob_year"
                      placeholder='YYYY'
                      required={true}
                      onChange={handleChange}
                      value={formdata.dob_year}
                />
            </div>
            <label >Gender</label>
            <div className="multiple-input-container">
            <input 
                        type="radio" 
                        id="man-gender-identity"
                        name="gender_identity"
                        value="man" 
                        onChange={handleChange}
                        checked={formdata.gender_identity === "man"}
                    
                  />
            <label htmlFor="man-gender-identity">Man</label>
                 
            <input 
                        type="radio" 
                        id="woman-gender-identity"
                        name="gender_identity"
                        value="woman" 
                        onChange={handleChange}
                        checked={formdata.gender_identity==="woman"}
                        
            />
            <label htmlFor="woman-gender-identity">Woman</label>
            <input 
                        type="radio" 
                        id="more-gender-identity"
                        name="gender_identity"         
                        value="more" 
                        onChange={handleChange}
                        checked={formdata.gender_identity==="more"}
                  />     
              <label htmlFor="more-gender-identity">More</label>
                 
            </div>
            <label htmlFor="show-gender"> Show gender on my profile</label>
            <input 
                    type="checkbox" 
                    name="show-gender" 
                    id="show-gender"
                    onChange={handleChange}
                    value={formdata.show_gender}
                    

            />
             <label>Show me</label>
             <div className="multiple-input-container">
             <input 
                        type="radio" 
                        id="man-gender-interest"
                        name="gender_interest"
                        value="man" 
                        onChange={handleChange}
                        checked={formdata.gender_interest === "man"}
                  />
            <label htmlFor="man-gender-interest">Man</label>
            <input 
                        type="radio" 
                        id="woman-gender-interest"
                        name="gender_interest"
                        value="woman" 
                        onChange={handleChange}
                        checked={formdata.gender_interest==="woman"}
                        
               />
                 
              <label htmlFor="woman-gender-interest">Woman</label>
              <input 
                        type="radio" 
                        id="more-gender-interest"
                        name="gender_interest"         
                        value="more" 
                        onChange={handleChange}
                        checked={formdata.gender_interest==="more"}
                  />
              <label htmlFor="more-gender-interest">More</label>
                 
            </div>
            <label htmlFor="about-me"> About me</label>
            <input 
                    type="text" 
                    name="about_me" 
                    id="about_me"
                    placeholder='Share your thoughts'
                    required={true}
                    onChange={handleChange}
                    value={formdata.about_me}
                   

            />
          <input type="submit" />
          </section>
          <section>
            <label htmlFor="profile">Profile</label>
            <input 
                   type="url"
                   id="url"
                   name="url"
                   placeholder='profile'
                   onChange={handleChange}
                   value={formdata.url}
            />
            <div className="photo-container">
             {formdata.url && <img  src={formdata.url} alt="profile pic preview" />}
            </div>

       
          </section>
        </form>
    </div>
    </>
  )
}

export default Oneboarding