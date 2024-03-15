import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import getToken from '../../common/getToken';

const Edit_Vendors = () => {

   const {_id} = useParams();
   const [loading, setLoading] = useState(true);
   const [vendordata , setVendorData] = useState([])
   const navigator = useNavigate()


   const header = getToken()

   useEffect(() => {
      getVendor();
   },[])


   // To check  vendor name change or not 

   const getVendor = async () => {
       try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/vendor/getbyId/${_id}`,header
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

      // console.log("PAyload ", palyload);

      // console.log(vendorName)

      if (values.name === vendorName) {
        delete palyload.Name;
      }

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/vendor/updateVendorById/${_id}`,
          palyload , 
          header
        );

        // console.log(response);

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

  // console.log(vendordata)

  return (
    <div>
      <Toaster />
      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Edit Vendor Page</h1>
      </div>
      <div className='mt-6'>
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

            <div className="w-full flex justify-end ">
              <button
                type="submit"
                className="px-10 mt-4 text-white bg-[#868686] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => navigator('/dashboard/vendors')}
                className="mt-4 border-2 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
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