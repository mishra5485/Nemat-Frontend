import React, { useState } from 'react'
import { IoMdEye , IoIosEyeOff } from "react-icons/io";
import loginBG  from "../assets/loginImages/loginImage.png"
import { useFormik } from 'formik';
import * as yup from "yup"
import logo from "../assets/loginImages/nematEnterprisesLogo.png"
import axios from 'axios';
import ChangePassword from './ChangePassword';
import { useDispatch } from 'react-redux';
import { setUser } from "../slices/profileSlice";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import {LoginObjectSchema} from "../validationSchem/index.js"
import FlowerPattern from "../assets/loginImages/FlowerPattern.png"
import InfiniteScrollImage from '../style/InfiniteScrollImage.jsx';

const Login =() => {

   const dispatch = useDispatch();
   const [showPassword , setShowPassword] = useState(false);
   const [changePassword , setChangePassword ] = useState(true)
   const navigate = useNavigate();


   //Toggling for show password or hide password
   const showHandler = () =>{
      setShowPassword(!showPassword)
   }


   //Checking the data which your put is valid or not SChema. 
   const objectSchem = yup.object({
    currentpassword:yup.string().min(5).required("Enter the current Password"),
    newpassword:yup.string().min(5).required("Enter the New Password"),
    confirmPWD:yup.string().min(5).oneOf([yup.ref('newpassword'), null], 'Passwords must match').required("Confirm the Password"),
   })


   //initialValues of Form data After 1st Render State . 
   const initialValues = {
      email:"",
      password:"",
      curremtPWD:"",
      newpassword:"",
      confirmPWD:"",
   }

  let Customer_id="";
   
   //Handling the Data.
   const { values , errors  , handleChange , handleSubmit , touched , handleBlur} = useFormik({
    initialValues,
    validationSchema:LoginObjectSchema,
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

          // console.log(response)
  
          if(response.status === 200){
            const Customer_id= response.data
              dispatch(setUser(Customer_id))
              if(response?.data?.SkipChangeDefaultPasswordPage === 1){
                  //if user success full login and he alredy change the password.
                  // Redirect toward Home or Menu page
                  toast.success("Login successfully");
                  navigate("/");

              }else{
                  // we need to Render Change Password Component 

                  setChangePassword(false);
              }
          }

        }catch(error){
          //Error which Coming From Server.
          if(error.response){
               const {status , data} = error.response;

               if(
                  status === 404 ||
                  status === 403 ||
                  status === 500 ||
                  status === 302 ||
                  status === 409 ||
                  status === 401 ||
                  status === 400
               ){
                  toast.error(data)
               }
            }
        }
    },
    
   })

    


  return (
    <div className='w-full flex h-[100vh] box-border min-h-screen overflow-hidden'>
       <Toaster/>

        <div className="flex h-full min-w-[45%]">
            <div className='overflow-hidden flex relative h-[100vh] w-full'>
              <div style={{ backgroundImage: `url(${loginBG})`  }} className='w-[100vh] object-cover bg-cover  flex-wrap bg-no-repeat bg-center' >
                 
                  <div className='flex w-[100%] justify-center items-center mt-5'>
                      <img src={logo}
                        className=''
                      alt="" />
                  </div>
              </div>
            </div>
            <div className='overflow-hidden'>
                <InfiniteScrollImage/>
            </div>
        </div>
        <div className='w-full min-w-[50%]  h-full'>
          <div className='w-[100%] h-[100%] flex justify-center items-center'>
              <div className="flex items-start justify-evenly px-4 py-10 sm:px-6 sm:py-16 lg:-pl-10 lg:py-24  lg:pr-40 ">
          <div className="xl:mx-auto lg:min-w-full xl:w-full xl:max-w-sm 2xl:max-w-md ">
            <h2 className="text-3xl mb-5 leading-tight text-[#642F29] sm:text-4xl font-roxborough">{changePassword ? "Log in" : "Change Default Password"}</h2>
            {

              //if changePassword is True Then Render Login Page.
              changePassword ? (
                   <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>
                      <div className="space-y-5">
                        <div>
                          <label htmlFor="" className="text-lg font-Marcellus  text-[#642F29]">
                            {' '}
                            Username{' '}
                          </label>
                          <div className="mt-2 ">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                              type="email"
                              placeholder="Email"
                              value={values.email}
                              id="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></input>
                            {errors.email && touched.email ? (<p className='font-Marcellus text-red-900'>{errors.email}</p>) : ("") }
                          </div>
                        </div>
                        <div>
                        <div>
                           <label htmlFor="" className="text-lg font-Marcellus  text-[#642F29]">
                            {' '}
                            Password{' '}
                          </label>
                          <div className="mt-2 flex justify-center items-center border-b-2 border-b-[#642F29] ">
                            <input
                              className="flex h-10 w-full bg-transparent px-3 py-2  placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none text-[#642F29] disabled:cursor-not-allowed disabled:opacity-50 text-xl "
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
                          </div>
                            {errors.password && touched.password ? (<p className='font-Marcellus text-red-900'>{errors.password}</p>):("")}
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="inline-flex w-[179px] h-[43px]  mt-8 items-center justify-center  rounded-3xl bg-[#60713A]  leading-7 text-white font-marcellus text-base  leading-17 tracking-normal text-center"
                          >
                            LOG IN
                          </button>
                          <p className=" text-sm font-Marcellus text-[#642F29] mt-[50px] gap-6">
                      Don&apos;t have an account? {''}
                      <Link
                        to="/companydetails"
                        title=""
                        className=" font-Marcellus text-base underline  text-[#642F29] transition-all duration-200 hover:underline"
                      >
                         REQUEST AN ACCOUNT
                      </Link>
                    </p>
                        </div>
                      </div>
                  </form>
              ) : 
              (
                <>  
                    {/* if user First time login we need show him change password component for the 1st time only */}
                      <ChangePassword />
                </>
              )
            }
          </div>
        </div>
          </div>
        </div>
       
      </div>
    )
}


export default Login