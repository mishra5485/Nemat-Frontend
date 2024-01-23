import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";

const Smtp = () => {


   const [loading, setLoading] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [isSmtpData  , setIsSmtpData] = useState([])

   const showHandler = () => {
      setShowPassword(!showPassword);
    };

   useEffect(() => {
      getSmtpData()
   },[]) 

   const getSmtpData = async() => {
       try {
         let responseHeader = await axios.get(
         `${import.meta.env.VITE_REACT_APP_BASE_URL}/smtp/get`
         );

      if(responseHeader.status === 200){
         setIsSmtpData(responseHeader.data);
         setLoading(false)
      }

    } catch (error) {
       setLoading(false)
      console.log(error);
    }
   }

   const SmtpObject = yup.object({
    port:yup.number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .min(111)
    .required("Enter the Port Number"),
    host:yup.string().min(3).required("Please Enter Host "),
    username:yup.string().min(3).required("Please Enter UserName "),
    smtpPassword:yup.string().min(3).required("Please Enter the SMTPPassword "),
    encryption:yup.string().min(3).required("Please Enter The Encryption key")
    
  });

    const initialValues = loading
    ? {
        port: "",
        host: "",
        username: "",
        smtpPassword: "",
        encryption: "",
      }
    : {
        port: isSmtpData.Port,
        host: isSmtpData.Host,
        username:isSmtpData.Username,
        smtpPassword: isSmtpData.Password,
        encryption: isSmtpData.Encryption,
      };

   const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: SmtpObject,
      enableReinitialize: true,

      onSubmit: async (values) => {
        const _id = isSmtpData._id;
        const payload = {
            Port:values.port,
            Host:values.host,
            Username:values.username,
            Password:values.smtpPassword,
            Encryption:values.encryption
        };

        try {
          let response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/smtp/update/${_id}`,
            payload
          );

          if (response.status === 200) {
            console.log("New Category Created ");
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
      <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
            SMTP Config
        </span>
      </h1>
      <Toaster />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form
           onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-4">
                <label
                  htmlFor="adminemail"
                  className="block text-sm font-medium text-gray-600"
                >
                  Port
                </label>
                <input
                  type="text"
                  id="port"
                  value={values.port}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

               <div className="mb-4">
                <label
                  htmlFor="adminmobile"
                  className="block text-sm font-medium text-gray-600"
                >
                  Host 
                </label>
                <input
                  type="text"
                  id="host"
                  value={values.host}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="adminmobile"
                  className="block text-sm font-medium text-gray-600"
                >
                  UserName
                </label>
                <input
                  type="email"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              {/* <div className="mb-4 flex justify-center items-center">
               <div className="w-full">

                <label
                  htmlFor="adminmobile"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password 
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="smtpPassword"
                  value={values.smtpPassword}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
                   </div>
                <span className="overflow-hidden ">
                              {showPassword ? (
                                <IoMdEye onClick={showHandler} size={20} />
                              ) : (
                                <IoIosEyeOff onClick={showHandler} size={20} />
                              )}
                            </span>
              </div> */}

              <div className="mb-4">
                          <label
                            htmlFor=""
                            className="mobile:text-xl  "
                          >
                            {" "}
                            Password{" "}
                          </label>
                          <div className=" flex justify-center items-center border  rounded-md ">
                            <input
                              className=" flex h-10 w-full  "
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={values.smtpPassword}
                              id="smtpPassword"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              >
                               </input>

                            <span className="overflow-hidden">
                              {showPassword ? (
                                <IoMdEye onClick={showHandler} size={20} />
                              ) : (
                                <IoIosEyeOff onClick={showHandler} size={20} />
                              )}
                            </span>
                          </div>
                        </div>

              <div className="mb-4">
                <label
                  htmlFor="adminmobile"
                  className="block text-sm font-medium text-gray-600"
                >
                  Encryption
                </label>
                <input
                  type="text"
                  id="encryption"
                  value={values.encryption}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <button
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
               type="submit"
            >
              Update
            </button>
            </div>
          </form>
        )}
      </div>
    </div>
  

  )
}

export default Smtp