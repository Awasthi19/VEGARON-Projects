"use client";

import React, { useState, useEffect, useRef } from "react";
import { Fullscreen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [customerMenu, setCustomerMenu] = useState<string[]>([
    'Customer Registration',
    'Edit Customer',
    'Change Meter',
    'Disconnect Meter',
    'Cancel Transaction',
  ]);

  const [billingMenu, setBillingMenu] = useState<string[]>([

    'Masik Billing',
    "Meter Reading",
    "Statement",
    "Load Meter Reading",

  ]);

  const [isCustomerMenuOpen, setIsCustomerMenuOpen] = useState(false);
  const [isBillingMenuOpen, setIsBillingMenuOpen] = useState(false);

  const customerMenuRef = useRef<HTMLDivElement>(null);
  const billingMenuRef = useRef<HTMLDivElement>(null);

  const toggleCustomerMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsCustomerMenuOpen((prev) => !prev);
    setIsBillingMenuOpen(false); 
  };

  const toggleBillingMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsBillingMenuOpen((prev) => !prev);
    setIsCustomerMenuOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customerMenuRef.current && !customerMenuRef.current.contains(event.target as Node)) {
        setIsCustomerMenuOpen(false);
        console.log('customer menu closed');
      }
      if (billingMenuRef.current && !billingMenuRef.current.contains(event.target as Node)) {
        setIsBillingMenuOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  return (
    <nav className="navbar fixed">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li>
            <a href="#hamburger">
              <Fullscreen className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="#about">Home</a>
          </li>
          <li className="relative">
            <a href="#customers" onClick={toggleCustomerMenu}>Customers</a>
            {isCustomerMenuOpen && (
              <div
                className="menu-container absolute left-[-50px] mt-[15px]"
                ref={customerMenuRef}
              >
                {customerMenu.map((item, index) => (
                  <Link href={`/dashboard/${item.replace(/\s+/g, '')}`} key={index}>
                    <div className="menu-item" onClick={() => setIsCustomerMenuOpen(false)}>
                      {item}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li className="relative">
            <a href="#billing" onClick={toggleBillingMenu}>Billing</a>
            {isBillingMenuOpen && (
              <div
                className="menu-container absolute left-[-50px] mt-[15px]"
                ref={billingMenuRef}
              >
                {billingMenu.map((item, index) => (
                  <Link href={`/dashboard/${item.replace(/\s+/g, '')}`} key={index}>
                    <div className="menu-item" onClick={() => setIsBillingMenuOpen(false)}>
                      {item}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li>
            <a href="#services">Report</a>
          </li>
          <li>
            <a href="#setup">Setup</a>
          </li>
        </ul>
        <a href="#" className="navbar-logo">
          <Image src="/LOGO1.svg" width={200} height={50} alt="Logo" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
