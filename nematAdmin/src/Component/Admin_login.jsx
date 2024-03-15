import { useFormik } from "formik";
import * as yup from "yup";
import { useState  } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAddmin } from "../slice/AdminProfileSlice";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginImage.png"

const  Admin_login = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const [showPassword , setShowPassword] = useState(false);

   const showHandler = () => {
      setShowPassword(!showPassword);
    };

   const objectLoginSchema = yup.object({
      Username:yup.string().min(4).required("Enter the Valid Username"),
      password:yup.string().min(4).required("Enter the Valid Password")
   })

   const initialValues = {
      Username:"",
      password: ""
    };


   const { values , errors , handleChange, handleSubmit , touched, handleBlur} = useFormik({
      initialValues,
      validationSchema:objectLoginSchema,
      onSubmit: async (values, action) => {
          const palyload = {
            username: values.Username,
            password: values.password,
      };

      // console.log(palyload)

      try {

         let response = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/admin/login`,
              palyload
            );

            //  console.log("response -> ",response)
            if (response.status === 200) {
                dispatch(setAddmin(response.data))
                const AdminLogin = response.data
                localStorage.setItem("token",AdminLogin.token)
                toast.success("Login successfully");
                navigate("/dashboard");
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
})

   
  return (
    <section className="h-[100%]">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 ">
        <Toaster/>
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 ">
          <div className="absolute inset-0 w-[100%] h-full">
            <img
              className="h-full w-[100%] rounded-md object-cover"
              src={loginImage}
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Log in</h2>
            <form  className="mt-8" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                   Username{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      id="Username"
                     value={values.Username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                  </div>
                </div>
                <div>
                 
                 <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                   Password {' '}
                  </label>
                  <div className="mt-2 flex justify-center items-center  h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
                     
                    <input
                      className="flex h-10 w-full rounded-md   bg-transparent text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                     type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={values.password}
                              id="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                    ></input>
                     <span className="overflow-hidden">
                              {showPassword ? (
                                <IoMdEye onClick={showHandler} size={20} />
                              ) : (
                                <IoIosEyeOff onClick={showHandler} size={20} />
                              )}
                     </span>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
             
             
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default  Admin_login