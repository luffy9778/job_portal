import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const RequiredAuth = ({allowedRoles}) => {
    const {auth}=useContext(AuthContext)
  return (
    auth?.role===allowedRoles?
    <Outlet/>: 
    //  auth?.accessToken ?<Navigate to="/" /> :
    <Navigate to="/login" />
  )
}

export default RequiredAuth