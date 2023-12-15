import React, { useState } from 'react'
import { IoMdEye , IoIosEyeOff } from "react-icons/io";
import loginBG  from "../assets/loginImages/commonBackgroundImage.png"
import { useFormik } from 'formik';
import * as yup from "yup"
import logo from "../assets/loginImages/nematEnterprisesLogo.png"
import axios from 'axios';
import ChangePassword from './ChangePassword';
import { useDispatch } from 'react-redux';
import { setUser } from "../slices/profileSlice";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

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
   
  //Second Validation Form for Login Only .
   const object2 = yup.object({
    email:yup.string().email("Enter the Valid Email id").required("Enter Your Email"),
    password:yup.string().min(5).required("Enter the Password"),
   })

   //Handling the Data.
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
    <section style={{ height: '100vh' }}>
       <Toaster/>
      <div className="grid grid-cols-1 md:grid-cols-2  w- h-full lg:px-0 lg:my-22  ">
        <div className="relative flex items-end  ">
          <div className="absolute h-[99%] xl:h-[650px] xl:w-[520px] object-cover  w-[100%] -z-10">
            <img
              className="h-full w-full object-cover"
              src={loginBG}
              alt="loginImage"

            />
            <div className='absolute flex left-[120px] justify-center items-center  h-[110px] w-[47%] z-10 top-[30px]'>
            <img 
              className='h-[156px] w-[106px] z-10 '
              src={logo}
              />
              </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-[#642F29] sm:text-5xl font-roxborough">{changePassword ? "Log In" : "Change Default Password"}</h2>
            {

              //if changePassword is True Then Render Login Page.
              changePassword ? (
                   <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>
                      <div className="space-y-5">
                        <div>
                          <label htmlFor="" className="text-base font-medium text-[#642F29]">
                            {' '}
                            Email address{' '}
                          </label>
                          <div className="mt-2 ">
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
                          
                          <div className="mt-2 flex justify-center items-center border-b-2 border-b-[#642F29] ">
                            <input
                              className="flex h-10 w-full bg-transparent px-3 py-2  placeholder:text-[#642F29] focus:outline-none text-[#642F29] disabled:cursor-not-allowed disabled:opacity-50 text-xl "
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
                    {/* if user First time login we need show him change password component for the 1st time only */}
                      <ChangePassword />
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