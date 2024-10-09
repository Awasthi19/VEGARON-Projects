import React from "react";

function Members() {
  return (
    <section  className=" border-t py-6 dark:bg-custom-dark dark:text-custom-dark">
      <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
        <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">
          Committee Members
        </h1>
        <p className="max-w-2xl text-center dark:text-custom-dark">
          Dedicated and enthusiastic individuals who are passionate about their work.
        </p>
        <div className="flex flex-row flex-wrap-reverse justify-center">
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src="/sycas-halflogo.svg"
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-custom-dark">Visual Designer</p>
          </div>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src="/sycas-halflogo.svg"
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-custom-dark">Visual Designer</p>
          </div>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src="/sycas-halflogo.svg"
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-custom-dark">Visual Designer</p>
          </div>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src="/sycas-halflogo.svg"
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-custom-dark">Visual Designer</p>
          </div>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src="/sycas-halflogo.svg"
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-custom-dark">Visual Designer</p>
          </div>
          <div className="flex flex-col justify-center m-8 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src="/sycas-halflogo.svg"
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-custom-dark">Visual Designer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Members;
