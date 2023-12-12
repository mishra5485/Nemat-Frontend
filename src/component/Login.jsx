import React, { useState } from 'react'
import { IoMdEye , IoIosEyeOff } from "react-icons/io";
import loginBG  from "../assets/loginImages/commonBackgroundImage.png"
import logo from "../assets/loginImages/nematEnterprisesLogo.png"


const Login =() => {


   const [showPassword , setShowPassword] = useState(false);
   const [value , setValue] = useState({
      email:"", pwd:"",
   })

   const showHandler = () =>{
      setShowPassword(!showPassword)
   }

   const changeHandler = (e) => {
      setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
   }



  return (
    <section style={{ height: '100vh' }}>
      <div className="grid grid-cols-1 md:grid-cols-2  h-full lg:px-0 lg:my-22  ">
        <div className="relative flex items-end  ">

          <div className="absolute h-[99%]  object-cover  w-[100%] ">
            <img
              className="h-full w-full rounded-md object-cover"
              src={loginBG}
              alt="loginImage"

            />
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-[#642F29] sm:text-4xl">Log In</h2>
            
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-[#642F29]">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name='email'
                      value={value.email}
                      onChange={changeHandler}
                    ></input>
                  </div>
                </div>
                <div>
                  
                  <div className="mt-2 flex justify-center items-center border-b-2 border-b-[#642F29]">
                    <input
                      className="flex h-10 w-full bg-transparent px-3 py-2  placeholder:text-[#642F29] focus:outline-none text-[#642F29] disabled:cursor-not-allowed disabled:opacity-50 text-xl "
                      type=  {showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={value.pwd}
                      name='pwd'
                      onChange={changeHandler}
                    >
                    </input>
                    <span className=''>
                        {
                        showPassword ? <IoMdEye onClick={showHandler} size={20}/> : <IoIosEyeOff onClick={showHandler} size={20}/>
                        }
                     </span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-[179px] h-[43px]  mt-8 items-center justify-center  rounded-3xl bg-[#60713A]  font-semibold leading-7 text-white"
                  >
                    LOG IN
                  </button>
                  <p className=" text-sm text-[#642F29] mt-[50px]">
              Don&apos;t have an account?{' '}
              <a
                href="#"
                title=""
                className="font-semibold text-[#642F29] transition-all duration-200 hover:underline"
              >
                REQUEST AN ACCOUNT
              </a>
            </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Login