import React from 'react'
import { UserAuth } from "../context/AuthContext"

const Footer = () => {
  const {user} = UserAuth()

  return (
    <>
      {
        user?.email ? 
          <div className='py-6 px-12 bg-violet-600 text-white text-center fixed bottom-0 z-10 w-full'>
          <p>These images were gotten from Pixabay API</p>
        </div> : ""
      }
    </>  
  )
}

export default Footer