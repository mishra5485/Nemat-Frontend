import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const CustomerQueries = () => {

   const [loading, setLoading] = useState(true);
   const [allcustomerData , setAllCustomerData] = useState([])
   const [filtereData, setFilteredData] = useState([]);


    const navigate = useNavigate();

   useEffect(() => {
      getAllCustomerData()
   },[])

   const getAllCustomerData = async () => {
      try {
         

         let response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/usercontactusform/getall`
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

   const handleForm = () => {};

   const editHandlerDir = (querieId) => {
      navigate(`/dashboard/customer-queries/prev-queries/${querieId}`)
  }

   console.log("allcustomerData === > " ,  allcustomerData)

  return (
    <div>
      <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
          Order Management
        </span>
      </h1>
      <Toaster />

      <div>
         <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
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
                  <p>Loading...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs w-[100wh] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="w-full ">
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-all"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label htmlFor="checkbox-all" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </th>
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
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    onClick={handleForm}
                                    className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor="checkbox-table-search-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
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

              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      ...
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      100
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  )
}

export default CustomerQueries