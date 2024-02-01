import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,Link ,useNavigate} from 'react-router-dom' 

const UpdateData = () => {
  const [userData,setUserData] = useState({
    name:"",
    email:"",
    phone:""
  })
  

  const {id } = useParams() 
  const navigate = useNavigate()
  
  

 useEffect(() => {
  axios.get(`http://localhost:8000/users/${id}`)
  .then(res => setUserData(res.data))
 },[id])


 const handleUpdate = (e) => {
  e.preventDefault()
  axios.put("http://localhost:8000/users/"+id,userData)
  .then(res =>
    
    alert("Updated Succesfully"),
    navigate("/")
    )
    .catch (err => console.log(err))


 }

  return (
    <div className='flex justify-center items-center w-full h-screen '>
      <div className='w-2/6 bg-white shadow-md px-6 pt-3 pb-6 rounded-md border'> 
        <h1 className='mb-2 text-xl font-large text-black text-center'>Update a User</h1> 
        <form onSubmit = {handleUpdate}>
          <div className='mb-2'>
            <label htmlFor = "name">Name:</label>
            <input  id = "name" type = "text"  required className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 " 
            placeholder='Enter your Name'
            value = {userData.name}
            onChange = {e => setUserData({...userData, name:e.target.value})}
             />
            
          </div>
          <div className='mb-2'>
            <label htmlFor = "email">Email:</label>
            <input  id = "Email" type = "text"  required className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "  
            placeholder='enter your email'
            value = {userData.email}
             onChange = {e => setUserData({...userData, email:e.target.value})}
            />
            
          </div>
          <div className='mb-2'>
            <label htmlFor = "name">Phone No:</label>
            <input  id = "phone" type = "phone"  required className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 " 
             placeholder='enter your phone no'
             value = {userData.phone}
            onChange = {e => setUserData({...userData, phone:e.target.value})}
            />
            
          </div>
          <div className='flex items-center mt-5'>
            <button className='mr-3 bg-green-900 text-white rounded-md p-3 mr-3'>Update</button>
            <Link to = {"/"} className='bg-gray-600 text-white rounded-md p-3' > Back</Link>
          </div>
        </form>
 
      </div>

  </div>
  )
}

export default UpdateData