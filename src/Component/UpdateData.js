import React, {useState,useEffect} from 'react'
import axios from 'axios'

import { Link, useParams,useNavigate} from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'


const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
 }

const UpdateData = () => {

  const [userData,setUserData]=useState({StudentData:{name:"",email:"",phone:"",skills:""},apiStatus:apiStatusConstants.inProgress})
 
  const navigate=useNavigate() 
  const {id} = useParams()


  
  const getUpdateFormDetails=async()=>{
     
      const response =await axios.get(`https://65c0651425a83926ab963d84.mockapi.io/student/users/${id}`) 
    //  console.log(response)
      const data=response.data   
      console.log(response.data)
     
     setUserData({...userData,StudentData:{...data},apiStatus:apiStatusConstants.initial})

    
  }


  console.log(userData.StudentData)
  const onSubmitForm=async(event)=>{
      event.preventDefault()
      setUserData({...userData,apiStatus:apiStatusConstants.inProgress})
      const newObject={...userData.StudentData}
      const response=await axios.put(`https://65c0651425a83926ab963d84.mockapi.io/student/users/${id}`,newObject)
      if (response.status===200){
        setUserData({...userData,apiStatus:apiStatusConstants.success})
          navigate("/")
      }
      else{
          setUserData({...userData,apiStatus:apiStatusConstants.failure})
      }

  }

  useEffect(()=>{
    getUpdateFormDetails();
        // eslint-disable-next-line
  },[id]) 
 
  
  const renderLoadingView=()=>(<div className="w-full flex justify-center">
    <ThreeDots
      visible={true}
      height="50"
      width="50"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    </div>)  


    const renderFailureView = () => (
      <div className='flex justify-center items-center w-full'>
        <p className=' text-2xl font-bold text-center'>404 error , hence update is failed </p>
      </div>
    )

   





  return (
    <div className='flex justify-center items-center w-full h-screen  mx-auto'> 
      <div className='w-1/2 bg-white shadow-md px-3 pt-3 pb-6 rounded-md border md:px-6 mb-4 '> 
        <h1 className='mb-8 md:text-4xl font-large text-black text-center text-xl'>Update a User</h1> 
        {userData.apiStatus === apiStatusConstants.inProgress && renderLoadingView()}  
        {userData.apiStatus === apiStatusConstants.failure && renderFailureView()} 
        <form className="w-full flex flex-col items-center" onSubmit={onSubmitForm} >  
           <div className='mb-2 flex flex-col'> 
              <label className='text-lg text-left font-bold capitalize'>Name</label>
              <input
              type="text"
              placeholder="Name"
              value={userData.StudentData.name}
              name="name"
              className="border-solid border-zinc-950 border-2 h-14 w-64 text-lg p-2 pl-3 m-1.5 outline-none md:w-96"
              required
              onChange={e => setUserData({ ...userData,
                StudentData:{...userData.StudentData,name:e.target.value}})}
            />
            </div> 
        <div className='mb-2 flex flex-col'> 
          <label className="text-lg text-left font-bold capitalize">Email</label>
              <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.StudentData.email}
            className="border-solid border-zinc-950 border-2 h-14 w-64  md:w-96 text-lg p-2 pl-3 m-1.5 mt-3 outline-none"
            required
            onChange={e => setUserData({ ...userData,
              StudentData:{...userData.StudentData,email:e.target.value}})}
            />
        </div> 
        <div className='mb-2 flex flex-col'> 
          <label className=' text-lg text-left font-bold capitalize'>Mobile No:</label>
            <input
            type="number"
            placeholder="Phone"
            name="phone"
            value={userData.StudentData.phone}
            className="border-solid border-zinc-950 border-2 h-14 w-64 md:w-96 text-lg p-2 pl-3 m-1.5 mt-3 outline-none"
            required
            onChange={e => setUserData({ ...userData,
              StudentData:{...userData.StudentData,phone:e.target.value}})}
          />

        </div> 
        <div className='mb-2 flex flex-col'>
          <label className=' text-lg text-left font-bold capitalize'>Skills</label>
          <input
            type="text"
            placeholder="skills"
            name="skills"
            value={userData.StudentData.skills}
            className="border-solid border-zinc-950 border-2 h-14 w-64 md:w-96 text-lg p-2 pl-3 m-1.5 mt-3 outline-none"
            required
            onChange={e => setUserData({ ...userData,
              StudentData:{...userData.StudentData,skills:e.target.value}})}
          />
        </div>
      
        
     
      
     
    
      <div className='flex items-center mt-5'>
          <button className=' bg-green-900 text-white rounded-md p-3 mr-3'>Update</button>
          <Link to = {"/"} className='bg-gray-600 text-white rounded-md p-3' > Back</Link>
      </div> 
      </form>
    
 
      </div>

  </div>
  )
}

export default UpdateData