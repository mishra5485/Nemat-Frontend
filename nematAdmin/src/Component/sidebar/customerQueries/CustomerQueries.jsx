import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../common/LoadingSpinner';
import getToken from '../../common/getToken';

const CustomerQueries = () => {

   const [loading, setLoading] = useState(true);
   const [allcustomerData , setAllCustomerData] = useState([])
   const [filtereData, setFilteredData] = useState([]);


    const navigate = useNavigate();

    const header = getToken()

   useEffect(() => {
      getAllCustomerData()
   },[])

   const getAllCustomerData = async () => {
      try {
         

         let response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/usercontactusform/getall`,header
         )


         setAllCustomerData(response.data)
         setFilteredData(response.data)
         setLoading(false)

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

    const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase(); 
    const filtered = allcustomerData.filter(item => item.Name.toLowerCase().includes(searchTerm)); 
    setFilteredData(filtered);
  };


   const editHandlerDir = (querieId) => {
      navigate(`/dashboard/customer-queries/prev-queries/${querieId}`)
  }

   console.log("allcustomerData === > " ,  allcustomerData)

  return (
    <div>
      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Customer Queries</h1>
      </div>
      <Toaster />

      <div>
         <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 ">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder="Search for Order Number"
                        required=""
                         onChange={handleSearch}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                
              </div>

              <div className="">
                {loading ? (
                  <p><LoadingSpinner/></p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs w-[100wh] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="w-full ">
                          <th scope="col" className="p-4">
                            Name
                          </th>
                          <th scope="col" className="p-4">
                            Email Id 
                          </th>
                          <th scope="col" className="p-4">
                            Mobile No.
                          </th>
                          <th scope="col" className="p-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {!filtereData || filtereData.length === 0 ? (
                        <p>NO data Found</p>
                      ) : (
                        filtereData?.map((item) => (
                          <tbody key={item._id}>
                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                               {item.Name}
                              </th>

                              <td className="px-4 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.MobileNo}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.Email}
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center space-x-4">
                                  <button
                                    type="button"
                                    onClick={() => editHandlerDir(item._id)}
                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-black bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                  >
                                    Prev
                                  </button>

                                 
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      )}
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  )
}

export default CustomerQueries