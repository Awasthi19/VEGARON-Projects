'use client';
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-black text-white py-4 px-6 lg:px-24 fixed w-full z-50 navbar">
      <div className="flex justify-between items-center navbar-container">
        <div className="text-xl font-bold">
          <Link href="/" onClick={(e) => handleScroll(e, "home")}>
            Tank Prasad
          </Link>
        </div>
        <div className="hidden md:flex space-x-8 navbar-links">
          <Link href="#home" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "home")}>
            Home
          </Link>
          <Link href="#about" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "about")}>
            About
          </Link>
          <Link href="#projects" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "projects")}>
            Projects
          </Link>
          <Link href="#contact" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "contact")}>
            Contact
          </Link>
        </div>
        <div className="md:hidden navbar-mobile-button">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 navbar-mobile-menu active">
          <Link href="#home" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "home")}>
            Home
          </Link>
          <Link href="#about" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "about")}>
            About
          </Link>
          <Link href="#projects" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "projects")}>
            Projects
          </Link>
          <Link href="#contact" className="hover:text-yellow-500 transition" onClick={(e) => handleScroll(e, "contact")}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}