import React ,{useState,useEffect}from 'react'
 import {Link} from "react-router-dom"
import axios from "axios"
import {ThreeDots} from 'react-loader-spinner'


const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
    empty:"EMPTY",
  }
  

const StudentData = ( ) => { 
    const [userData,setUserData] = useState({studentList:[],apiStatus:apiStatusConstants.initial})  
    
  
    const loadData = async() => {
        setUserData({...userData,apiStatus:apiStatusConstants.inProgress})
        const response = await axios.get("https://65c0651425a83926ab963d84.mockapi.io/student/users") 
        if (response.status === 200) {
            const studentData = response.data 
           console.log(studentData)
           if (studentData.length === 0) {
            setUserData({...userData,apiStatus:apiStatusConstants.empty})
           }
           else  {
            setUserData({studentList:studentData,apiStatus:apiStatusConstants.success}) 
           }
        }
        else {
            setUserData({...userData,apiStatus:apiStatusConstants.failure})
        }

        

    }
    useEffect(() => {
       loadData()
        // eslint-disable-next-line
    },[])

    const deleteUser = async(id) => {
        console.log(id)
        const confirm = window.confirm("would you like to delete ?") 
        if (confirm) {
            const response = await axios.delete("https://65c0651425a83926ab963d84.mockapi.io/student/users/"+ id) 
            console.log(response)
            if (response.status === 200) {
                loadData() 
           
        }
    }
    }

   // console.log(users)

    const renderListOfUsers = () => ( 
        <div className='overflow-x-auto w-full h-full'>
        <table className='max-w-full mx-auto text-center w-full'> 
            <thead className='border bg-slate-200 uppercase'>
                <tr className=''>
                    <th className="text-sm font-medium tracking-wide text-center text-black px-4 py-4 w-8">id</th>
                    <th className="text-sm font-medium tracking-wide text-cener text-black px-4 py-4 w-12">Name</th> 
                    <th className="text-sm font-medium tracking-wide text-center text-black px-4 py-4 w-16">Email</th>
                    <th className="text-sm font-medium tracking-wide text-center text-black px-4 py-4 w-12">Phone</th> 
                    <th className="text-sm font-medium tracking-wide text-center text-black px-4 py-4 w-12">Skills</th>
                    <th className="text-sm font-medium tracking-wide text-center text-black px-4 py-4 w-12" >Action</th>
                </tr>
            </thead>         
            <tbody className='border border-slate-300 border-collapse '>
                {
                    userData.studentList.map((data,index) =>  ( 
                        <tr key = {index} className='border-b border-slate-200'>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 '>{index+1}</td>
                            <td className='text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap '>{data.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' >{data.email}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{data.phone}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{data.skills}</td>
                            <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap">
                            <Link
                                to={`/users/${data.id}`}
                                className="bg-teal-600 text-white px-4 py-2 rounded-md font-serif font-medium"
                                >
                                View
                            </Link>
                            <Link
                                 to={`/users/update/${data.id}`}
                                 className="bg-blue-600 text-white px-4 py-2 rounded-md font-serif font-medium"
                                >
                                 Edit
                            </Link>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-serif font-medium"
                                onClick={()=>deleteUser(data.id)}
                            >
                                Delete
                            </button>
                        </td>

                    </tr>

                )
                )}
            </tbody>  
        </table>    
        </div>      
    )


      
  const renderLoadingView=()=>( 
    <div className="w-full flex justify-center mt-4">
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

    const renderFailureView = ()  => (
        <div className='flex flex-col justify-center items-center'>
            <img src = "https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-error-404-page-not-found-png-image_3832696.jpg" alt  = "error" className='w-20 h-20'/>
            <p>api status 404 occured</p>
        </div>
    )

   



   const renderViews = () =>  {
    switch(userData.apiStatus) {
        case apiStatusConstants.success:
            return renderListOfUsers()
          case apiStatusConstants.failure:
            return renderFailureView()
         case apiStatusConstants.empty:
            return (
            <div className='w-full flex flex-col items-center justify-center mt-4 text-center overflow-x-auto'>
                <h2 className='text-xl font-serif font-semibold text-gray-800'>No List of User </h2>
                <p className='text-l font-serif font-medium '>Add a user by click the add user button</p>
            </div>
            )
          case apiStatusConstants.inProgress:
            return renderLoadingView() 
          
          default:
             return null
    }
}

  return (
        <div className='flex flex-col  items-center text-center w-full h-full mx-auto mt-8'>
            <div className='w-10/11 rounded bg-gray-100 shadow-lg  p-12 mt-6  mx-auto md:mx-5 sm:mx-3 xs:mx-3 '> 
                <h2 className='text-3xl font-serif font-medium mb-2'>List of users</h2>
                <div className='flex justify-end mb-5 mr-3 mt-4'>
                    <Link to = {"/create-data"} className='bg-blue-900 text-white px-3 py-2 rounded-md'>Add User </Link>
                </div>
            
            
            {renderViews()}   
                 
                
            </div>
        </div>

           

  )
}

export default StudentData