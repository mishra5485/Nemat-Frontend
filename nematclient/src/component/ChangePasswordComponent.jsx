import React from "react";
import loginBG from "../assets/loginImages/loginImage.png";
import logo from "../assets/loginImages/nematEnterprisesLogo.png";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import RightToLeftanm from "../style/RightToLeftanm";
import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import InfiniteScrollImage from "../style/InfiniteScrollImage.jsx";
import { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../slices/profileSlice.js";
import { setcategoryEmpty } from "../slices/categorySlice.js";
import getToken from "./auth/GetToken.js";

const ChangePasswordComponent = () => {
  const navigate = useNavigate();
  //Accessing User Data from the Stroage
  const { user } = useSelector((state) => state.profile);

  //Extract User_id or Customer Id from our Store
  const customer_id_Store = user.customer_id;

  //Might be need to change in Feacture.
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch()

  //switch case for different Password Field.
  const showHandler = (field) => {
    switch (field) {
      case "currentPassword":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  // Object Schema for Current Password Field Validation
  const objectSchem = yup.object({
    curremtPWD: yup.string().min(5).required("Please Enter current Password"),
    newpassword: yup.string().min(5).required("Please Enter New Password"),
    confirmPWD: yup
      .string()
      .min(5)
      .oneOf([yup.ref("newpassword"), null], "Passwords must match")
      .required("Please Enter Confirm Password"),
  });

  //initialvalues in Input Field
  const initialValues = {
    curremtPWD: "",
    newpassword: "",
    confirmPWD: "",
  };

  

  //If user Want To Change Password And He Click on
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: objectSchem,
      onSubmit: async (values) => {
        const palyload = {
          customer_id: customer_id_Store,
          OldPassword: values.curremtPWD,
          NewPassword: values.confirmPWD,
        };
        try {

          const header = getToken();

          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/changepassword`,
            palyload,
            header
          );

          // console.log("chnage password -> " , response)

          if (response.status === 200) {
            navigate("/passwordUpdated");
            dispatch(logout())
            dispatch(setcategoryEmpty())
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
            }
          }
        }
      },
    });

  return (
    <div className="">
      <div className="w-full h-full overflow-hidden object-cover md:flex md:w-full md:h-[100vh]">
        <Toaster />
        {/* Image section with Logo */}
        <div
          style={{
            backgroundImage: `url(${loginBG})`,
            backgroundRepeat: "no-repeat",
          }}
          className="mobile:w-full sm:w-full  sm:h-[45vh] mobile::bg-center mobile:h-[40vh] mobile:bg-cover sm:bg-center mobile:bg-center sm:bg-cover sm:object-cover  bg-green-700 md:h-[100%]  md:bg-slate-600 md:min-w-[45%] flex-wrap object-cover -z-10 md:max-w-[80%] lg:w-[40%]"
        >
          <div className="flex w-[100%] mt-2 sm:mt-5 sm:  md:h-[20%] justify-center items-center   ">
            <Link to={"/"}>
              <img
                src={logo}
                className="sm:w-[100%] z-10 mobile:h-[80px] mobile:w-[107px] sm:h-[90px] md:w-[150px] md:h-[105px] "
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* Infinite Scroll section */}
        <div className="mobile:w-full mobile:h-[45px] sm:w-full sm:h-[45px] min-h-[5%] md:max-w-[4%] md:h-full md:mt-2 overflow-hidden ">
          <RightToLeftanm image={FlowerPattern2} />

          {/* Show FlowerPattern for md and larger screens */}
          <InfiniteScrollImage className="w-full h-full animate-img hidden mobile:hidden sm:hidden md:inline-block" />
        </div>
        <div className="sm:w-full  min-h-[65%] flex justify-center items-center m-auto">
          <div className="sm:w-[95%] mobile:w-[95%] md:w-[90%] md:h-[100%] ">
            <h2 className="overflow-hidden sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-4xl md:text-start md:mb-6  ">
              Change  Password
            </h2>
            <div className="">
              <Toaster />
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="mt-2 md:mt-7 overflow-hidden"
                >
                  <div className="">
                    <div className="my-4 sm:my-0 mobile:my-2 md:">
                      <label
                        htmlFor=""
                        className="font-Marcellus  text-text_Color md:text-xl "
                      >
                        {" "}
                        Current Password{" "}
                      </label>
                      <div className=" flex  justify-center items-center border-b-2 border-b-[#642F29]">
                        <input
                          className="flex font-Marcellus text-text_Color text-xl mobile:pt-1 w-full   bg-transparent  mobile:py-1 placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter Current Password"
                          id="curremtPWD"
                          value={values.curremtPWD}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        <span className="">
                          {showCurrentPassword ? (
                            <IoMdEye
                              onClick={() => showHandler("currentPassword")}
                              size={20}
                            />
                          ) : (
                            <IoIosEyeOff
                              onClick={() => showHandler("currentPassword")}
                              size={20}
                            />
                          )}
                        </span>
                      </div>
                      {errors.curremtPWD && touched.curremtPWD ? (
                        <p className="font-Marcellus text-[16px] text-red-900">
                          {errors.curremtPWD}
                        </p>
                      ) : null}
                    </div>
                    <div className="my-4 mobile:my-3 md:py-4">
                      <label
                        htmlFor=""
                        className="font-Marcellus  text-text_Color md:text-xl"
                      >
                        {" "}
                        New Password{" "}
                      </label>
                      <div className=" flex justify-center items-center border-b-2 border-b-[#642F29]">
                        <input
                          className="flex mobile:pt-1 w-full font-Marcellus text-text_Color text-xl  bg-transparent  mobile:py-1 placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter New Password"
                          id="newpassword"
                          value={values.newpassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        <span className="">
                          {showNewPassword ? (
                            <IoMdEye
                              onClick={() => showHandler("newPassword")}
                              size={20}
                            />
                          ) : (
                            <IoIosEyeOff
                              onClick={() => showHandler("newPassword")}
                              size={20}
                            />
                          )}
                        </span>
                      </div>
                      {errors.newpassword && touched.newpassword ? (
                        <p className="text-red-800">{errors.newpassword}</p>
                      ) : null}
                    </div>
                    <div className="my-4 mobile:my-3">
                      <label
                        htmlFor=""
                        className="font-Marcellus  text-text_Color md:text-xl"
                      >
                        {" "}
                        Confirm New Password{" "}
                      </label>
                      <div className=" flex justify-center items-center border-b-2 border-b-[#642F29]">
                        <input
                          className="flex mobile:pt-1 w-full font-Marcellus text-text_Color text-xl  bg-transparent  mobile:py-1 placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm New Password"
                          value={values.confirmPWD}
                          id="confirmPWD"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>
                        <span className="">
                          {showConfirmPassword ? (
                            <IoMdEye
                              onClick={() => showHandler("confirmPassword")}
                              size={20}
                            />
                          ) : (
                            <IoIosEyeOff
                              onClick={() => showHandler("confirmPassword")}
                              size={20}
                            />
                          )}
                        </span>
                      </div>
                      {errors.confirmPWD && touched.confirmPWD ? (
                        <p className="text-red-800">{errors.confirmPWD}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-4 mobile:gap-1">
                    <button
                      className="p-2 mobile:w-full mobile:text-xl text-center rounded-3xl bg-[#60713A] text-white font-Marcellus text-base  leading-17 md:w-[25%] h-[43px] "
                      type="submit"
                    >
                      Change
                    </button>
                  </div>
                </form>

                <button
                  type="button"
                  className="p-2 rounded-3xl mobile:bg-white mobile:w-full md:text-2xl font-Marcellus text-base underline  text-[#642F29] bg-green-500"
                  onClick={() => navigate(`/profile/${customer_id_Store}`)}
                >
                  Do it Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
