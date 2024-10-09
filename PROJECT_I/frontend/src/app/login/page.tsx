"use client";
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { Fullscreen } from 'lucide-react';
import './login.css'; 
import { Roboto } from '@next/font/google';
import { toast, ToastContainer } from 'react-toastify'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

function Login() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  useEffect(() => {
    if(user.email !== '' && user.password !== '') {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const [loading, setLoading] = useState(false)

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log(user)
      const formdata = new FormData() 
      formdata.append('email', user.email)
      formdata.append('password', user.password)
      const response = await axios.post(process.env.NEXT_PUBLIC_LOGIN_URL!, formdata)
      document.cookie = `jwt=${response.data.jwt}; path=/; secure; samesite=strict;`
      console.log(response)
      toast.success('Login successful')
      router.push('/profile')
    } catch (error:any) {
      console.log(error.message)
      
      toast.error(error.message)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-700">
      <div className='z-10 absolute top-[50px] left-[50px] bottom-[50px] right-[50px] flex items-start border-none border-gray-300 rounded-3xl'
        style={{ boxShadow: '-0.3em -0.5em 2em gray' }}>

        <nav className="navbar">
          <div className="navbar-container">
              
              <ul className="navbar-menu">
                  <li><a href="#hamburger">
                      <Fullscreen className="h-6 w-6" />
                  </a></li>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#contact">Contact</a></li>
              </ul>
              <a href="#" className="navbar-logo">
                <Image
                  src="/LOGO1.svg"
                  width={200}
                  height={50}
                  alt="Logo"
                />
              </a>

          </div>
        </nav>

        <div className=" relative w-[850px] h-full">
          <Image
            priority={true}
            src="/pxfuel.jpg"
            alt="Logo"
            fill={true}
            objectFit='cover'
            className='rounded-l-3xl'

          />
           <div className="absolute bottom-[15%] left-[10%] flex flex-col">
              <h1 className="text-4xl font-bold text-white pb-4">Welcome</h1>
              <p className="text-white">Please login in the right half</p>
          </div>
        </div>
      

      <div className="  bg-black h-full rounded-r-3xl flex flex-1 flex-col justify-center ">
       <div className='mt-10'>
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-2 items-center ">
          <Image
            priority={true}
            width={70}
            height={70}
            src="/usericon.svg"
            alt="Logo"
          />
          <h2 className={`${roboto.className} text-center text-xl font-bold leading-9 tracking-tight text-gray-600`}>
            {loading ? "Loading...":"Login to your account"}
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className={`${roboto.className} block text-sm font-medium leading-6 text-white`}>
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder='Username'
                  className="text-input"
                  value={user.email}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={`${roboto.className} block text-sm font-medium leading-6 text-white`}>
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder='Password'
                  className="text-input"
                  value={user.password}
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={buttonDisabled}
                className={`${buttonDisabled?'bg-gray-600':'bg-yellow-600'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
            
          </p>
        </div>
        </div>
      </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Login