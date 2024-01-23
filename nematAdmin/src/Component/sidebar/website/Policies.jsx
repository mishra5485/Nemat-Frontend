import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Policies = () => {

   const [loading, setLoading] = useState(true);

   const PoliciesObject = yup.object({
    heading:yup.string().min(3).required("Please Enter the heading"),
    Description:yup.string().min(3).required("Please Enter Description")
  });

   const initialValues = {
      heading:"",
      Description:"",
   }

   const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: PoliciesObject,
      enableReinitialize: true,

      onSubmit: async (values) => {
        const payload = {
            Name:values.heading,
            Data:values.Description
        };

        try {
          let response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/policies/create`,
            payload
          );

          if (response.status === 200) {
            toast.success(response.data);
          }
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
              toast.error(data);
              console.log(error.response);
            }
          }
        }
      },
    });


  return (
    <div>
      <Toaster/>
      <form 
          onSubmit={handleSubmit}
      >
      <div>
         <div>
              <label
                htmlFor="heading"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Heading
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={values.heading}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
              />
            </div>

         <div className="md:col-span-2 mb-4">
              <label
                htmlFor="Description"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="Description"
                name="Description"
                value={values.Description}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
         </div>
             <button
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
               type="submit"
            >
              Create
            </button>
      </form>
    </div>
  )
}

export default Policies