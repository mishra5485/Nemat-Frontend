import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getToken from "../../common/getToken";

const AdminContact = () => {
  const [loading, setLoading] = useState(true);
  const [adminDetails , setAdminDetails] = useState()
  const header = getToken()


  useEffect(() => {
    getAllAdminContactDetails()
  } , [])

  const getAllAdminContactDetails = async () => {
    try {
      let responseHeader = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admincontactusform/get`,header
      );

      setAdminDetails(responseHeader.data);
      setLoading(false)

    } catch (error) {
       setLoading(false)
      console.log(error);
    }
  }

  // console.log("adminDetails===> " , adminDetails)

  const ContactObject = yup.object({
    adminemail:yup.string().email().required("Please Enter Email Address "),
    adminaddress:yup.string().min(5).required("Please Enter Address "),
    adminmobile:yup.number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .min(99999999)
    .max(9999999999)
    .required("Enter the Mobile Number"),
  });

  const initialValues = loading
    ? {
        adminemail: "",
        adminaddress: "",
        adminmobile: "",
      }
    : {
        adminemail: adminDetails.Email,
        adminaddress: adminDetails.Address,
        adminmobile:adminDetails.MobileNo,
      };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: ContactObject,
      enableReinitialize: true,

      onSubmit: async (values) => {
        const _id = adminDetails?._id;
        const payload = {
            Email:values.adminemail,
            MobileNo:values.adminmobile,
            Address:values.adminaddress
        };

        try {
          let response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/admincontactusform/updatebyId/${_id}`,
            payload , 
            header
          );

          if (response.status === 200) {
            // console.log("New Category Created ");
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
      <div className="mt-4 mb-6 font-bold text-4xl text-start pb-6 border-b-2 border-black">

          <h1>Admin Contact us Page</h1>
        </div>
      <Toaster />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form
           onSubmit={handleSubmit}
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="">
                <label
                  htmlFor="adminemail"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Id
                </label>
                <input
                  type="email"
                  id="adminemail"
                  value={values.adminemail}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="adminaddress"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <textarea
                  id="adminaddress"
                  name="adminaddress"
                  value={values.adminaddress}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="adminmobile"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  id="adminmobile"
                  value={values.adminmobile}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              </div>
              <button
              className="px-10  text-white bg-[#868686] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"
               type="submit"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  
  );
};

export default AdminContact;
