import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Edit_Fragrance = () => {

   const {_id} = useParams();
    const [Fragrances , setFragrances ] = useState()
    const [loading, setLoading] = useState(true);

    const navigator = useNavigate()

   useEffect(() => {
      getFragranceById();
   } , [])

   const getFragranceById = async() => {
      try {

         let bannerData = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/fragrances/getbyId/${_id}`
         )

         setFragrances(bannerData.data);
         setLoading(false)
         
      } catch (error) {
         console.error(error)
         toast.error(error.data)
         setLoading(false)
      }
   }


   const fragranceObjectSchema = yup.object({
      name:yup.string().required(),
      colorcode:yup.string().min(6).max(6).required(),
   })

   const initialValues = loading ? {
      name:"",
      colorcode:""
   }
   :{
      name:Fragrances.Name,
      colorcode:Fragrances.colourCode
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
            import.meta.env.VITE_REACT_APP_BASE_URL}/fragrances/updatebyId/${_id}`,
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

   

  return (
    <div>

      <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
           Edit Fragrance Data
        </span>
      </h1>


      <Toaster/>

      {loading ? (
        <p>Loading...</p>
      )  : (
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
                     Update 
                    </button>
                     <button
                     type="button"
                     onClick={() => navigator("/dashboard/fragrance")}
                     className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Back
                    </button>
                       </div>
         </form>
      )
   }
    </div>
  )
}

export default Edit_Fragrance