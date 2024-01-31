import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const ImageSearch = ({searchText}) => {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`search?query=${text}`)
  }

  return (
    <form className='my-8 relative' onSubmit={handleSubmit}>
      <input type="text" className='w-full py-2 px-5 rounded-full h-[60px] focus:border-2 focus:border-violet-600 focus:outline-none text-black' placeholder='Search for images...' onChange={(e) => setText(e.target.value)} />
      <button type="submit" className='absolute right-1 top-[5px] py-auto px-10 h-[50px] rounded-full bg-violet-600 hover:bg-violet-800'>
        <i className="ri-search-line"></i>
      </button>
    </form>
  )
}

export default ImageSearch