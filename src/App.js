import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import StudentData from './Component/StudentData'
import CreateData from './Component/CreateData'
import ViewData from './Component/ViewData'
import UpdateData from './Component/UpdateData'

const App = () => {
  return (
    <>
          <BrowserRouter>
            <Routes>
              <Route path = "/" element = {<StudentData />} />
              <Route path = "/create-data" element = {<CreateData />} /> 
              <Route path = "/users/:id"    element = {<ViewData />} /> 
              <Route path = "/users/update/:id" element = {<UpdateData />} />

            </Routes>
          </BrowserRouter>
    </>


  )
}

export default App