import React, { useState } from "react";
import loginBG  from "../assets/loginImages/loginImage.png"
import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/loginImages/nematEnterprisesLogo.png";
import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import { counntryCode } from "../CountryCode/data";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {RegisterobjectSchema , CompanyschemaObject} from "../validationSchem/index.js"
import InfiniteScrollImage from "../style/InfiniteScrollImage.jsx";

const CompanyDetails = () => {
  const [nextdiv, setnextDiv] = useState(true);
  const [isChecked, setIsChecked] = useState(0);
  const [sentReview, setSentReview] = useState(false);
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
                <img
                  src={FlowerPattern2}
                  alt="FlowerPatternImage2"
                  className="w-full h-[46px] sm:inline-block md:hidden"
                />

                {/* Show FlowerPattern for md and larger screens */}
               <InfiniteScrollImage className="w-full h-full animate-img mobile:hidden sm:hidden md:inline-block"/>
            </div>


          <div className="">
            <div className="xl:mx-auto xl:w-full 2xl:max-w-md">
              {/* <div className="flex text-xs gap-2">
                <h1 className="text-bg_green gap-x-1 cursor-pointer">
                <span className="p-2 sm:rounded-full  text-center border rounded-full ml-1 gap-x-2 bg-green-900">
                  1
                </span>{" "}
                Company Details {"->"}
              </h1>
              <h1
                className={
                  nextdiv === false ? "text-green-600 cursor-pointer" : ""
                }
              >
                <span
                  className={
                    nextdiv === false
                      ? "p-1 text-center border rounded-full ml-1 gap-x-2 bg-green-900"
                      : ""
                  }
                >
                  2{" "}
                </span>{" "}
                Company Details {"->"}
              </h1>
              <h1
                className={
                  setSentReview === false ? "text-green-600 cursor-pointer" : ""
                }
              >
                <span>3</span> Company Details{" "}
              </h1>
            </div> */}

            <div>

            </div>


            <form onSubmit={handleSubmit} className="mt-10">
              {nextdiv && sentReview === false ? (
                <div className="w-[90%] mx-auto justify-center ">
                  <div className="mt-4">
                    <div className="">
                      <h1 className="sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-4xl md:text-start md:mb-6 ">
                        Request Your Account
                      </h1>
                    </div>

                    <div className="flex flex-row mt-8 w-[100%]">
                      <div className="md:flex md:flex-row gap-x-2 w-[100%]">
                        <div>
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            Camponey name{" "}
                            <span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50 "
                              type="text"
                              placeholder="Camponey name"
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
                        <div className="mt-7">
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            GST No <span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="">
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

                    <div className="sm:mt-[50px] mobile:mt-[50px]">
                      <h1 className="sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-4xl md:text-start md:mb-6 ">
                        ADD GST Address 
                      </h1>
                    </div>

                    <div className="sm:mt-[30px] mobile:mt-[30px]">
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
                            className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50 "
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
                      <div className="flex flex-row sm:flex-col mobile:flex-col sm:mt-[30px] mobile:mt-[30px] gap-x-2">
                        <div>
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            City <span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
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
                        <div className="sm:mt-[30px] mobile:mt-[30px]">
                          <label
                            htmlFor=""
                            className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl"
                          >
                            {" "}
                            State<span className="text-red-600">*</span>{" "}
                          </label>
                          <div className="">
                            <input
                              className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
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
                      <div className="sm:mt-[30px] mobile:mt-[30px]">
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
                    className="p-2 mobile:mt-[60px] sm:mt-[60px] mobile:w-full mobile:text-xl text-center rounded-3xl bg-[#60713A] text-white font-Marcellus text-base  leading-17 md:w-[25%] h-[43px] overflow-y-hidden"
                  >
                    <span className="text-center"> Next</span>
                  </button>
                  <p className="text-sm font-Marcellus text-[#642F29] text-center mt-[15px] md:pt-4 md:text-lg gap-6">
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
                    <div>{/* Navbar div  */}</div>
                    <div className="">
                      <h1>Contact Info</h1>

                      <div className="flex flex-row mt-3">
                        <div className="flex flex-row gap-x-2">
                          <div>
                            <label
                              htmlFor=""
                              className="text-base font-medium text-[#642F29]"
                            >
                              {" "}
                              Full Name <span className="text-red-600">
                                *
                              </span>{" "}
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                type="text"
                                placeholder="Full Name"
                                id="fullname"
                                value={values.fullname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.fullname && touched.fullname ? (
                                <p>{errors.fullname}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor=""
                              className="text-base font-medium text-[#642F29]"
                            >
                              {" "}
                              Email <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                type="email"
                                placeholder="Enter Email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.email && touched.email ? (
                                <p>{errors.email}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row mt-3">
                        <div className="flex flex-row  gap-0">
                          <div>
                            <label
                              htmlFor=""
                              className="text-base font-medium text-[#642F29]"
                            >
                              {" "}
                              Country Code{" "}
                              <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 w-[50%]  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
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
                                <p>{errors.countryCode}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor=""
                              className="text-base font-medium text-[#642F29]"
                            >
                              {" "}
                              Mobile Number{" "}
                              <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                type="text"
                                placeholder=" Mobile Number"
                                id="mobileNo"
                                value={values.mobileNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.mobileNo && touched.mobileNo ? (
                                <p>{errors.mobileNo}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex mt-6 gap-2">
                        <input
                          className=""
                          type="checkbox"
                          id="whatappcheck"
                          checked={isChecked === 1}
                          onChange={handleCheckboxChange}
                        />
                        {/* {console.log(values.whatappcheck)} */}
                        <label>
                          Recieve discounts and order updates on whatapp
                        </label>
                      </div>

                      <div className="flex flex-row mt-3">
                        <div className="flex flex-row  gap-0">
                          <div>
                            <label
                              htmlFor=""
                              className="text-base font-medium text-[#642F29]"
                            >
                              {" "}
                              Country Code{" "}
                              <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 w-[50%]  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                type=""
                                placeholder=" Country Code"
                                id="countryCode1"
                                value={values.countryCode1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.countryCode1 && touched.countryCode1 ? (
                                <p>{errors.countryCode1}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor=""
                              className="text-base font-medium text-[#642F29]"
                            >
                              {" "}
                              Landline Number{" "}
                              <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="mt-2">
                              <input
                                className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                type="text"
                                placeholder=" Landline Number "
                                id="landlineNo"
                                value={values.landlineNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></input>
                              {errors.landlineNo && touched.landlineNo ? (
                                <p>{errors.landlineNo}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="relative inline-flex bg-[#60713A] text-center mt-5 rounded-2xl text-white px-4 py-2 font-semibold duration-200"
                      >
                        Next
                      </button>
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
