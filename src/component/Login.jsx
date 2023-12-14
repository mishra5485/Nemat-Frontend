import React, { useState } from 'react'
import { IoMdEye , IoIosEyeOff } from "react-icons/io";
import loginBG  from "../assets/loginImages/commonBackgroundImage.png"
import { useFormik } from 'formik';
import * as yup from "yup"
import logo from "../assets/loginImages/nematEnterprisesLogo.png"
import axios from 'axios';


const Login =() => {


   const [showPassword , setShowPassword] = useState(false);
   const [changePassword , setChangePassword ] = useState(true)

   const showHandler = () =>{
      setShowPassword(!showPassword)
   }


   const objectSchem = yup.object({
    currentpassword:yup.string().min(5).required("Enter the current Password"),
    newpassword:yup.string().min(5).required("Enter the New Password"),
    confirmPWD:yup.string().min(5).oneOf([yup.ref('newpassword'), null], 'Passwords must match').required("Confirm the Password"),
   })

   const initialValues = {
      email:"",
      password:"",
      curremtPWD:"",
      newpassword:"",
      confirmPWD:"",
   }

  let Customer_id="";
   
   const object2 = yup.object({
    email:yup.string().email("Enter the Valid Email id").required("Enter Your Email"),
    password:yup.string().min(5).required("enter the Password"),
   })


   const { values , errors  , handleChange , handleSubmit , touched , handleBlur} = useFormik({
    initialValues,
    validationSchema:object2,
    onSubmit: async (values , action) =>{
        const palyload = {
          Email:values.email,
          password:values.password
        };
        try{
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/login`,
            palyload
          );

          console.log(response)
  
          if(response.status === 200){
              if(response?.data?.SkipChangeDefaultPasswordPage === 1){
                  // Redirect toward Home or Menu page
                  console.log("hello")
              }else{
                  // Call change pawword Component
                  setChangePassword(false);
                  Customer_id = response?.data?.customer_id
              }
          }

        }catch(error){
          console.log(error)
        }
    },
    /*
    validationSchema:objectSchem,
    onSubmit: async(values , action) => {
        const payload = {
            customer_id:Customer_id,
            OldPassword:values.curremtPWD,
            NewPassword:values.newpassword,
        };

        try {

          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/changepassword`,
            payload
          );

          console.log(response);


        } catch (error) {
            console.log(error)
        }


    }
    */

   })

    const formik = useFormik({
      initialValues:{
        curremtPWD:"",
        newpassword:"",
        confirmPWD:"",
      },
      validationSchema:objectSchem,
      onSubmit : async(values , action) =>{
        console.log(values)
        console.log("hello")
      }

    })

    


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
            <h2 className="text-3xl font-bold leading-tight text-[#642F29] sm:text-4xl">{changePassword ? "Log In" : "Change Default Password"}</h2>
            {
              changePassword ? (
                   <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>
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
                              value={values.email}
                              id="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></input>
                            {errors.email && touched.email ? (<p>{errors.email}</p>) : ("") }
                          </div>
                        </div>
                        <div>
                          
                          <div className="mt-2 flex justify-center items-center ">
                            <input
                              className="flex h-10 w-full bg-transparent px-3 py-2  border-b-2 border-b-[#642F29] placeholder:text-[#642F29] focus:outline-none text-[#642F29] disabled:cursor-not-allowed disabled:opacity-50 text-xl "
                              type=  {showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={values.password}
                              id="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                            </input>

                            <span className=''>
                                {
                                showPassword ? <IoMdEye onClick={showHandler} size={20}/> : <IoIosEyeOff onClick={showHandler} size={20}/>
                                }
                            </span>
                          </div>
                            {errors.password && touched.password ? (<p>{errors.password}</p>):("")}
                        </div>
                        <div>
                          <button
                            type="submit"
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
              ) : 
              (
                <>

                  <form onSubmit={formik.handleSubmit}>
                      <div>
                           <div className='my-4'>
                              <label htmlFor="" className="text-base font-medium text-[#642F29]">
                                {' '}
                                Current Password{' '}
                              </label>
                              <div className=" flex justify-center items-center">
                                <input
                                  className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                                  type=  {showPassword ? "text" : "password"}
                                  placeholder="Enter Current Password"
                                  value={values.curremtPWD}
                                  id="curremtPWD"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></input>
                                   <span className=''>
                                      {
                                      showPassword ? <IoMdEye onClick={showHandler} size={20}/> : <IoIosEyeOff onClick={showHandler} size={20}/>
                                      }
                                  </span>
                                
                              </div>
                                {errors.curremtPWD && touched.curremtPWD ? (<p>{errors.curremtPWD}</p>) : ("") }
                            </div>
                             <div className='my-4'>
                              <label htmlFor="" className="text-base font-medium text-[#642F29]">
                                {' '}
                                New Password{' '}
                              </label>
                              <div className=" flex justify-center items-center">
                                <input
                                  className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                                  type=  {showPassword ? "text" : "password"}
                                  placeholder="Enter New Password"
                                  id="newpassword"
                                  value={values.newpassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></input>
                                   <span className=''>
                                      {
                                      showPassword ? <IoMdEye onClick={showHandler} size={20}/> : <IoIosEyeOff onClick={showHandler} size={20}/>
                                      }
                                  </span>
                                
                              </div>
                                {errors.newpassword && touched.newpassword ? (<p>{errors.newpassword}</p>) : ("") }
                            </div>
                             <div className='my-4'>
                              <label htmlFor="" className="text-base font-medium text-[#642F29]">
                                {' '}
                                Confirm New Password{' '}
                              </label>
                              <div className=" flex justify-center items-center">
                                <input
                                  className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                                  type=  {showPassword ? "text" : "password"}
                                  placeholder="Confirm New Password"
                                  value={values.confirmPWD}
                                  id="confirmPWD"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></input>
                                   <span className=''>
                                      {
                                      showPassword ? <IoMdEye onClick={showHandler} size={20}/> : <IoIosEyeOff onClick={showHandler} size={20}/>
                                      }
                                  </span>
                                
                              </div>
                                {errors.confirmPWD && touched.confirmPWD ? (<p>{errors.confirmPWD}</p>) : ("") }
                            </div>
                                      
                      </div>

                      <div className=''>
                          <button className='p-3 rounded-3xl bg-green-500' type='submit'>
                            Change
                          </button>
                      </div>
                  </form>

                    <button className= ' mt-4 p-3 rounded-3xl bg-green-500'>
                      Do it Later
                    </button>
                  </>
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}


export default Login