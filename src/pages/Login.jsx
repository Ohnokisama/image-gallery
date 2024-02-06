import React, {useState, useEffect} from 'react'
import { UserAuth } from "../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'

// Images for background
import Image7 from './../assets/9.jpg'

function Login() {
  // Authentication functions
  const {user, logIn, signInWithGoogle} = UserAuth()

  // Navigation variable
  const navigate = useNavigate()

  useEffect(() => {
    if(user?.email) {
      navigate('/')
    }
  }, [user?.email])

  // Form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Password Visibility
  const [show, setShow] = useState(true)

  // Form submit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await logIn(email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  return (
    <div className='flex h-[100vh]'>
      <div className='hidden md:block md:w-[50%] h-full'>
        <img src={Image7} alt="" className='w-full h-full object-cover' />
      </div>
      <div className='w-[100%] md:w-[50%] h-full flex items-center px-6 md:px-12'>
        <form className='w-full' onSubmit={handleSubmit}>
          <div className='my-4'>
            <h1 className="text-3xl md:text-5xl font-bold">Login</h1>
            <p className='mt-3 text-gray-700'>Login to download images</p>
          </div>
          {error ? <div className="bg-red-600 text-white py-4 px-2">{error}</div> : null}
          <div className='my-5'>
            <label htmlFor="" className='font-bold'>Email Address</label>
            <input type="email" className="w-full border-b-2 border-b-gray-800 h-[50px] focus:border-b-violet-600 focus:outline-none" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='my-5 relative'>
            <label htmlFor="" className='font-bold'>Password</label>
            <span className='absolute right-0 top-10' onClick={() => setShow(!show)}>
              {
                show ? <i className="ri-eye-line" onClick={() => document.querySelector('.pass').type = "text"}></i> : <i className="ri-eye-off-line" onClick={() => document.querySelector('.pass').type = "password"}></i>
              }
            </span>
            <input type="password" className="w-full border-b-2 border-b-gray-800 h-[50px] focus:border-b-violet-600 focus:outline-none pass" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className='py-4 px-12 bg-violet-600 text-white rounded hover:bg-violet-900 transition-all'>Login</button>
          <p className='my-3'>Or</p>
          <button type="button" className='py-2 px-6 bg-white text-violet-600 border-2 border-violet-600 rounded hover:bg-violet-600 hover:text-white transition-all' onClick={() => signInWithGoogle()}>
            <i className="ri-google-line"></i>&nbsp;
            Login with Google
          </button>
          <p className="my-4">
            Already have an account? <Link to='/register' className='text-violet-600 font-bold'>Click Here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login