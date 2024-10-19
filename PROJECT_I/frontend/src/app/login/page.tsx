"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Fullscreen } from "lucide-react";
import "./login.css";
import { Roboto } from "next/font/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabelInput from "@/components/floatingInput";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    if (user.email !== "" && user.password !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(user);
      const formdata = new FormData();
      formdata.append("email", user.email);
      formdata.append("password", user.password);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_LOGIN_URL!,
        formdata
      );
      document.cookie = `jwt=${response.data.jwt}; path=/; secure; samesite=strict;`;
      console.log(response);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#f8f3f0] ">
      <div
        className="bg-white z-10 absolute top-[50px] left-[50px] bottom-[50px] right-[50px] flex items-start border-none border-gray-300 rounded-3xl"
        style={{ boxShadow: "0 5px 7px rgba(100, 100, 100, 0.5)" }}
      >
        <div className="flex relative w-[850px] h-full ">
          <Image
            priority={true}
            src="/sycas-logo.svg"
            alt="Logo"
            width={800}
            height={240}
            className="absolute left-[30px] top-[13%] rounded-l-3xl"
          />
          <div className="absolute bottom-[15%] left-[10%] flex flex-col ">
            <h1
              className={` text-[36px] font-bold text-[#1f1f1f] pb-2`}
            >
              Welcome
            </h1>
            <p className={`text-[16px] text-[#1f1f1f]`}>
              Please login in the right half Please login in the right half
              Please login in the right half Please login in the right half
            </p>
          </div>
        </div>

        <div className="  bg-white h-full rounded-r-3xl flex flex-1 flex-col justify-center ">
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div className=" sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-2 items-center mb-[40px] ">
                <h2
                  className={`${roboto.className} text-center text-[40px] font-bold leading-9 tracking-tight text-[#17c8b9]`}
                >
                  {loading ? "Loading..." : " Welcome Back"}
                </h2>
              </div>
              <FloatingLabelInput
                id="email"
                name="email"
                value={user.email}
                placeholder="Email"
                onChange={handleChanges}
              />
              <FloatingLabelInput
                id="password"
                name="password"
                value={user.password}
                placeholder="Password"
                onChange={handleChanges}
              />

              <div>
                <button
                  type="submit"
                  disabled={buttonDisabled}
                  className={`${
                    buttonDisabled ? "bg-[#17c8b9]" : "bg-[#e16e28]"
                  } flex w-full max-w-xs mx-auto justify-center rounded-md   py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4ae0d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
              <div className="relative mt-2 max-w-xs mx-auto">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-400"></div>
                </div>
                <div className="relative bg-white text-gray-400 px-2 mx-auto text-center w-fit">
                  OR
                </div>
              </div>
              <div className="relative mt-2 max-w-xs mx-auto">
                <button
                  className=" gsi-material-button"
                  style={{ width: "320px" }}
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        style={{ display: "block" }}
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        ></path>
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        ></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      Sign in with Google
                    </span>
                    <span style={{ display: "none" }}>Sign in with Google</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
