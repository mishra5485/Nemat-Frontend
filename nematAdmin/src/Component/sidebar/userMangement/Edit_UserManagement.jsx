import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdVerified } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const Edit_UserManagement = () => {

   const {_id} = useParams();
   console.log(_id)
   const [PrevUserID , setPrevUserID] = useState();
   const [loading, setLoading] = useState(true);
   const navigator = useNavigate();

   useEffect(() => {
      fetechUserData();
   } , [])

   const fetechUserData = async () => {
      try {
         
         let userDetails = await axios.get(
             `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/getuserdetails/${_id}`
         )

         setPrevUserID(userDetails.data)
         setLoading(false)
      } catch (error) {
         console.log(error)
         setLoading(false)
      }
   }

   const activeateUserHandler = async() => {
      try{
        let activateUser = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/activate/${_id}`
        )

        if(activateUser.status === 200){
          toast.success("User activate Scessfully")
          
        }

      }
      catch(error){
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
                console.log(error.response);
                toast.error(error.message)
              }
            }
      }
   }

   console.log(PrevUserID)

  return (
    <div>
      <Toaster/>
          {loading ? (
        <p>Loading...</p>
      ) : (
        <form
         
        >
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
               User Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                
                value={PrevUserID.CustomerName}
                placeholder="Type product name"
              />
            </div>
             <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
               Mobile Number
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                
                value={[`+ ${PrevUserID.Country_MobileNumber} ${PrevUserID.MobileNumber}`]}
                placeholder="Type product name"
              />
            </div>
            <div>
              <label
                htmlFor="metaTitle"
                className="mb-2 text-sm flex font-medium text-gray-900 dark:text-white"
              >
                Email Address {
                  PrevUserID.email_verified === 1 ? (<span className='ml-1'><MdVerified color='green' size={18}/></span>) : ( null )
                } 
              </label>
              <input
                type="text"
                name="metaTitle"
                id="metaTitle"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              
                value={PrevUserID.Email}
                placeholder="Type product name"
              />
            </div>

           <br/>

               <div className='flex gap-6'>
                   <h1>Status :- {PrevUserID.status === 1 ? (
                     <span class=" ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-500 rounded">Active</span>
                   ) : (
                     <span class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-red-500 rounded">Inactive</span>
                   )} </h1>

                   <h1 className=''>DefaultpasswordChanged :-{PrevUserID.DefaultpasswordChanged === 1 ? (
                     <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-500 rounded">Active</span>
                   ) : (
                     <span className=" ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-red-500 rounded">Inactive</span>
                   )} </h1>
               </div>

           <br/>
            <div>
              <label
                htmlFor="slugUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company Name
              </label>
              <input
                type="text"
                name="slugUrl"
                id="slugUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                value={PrevUserID.CompanyName}
              />
            </div>
             <div>
              <label
                htmlFor="slugUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                GST Number
              </label>
              <input
                type="text"
                name="slugUrl"
                id="slugUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                value={PrevUserID.GstNo}
              />
            </div>

           

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company Address
              </label>
              <textarea
                id="metaDesc"
                name="metaDesc"
                rows="3"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={[`${PrevUserID.Company_StreetAddress} , ${PrevUserID.Company_City} , ${PrevUserID.Company_State} , ${PrevUserID.Company_ZipCode}`]}
                placeholder="Write product description here"
              ></textarea>
            </div>
          </div>         
          <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">

             <button
               onClick={activeateUserHandler}
              type="button"
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
            >
              Activate
            </button>

            <button
               onClick={() => navigator("/dashboard/user-mangement")}
              type="button"
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
            >
              Go Back
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Edit_UserManagement