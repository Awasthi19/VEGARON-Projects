import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer  className=" border-top d-flex flex-wrap justify-content-between align-items-center py-3  dark:bg-custom-dark ">
      <div className=" ml-10 col-md-4 d-flex align-items-center">
        <a href="/" className="mb-3 me-2 mb-md-0  text-decoration-none lh-1">
        <Image src="/sycas-halflogo.svg" width={30} height={30} alt="logo" />
        </a>
        <span className=" ml-10 mb-3 mb-md-0  dark:text-custom-dark ">© 2024 Company, Inc. All rights reserved.</span>
      </div>

      <ul className=" mx-10 nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a className="" href="#">
          <Image src="/sycas-halflogo.svg" width={30} height={30} alt="logo" />
          </a>
        </li>
        <li className="ms-3">
          <a className="" href="#">
          <Image src="/sycas-halflogo.svg" width={30} height={30} alt="logo" />
          </a>
        </li>
        <li className="ms-3">
          <a className="" href="#">
          <Image src="/sycas-halflogo.svg" width={30} height={30} alt="logo" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
