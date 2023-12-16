import React, { useState } from 'react'
import loginBG  from "../assets/loginImages/commonBackgroundImage.png"
import { useFormik } from 'formik';
import * as yup from "yup"
import toast, { Toaster } from "react-hot-toast";
import {counntryCode} from "../data/data"
import axios from 'axios';
import Home from '../component/Home';
import { useNavigate } from 'react-router-dom';
import RequestSent from './RequestSent';

const CompanyDetails = () => {

   const [nextdiv , setnextDiv] = useState(true);
    const [isChecked, setIsChecked] = useState(0);
   const [sentReview , setSentReview] = useState(true)
   const navigate = useNavigate();

   const initialValues = {
      camponeyname:"",
      gstno:"",
      address:"",
      state:"",
      city:"",
      zipcode:"",
      fullname:"",
      email:"",
      countryCode:"",
      mobileNo:"",
      whatappcheck:"0",
      countryCode1:"",
      landlineNo:""

   }

   const onSubmit2 = async (event) => {
       event.preventDefault();

       const schemaObject = yup.object({
           camponeyname: yup.string().min(2).required("Enter your Company Name"),
         gstno: yup.number().typeError("Please enter a valid number").integer("Please enter a valid number").test(
         val => val && val.toString().length === 15).min(15).required("Enter the Gst NO"),
         address: yup.string().required("Please Enter the Company Address"),
         state: yup.string().min(3).required("Enter the State Name"),
         city: yup.string().min(3).required("Enter the City Name"),
         zipcode: yup.number().typeError("Please enter a valid number").integer("Please enter a valid number").test(val => val && val.toString().length === 6).min(6).required("Enter the Zip Code"),
       })

         try {
               await schemaObject.validate(values, { abortEarly: false });
               setnextDiv(false);
               // console.log(values);
         } catch (error) {
            // console.error('Form validation error:', error.errors);
         }
      };


  const objectSchem = yup.object({
         camponeyname: yup.string().min(2).required("Enter your Company Name"),
         gstno: yup.number().typeError("Please enter a valid number").integer("Please enter a valid number").test(
         val => val && val.toString().length === 15).min(15).required("Enter the Gst NO"),
         address: yup.string().required("Please Enter the Company Address"),
         state: yup.string().min(3).required("Enter the State Name"),
         city: yup.string().min(3).required("Enter the City Name"),
         zipcode: yup.number().typeError("Please enter a valid number").integer("Please enter a valid number").test(val => val && val.toString().length === 6).min(6).required("Enter the Zip Code"),
         fullname: yup.string().required('Full name is required').matches(/^([a-zA-Z]+ ?){1,4}$/, 'Invalid full name'),
         email:yup.string().email("Enter the Valid Email id").required("Enter Your Email"),
      countryCode:yup.number().typeError("Please enter a valid number").integer("Please enter a valid Mobile number").test(
      val => val && val.toString().length === 3).min(3).required("Enter the 3 digit no"),
      mobileNo:yup.number().typeError("Please enter a valid number").integer("Please enter a valid Mobile number").test(
      val => val && val.toString().length === 10).min(10).required("Enter the 10 digit no"),
      whatappcheck: yup.number().oneOf([0, 1]).required("Select the checkbox value"), 
      countryCode1:yup.number().typeError("Please enter a valid number").integer("Please enter a valid Mobile number").test(
      val => val && val.toString().length === 3).min(3).required("Enter the 3 digit no"),
      landlineNo:yup.number().typeError("Please enter a valid number").integer("Please enter a valid LandLine number").test(
      val => val && val.toString().length === 10).min(10).required("Enter the 10 digit no"),

   });

   const { values , errors  , handleChange , handleSubmit , touched , handleBlur } = useFormik({
    initialValues,
    validationSchema:objectSchem,
    onSubmit:  async (values , actions) =>{

         // console.log("values inside sumit -> ",values);

         const payload = {
            CompanyName:values.camponeyname,
            GstNo:values.gstno,
            Company_StreetAddress:values.address,
            Company_City:values.city,
            Company_State:values.state,
            Company_ZipCode:values.zipcode,
            CustomerName:values.fullname,
            Email:values.email,
            MobileNumber:values.mobileNo,
            Country_MobileNumber:values.countryCode,
            Country_LandlineNumber:values.countryCode1,
            LandlineNumber:values.landlineNo,
            ReciveUpdates:values.whatappcheck,
         };

         // console.log("values inside sumit -> ",payload)

         try {
            
            const response = await axios.post(
                  `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/register`,
                  payload
            )

            if(response.status === 200){
               setSentReview(true);
               navigate('/companydetails/requestsent')
               toast.success(response.data)

            }

         } catch (error) {
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
    }
   })

   const handleCheckboxChange = () => {
    setIsChecked((prevValue) => (prevValue === 1 ? 0 : 1));
    values.whatappcheck = isChecked === 1 ? 0 : 1;
  };



  return (
    <section>
      <Toaster/>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-md object-cover object-top"
              src={loginBG}
              alt=""
            />
          </div>
          <div className="absolute inset-0 "></div>
          <div className="relative">
          
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            

            <form onSubmit={handleSubmit} className="mt-10">
               {
                  (nextdiv) && (sentReview === false) ? (
                       <div>

               <div className='mt-4'>
                  <div className=''>
                     <h1 className='text-2xl text-[#642F29] '>Request Your Account</h1>
                  </div>

                  <div className='flex flex-row mt-3'>

                       <div className='flex flex-row gap-x-2'>

                     <div>
                        <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                           {' '}
                              Camponey name <span className='text-red-600'>*</span>{' '}
                        </label>
                        <div className='mt-2'>
                           <input
                      className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      type="text"
                      placeholder="Camponey name"
                      id="camponeyname"
                      value={values.camponeyname}
                     onChange={handleChange}
                     onBlur={handleBlur}
                    ></input>
                        {errors.camponeyname && touched.camponeyname ? (<p>{errors.camponeyname}</p>):("")}
                        </div>
                     </div>
                     <div>
                        <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                           {' '}
                              GST No <span className='text-red-600'>*</span>{' '}
                        </label>
                        <div className='mt-2'>
                           <input
                      className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      type="text"
                      placeholder="GST No"
                      id="gstno"
                      value={values.gstno}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       ></input>
                    {errors.gstno && touched.gstno ? (<p>{errors.gstno}</p>):("")}
                        </div>
                     </div>
                  </div>
                  </div>

                  <div className='mt-[30px]'>
                     <h1 className='text-[#642F29]'>ADD GST Address <span className='text-red-600'>*</span></h1>
                  </div>

                  <div className='mt-[15px]'>
                     <div>
                        <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                           {' '}
                              Street address <span className='text-red-600'>*</span>{' '}
                        </label>
                        <div className='mt-2'>
                           <input
                      className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      type="text"
                      placeholder="Address"
                      id="address"
                      onChange={handleChange}
                       value={values.address}
                       onBlur={handleBlur}
                       ></input>
                    {errors.address && touched.address ? (<p>{errors.address}</p>):("")}
                        </div>
                     </div>
                      <div className='flex flex-row mt-[10px] gap-x-2'>

                     <div>
                        <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                           {' '}
                              City  <span className='text-red-600'>*</span>{' '}
                        </label>
                        <div className='mt-2'>
                           <input
                      className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      type="text"
                      placeholder="City"
                      id="city"
                      onChange={handleChange}
                      value={values.city}
                      onBlur={handleBlur}
                      ></input>
                    {errors.city && touched.city ? (<p>{errors.city}</p>):("")}
                        </div>
                     </div>
                     <div>
                        <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                           {' '}
                               
                               State<span className='text-red-600'>*</span>{' '}
                        </label>
                        <div className='mt-2'>
                           <input
                      className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      type="text"
                      placeholder="State"
                      id="state"
                      onChange={handleChange}
                      value={values.state}
                      onBlur={handleBlur}
                      ></input>
                    {errors.state && touched.state ? (<p>{errors.state}</p>):("")}
                        </div>
                     </div>
                  </div>
                  <div className='mt-[10px]'>
                        <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                           {' '}
                              ZipCode <span className='text-red-600'>*</span>{' '}
                        </label>
                        <div className='mt-2'>
                           <input
                      className="flex h-10 w-[50%]  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      type="text"
                      placeholder="ZipCode"
                       onChange={handleChange}
                      id="zipcode"
                      value={values.zipcode}
                      onBlur={handleBlur}
                    ></input>
                    {errors.zipcode && touched.zipcode ? (<p>{errors.zipcode}</p>):("")}
                        </div>
                     </div>
                  </div>
               </div>
                     <button
                     type="button"
                     onClick={ (event) => onSubmit2(event)}
                     className="relative inline-flex bg-[#60713A] text-center mt-5 rounded-2xl text-white px-4 py-2 font-semibold duration-200"
                  > 
                        <span className='text-center'> Next</span>
                     </button>
                      <p className=" text-sm text-[#642F29] mt-[15px]">
                           Alrady  have an account?{' '}
                       <a className='text-xl' href="/login">LOGIN</a>
                    </p>
               </div>
                  ) : (
                     <div>
                        <div>

                           <div>
                           {/* Navbar div  */}
                           </div>                       
                              <div className=''>
                                 <h1>Contact Info</h1>

                                  <div className='flex flex-row mt-3'>

                                    <div className='flex flex-row gap-x-2'>

                                       <div>
                                          <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                                             {' '}
                                             Full Name <span className='text-red-600'>*</span>{' '}
                                          </label>
                                          <div className='mt-2'>
                                       <     input
                                                className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                                type="text"
                                                placeholder="Full Name"
                                                id="fullname"
                                                value={values.fullname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                             ></input>
                                             {errors.fullname && touched.fullname ? (<p>{errors.fullname}</p>):("")}
                                          </div>
                                       </div>
                                       <div>
                                          <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                                             {' '}
                                                Email <span className='text-red-600'>*</span>{' '}
                                          </label>
                                          <div className='mt-2'>
                                             <input
                                       className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                       type="email"
                                       placeholder="Enter Email"
                                       id="email"
                                       value={values.email}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       ></input>
                                    {errors.email && touched.email ? (<p>{errors.email}</p>):("")}
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className='flex flex-row mt-3'>

                                    <div className='flex flex-row  gap-0'>

                                       <div>
                                          <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                                             {' '}
                                            Country Code <span className='text-red-600'>*</span>{' '}
                                          </label>
                                          <div className='mt-2'>
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
                                             {errors.countryCode && touched.countryCode ? (<p>{errors.countryCode}</p>):("")}
                                          </div>
                                       </div>
                                       <div>
                                          <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                                             {' '}
                                               Mobile Number <span className='text-red-600'>*</span>{' '}
                                          </label>
                                          <div className='mt-2'>
                                             <input
                                       className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                       type="text"
                                       placeholder=" Mobile Number"
                                       id="mobileNo"
                                       value={values.mobileNo}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       ></input>
                                    {errors.mobileNo && touched.mobileNo ? (<p>{errors.mobileNo}</p>):("")}
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className='flex mt-6 gap-2'>
                                    <input   
                                       className=''
                                       type='checkbox'
                                       id='whatappcheck'
                                        checked={isChecked === 1} 
                                       onChange={handleCheckboxChange}
                                       />
                                       {/* {console.log(values.whatappcheck)} */}
                                       <label>Recieve discounts and order updates on whatapp</label>
                                 </div>

                                 <div className='flex flex-row mt-3'>

                                    <div className='flex flex-row  gap-0'>

                                       <div>
                                          <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                                             {' '}
                                             Country Code <span className='text-red-600'>*</span>{' '}
                                          </label>
                                          <div className='mt-2'>
                                       <     input
                                                className="flex h-10 w-[50%]  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                                type=""
                                                placeholder=" Country Code"
                                                id="countryCode1"
                                                value={values.countryCode1}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                             ></input>
                                             {errors.countryCode1 && touched.countryCode1 ? (<p>{errors.countryCode1}</p>):("")}
                                          </div>
                                       </div>
                                       <div>
                                          <label  htmlFor="" className='text-base font-medium text-[#642F29]'>
                                             {' '}
                                               Landline Number <span className='text-red-600'>*</span>{' '}
                                          </label>
                                          <div className='mt-2'>
                                             <input
                                       className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                                       type="text"
                                       placeholder=" Landline Number "
                                       id="landlineNo"
                                       value={values.landlineNo}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       ></input>
                                    {errors.landlineNo && touched.landlineNo ? (<p>{errors.landlineNo}</p>):("")}
                                          </div>
                                       </div>
                                       
                                    </div>
                                    
                                 </div>
                                  <button
                                    type="submit"
                                    className="relative inline-flex w-[20%] mt-4 bg-[#60713A] text-center text-white px-2 py-2 font-semibold duration-200"
                                    >
                                       Next
                                    </button>
                           </div>
                        </div>
                     </div>
                  )
               }
             
            </form>
         
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyDetails