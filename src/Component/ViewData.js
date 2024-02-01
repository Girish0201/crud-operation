import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom' 

const ViewData = () => {   
    const [userData,setUserData] = useState([]) 
    

    const {id } = useParams() 
    

    

   useEffect(() => {
    axios.get(`http://localhost:8000/users/${id}`)
    .then(res => setUserData(res.data))
   },[id])

  return (
    <div className='flex justify-center items-center w-full h-screen '>
        <div className='w-2/4 bg-white shadow-md px-6 pt-3 pb-6 rounded-md border'>
            <h1  className='text-2xl font-serif font-large text-center mb-3 '>Details Of User</h1> 
            <div className='mb-2 '>
                <h1>Name of the user : <strong>{userData.name}</strong></h1>
            </div>
            <div className='mb-2'>
                <h1>Email id of the user: <strong>{userData.email}</strong></h1>
            </div>
            <div className='mb-2'>
                <h1>Mobile no of the user:<strong>{userData.phone}</strong></h1>
            </div> 
            <div className='flex items-center'>
            
                <Link to = {`users/update/${userData.id}`} className='bg-green-900 text-white rounded-md p-3 mr-2'>Edit</Link>
                <Link to = {"/"} className = "bg-gray-700 text-white rounded-md p-3">Back </Link>
            </div>
        </div>
    </div>
  )
}

export default ViewData