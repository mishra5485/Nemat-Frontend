import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminContact = () => {
  const [loading, setLoading] = useState(false);

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
        adminemail: "",
        adminaddress: "",
        adminmobile: "",
      };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: ContactObject,
      enableReinitialize: true,

      onSubmit: async (values) => {
        // const _id = promoHeader?._id;
        const payload = {
          Title: values.promo,
        };

        try {
          let response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/admincontactusform/create`,
            payload
          );

          if (response.status === 200) {
            console.log("New Category Created ");
            toast.success("Updated Successfully");
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
      <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
          Admin Contact us Page
        </span>
      </h1>
      <Toaster />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="adminemail"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email Id
                </label>
                <input
                  type="email"
                  id="adminemail"
                  value={values.adminemail}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="adminaddress"
                  className="block text-sm font-medium text-gray-600"
                >
                  Address
                </label>
                <textarea
                  id="adminaddress"
                  name="adminaddress"
                  value={values.adminaddress}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md resize-none"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="adminmobile"
                  className="block text-sm font-medium text-gray-600"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  id="adminmobile"
                  value={values.adminmobile}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminContact;
