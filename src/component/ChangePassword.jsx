import React, { useState } from 'react'
import { IoMdEye , IoIosEyeOff } from "react-icons/io";
import { useFormik } from 'formik';
import * as yup from "yup"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = ({props}) => {


    const navigate = useNavigate();
    //Accessing User Data from the Stroage 
    const { user } = useSelector((state) => state.profile)

    //Extract User_id or Customer Id from our Store 
    const customer_id_Store = user.customer_id;


  
  //Might be need to change in Feacture. 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  //switch case for different Password Field.
  const showHandler = (field) => {
        switch (field) {
          case 'currentPassword':
            setShowCurrentPassword(!showCurrentPassword);
            break;
          case 'newPassword':
            setShowNewPassword(!showNewPassword);
            break;
          case 'confirmPassword':
            setShowConfirmPassword(!showConfirmPassword);
            break;
          default:
            break;
        }
    };

   
      // Object Schema for Current Password Field Validation 
     const objectSchem = yup.object({
    curremtPWD:yup.string().min(5).required("Enter the current Password"),
    newpassword:yup.string().min(5).required("Enter the New Password"),
    confirmPWD:yup.string().min(5).oneOf([yup.ref('newpassword'), null], 'Passwords must match').required("Confirm the Password"),
   })


   //initialvalues in Input Field 
   const initialValues = {
      curremtPWD:"",
      newpassword:"",
      confirmPWD:"",
   }

    //This Function For If User Want to not Change The Password Then This Function will be Work.
    const onClickSubmit = async () => {

      //Here Customer_id From Store.
       const payload = {
             customer_id:customer_id_Store,
        }
          

        try {
            
          //Calling Backend Server To Check he is Valid USer or Not. 
          let response = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/skipchangedefaultpassword`,
              payload
          );

          if(response.status === 200){
            navigate("/")
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

    //If user Want To Change Password And He Click on 
    const { values , errors  , handleChange , handleSubmit , touched , handleBlur} = useFormik({
    initialValues,
    validationSchema:objectSchem,
    onSubmit: async (values , action) =>{
        const palyload = {
            customer_id:customer_id_Store,
            OldPassword:values.curremtPWD,
            NewPassword:values.confirmPWD,
        };
        try{
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/changepassword`,
            palyload
          );

          // console.log("chnage password -> " , response)
  
          if(response.status === 200){
              //  console.log("done")
          }

        }catch(error){

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
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <Toaster/>
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                 <form onSubmit={handleSubmit}>
                      <div>
                           <div className='my-4'>
                              <label htmlFor="" className="text-base font-medium text-[#642F29]">
                                {' '}
                                Current Password{' '}
                              </label>
                              <div className=" flex justify-center items-center border-b-2 border-b-[#642F29]">
                                <input
                                  className="flex h-10 w-full   bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                                  type=  {showCurrentPassword ? "text" : "password"}
                                  placeholder="Enter Current Password"
                                  id="curremtPWD"
                                  value={values.curremtPWD}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></input>
                                   <span className=''>
                                      {
                                      showCurrentPassword  ? <IoMdEye onClick={() => showHandler('currentPassword')} size={20}/> : <IoIosEyeOff onClick={() => showHandler('currentPassword')} size={20}/>
                                      }
                                  </span>
                                
                              </div>
                                {errors.curremtPWD && touched.curremtPWD ? (<p className='text-red-800'>{errors.curremtPWD}</p>) : ("") }
                            </div>
                             <div className='my-4'>
                              <label htmlFor="" className="text-base font-medium text-[#642F29]">
                                {' '}
                                New Password{' '}
                              </label>
                              <div className=" flex justify-center items-center border-b-2 border-b-[#642F29]">
                                <input
                                  className="flex h-10 w-full   bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                                  type=  {showNewPassword ? "text" : "password"}
                                  placeholder="Enter New Password"
                                  id="newpassword"
                                  value={values.newpassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></input>
                                   <span className=''>
                                      {
                                      showNewPassword  ? <IoMdEye onClick={() => showHandler('newPassword')} size={20}/> : <IoIosEyeOff onClick={() => showHandler('newPassword')} size={20}/>
                                      }
                                  </span>
                                
                              </div>
                                {errors.newpassword && touched.newpassword ? (<p className='text-red-800'>{errors.newpassword}</p>) : ("") }
                            </div>
                             <div className='my-4'>
                              <label htmlFor="" className="text-base font-medium text-[#642F29]">
                                {' '}
                                Confirm New Password{' '}
                              </label>
                              <div className=" flex justify-center items-center border-b-2 border-b-[#642F29]">
                                <input
                                  className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                                  type=  {showConfirmPassword ? "text" : "password"}
                                  placeholder="Confirm New Password"
                                  value={values.confirmPWD}
                                  id="confirmPWD"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></input>
                                   <span className=''>
                                      {
                                      showConfirmPassword ? <IoMdEye onClick={() => showHandler('confirmPassword')} size={20}/> : <IoIosEyeOff onClick={() => showHandler('confirmPassword')}size={20}/>
                                      }
                                  </span>
                                
                              </div>
                                {errors.confirmPWD && touched.confirmPWD ? (<p className='text-red-800'>{errors.confirmPWD}</p>) : ("") }
                            </div>
                                      
                      </div>
                       <div className='flex gap-4'>
                          <button className='p-2 rounded-3xl bg-green-500' type='submit'>
                            Change
                          </button>
                         </div> 

                  </form>

                 
                          <button className= 'p-2 rounded-3xl bg-green-500' onClick={onClickSubmit}>
                            Do it Later
                          </button>

          </div>
      </div>
  )
}
export default ChangePassword