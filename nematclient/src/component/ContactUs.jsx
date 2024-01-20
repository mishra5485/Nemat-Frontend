import React, { useEffect, useState } from "react";
import NavBars from "./common/NavBars";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./footer/footer";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [admininfo, setAdminInfo] = useState();

  const objectSchema = yup.object({
    firstName: yup.string().min(5).required("Please Enter First Name"),
    lastName: yup.string().min(5).required("Please Enter Last Name"),
    Address: yup.string().min(3).required("Please Enter your Address "),
    city: yup.string().min(2).required("Please Enter City Name"),
  });

  useEffect(() => {
    getallInfo();
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    Address: "",
    city: "",
  };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: objectSchema,
      onSubmit: async (values) => {
        const palyload = {
          Email: values.email,
          password: values.password,
        };
        try {
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/login`,
            palyload
          );

          // console.log(response)

          if (response.status === 200) {
            toast.success(response.data);
          }
        } catch (error) {
          //Error which Coming From Server.
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
            }
          }
        }
      },
    });

  const getallInfo = async () => {
    try {
      let allDataResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admincontactusform/get`
      );

      console.log("allDataResponse.data", allDataResponse.data);

      if (allDataResponse.status === 200) {
        setAdminInfo(allDataResponse.data);
        // toast.success(allDataResponse.data);
        setLoading(false);
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
          setLoading(false);
        }
      }
    }
  };

  console.log("admininfo ===> ", admininfo);

  return (
    <div className="w-[100%] h-auto mb-7">
      <NavBars />
      <Toaster />
      {loading ? (
        <p>Loading..</p>
      ) : (
        <div className="flex flex-col justify-center items-center w-[100%]  mt-10 ">
          <h1 className="font-roxborough text-3xl ">Contact Us </h1>
          <p className="text-center w-[85%] mt-3 font-Marcellus">
            Reach us at:{""} {admininfo.Email}
          </p>
          <a href="https://maps.app.goo.gl/XdV5YEbN1uNgdnTw6">
            <p className="hover:underline text-center mt-2 px-3 font-Marcellus">
                {admininfo.Address}
            </p>
          </a>
          <p className="mt-2 font-Marcellus">Online Queries: {""}{admininfo.MobileNo}</p>
        </div>
      )}

      <div className="w-[100%] mt-10 flex flex-col justify-center items-center ">
        <h1 className="uppercase font-roxborough text-xl font-semibold">
          Write Us a Message
        </h1>
        <div className="w-[90%] mt-6">
          <form>
            <div>
              <div>
                <div className="mobile:mt-0 ">
                  <input
                    className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                    type="text"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    id="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                  {errors.firstName && touched.firstName ? (
                    <p className="font-Marcellus text-red-900">
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-3">
                <div className="mobile:mt-0 ">
                  <input
                    className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                    type="text"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    id="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                  {errors.lastName && touched.lastName ? (
                    <p className="font-Marcellus text-red-900">
                      {errors.lastName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-3">
                <div className="mobile:mt-0 ">
                  <input
                    className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                    type="text"
                    placeholder="Enter Address "
                    value={values.Address}
                    id="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                  {errors.Address && touched.Address ? (
                    <p className="font-Marcellus text-red-900">
                      {errors.Address}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-3">
                <div className="mobile:mt-0 ">
                  <input
                    className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                    type="text"
                    placeholder="Enter your City Name"
                    value={values.city}
                    id="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                  {errors.city && touched.city ? (
                    <p className="font-Marcellus text-red-900">{errors.city}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex sm:w-full mobile:w-full mobile:mt-8 md:w-[25%] h-[43px]  mt-1  items-center justify-center  rounded-3xl bg-[#60713A]  leading-7 text-white font-Marcellus text-base  leading-17 tracking-normal text-center hover:animate-pulse hover:bg-green-700 transition-all duration-200 hover:text-white hover:bg-"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
