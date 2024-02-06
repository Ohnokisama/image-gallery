import React from 'react'
import Bg from './../assets/10.jpg'
import SavedImages from '../components/SavedImages'

function Account() {
  return (
    <>
      <div className="w-full h-[400px] md:h-[500px] text-white relative">
        <img src={Bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute bg-violet-600/50 w-full h-full top-0 left-0 flex items-center">
          <h1 className="text-3xl md:text-5xl font-bold mx-6 md:mx-12">Your Saved Images</h1>
        </div>
      </div>
      <SavedImages />
    </>
  )
}

export default Account