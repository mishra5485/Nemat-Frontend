import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PrevCustomerQueries = () => {

   const {_id} = useParams()
   const [contactusdata , setContactUsData] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      querieDataById();
   },[])

   const querieDataById = async () => {
      try {

         let response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/usercontactusform/getbyId/${_id}`
         )

         setContactUsData(response.data)
         setLoading(false)
         console.log(response.data)

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
       <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 dark:text-white mb-8">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-600">
       Contact Us Details
    </span>
  </h1>
       {loading ? (
        <p>Loading...</p>
      ) : ( 
         <div>
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