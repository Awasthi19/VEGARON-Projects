import { Fullscreen } from 'lucide-react';
import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen'>
    <nav className="navbar fixed">
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

        <aside className="sidebar fixed">
          <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Logout</a></li>
          </ul>
        </aside>
        <main className='main'>
        <div className='border-white  border-[1px] rounded-[10px] h-[150px] w-[250px]'>
          <div></div>
        </div>
          <h1>Dashboard</h1>
        </main>

       
      </div>
  );
}
