import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';

const Edit_Vendors = () => {

   const {_id} = useParams();
   const [loading, setLoading] = useState(true);
   const [vendordata , setVendorData] = useState([])
   const navigator = useNavigate()

   useEffect(() => {
      getVendor();
   },[])


   // To check  vendor name change or not 

   const getVendor = async () => {
       try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/vendor/getbyId/${_id}`
      );

      if (response.status === 200) {
         setVendorData(response.data)
        setLoading(false);
      }
    } catch (error) {
      if (error.productResponse) {
        const { status } = error.response;

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          toast.error(error.message);
          setLoading(false);
        }
      }
    }
   }


   let vendorName = vendordata?.Name

   const vendorObject = yup.object({
    name: yup.string().min(2).required("Please Enter the name"),
    WH_number: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(99999999, "Enter 10 digit Number ")
      .max(9999999999)
      .required("Enter the WhatsApp Number"),
    address: yup.string().min(5).required("Please Enter The Address"),
    gstNo: yup
      .string()
      .matches(/^[a-zA-Z0-9]{15}$/, "Please enter  valid  GST number")
      .required("Enter the GST NO")
      .test((val) => val && val.toString().length === 15)
      .min(15)
      .required("Please Enter valid GST number "),
    back_Ac: yup
      .number()
      .typeError("Please Enter a valid Number")
      .integer("Please enter a valid number")
      .min(99999999999, "Enter 12 or 15 digit Number ")
      .max(999999999999999)
      .required("Enter the WhatsApp Number"),
    back_add: yup.string().min(10).required("Please Enter Bank Address "),
  });

   const initialValues = loading ? {
      name: "",
      WH_number: "",
      address: "",
      gstNo: "",
      back_Ac: "",
      back_add: "",
   } : {
      name: vendordata.Name,
      WH_number: vendordata.WhatsApp_No,
      address: vendordata.Address,
      gstNo: vendordata.GstNo,
      back_Ac:vendordata.Bank_AccNo,
      back_add: vendordata.Bank_Add,
   }

   

   const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: vendorObject,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const palyload = {
        Name: values.name,
        Address: values.address,
        WhatsApp_No: values.WH_number,
        GstNo: values.gstNo,
        Bank_AccNo: values.back_Ac,
        Bank_Add: values.back_add,
      };

      console.log("PAyload ", palyload);

      console.log(vendorName)

      if (values.name === vendorName) {
        delete palyload.Name;
      }

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/vendor/updateVendorById/${_id}`,
          palyload
        );

        console.log(response);

        if (response.status === 200) {
         //  resetForm();
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
            console.log(error.response);
            toast.error(data);
          }
        }
      }
    },
  });

  console.log(vendordata)

  return (
    <div>
      <Toaster />
      <div>
        <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
            Edit Vendor Page
          </span>
        </h1>
      </div>
      <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
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
                  onChange={handleChange}
                  value={values.name}
                  placeholder="Enter The Name"
                />
              </div>
              <div>
                <label
                  htmlFor="WH_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  WhatsApp_No
                </label>
                <input
                  type="text"
                  name="WH_number"
                  id="WH_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.WH_number}
                  placeholder="Enter WhatsApp Number"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Vendor Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.address}
                  placeholder="Enter the Address"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="gstNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNo"
                  id="gstNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.gstNo}
                  placeholder="Enter Gst Number"
                />
              </div>
              <div>
                <label
                  htmlFor="back_Ac"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Account
                </label>
                <input
                  type="text"
                  name="back_Ac"
                  id="back_Ac"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  placeholder="Enter Bank Account Number"
                  value={values.back_Ac}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="back_add"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Address
                </label>
                <textarea
                  id="back_add"
                  name="back_add"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.back_add}
                  placeholder="Enter Bank Address"
                ></textarea>
              </div>
            </div>

            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => navigator('/dashboard/vendors')}
                className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
              >
                Discard
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Edit_Vendors