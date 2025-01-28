import { useState } from 'react'
import "./index.css"
import { Routes,Route } from 'react-router-dom'
import Navbaruser from './components/Navbaruser'
import Home from './pages/user/Home'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import RecuriterLogin from './pages/recruiter/RecuriterLogin'
import RecruiterSignup from './pages/recruiter/RecruiterSignup'
import RecruiterNavbar from './components/recruiter/RecruiterNavbar'
import RecruiterHome from './pages/recruiter/RecruiterHome'
import JobDetailsPage from './pages/user/JobDetailsPage'
import JobApplicationForm from './pages/user/JobApplicationForm'
import ViewRecruiterList from './pages/admin/ViewRecruiterList'
import AdminLogin from './pages/admin/AdminLogin'


function App() {

  return (
    <>
    <Routes>
      <Route path="/signUp" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/navbar" element={<Navbaruser/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/jobDetails" element={<JobDetailsPage/>} />
      <Route path="/jobSubmit" element={<JobApplicationForm />} />



      <Route path="/recruiterLogin" element={<RecuriterLogin/>} />
      <Route path="/recruiterSignup" element={<RecruiterSignup/>} />
      <Route path="/recruiterNavbar" element={<RecruiterNavbar/>} />
      <Route path="/recruiterHome" element={<RecruiterHome/>} />



      <Route path="/admin/viewlist" element={<ViewRecruiterList/>} />
      <Route path="/admin/login" element={<AdminLogin/>} />




    </Routes>
    </>
  )
}

export default App
