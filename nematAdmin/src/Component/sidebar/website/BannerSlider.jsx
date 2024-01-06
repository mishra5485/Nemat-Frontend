import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const BannerSlider = () => {

    const [loading, setLoading] = useState(true);
    const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
    const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
    const [allBannerData , setAllBannerData] = useState();
    const [showForm ,setShowForm] = useState(true)

    const navigate = useNavigate();


   useEffect (() => {
      getAllBannerData();
   },[])

   const getAllBannerData = async () => {
      try {
         
         let allDataResponse = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/homebannerslider/getall`
         )

         if(allDataResponse.status === 200){
             setAllBannerData(allDataResponse.data)
            setLoading(false)
        
         }
         
        
      } catch (error) {
         console.log(error)
         toast.error("Faild to load Data")
         setAllBannerData();
          setLoading(false)
      }
   }

   console.log(allBannerData)

   const bannerObjectSchema = yup.object({
      desktopbannerImage: yup.string().required(),
      mobilebannerImage: yup.string().required(),
      heading: yup.string().min(2).required(),
      subHeading: yup.string().min(2).required(),
      desc: yup.string().min(2).required(),
   })

   const initialValues =
    {
         desktopbannerImage : "",
         mobilebannerImage : "",
         heading : "",
         subHeading :"" ,
         desc :""
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
    validationSchema: bannerObjectSchema,
    enableReinitialize: true,

    onSubmit:async(values) => {

       console.log("Form submitted with values:", values);

      const formData = new FormData();
      formData.append("DesktopbannerImage", values.desktopbannerImage);
      formData.append("MobilebannerImage", values.mobilebannerImage);
      formData.append("Heading", values.heading);
      formData.append("SubHeading", values.subHeading);
      formData.append("Desc", values.desc);

   

      try {
        let response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL}/homebannerslider/create`,
            formData
        );

        console.log(response.data)

        if (response.status === 200) {
          console.log("New Banner is  Created ");
          toast.success("Updated Successfully")
          getAllBannerData();
          setShowForm(true)
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

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];

    setFieldValue(field, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "mobilebannerImage") {
          setImagePreviewMobile(reader.result);
        } else if (field === "desktopbannerImage") {
          setImagePreviewDesktop(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the preview if no file is selected
      if (field === "mobilebannerImage") {
        setImagePreviewMobile(null);
      } else if (field === "desktopbannerImage") {
        setImagePreviewDesktop(null);
      }
    }
  };

  const handleForm = () => {};

   const editHandlerDir = (categoryId) => {
      navigate(`/dashboard/website/bannerSlider/edit_bannerslider/${categoryId}`);
  };

  const deleteHandler = async (BannerId) => {
  try {
    let deleteBanner = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/homebannerslider/deletebyId/${BannerId}`
    );

    if (deleteBanner.status === 200) {
      toast.success("Banner Deleted Successfully");
       getAllBannerData();
    }

    console.log("Data Deleted ");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete banner");
  }
 
};

  return (
    <div>
         <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
           Banner Sliders
        </span>
      </h1>


   {
      showForm ?   (

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
                           Mobile View Banner {" "}
                        </th>
                        <th scope="col" className="p-4">
                           Desktop View Banner
                        </th>
                         <th scope="col" className="p-4">
                           Banner Heading 
                        </th>
                        <th scope="col" className="p-4">
                           Banner Sub-Heading 
                        </th>
                      </tr>
                    </thead>

                      {allBannerData?.map((item) => (
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
                            <div className="flex items-center mr-3">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${item.MobilebannerImage}`}
                                alt=""
                                className="h-8 w-auto mr-3"
                              />
                            </div>
                          </th>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="flex items-center mr-3">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${item.DesktopbannerImage}`}
                                className="h-8 w-auto mr-3"
                              />
                            </div>
                          </th>
                          
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.Heading}
                          </td>

                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.SubHeading}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                                onClick={() => deleteHandler(item._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
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
            <div>
         <form onSubmit={handleSubmit}>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
        <div className="sm:col-span-4">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Heading</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input type="text" 
              name="heading" 
              id="heading"  
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
              value={values.heading}
              onChange={handleChange}
              placeholder="Sample Heading"
              />
            </div>
          </div>
        </div>

         <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6"></div>
        <div className="sm:col-span-4">
          <label  className="block text-sm font-medium leading-6 text-gray-900">SubHeading</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              
              <input type="text" 
              name="subHeading" 
              id="subHeading"
               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                value={values.subHeading}
                onChange={handleChange}
                placeholder="Sample subHeading"/>
            </div>
          </div>
        </div>

            <div className="col-span-full mt-2">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Description </label>
          <div className="mt-2">
            <textarea 
            id="desc"
             name="desc" 
             rows="2"
             value={values.desc} 
             onChange={handleChange}
             className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
             
          </div>
        </div>

             <div className="mb-4 mt-4">
                      <label
                        htmlFor="fileInput1"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Select For Mobile View Banner 
                      </label>
                      <input
                        type="file"
                        id="mobilebannerImage"
                        onChange={(e) =>
                          handleFileChange(e, "mobilebannerImage")
                        }
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                      {imagePreviewMobile && (
                        <img
                          src={imagePreviewMobile}
                          alt="Banner Mobile"
                          className="mt-2 w-[300px] h-[300px]"
                        />
                      )}
                    </div>

                     <div className="mb-4">
                      <label
                        htmlFor="fileInput1"
                        className="block text-sm font-medium text-gray-600"
                      >
                         Select For Desktop View Banner 
                      </label>
                      <input
                        type="file"
                        id="desktopbannerImage"
                        onChange={(e) =>
                          handleFileChange(e, "desktopbannerImage")
                        }
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                      {imagePreviewDesktop && (
                        <img
                          src={imagePreviewDesktop}
                          alt="Banner Mobile"
                          className="mt-2 w-[300px] h-[300px]"
                        />
                      )}
                    </div>

                  <div>

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

export default BannerSlider