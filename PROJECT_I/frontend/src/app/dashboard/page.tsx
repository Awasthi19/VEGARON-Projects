"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from "@/components/navbar";
import { Fullscreen } from 'lucide-react';
import Image from 'next/image'

function Profile() {

    const router = useRouter()
    const [data, setData] = React.useState<any>(null)

    const handleLogout = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            await axios.get('/api/users/logout')
            router.push('/login')
        } catch (error:any) {   
            console.log(error.message)
        }
    }

    const getUser = async () => {
        try {
            const jwt = {
                jwt: document.cookie.split('=')[1]
            }
            const res = await axios.get(process.env.NEXT_PUBLIC_PROFILE_URL!,{
                params:jwt,
            })
            console.log(res.data)
            setData(res.data.email)
        } catch (error:any) {
            console.log(error.message)
        }
    }
    getUser()


  return (
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

  )
}

export default Profile