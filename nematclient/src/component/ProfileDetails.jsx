import { RiEdit2Line } from "react-icons/ri";
import * as yup from "yup";
import { useFormik } from "formik";
import { counntryCode } from "../CountryCode/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {
  const { _id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/getuserdetails/${_id}`
      );

      
      setProfileData(response.data);
      setLoading(false);
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


  const UpdateProfileObject = yup.object({
    name: yup.string().min(2).required("Please Enter your Name"),
    CNcountryCode: yup
      .number()
      // .typeError("Please enter a valid number")
      // .integer("Please enter a valid Mobile number")
      // .min(1, "Enter valid Country Code")
      // .max(999, "Enter valid Country Code")
      // .required("Enter the valid Number"),
      ,
    mobileNumber: yup
      .number(),
      // .typeError("Please enter a valid number")
      // .integer("Please enter a valid Mobile number")
      // .test((val) => val && val.toString().length === 10)
      // .min(1, "Please Enter 10 digit number")
      // .max(9999999999, "Enter 10 digit number ")
      // .required("Enter the 10 digit no"),
    landlineNumber: yup
      .number()
      // .typeError("Please enter a valid number")
      // .integer("Please enter a valid Mobile number"),
      ,
    CNlandlineNumber: yup
      .number()
      // .typeError("Please enter a valid number")
      // .integer("Please enter a valid LandLine number"),
  });

  const initialValues = {
    name: profileData.CustomerName,
    CNcountryCode: profileData.Country_MobileNumber,
    mobileNumber: profileData.MobileNumber,
    landlineNumber: profileData.Country_LandlineNumber,
    CNlandlineNumber: profileData.LandlineNumber,
  };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: UpdateProfileObject,
      onSubmit: async (values, actions) => {
        // console.log("values inside sumit -> ",values);

        const payload = {
          name: "",
          CNcountryCode: "",
          mobileNumber: "",
          landlineNumber: "",
          CNlandlineNumber: "",
        };

        // console.log("values inside sumit -> ",payload)

        try {
          const response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/users/customer/register`,
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
            }
          }
        }
      },
    });

  return (
    <div className="mt-8 md:h-auto md:border-l-2 border-text_Color">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="md:ml-[7%]">
          <h1 className="text-text_Color font-Marcellus font-bold text-xl">
            Profile Details
          </h1>

          {/* All Inputs Field  */}
          <div className="mt-6">
            <div>
              <label
                htmlFor=""
                className="mobile:text-xl font-roxborough font-bold  text-[#642F29] md:text-xl "
              >
                {" "}
                Contact Name{" "}
              </label>
              <div className="mobile:mt-0 mobile:flex sm:flex">
                <input
                  className="mobile:flex mobile:h-10 mobile:w-full sm:flex sm:h-10 sm:w-full text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                  type="text"
                  placeholder="Enter Username"
                  value={profileData.CustomerName}
                  id="name"
                ></input>
                <RiEdit2Line
                  size={25}
                  color="#60713A"
                  className="z-0 sm:mt-2 mobile:mt-2 md:mt-4 -ml-6 "
                />
              </div>
            </div>

          <div className="md:flex md:w-full md:gap-x-8 ">
            <div className="mt-5 md:w-[50%]">
              <label
                htmlFor=""
                className="mobile:text-xl  font-roxborough font-bold  text-[#642F29] md:text-xl "
              >
                {" "}
                Email{" "}
              </label>
              <div className="mobile:mt-0 mobile:flex sm:flex md:w-full">
                <input
                  className="mobile:flex mobile:h-10 mobile:w-full sm:flex sm:h-10 sm:w-full text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                  type="text"
                  placeholder="Enter Username"
                  id="email"
                  value={profileData.Email}
                ></input>
              </div>
            </div>

            <div className="mt-5 md:w-[50%]">
              <label
                htmlFor=""
                className="mobile:text-xl font-roxborough font-bold  text-[#642F29] md:text-xl "
              >
                {" "}
                Password{" "}
              </label>
              <div className="mobile:mt-0 mobile:flex sm:flex ">
                <input
                  className="mobile:flex mobile:h-10 mobile:w-full sm:flex sm:h-10 sm:w-full text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                  type="password"
                  placeholder="Enter Username"
                  value={profileData.CustomerName}
                  id="password"
                ></input>
                <RiEdit2Line
                  size={25}
                  color="#60713A"
                  className="z-0 sm:mt-2 mobile:mt-2 md:mt-3 -ml-6 "
                />
              </div>
            </div>
          </div>


          <div className="md:w-full md:flex md:gap-x-8">
            <div className="flex mt-7  mobile:w-full sm:w-full md:w-[50%]  ">
              <div className="flex gap-0 w-[100%] mobile:gap-x-2 sm:gap-x-2 md:gap-x-0 ">
                <div className="md:w-[45%] mobile:w-[40%]">
                  <label
                    htmlFor=""
                    className="mobile:text-xl  font-roxborough font-bold  text-[#642F29] md:text-sm lg:text-lg"
                  > 
                    {" "}
                    Country Code
                  </label>
                  <div className="md:w-[90%]">
                    <select
                      className="flex h-10 w-[100%] text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      id="CNcountryCode"
                      value={values.CNcountryCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>
                        Select Country Code
                      </option>
                      {counntryCode.map((country, index) => (
                        <option
                          key={index}
                          value={country.code}
                          className="text-text_Color text-center"
                        >
                          ({country.code})
                        </option>
                      ))}
                    </select>

                    {errors.CNcountryCode && touched.CNcountryCode ? (
                      <p className="font-Marcellus text-red-900">
                        {errors.CNcountryCode}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="mobile:w-[60%] sm:w-[60%] md:w-[60%]">
                  <label
                    htmlFor=""
                    className="mobile:text-xl  font-roxborough font-bold  text-[#642F29] md:text-sm lg:text-lg"
                  >
                    {" "}
                    Mobile Number{" "}
                  </label>
                  <div className="">
                    <input
                      className="flex mobile:h-10 sm:h-10 w-full text-text_Color font-semibold sm:w-[100%] mobile:w-[100%]  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg disabled:opacity-50"
                      type="text"
                      placeholder=" Mobile Number"
                      id="mobileNumber"
                      value={profileData.MobileNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                    {errors.mobileNumber && touched.mobileNumber ? (
                      <p className="font-Marcellus text-red-900">
                        {errors.mobileNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex mt-7 mobile:w-full sm:w-full md:w-[50%] ">
              <div className="flex gap-0 w-[100%] mobile:gap-x-2 sm:gap-x-2 md:gap-x-0">
                <div className="mobile:w-[40%] md:w-[45%]">
                  <label
                    htmlFor=""
                    className="mobile:text-xl  font-roxborough font-bold  text-[#642F29] md:text-sm lg:text-lg"
                  >
                    {" "}
                    Country Code
                  </label>
                  <div className="md:w-[90%]">
                    <select
                      className="flex h-10 w-[100%] text-text_Color  border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] focus:outline-none"
                      id="CNlandlineNumber"
                      value={values.CNlandlineNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>
                        Select Country Code
                      </option>
                      {counntryCode.map((country, index) => (
                        <option
                          key={index}
                          value={country.code}
                          className="text-text_Color text-center  "
                        >
                          ({country.code})
                        </option>
                      ))}
                    </select>

                    {errors.CNlandlineNumber && touched.CNlandlineNumber ? (
                      <p className="font-Marcellus text-red-900">
                        {errors.CNlandlineNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="w-[60%]">
                  <label
                    htmlFor=""
                    className="mobile:text-xl  font-roxborough font-bold  text-[#642F29] md:text-sm lg:text-lg"
                  >
                    {" "}
                    LandLine Number{" "}
                  </label>
                  <div className="">
                    <input
                      className="flex h-10 w-full text-text_Color font-semibold font-roxborough  sm:w-[100%] mobile:w-[100%]  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm disabled:opacity-50"
                      type="text"
                      placeholder=" Mobile Number"
                      id="landlineNumber"
                      value={profileData.LandlineNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                    {errors.landlineNumber && touched.landlineNumber ? (
                      <p className="font-Marcellus text-red-900">
                        {errors.landlineNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Company Details */}

          <div className="mobile:mt-10 sm:mt-10 md:mt-14 ">
            <h1 className="text-text_Color font-roxborough font-bold text-2xl">
              Company Details
            </h1>

            <div className="w-full mt-4">
              <div className="flex text-text_Color w-full  justify-between font-roxborough font-bold text-xl md:gap-x-8">
                <p className="w-[50%]">Company Name</p>
                <p className="w-[50%]">GST Number</p>
              </div>
              <div className="flex text-text_Color w-full justify-between font-Marcellus mt-3 md:gap-x-8">
                <p className="w-[50%]">{profileData.CompanyName}</p>
                <p className="w-[50%]">{profileData.GstNo}</p>
              </div>
            </div>

            {/* Address  */}

            <div className="mt-5 md:flex md:w-full md:gap-x-8">
              <div className="w-[50%]">
              <div className="flex justify-between md:w-full">
                <h1 className="text-text_Color font-roxborough font-bold text-xl">
                  Shipping Address{" "}
                </h1>
                <p>
                  <RiEdit2Line size={25} color="#60713A" className="" />
                </p>
              </div>
              {profileData.ShippingAddress == [] ? (
                <p className="text-text_Color mobile:w-[70%] sm:w-[70%] md:w-full font-Marcellus font-medium text-base mt-3">
                  Please Add Address
                </p>
              ) : (
                profileData.ShippingAddress.map((address, index) => (
                  <div key={index} className="text-text_Color mt-3 mobile:w-[75%] sm:w-[75%] md:w-full">
                    <p>
                      {address.StreetAddress} {address.LocationName}{" "}
                      {address.City} {address.ZipCode}
                    </p>
                  </div>
                ))
              )}

              {/* Button Add Address */}

              <button className="mobile:w-[100%] sm:w-[100%] md:w-[70%] lg:w-[50%] p-2.5 bg-text_Color2 font-Marcellus text-lg  text-white uppercase mt-5 mx-auto rounded-3xl">
                + add Address
              </button>
              </div>

              {/* GST ADDRess  */}

              <div className="text-text_Color mobile:mt-7 sm:mt-7 md:mt-0 md:w-[50%]">
                <h1 className="font-roxborough font-bold text-xl">
                  GST Address
                </h1>
                <p className="w-[90%] font-Marcellus mt-3 font-medium">
                  {profileData.Company_StreetAddress} {profileData.Company_City}{" "}
                  {profileData.Company_State} {profileData.Company_ZipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
