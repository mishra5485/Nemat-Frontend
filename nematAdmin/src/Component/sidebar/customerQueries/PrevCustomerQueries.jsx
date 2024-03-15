import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../common/LoadingSpinner'
import getToken from '../../common/getToken'

const PrevCustomerQueries = () => {

   const {_id} = useParams()
   const [contactusdata , setContactUsData] = useState([]);
   const [loading, setLoading] = useState(true);

   const header = getToken()

   useEffect(() => {
      querieDataById();
   },[])

   const querieDataById = async () => {
      try {

         let response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/usercontactusform/getbyId/${_id}`, header
         )

         setContactUsData(response.data)
         setLoading(false)
        //  console.log(response.data)

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
          console.log(error.response);
          toast.error(data);
          setLoading(false)
        }
      }
      }
   }



  return (
    <div>
       <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1> Prev Customer Queries </h1>
      </div> 

       {loading ? (
        <p><LoadingSpinner/></p>
      ) : ( 
         <div className='mt-6'>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                value={contactusdata.Name}
                placeholder="Type product name"
              />
            </div>
            <div>
              <label
                htmlFor="metaTitle"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email Id
              </label>
              <input
                type="text"
                name="metaTitle"
                id="metaTitle"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={contactusdata.Email}
                placeholder="Type product name"
              />
            </div>

            <div>
              <label
                htmlFor="metaKeyword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                type="text"
                name="metaKeyword"
                id="metaKeyword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                
                value={contactusdata.MobileNo}
                placeholder="Type product name"
              />
            </div>
            <div>
              <label
                htmlFor="slugUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Query Time
              </label>
              <input
                type="text"
                name="slugUrl"
                id="slugUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
               
                placeholder="Type product name"
                value={contactusdata.createdAt}
              />
            </div>



            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                  Message
              </label>
              <textarea
                id="metaDesc"
                name="metaDesc"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={contactusdata.Message}
                placeholder="Write product description here"
              ></textarea>
            </div>
          </div>

         </div>
      )}
    </div>
  )
}

export default PrevCustomerQueries