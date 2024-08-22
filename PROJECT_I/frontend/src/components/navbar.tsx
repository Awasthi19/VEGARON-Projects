import React from 'react'
import { LayoutGrid, MenuIcon, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';


function Navbar() {
  return (
    <div>
    <div className=
    "flex items-center gap-10 p-2 shadow-lg justify-between"
    >

      <Image src='/drawing-2.svg' width={50} height={50} alt='logo'/>
      <h1 className='text-2xl font-bold'>VEGARON</h1>

      <div className='md:flex hidden font-bold   gap-2 items-center border rounded-full p-1 px-10 bg-slate-200'>
      <LayoutGrid className='h-5 w-5'/>Category
      </div>

      <div className='md:flex hidden gap-2 items-center border rounded-full p-1 px-10 bg-slate-50'>
        <Search/>
        <input type='text' placeholder='Search' className='outline-none bg-transparent ml-2'/>
      </div>

      <div className='flex gap-6 items-center'>

        <ShoppingBag/>
        
        <button className='relative overflow-hidden p-[1px]  rounded-full '>
          <div className='absolute inset-[-1000%] z-0 bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#000_40%,#fff_50%,#000_60%,#000_100%)]
 animate-spin-slow'/>
          <div className='relative rounded-full px-3 py-1 z-100 text-white font-bold font-roboto'
          style={{backgroundColor: 'rgb(200,42,42)'}}
          >Login</div>
        </button>

      </div>

      <div>
        <MenuIcon/>
      </div>
      
    </div>
  </div>
  )
}

export default Navbar