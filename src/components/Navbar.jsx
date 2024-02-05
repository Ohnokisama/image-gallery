import React,  {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const {user, logOut} = UserAuth()
  const [text, setText] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`search?query=${text}`)
  }

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  function pageScroll() {
    const apex = window.scrollY
    const navbar = document.querySelector('#navBar')
    const searchForm = document.querySelector('#searchForm')

    if(apex > 100) {
      navbar.classList.add('bg-violet-900')
      searchForm.classList.remove('md:hidden')
    } else {
      navbar.classList.remove('bg-violet-900')
      searchForm.classList.add('md:hidden')
    }
  }
  window.addEventListener('scroll', pageScroll)

  return (
    <nav id='navBar' className='flex justify-between items-center py-3 px-6 md:px-12 fixed z-10 w-full transition-all'>
      <Link to='/'>
        <h1 className='text-3xl text-white'>JayPegs</h1>
      </Link>
      <form className='relative md:w-[500px] md:hidden' onSubmit={handleSubmit} id='searchForm'>
        <input type="text" className='w-full py-2 px-5 rounded-full h-[60px] focus:border-2 focus:border-violet-600 focus:outline-none text-black' placeholder='Search for images...' onChange={(e) => setText(e.target.value)} />
        <button type="submit" className='absolute right-1 top-[5px] py-auto px-10 h-[50px] rounded-full bg-violet-600 hover:bg-violet-800 text-white'>
          <i className="ri-search-line"></i>
        </button>
      </form>
      {
        user?.email ?
        <ul className='flex gap-4 items-center'>
          <li className='px-2'>
            <Link to='/my-account' className='text-white'>
              Account
            </Link>
          </li>
          <li className="px-2">
            <button className='block text-violet-600 py-3 px-6 bg-white rounded' onClick={() => handleLogout()}>
              <i className="ri-logout-circle-line font-bold"></i>&nbsp;
              Logout
            </button>
          </li>
        </ul> :  
        <ul className='flex gap-4'>
          <li className="px-2">
            <Link to='/register' className='text-white'>
              Register
            </Link>
          </li>
          <li className="px-2">
            <Link to='/login' className='text-white'>
              Login
            </Link>
          </li>
        </ul>
      }
      
      
    </nav>
  )
}

export default Navbar