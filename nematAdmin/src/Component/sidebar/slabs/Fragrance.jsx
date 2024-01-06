import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Fragrance = () => {

    const [loading, setLoading] = useState(true);
    const [showForm ,setShowForm] = useState(true)
    const [fragrances , setFragrances] = useState()
    const navigate = useNavigate();


   useEffect(() => {
      getAllFragrance()
   },[])

   const getAllFragrance = async () => {

      try {

         let fragrancedata = await axios.get(
         `${import.meta.env.VITE_REACT_APP_BASE_URL}/fragrances/getall`
      )

       if(fragrancedata.status === 200 ){
         setFragrances(fragrancedata.data)
         setLoading(false)
       }

      } catch (error) {
         console.log(error)
         setLoading(false)
         setFragrances()
      }
   }

   console.log(fragrances)

   const fragranceObjectSchema = yup.object({
      name:yup.string().required(),
      colorcode:yup.string().min(6).max(6).required(),
   })

   const initialValues = {
      name:"",
      colorcode:""
   }

     const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: fragranceObjectSchema,
    enableReinitialize: true,

    onSubmit:async(values) => {

       console.log("Form submitted with values:", values);

       const payload = {
         Name:values.name,
         colourCode:values.colorcode
       }
      
      try {
        let response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL}/fragrances/create`,
            payload
        );

        console.log(response.data)

        if (response.status === 200) {
          console.log("New Fragrance  is  Added ");
          toast.success("Updated Successfully")
          setShowForm(true)
          getAllFragrance();
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (
            status === 404 ||
            // status === 403 ||
            status === 500 ||
            status === 302 ||
            status === 409 ||
            status === 401 ||
            status === 400
          ) {
            toast.error(data);
            console.log(error.response);
          }
        }
      }

    }
  });

  const handleForm = () => {};

   const editHandlerDir = (categoryId) => {
      navigate(`/dashboard/fragrance/fragrance_edit/${categoryId}`);
  };

  const deleteFragrance = async(fragranceID) => {

      console.log("Delte is here with id " , fragranceID)

      try {
         let deleteBanner = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/fragrances/deletebyId/${fragranceID}`
    );

    if (deleteBanner.status === 200) {
      toast.success("Banner Deleted Successfully");
       getAllFragrance();
    }

    console.log("Data Deleted ");

      } catch (error) {
         toast.error("Not Deleted")

      }

  }

  return (
    <div>

         <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
           Fragrance Section
        </span>
      </h1>


      {
         showForm ? (
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
                      placeholder="Search for products"
                      required=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  className="bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  + Create Slider
                </button>
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
                           Name {" "}
                        </th>
                        <th scope="col" className="p-4">
                           Colour Code
                        </th>
                      </tr>
                    </thead>

                      {fragrances?.map((item) => (
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
                         
                          
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.Name}
                          </td>

                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.colourCode}


                            
                          </td>   
                          <div className="flex items-center space-x-4">
                              <button
                                type="button"
                                onClick={() => editHandlerDir(item._id)}
                                className="py-2 px-3 flex items-center text-sm font-medium text-center text-black bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                data-modal-target="delete-modal"
                                data-modal-toggle="delete-modal"
                                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onClick={() => deleteFragrance(item._id)}
                              >
                                Delete
                              </button>
                            </div>   
                        </tr>
                        
                      </tbody>
                    ))}
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
         ) : (
            <div className=" flex justify-center items-center flex-wrap ">
         <form onSubmit={handleSubmit} className="mt-7">

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
        <div className="sm:col-span-4 md:w-[400px] md:h-[80px] ">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input type="text" 
              name="name" 
              id="name"  
              className="block   h-[40px] flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
              value={values.name}
              onChange={handleChange}
              placeholder="Sample Name"
              />
            </div>
          </div>
        </div>

         <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6"></div>
        <div className="sm:col-span-4">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Color Code</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              
              <input type="text" 
              name="colorcode" 
              id="colorcode"
               className="block flex-1  h-[40px] border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                value={values.colorcode}
                onChange={handleChange}
                placeholder="Sample subHeading"/>
            </div>
          </div>
        </div>

                  <div className="mt-6 flex md:justify-start justify-start">

                    <button
                     type="submit"
                     className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                     >
                     Create 
                    </button>
                     <button
                     type="button"
                     onClick={() => setShowForm(false)}
                     className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                     Discard
                    </button>
                       </div>
         </form>
            </div>
         )
      }

    </div>
  )
}

export default Fragrance