"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FaSun, FaMoon, FaGlobe } from "react-icons/fa";

function Navigationbar({ className }: { className?: string }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [activeLink, setActiveLink] = useState("home");

  const [mounted, setMounted] = useState(false);

  // Toggle the theme
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const onUpdateActiveLink = (value: string) => {
    setActiveLink(value);
  };

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("fixed  inset-x-0 mx-auto z-50", className)}>
      <Navbar
        expand="md"
        className="bg-custom-light text-custom-light shadow-custom-light dark:bg-custom-dark dark:text-custom-dark dark:shadow-custom-dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <Image src="/sycas-logo.svg" width={500} height={500} alt="logo" />
          </Navbar.Brand>

          <Nav className="ms-auto">
          <Nav.Link
              href="#projects"
              className={
                activeLink === "projects" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("projects")}
            >
              <Menu setActive={setActive}>
                Admin Roles
              </Menu>
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={
                activeLink === "projects" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("projects")}
            >
              <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Setup">
                  <div className="flex flex-col space-y-4 text-sm ">
                    <HoveredLink href="/tariff-parameter">
                      Tariff Parameter
                    </HoveredLink>
                    <HoveredLink href="/discount-penalty">
                      Discount/Penalty
                    </HoveredLink>
                    <HoveredLink href="/meter-type">Meter type</HoveredLink>
                    <HoveredLink href="/event-charge">Event Charge</HoveredLink>
                  </div>
                </MenuItem>
              </Menu>
            </Nav.Link>

            <Nav.Link
              href="#skills"
              className={
                activeLink === "skills" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("skills")}
            >
              <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Billing">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/masik-billing">
                      Masik Billing
                    </HoveredLink>
                    <HoveredLink href="/meter-reading">
                      Meter Reading
                    </HoveredLink>
                    <HoveredLink href="/statement">Statement</HoveredLink>
                    <HoveredLink href="/load-meter-reading">
                      Load Meter Reading
                    </HoveredLink>
                  </div>
                </MenuItem>
              </Menu>
            </Nav.Link>
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Customer">
                  <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                    <ProductItem
                      title="Register Customer"
                      href="/register-customer"
                      src="/sycas-halflogo.svg"
                      description="Quickly add new customers to your system with an intuitive registration process."
                    />
                    <ProductItem
                      title="Edit Customer"
                      href="/edit-customer"
                      src="/sycas-halflogo.svg"
                      description="Easily update customer details and keep your records accurate in real-time."
                    />
                    <ProductItem
                      title="Cancel Transaction"
                      href="/cancel-transaction"
                      src="/sycas-halflogo.svg"
                      description="Seamlessly cancel ongoing transactions while maintaining full audit logs."
                    />
                    <ProductItem
                      title="Delete Customer"
                      href="/delete-customer"
                      src="/sycas-halflogo.svg"
                      description="Permanently remove customers from your database with secure deletion protocols."
                    />
                  </div>
                </MenuItem>
              </Menu>
            </Nav.Link>
          </Nav>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto space-x-4">
              <Menu setActive={setActive}>
                <div
                  style={{
                    border: isDark
                      ? "1px solid rgb(100,100,100)"
                      : "1px solid rgb(5,5,5)",
                  }}
                  className="flex items-center px-2 py-1 rounded-md "
                >
                  <FaGlobe className="mr-2 text-gray-600 text-lg" />
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Language"
                  >
                    <div className="flex flex-col space-y-4 text-sm">
                      <HoveredLink href="/english">English</HoveredLink>
                      <HoveredLink href="/nepali">Nepali</HoveredLink>
                    </div>
                  </MenuItem>
                </div>
              </Menu>

              {/* Toggle Theme Button */}
              <div className="flex items-center space-x-2">
                {isDark ? (
                  <FaSun
                    onClick={toggleTheme}
                    className="text-yellow-200 cursor-pointer text-2xl"
                  />
                ) : (
                  <FaMoon
                    onClick={toggleTheme}
                    className="text-gray-500 cursor-pointer text-2xl"
                  />
                )}
              </div>

              <Link href="/profile">
                <Image
                  src="/sycas-halflogo.svg" 
                  alt="Profile"
                  width={30} 
                  height={30} 
                  className="rounded-full object-cover"
                />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
