import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'  
import { ThreeDots } from 'react-loader-spinner'


const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE",
   }
const ViewData = () => {   
    const [userData,setUserData] = useState({student:[],apiStatus:apiStatusConstants.initial}) 
    

    const {id } = useParams() 
    const getData = async () => {
        setUserData({...userData,apiStatus:apiStatusConstants.inProgress})
        const response = await axios.get(`https://65c0651425a83926ab963d84.mockapi.io/student/users/${id}`)  
         const studentData = response.data  
         if (response.status === 200) {
            setUserData({student:studentData,apiStatus:apiStatusConstants.success}) 
         }
         else {
            setUserData({...userData,apiStatus:apiStatusConstants.failure})
         }
      

    } 
    

   useEffect(() => {
    getData()
     // eslint-disable-next-line

   },[id])  

   const renderFailureView = () => (
    <div className='flex justify-center items-center w-full'>
      <p className=' text-2xl font-bold text-center'>404 error , hence update is failed </p>
    </div>
  ) 

  
  const renderLoadingView=()=>(
    <div className="w-full flex justify-center">
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
  </div>
  )  

 

  


  return (
    <div className='flex justify-center items-center w-full h-full mx-auto'> 
     <div className='w-1/2 bg-white shadow-md px-6 pt-3 pb-6 rounded-md border'>
            <h1  className='text-2xl font-serif font-large text-center mb-3 '>Details Of User</h1>  
            {userData.apiStatus === apiStatusConstants.inProgress && renderLoadingView()}  
            {userData.apiStatus === apiStatusConstants.failure && renderFailureView()} 
            <div className='mb-2 '>
                <h1>Name of the user : <strong>{userData.student.name}</strong></h1>
            </div>
            <div className='mb-2'>
                <h1>Email id of the user: <strong>{userData.student.email}</strong></h1>
            </div>
            <div className='mb-2'>
                <h1>Mobile no of the user:<strong>{userData.student.phone}</strong></h1>
            </div> 
            <div className='mb-2'>
                <h1>Skills no of the user:<strong>{userData.student.skills}</strong></h1>
            </div> 
            <div className='flex items-center mt-3'>            
                <Link to = {"/"} className = "bg-gray-700 text-white rounded-md p-3">Back </Link>
            </div>
        </div>
        
    </div>
  )
}

export default ViewData