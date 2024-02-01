import axios from 'axios'
import React ,{useState} from 'react'
import  {useNavigate,Link} from "react-router-dom"
import {v4 as uuidv4} from 'uuid'

const CreateData = () => {
    const [userData,setUserData] = useState({ 
       id : uuidv4(),
       name : "",
       email: "", 
       phone: ""
    })

    const navigate = useNavigate()


    

    const handleSubmit =async (e) => {
      e.preventDefault() 
      const response = await axios.post("http://localhost:8000/users", userData) 
      console.log(response) 
      alert("Added a user")
      navigate("/")


      
    }

    

  return (
    <div className='flex justify-center items-center w-full h-screen '>
      <div className='w-2/6 bg-white shadow-md px-6 pt-3 pb-6 rounded-md border'> 
        <h1 className='mb-2 text-xl font-large text-black text-center'>Add a User</h1> 
        <form onSubmit = {handleSubmit}>
          <div className='mb-2'>
            <label htmlFor = "name">Name:</label>
            <input  id = "name" type = "text"  required className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 " 
            placeholder='Enter your Name'
            onChange = {e => setUserData({...userData, name:e.target.value})}
             />
            
          </div>
          <div className='mb-2'>
            <label htmlFor = "email">Email:</label>
            <input  id = "Email" type = "text"  required className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "  
            placeholder='enter your email'
             onChange = {e => setUserData({...userData, email:e.target.value})}
            />
            
          </div>
          <div className='mb-2'>
            <label htmlFor = "name">Phone No:</label>
            <input  id = "phone" type = "phone"  required className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 " 
             placeholder='enter your phone no'
            onChange = {e => setUserData({...userData, phone:e.target.value})}
            />
            
          </div>
          <div className='flex items-center mt-5'>
            <button className='mr-3 bg-green-900 text-white rounded-md p-2 '>Submit</button>
            <Link to = {"/"} className='bg-gray-600 text-white rounded-md p-2'> Cancel</Link>
          </div>
        </form>
 
      </div>

  </div>

  )
}

export default CreateData