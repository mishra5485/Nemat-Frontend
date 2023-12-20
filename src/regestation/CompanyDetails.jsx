import  { useState } from "react";
import loginBG  from "../assets/loginImages/loginImage.png"
import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/loginImages/nematEnterprisesLogo.png";

// import { counntryCode } from "../CountryCode/data";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {RegisterobjectSchema , CompanyschemaObject} from "../validationSchem/index.js"
import InfiniteScrollImage from "../style/InfiniteScrollImage.jsx";
import "../App.css"
import RightToLeftanm from "../style/RightToLeftanm";

const CompanyDetails = () => {
  const [nextdiv, setnextDiv] = useState(true);
  const [isChecked, setIsChecked] = useState(0);
  const [sentReview, setSentReview] = useState(true);
  const navigate = useNavigate();



  const initialValues = {
    camponeyname: "",
    gstno: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    fullname: "",
    email: "",
    countryCode: "",
    mobileNo: "",
    whatappcheck: "0",
    countryCode1: "",
    landlineNo: "",
  };

  const onSubmit2 = async (event) => {
    event.preventDefault();

    if ( Object.keys(touched).length > 0) {
      // Form is valid, submit the form
      onSubmit2(event);
    } else {
      // Form is invalid, show error messages
      toast.error('Please Fill the Form .');
    }

    try {
      await CompanyschemaObject.validate(values, { abortEarly: false });
      setnextDiv(false);
      // console.log(values);
    } catch (error) {
      // console.error('Form validation error:', error.errors);
    }
  };



  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: RegisterobjectSchema,
      onSubmit: async (values, actions) => {
        // console.log("values inside sumit -> ",values);

        const payload = {
          CompanyName: values.camponeyname,
          GstNo: values.gstno,
          Company_StreetAddress: values.address,
          Company_City: values.city,
          Company_State: values.state,
          Company_ZipCode: values.zipcode,
          CustomerName: values.fullname,
          Email: values.email,
          MobileNumber: values.mobileNo,
          Country_MobileNumber: values.countryCode,
          Country_LandlineNumber: values.countryCode1,
          LandlineNumber: values.landlineNo,
          ReciveUpdates: values.whatappcheck,
        };

        // console.log("values inside sumit -> ",payload)

        try {
          const response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/users/customer/register`,
            payload
          );

          if (response.status === 200) {
            setSentReview(true);
            navigate("/companydetails/requestsent");
            toast.success(response.data);
          }
        } catch (error) {
          if (error.response) {
            const { status, data } = error.response;

            if (
              status === 404 ||
              status === 403 ||
              status === 500 ||
              status === 302 ||
              status === 409 ||
              status === 401 ||
              status === 400
            ) {
              toast.error(data);
            }
          }
        }
      },
    });

  const handleCheckboxChange = () => {
    setIsChecked((prevValue) => (prevValue === 1 ? 0 : 1));
    values.whatappcheck = isChecked === 1 ? 0 : 1;
  };

  return (
    <div className="">
      <Toaster />
          <div className='w-full  h-full object-cover md:flex md:w-full md:h-[100vh]'>
            {/* Image section with Logo */}
            
            <div style={{ backgroundImage: `url(${loginBG})` , backgroundRepeat: 'no-repeat',  }} className= 'mobile:w-full sm:w-full  sm:h-[45vh] mobile::bg-center mobile:h-[40vh] mobile:bg-cover sm:bg-center mobile:bg-center sm:bg-cover sm:object-cover  bg-green-700 md:h-[100%]  md:bg-slate-600 md:min-w-[45%] flex-wrap object-cover -z-10 md:max-w-[80%] lg:w-[40%]' > 
            <div className="flex w-[100%] mt-2 sm:mt-5 sm:  md:h-[20%] justify-center items-center   ">
                <Link to={"/"}>
                  <img src={logo} className="sm:w-[100%] z-10 mobile:h-[80px] mobile:w-[107px] sm:h-[90px] md:w-[150px] md:h-[105px] " alt="" />
                </Link>
              </div>  
            </div>


            {/* Infinite Scroll section */}
            <div className=' overflow-hidden mobile:w-full mobile:h-[45px] sm:w-full sm:h-[45px] min-h-[5%] md:max-w-[4%] md:h-full md:mt-2'>
                <RightToLeftanm/>

                {/* Show FlowerPattern for md and larger screens */}
               <InfiniteScrollImage className="w-full h-full animate-img mobile:hidden sm:hidden md:inline-block"/>
            </div>


          <div className="w-[100%] h-[100%] ">
            <div className="h-full mt-[1%] flex flex-col justify-evenly">
                {
                  nextdiv && sentReview === false  ? (
                      <div className="frame_554 flex  items-center sm:w-full md:w-[120%] md:justify-between xl:w-[80%] mobile:w-[150%] mobile:pl-[3%] mobile:flex mobile:justify-start  justify-evenly mt-3   ">
              <div className="frame_551 gap-2 flex  items-end">
                <div className="flex flex-col justify-center items-center gap-2.5 pt-[0.5px] pb-[0.5px] px-2 w-[1.5625rem] h-[1.5625rem] rounded-full bg-[#60713a] text-white font-['Marcellus'] leading-[149.3%]">
                  1
                </div>
                <div className="text-[#60713a] font-['Marcellus'] leading-[149.3%]">Company details</div>
              </div>
              <svg width={33} height={7} viewBox="0 0 33 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M27.3333 3.5C27.3333 4.97276 28.5272 6.16667 30 6.16667C31.4728 6.16667 32.6667 4.97276 32.6667 3.5C32.6667 2.02724 31.4728 0.833333 30 0.833333C28.5272 0.833333 27.3333 2.02724 27.3333 3.5ZM0 4H30V3H0V4Z" fill="#60713A" />
              </svg>
              <div className="frame_552 flex gap-2 items-end opacity-[0.4]">
                <div className="flex flex-col justify-center items-center gap-2.5 pt-[0.5px] pb-[0.5px] px-2 w-[1.5625rem] h-[1.5625rem] rounded-full bg-[#60713a] text-white font-['Marcellus'] leading-[149.3%]">
                  2
                </div>
                <div className="text-[#60713a] font-['Marcellus'] leading-[149.3%]">Contact info</div>
              </div>
              <svg width={33} height={7} viewBox="0 0 33 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M27.3333 3.5C27.3333 4.97276 28.5272 6.16667 30 6.16667C31.4728 6.16667 32.6667 4.97276 32.6667 3.5C32.6667 2.02724 31.4728 0.833333 30 0.833333C28.5272 0.833333 27.3333 2.02724 27.3333 3.5ZM0 4H30V3H0V4Z" fill="#60713A" />
              </svg>
              <div className="frame_553 gap-2 flex items-end opacity-[0.4]">
                <div className="flex flex-col justify-center items-center gap-2.5 pt-[0.5px] pb-[0.5px] px-2 w-[1.5625rem] h-[1.5625rem] rounded-full bg-[#60713a] text-white font-['Marcellus'] leading-[149.3%]">
                  3
                </div>
                <div className="text-[#60713a] font-['Marcellus'] leading-[149.3%]">Request sent</div>
              </div>
                      </div>
                ) : (
                  null
                )
              }

            <form onSubmit={handleSubmit} className="mt-2">
              {nextdiv && sentReview === false ? (
                <div className="sm:w-[90%] sm:mx-auto mobile:w-[90%] mobile:mx-auto md:h-[100%]">
                  <div className="mt-[2%]">
                    <div className="">
                      <h1 className="sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-3xl md:text-start md:mb-2 ">
                        Request Your Account
                      </h1>
                    </div>

                    <div className="flex flex-row mt-[1.5%] w-[100%]">
                      <div className="md:flex md:flex-row gap-x-2  w-[100%]">
                        <div className="md:w-[50%]">
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            Company name{" "}
                            <span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50 "
                              type="text"
                              placeholder="Company name"
                              id="camponeyname"
                              value={values.camponeyname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></input>
                            {errors.camponeyname && touched.camponeyname ? (
                              <p className="font-Marcellus text-red-900">{errors.camponeyname}</p>
                            ) : (
                              null
                            )}
                          </div>
                        </div>
                        <div className="sm:mt-7 mobile:mt-7 md:mt-0 md:w-[50%]">
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            GST No <span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="sm:mt-[28px] md:mt-0">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50 "
                              type="text"
                              placeholder="GST No"
                              id="gstno"
                              value={values.gstno}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></input>
                            {errors.gstno && touched.gstno ? (
                              <p className="font-Marcellus text-red-900">{errors.gstno}</p>
                            ) : (
                              null
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sm:mt-[50px] mobile:mt-[50px] md:mt-[3%]">
                      <h1 className="sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-3xl md:text-start md:mb-[2%] ">
                        ADD GST Address 
                      </h1>
                    </div>

                    <div className="sm:mt-[30px] mobile:mt-[30px] md:mt-[1%]">
                      <div>
                        <label
                          htmlFor=""
                          className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                        >
                          {" "}
                          Street address <span className="text-red-600">
                            *
                          </span>{" "}
                        </label>
                        <div className="">
                          <input
                            className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-[1%] disabled:opacity-50 "
                            type="text"
                            placeholder="Address"
                            id="address"
                            onChange={handleChange}
                            value={values.address}
                            onBlur={handleBlur}
                          ></input>
                          {errors.address && touched.address ? (
                            <p className="font-Marcellus text-red-900">{errors.address}</p>
                          ) : (
                            null
                          )}
                        </div>
                      </div>
                      <div className="md:flex md:flex-row md:w-[100%] md:mt-[2%]  sm:flex-col mobile:flex-col sm:mt-[30px] mobile:mt-[30px] gap-x-2">
                        <div className="md:w-[50%]">
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            City <span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-[1%] disabled:opacity-50"
                              type="text"
                              placeholder="City"
                              id="city"
                              onChange={handleChange}
                              value={values.city}
                              onBlur={handleBlur}
                            ></input>
                            {errors.city && touched.city ? (
                              <p className="font-Marcellus text-red-900"> {errors.city}</p>
                            ) : (
                              null
                            )}
                          </div>
                        </div>
                        <div className="sm:mt-[30px] mobile:mt-[30px] md:mt-0 md:w-[50%]">
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            State<span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="md:w-[100%]">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-[1%] disabled:opacity-50"
                              type="text"
                              placeholder="State"
                              id="state"
                              onChange={handleChange}
                              value={values.state}
                              onBlur={handleBlur}
                            ></input>
                            {errors.state && touched.state ? (
                              <p className="font-Marcellus text-red-900">{errors.state}</p>
                            ) : (
                              null
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="sm:mt-[30px] mobile:mt-[30px] md:mt-[2%]">
                        <label
                          htmlFor=""
                          className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                        >
                          {" "}
                          ZipCode <span className="text-red-600">*</span>{" "}
                        </label>
                        <div className="">
                          <input
                            className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                            type="text"
                            placeholder="ZipCode"
                            onChange={handleChange}
                            id="zipcode"
                            value={values.zipcode}
                            onBlur={handleBlur}
                          ></input>
                          {errors.zipcode && touched.zipcode ? (
                            <p className="font-Marcellus text-red-900">{errors.zipcode}</p>
                          ) : (
                            null
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => onSubmit2(event)}
                    className="p-2 mobile:mt-[60px] sm:mt-[60px] md:mt-[3%] mobile:w-full mobile:text-xl text-center rounded-3xl bg-[#60713A] text-white font-Marcellus text-base  leading-17 md:w-[25%] h-[43px] overflow-y-hidden"
                  >
                    <span className="text-center"> Next</span>
                  </button>
                  <p className="text-sm font-Marcellus text-[#642F29] text-center mt-[1%]  md:text-lg gap-2 md:text-start">
                    Alrady have an account?{" "}
                    <Link className="font-Marcellus text-base underline  text-[#642F29] transition-all duration-200 hover:underline md:text-xl" 
                    to={"/login"}>
                      LOGIN
                    </Link>
                  </p>
                </div>
              ) : (
                <div>
                  <div>
                  
                    <div className="sm:w-[90%]  mobile:w-[90%] mobile:mx-auto md:flex md:flex-col md:justify-evenly mobile:h-[80vh] md:h-[100vh] md:w-[90%] mobile:overflow-y-auto">
                      <div>
                      <div className="inline-flex items-center gap-[30px] md:ml-0 sm:ml-0 mobile:ml-[-40%] relative">
                        <div className="inline-flex items-end gap-[13px] relative flex-[0_0_auto] font-['Marcellus']">
                          <div className="flex flex-col w-[25px] h-[25px] items-center justify-center gap-[10px] px-[10px] py-[0.5px] relative bg-[#60713a] rounded-[70px]">
                            <div className="flex flex-col justify-center items-center gap-2.5 pt-[0.5px] pb-[0.5px] px-2 w-[1.5625rem] h-[1.5625rem] rounded-full bg-[#60713a] text-white font-['Marcellus'] leading-[149.3%]">
                              1
                            </div>
                          </div>
                          <div className="relative w-fit font-['Marcellus'] font-normal text-[#60713a] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
                            Company details
                          </div>
                        </div>
                                  <svg width={33} height={7} viewBox="0 0 33 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path opacity="0.4" d="M27.3333 3.5C27.3333 4.97276 28.5272 6.16667 30 6.16667C31.4728 6.16667 32.6667 4.97276 32.6667 3.5C32.6667 2.02724 31.4728 0.833333 30 0.833333C28.5272 0.833333 27.3333 2.02724 27.3333 3.5ZM0 4H30V3H0V4Z" fill="#60713A" />
                                </svg>
                        <div className="inline-flex items-end gap-[13px] relative flex-[0_0_auto] font-['Marcellus']">
                          <div className="flex flex-col w-[25px] h-[25px] items-center justify-center gap-[10px] px-[8px] py-[0.5px] relative bg-[#60713a] rounded-[70px]">
                            <div className="flex flex-col justify-center items-center gap-2.5 pt-[0.5px] pb-[0.5px] px-2 w-[1.5625rem] h-[1.5625rem] rounded-full bg-[#60713a] text-white font-['Marcellus'] leading-[149.3%]">
                              2
                            </div>
                          </div>
                          <div className="relative w-fit font-['Marcellus'] text-[#60713a] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
                            Contact info
                          </div>
                        </div>
                                    <svg width={33} height={7} viewBox="0 0 33 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path opacity="0.4" d="M27.3333 3.5C27.3333 4.97276 28.5272 6.16667 30 6.16667C31.4728 6.16667 32.6667 4.97276 32.6667 3.5C32.6667 2.02724 31.4728 0.833333 30 0.833333C28.5272 0.833333 27.3333 2.02724 27.3333 3.5ZM0 4H30V3H0V4Z" fill="#60713A" />
                                </svg>
                        <div className="inline-flex items-end gap-[13px] relative flex-[0_0_auto] opacity-40 font-['Marcellus']">
                          <div className="flex flex-col w-[25px] h-[25px] items-center justify-center gap-[10px] px-[10px] py-[0.5px] relative bg-[#60713a] rounded-[70px]">
                            <div className="flex flex-col justify-center items-center gap-2.5 pt-[0.5px] pb-[0.5px] px-2 w-[1.5625rem] h-[1.5625rem] rounded-full bg-[#60713a] text-white font-['Marcellus'] leading-[149.3%]">
                              3
                            </div>
                          </div>
                          <div className="relative w-fit font-['Marcellus'] font-normal text-[#60713a] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
                            Request sent
                          </div>
                      </div>
                      </div>
                      </div>
                      <div className="">
                      <h1 className="sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-3xl md:text-start md:mb-8 md:mt-6" >Contact Info</h1>

                      <div className="md:flex md:flex-row sm:flex-col mt-6 md:w-[100%] overflow-hidden">
                        <div className="md:flex md:flex-row sm:flex-col gap-x-2  mobile:w-[90%]  sm:w-[90%] md:w-[100%]">
                          <div className="md:w-[50%]">
                            <label
                              htmlFor=""
                              className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                            >
                              {" "}
                              Full Name <span className="text-red-600">
                                *
                              </span>{" "}
                            </label>
                            <div className="">
                              <input
                                className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                                type="text"
                                placeholder="Full Name"
                                id="fullname"
                                value={values.fullname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.fullname && touched.fullname ? (
                                <p className="font-Marcellus text-red-900">{errors.fullname}</p>
                              ) : (
                                null
                              )}
                            </div>
                          </div>
                          <div className="sm:mt-7 mobile:mt-7 md:mt-0 md:w-[50%]">
                            <label
                              htmlFor=""
                              className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                            >
                              {" "}
                              Email <span className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl">*</span>{" "}
                            </label>
                            <div className="">
                              <input
                                className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                                type="email"
                                placeholder="Enter Email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.email && touched.email ? (
                                <p className="font-Marcellus text-red-900">{errors.email}</p>
                              ) : (
                                  null
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:mt-7 mobile:mt-7 sm:mt-7  sm:w-[100%] mobile:w-[100%] ">
                        <div className="flex flex-row gap-0 md:w-[100%] md:gap-x-2 ">
                          <div className="w-[45%]">
                            <label
                              htmlFor=""
                              className="mobile:text-xl  font-Marcellus  text-[#642F29] md:text-xl"
                            >
                              {" "}
                              Country Code{" "}
                              <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="">
                              <input
                                className="flex h-10 w-full md:w-[80%] sm:w-[70%] mobile:w-[70%]   border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                                type=""
                                placeholder="Country Code"
                                id="countryCode"
                                value={values.countryCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>

                              {/* 
                                                 <select
                                                      className="flex h-10 w-[50%] border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                                      id="countryCode"
                                                      value={values.countryCode}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                   >
                                                      <option value="" disabled>
                                                         Select Country Code
                                                      </option>
                                                      {counntryCode.map((country) => (
                                                         <option key={country.code} value={country.code}>
                                                         {country.name} ({country.code})
                                                         </option>
                                                      ))}
                                                   </select>
                                             */}

                              {errors.countryCode && touched.countryCode ? (
                                <p className="font-Marcellus text-red-900">{errors.countryCode}</p>
                              ) : (
                                null
                              )}
                            </div>
                          </div>
                          <div className="md:w-[65%]">
                            <label
                              htmlFor=""
                              className="mobile:text-xl  font-Marcellus  text-[#642F29] md:text-xl"
                            >
                              {" "}
                              Mobile Number{" "}
                              <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="">
                              <input
                                className="flex h-10 w-full sm:w-[120%] mobile:w-[120%]  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                                type="text"
                                placeholder=" Mobile Number"
                                id="mobileNo"
                                value={values.mobileNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.mobileNo && touched.mobileNo ? (
                                <p className="font-Marcellus text-red-900">{errors.mobileNo}</p>
                              ) : (
                                null
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex mt-7 md:gap-2 gap-1 md:w-full md:text-lg">
                        <input
                          className=""
                          type="checkbox"
                          id="whatappcheck"
                          checked={isChecked === 1}
                          onChange={handleCheckboxChange}
                        />
                        {/* {console.log(values.whatappcheck)} */}
                        <label className="w-full text-sm font-Marcellus text-[#642F29] md:text-xlw das d">
                          Recieve discounts and order updates on whatapp
                        </label>
                      </div>

                      <div className="flex flex-row mt-7">
                        <div className="flex flex-row  gap-0 md:w-[100%] md:gap-x-2">
                          <div className="w-[45%]">
                            <label
                              htmlFor=""
                              className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                            >
                              {" "}
                              Country Code{" "}
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 md:w-[80%] w-full sm:w-[70%] mobile:w-[70%]   border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                                type=""
                                placeholder=" Country Code"
                                id="countryCode1"
                                value={values.countryCode1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.countryCode1 && touched.countryCode1 ? (
                                <p className="font-Marcellus text-red-900">{errors.countryCode1}</p>
                              ) : (
                                null
                              )}
                            </div>
                          </div>
                          <div className="md:w-[65%]">
                            <label
                              htmlFor=""
                              className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                            >
                              {" "}
                              Landline Number{" "}
                              
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 w-full sm:w-[120%] mobile:w-[120%]  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                                type="text"
                                placeholder=" Landline Number "
                                id="landlineNo"
                                value={values.landlineNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.landlineNo && touched.landlineNo ? (
                                <p className="font-Marcellus text-red-900">{errors.landlineNo}</p>
                              ) : (
                                null
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="p-2 mobile:pb-5 mobile:mt-[30px] sm:mt-[30px] mobile:w-full mobile:text-xl text-center rounded-3xl bg-[#60713A] text-white font-Marcellus text-base  leading-17 md:w-[25%] h-[43px] overflow-y-hidden"
                        >
                        Next
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
