import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import StudentData from './Component/StudentData'
import CreateData from './Component/CreateData'
import ViewData from './Component/ViewData'
import UpdateData from './Component/UpdateData'

const App = () => {
  return (
    <div className='sm:mt-5 md:mt-10 p-5 w-screen h-screen px-4'>
      <h1 className='md:text-5xl font-serif font-semi-bold text-center text-2xl'>Crud Operation </h1>
          <BrowserRouter>
            <Routes>
              <Route path = "/" element = {<StudentData />} />
              <Route path = "/create-data" element = {<CreateData />} /> 
              <Route path = "/users/:id"    element = {<ViewData />} /> 
              <Route path = "/users/update/:id" element = {<UpdateData />} />

            </Routes>
          </BrowserRouter>
    </div>


  )
}

export default App