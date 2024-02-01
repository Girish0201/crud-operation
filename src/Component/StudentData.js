import React ,{useState,useEffect}from 'react'
 import {Link} from "react-router-dom"
import axios from "axios"

const StudentData = ( ) => { 
    const [userData,setUserData] = useState([])  
    
   
    useEffect(() => {
        axios.get("http://localhost:8000/users")
        .then(res => setUserData(res.data))
        .catch (err => console.log(err))
    },[])

    const deleteUser = (id) => {
        console.log(id)
        const confirm = window.confirm("would you like to delete ?") 
        if (confirm) {
            axios.delete("http://localhost:8000/users/"+ id)
            .then(res => 
                alert("Deleated Successfully"),
                window.location.reload()
                )
            .catch (err => console.log(err))
           
        }
    }

   // console.log(users)

  return (
        <div className='flex flex-col justify-center items-center text-center h-full mx-auto sm:mt-6 md:mt-10'>
            <h1 className='text-2xl font-medium md:text-center sm:text-center mb-2'>Crud Operattion</h1>
            <div className='w-85 rounded bg-white shadow-md  p-12 mt-6 overflow-scroll mx-auto'> 
                <h2 className='text-xl font-serif font-medium mb-2'>List of users</h2>
                <div className='flex justify-end mb-5 mr-3'>
                    <Link to = {"/create-data"} className='bg-blue-900 text-white px-3 py-2 rounded-md'>Add User </Link>
                </div>
                <table className='max-w-full mx-auto text-center'>
                    <thead className='border bg-slate-200 uppercase'>
                        <tr className=''>
                            <th className="text-sm font-medium text-black px-4 py-4">id</th>
                            <th className="text-sm font-medium text-black px-4 py-4">Name</th> 
                            <th className="text-sm font-medium text-black px-4 py-4">Email</th>
                            <th className="text-sm font-medium text-black px-4 py-4">Phone</th> 
                            <th className="text-sm font-medium text-black px-4 py-4" >Action</th>
                        </tr>
                    </thead>
                    <tbody className='border border-slate-300 border-collapse'>
                        {
                            userData.map((data,index) =>  ( 
                                <tr key = {index} className='border-b border-slate-200'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 '>{index+1}</td>
                                    <td className='text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap px-6 py-6'>{data.name}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' >{data.email}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{data.phone}</td>
                                    <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap">
                                        <Link
                                            to={`/users/${data.id}`}
                                            className="bg-teal-600 text-white px-4 py-2 rounded-md"
                                        >
                                            VIew
                                        </Link>
                                        <Link
                                            to={`/users/update/${data.id}`}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
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
        </div>

           

  )
}

export default StudentData