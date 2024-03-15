import { RiEdit2Line } from "react-icons/ri";
import * as yup from "yup";
import { useFormik } from "formik";
import { counntryCode } from "../CountryCode/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddAddress from "./common/AddAddress";
import EditAddress from "./common/EditAddress";
import { TbPasswordUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import getToken from "./auth/GetToken"

const ProfileDetails = () => {
  const { _id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address , setAddress ] = useState([]) 
  const [editModalOpen , setEditModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [changePasswordModal , setChangePasswordModal] = useState(false)


  const navigate =  useNavigate()

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {

      const header = getToken()

      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/getuserdetails/${_id}` , header
      );

      
      setProfileData(response.data);
      setAddress(response.data.ShippingAddress)
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


  console.log("profileData ==> " ,  profileData)

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

    const handleAddAddressClick = () => {
    setIsModalOpen(true);
  };

  const handlerEdit = (addres) => {
    setEditModalOpen(true)
    setSelectedAddress(addres); 
  }

  const changehandlerPassword = () => {
    setChangePasswordModal(true)
  }



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
            <div className="md:w-[48%]">
              <label
                htmlFor=""
                className="mobile:text-xl  font-roxborough font-bold  text-[#642F29] md:text-xl "
              >
                {" "}
                Contact Name{" "}
              </label>
              <div className="mobile:mt-0 mobile:flex sm:flex">
                <input
                  className="mobile:flex text-lg mobile:h-10 mobile:w-full sm:flex sm:h-10 sm:w-full text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent   placeholder:text-[#642F29] font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                  type="text"
                  placeholder="Enter Username"
                  value={profileData.CustomerName}
                  id="name"
                ></input>
                {/* <RiEdit2Line
                  size={25}
                  color="#60713A"
                  className="z-0 sm:mt-2 mobile:mt-2 md:mt-4 -ml-6 "
                /> */}
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
                  className="mobile:flex mobile:h-10 text-lg mobile:w-full sm:flex sm:h-10 sm:w-full text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent  placeholder:text-[#642F29] font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
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
                  className="z-0 sm:mt-2 mobile:mt-2 md:mt-3 -ml-6 cursor-pointer "
                  onClick={changehandlerPassword}
                />
              </div>

              {
                changePasswordModal && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-md w-[300px] h-auto ">
                      <TbPasswordUser size={35}  className="w-full mx-auto text-text_Color"/>
                      <h1 className="w-[90%] mt-2.5 text-center mx-auto text-xl text-text_Color font-roxborough">
                        Are you sure you want to Change Password?
                      </h1>
                      <div className="w-[90%] flex justify-between gap-x-2 mt-3 mx-auto font-Marcellus">
                        <button onClick={() => setChangePasswordModal(false)} className="uppercase p-2 border border-text_Color2 text-text_Color2 rounded-3xl w-[50%]">Cancel</button>
                        <button onClick={() => navigate("/changepasswordprofile")} className="uppercase p-2 bg-text_Color2 text-white rounded-3xl w-[50%]">Yes</button>
                      </div>
                    </div>
                  </div>
                )
              }
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
                    <input
                      className="flex h-10 w-[100%] text-lg font-Marcellus  text-center text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2  placeholder:text-[#642F29] focus:outline-none"
                      id="CNcountryCode"
                      value= {` + ${profileData.Country_MobileNumber}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                    </input>

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
                      className="flex mobile:h-10 text-lg sm:h-10 w-full text-text_Color font-Marcellus sm:w-[100%] mobile:w-[100%]  border-b-[1px] border-b-[#642F29] bg-transparent  placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg disabled:opacity-50"
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
                    <input
                      className="flex h-10 w-[100%] font-Marcellus text-lg text-center text-text_Color  border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2  placeholder:text-[#642F29] focus:outline-none"
                      id="CNlandlineNumber"
                      value={` +  ${profileData?.Country_LandlineNumber}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                    </input>

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
                      className="flex h-10 w-full text-text_Color font-Marcellus  sm:w-[100%] mobile:w-[100%]  border-b-[1px] border-b-[#642F29] bg-transparent  text-lg placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm disabled:opacity-50"
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
              
              {address.length == 0 ? (
                <p className="text-text_Color mobile:w-[70%] sm:w-[70%] md:w-full font-Marcellus font-medium text-base mt-3">
                  Please Add Address
                </p>
              ) : (
                address.map((addres, index) => (
                  <div key={index} className="text-text_Color mt-3 mobile:w-[75%] sm:w-[75%] md:w-full">
                    <p className="text-text_Color font-Marcellus w-[90% cursor-pointer"  onClick={() => handlerEdit(addres)}>
                       {index+1}. {addres.StreetAddress} {addres.LocationName}{" "}
                      {addres.City} {addres.ZipCode}
                    </p>
                  </div>
                ))
              )}

              {
                editModalOpen && (
                  <EditAddress editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} selectedAddress={selectedAddress} setAddress={setAddress}/>
                )
              }

              {/* Button Add Address */}

              <button 
                 onClick={handleAddAddressClick}
              className="mobile:w-[100%] sm:w-[100%] md:w-[70%] lg:w-[50%] p-2.5 bg-text_Color2 font-Marcellus text-lg  text-white uppercase mt-5 mx-auto rounded-3xl">
                + add Address
              </button>
              </div>
                
                { isModalOpen && (  
                   <AddAddress isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} address={address}  setAddress={setAddress}/>
                  )
                }
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
