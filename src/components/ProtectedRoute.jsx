import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function ProtectedRoute({children}) {
  const {user} = UserAuth()
  const navigate = useNavigate()

  if(!user) {
    navigate('/')
  } else {
    return children
  }
}

export default ProtectedRoute