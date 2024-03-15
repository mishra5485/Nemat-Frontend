import React, { useEffect, useState } from "react";
import NavBars from "../component/common/NavBars";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../component/footer/footer";
import { FaWhatsapp } from "react-icons/fa";
import getToken from "../component/auth/GetToken";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [admininfo, setAdminInfo] = useState();

  const objectSchema = yup.object({
    firstName: yup.string().min(3).required("Please Enter First Name"),
    lastName: yup.string().min(3).required("Please Enter Last Name"),
    userEmail: yup
      .string()
      .email("Please Enter A valid Email")
      .min(3)
      .required("Please Enter your Email "),
    userMobileNo: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(99999999, "Min 8 Number")
      .required("Enter the Your Mobile Number"),
    userMessage: yup.string().min(5).required("Please enter your query."),
  });

  useEffect(() => {
    getallInfo();
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    userEmail: "",
    userMobileNo: "",
    userMessage: "",
  };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur , resetForm } =
    useFormik({
      initialValues,
      validationSchema: objectSchema,
      onSubmit: async (values) => {
        const palyload = {
          Name: `${values.firstName} ${values.lastName}`,
          Email: values.userEmail,
          MobileNo: values.userMobileNo,
          Message: values.userMessage,
        };
        try {
          let response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/usercontactusform/create`,
            palyload
          );

          console.log(response);

          if (response.status === 200) {
            toast.success(response.data);
            resetForm();
            formik.resetForm();
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

      const header = getToken()

      let allDataResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admincontactusform/get`,
        header
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
        <p></p>
      ) : (
        <div className="md:flex">
          <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[100%] mobile:flex mobile:flex-col mobile:justify-center mobile:items-center mobile: w-[100%]  md:items-start md:ml-[3%] md:text-start md:text-lg text-text_Color  font-Marcellus  md:w-[60%]">
            <h1 className="font-roxborough sm:text-3xl mobile:text-3xl md:text-5xl overflow-hidden text-text_Color font-semibold ">
              Contact Us{" "}
            </h1>

            <p
              className="sm:text-center sm:w-[85%] sm:mt-3 mobile:text-center mobile:w-[85%] mobile:mt-3 md:w-[100%] md:text-start md:text-lg text-text_Color hover:underline font-Marcellus cursor-pointer"
              onClick={() => {
                window.location.href = `mailto:${admininfo.Email}`;
              }}
            >
              Reach us at: {admininfo.Email}
            </p>
            <a 
               href="https://maps.app.goo.gl/XdV5YEbN1uNgdnTw6"
              target="_blank"
            >
              <p className="hover:underline sm:text-center sm:mt-2 sm:px-3 mobile:mt-2 mobile:px-3 font-Marcellus md:text-start md:px-0">
                {admininfo.Address}
              </p>
            </a>
            <p className="sm:mt-2 mobile:mt-2 md:w-[100%] md:text-start font-Marcellus">
              Online Queries: {""}
              {admininfo.MobileNo}
            </p>

            <a
              href={`https://api.whatsapp.com/send?phone=${admininfo.MobileNo}`}
              target="_blank"
            >
              <button
                type="button"
                className="text-white bg-[#1eba57] hover:bg-[#1eba57]/90 focus:ring-4 focus:outline-none focus:ring-[#1eba57]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mt-6"
              >
                <FaWhatsapp className="pr-2" size={25} />
                Whatsapp Us
              </button>
            </a>
          </div>

          <div className="mobile:w-[100%] mobile:mt-10 mobile:flex mobile:flex-col mobile:justify-center mobile:items-center mobile:mb-8 sm:w-[100%] sm:mt-10 sm:flex sm:flex-col sm:justify-center sm:items-center sm:mb-8  md:border-l-2 md:border-[#642F29] ">
            <h1 className="mobile:uppercase mobile:text-xl  sm:uppercase font-roxborough sm:text-xl font-semibold md:w-[90%] md:text-start md:text-3xl text-text_Color">
              Write Us a Message
            </h1>
            <div className="w-[90%] mt-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="md:flex md:w-full gap-x-3">
                    <div className="md:w-[50%]">
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
                    <div className="sm:mt-3 mobile:mt-3 md:mt-0 md:w-[50%]">
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
                  </div>
                  <div className="md:flex md:w-full gap-x-3">
                    <div className="sm:mt-6 mobile:mt-6 md:mt-3 md:w-[50%]">
                      <div className="mobile:mt-0 ">
                        <input
                          className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                          type="text"
                          placeholder="Email"
                          value={values.userEmail}
                          id="userEmail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        {errors.userEmail && touched.userEmail ? (
                          <p className="font-Marcellus text-red-900">
                            {errors.userEmail}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="sm:mt-6 mobile:mt-6 md:mt-3 md:w-[50%]">
                      <div className="mobile:mt-0 ">
                        <input
                          className="flex h-10 w-full  border-b-2 border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                          type="text"
                          placeholder="Mobile Number"
                          value={values.userMobileNo}
                          id="userMobileNo" 
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        {errors.userMobileNo && touched.userMobileNo ? (
                          <p className="font-Marcellus text-red-900">
                            {errors.userMobileNo}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mobile:mt-0">
                      <textarea
                        className="flex h-20 w-full border-b-2 border-b-[#642F29] bg-transparent text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50 resize-none"
                        rows="3"
                        placeholder="Enter Message"
                        value={values.userMessage}
                        id="userMessage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></textarea>
                      {errors.userMessage && touched.userMessage ? (
                        <p className="font-Marcellus text-red-900">
                          {errors.userMessage}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-xl inline-flex sm:w-full mobile:w-full mobile:mt-8 md:w-[25%] h-[43px]  mt-1  items-center justify-center  rounded-3xl bg-[#60713A]  leading-7 text-white font-Marcellus leading-17 tracking-normal text-center hover:animate-pulse hover:bg-green-700 transition-all duration-200 hover:text-white hover:bg-"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ContactUs;
