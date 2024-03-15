import { useFormik } from "formik";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import getToken from "../../common/getToken";
import { counntryCode } from "../../common/FormatAmount";

const CreateUser = ({setCompanyCreationModal , setCallApiAfterCreate}) => {
  const CompanyRegisterSchema = yup.object({
    camponeyname: yup.string().min(2).required("Enter your Company Name"),
    gstno: yup
      .string()
      .matches(/^[a-zA-Z0-9]{15}$/, "Please enter  valid  GST number")
      .required("Enter the GST NO")
      .test((val) => val && val.toString().length === 15)
      .min(15)
      .required("Please Enter valid GST number "),
    address: yup.string().required("Please Enter  Address"),
    state: yup.string().min(3).required(" Please Enter State "),
    city: yup.string().min(3).required(" Please Enter  City Name"),
    zipcode: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .required("Enter the Zip Code"),
    fullname: yup
      .string()
      .required("Full name is required")
      .min(4)
      .matches(/^([a-zA-Z]+ ?){1,4}$/, "Invalid full name"),
    email: yup
      .string()
      .email("Enter the Valid Email id")
      .required("Enter Your Email"),
    countryCode: yup
      .string()
      .min(1, "Enter valid Country Code")
      .required("Enter the valid Number"),
    mobileNo: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid Mobile number")
      .test((val) => val && val.toString().length === 10)
      .min(1, "Please Enter 10 digit number")
      .max(9999999999, "Enter 10 digit number ")
      .required("Enter the 10 digit no"),
    countryCode1: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid Mobile number"),
    landlineNo: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid LandLine number"),
  });

  const initialValues = {
    camponeyname: "",
    gstno: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    fullname: "",
    email: "",
    countryCode: "",
    mobileNo: "",
    countryCode1: "",
    landlineNo: "",
  };

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
    validationSchema: CompanyRegisterSchema,
    onSubmit: async (values) => {
      const numericCountryCode = values.countryCode.replace(/\D/g, "");
      const numericCountryCode1 = values.countryCode1.replace(/\D/g, "");

      const payload = {
        CompanyName: values.camponeyname,
        GstNo: values.gstno,
        Company_StreetAddress: values.address,
        Company_City: values.city,
        Company_State: values.state,
        Company_ZipCode: values.zipcode,
        CustomerName: values.fullname,
        Email: values.email,
        MobileNumber: values.mobileNo,
        Country_MobileNumber: numericCountryCode,
        Country_LandlineNumber: numericCountryCode1,
        LandlineNumber: values.landlineNo,
        ReciveUpdates: values.whatappcheck,
      };

       if (values.landlineNo === "") {
          delete payload.Country_LandlineNumber;
          delete payload.LandlineNumber;
        }

      try {
        const header = getToken();

        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/registerbyadmin`,
          payload,
          header
        );

        if (response.status === 200) {
          toast.success(response.data);
          setCallApiAfterCreate(true)
           resetForm();
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

  return (
    <div>
      <Toaster/>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="">
            <label
              htmlFor="camponeyname"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              CompanyName <span> *</span>
            </label>
            <input
              type="text"
              id="camponeyname"
              name="camponeyname"
              value={values.camponeyname}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.camponeyname && touched.camponeyname ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.camponeyname}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="gstno"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              GstNo <span> *</span>
            </label>
            <input
              type="text"
              id="gstno"
              name="gstno"
              value={values.gstno}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.gstno && touched.gstno ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.gstno}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-2 mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Company_StreetAddress <span> *</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.address && touched.address ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.address}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="city"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Company_City <span> *</span>
            </label>
            <input
              type="text"
              id="city"
              onChange={handleChange}
              value={values.city}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.city && touched.city ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.city}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="state"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Company_State <span> *</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.state && touched.state ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.state}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="zipcode"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Company_ZipCode <span> *</span>
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.zipcode && touched.zipcode ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.zipcode}
              </p>
            ) : null}
          </div>

          <br />

          {/* Company User Data  */}

          <h1 className="text-2xl text-black uppercase underline">
            Customer Information
          </h1>
          <br />

          <div className="">
            <label
              htmlFor="fullname"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer Name <span> *</span>
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.fullname && touched.fullname ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.fullname}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Email <span> *</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.email && touched.email ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="countryCode"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Country_MobileNumber <span> *</span>
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="countryCode"
              value={values.countryCode}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              {counntryCode.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
            {errors.countryCode && touched.countryCode ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.countryCode}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="mobileNo"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              MobileNumber <span> *</span>
            </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={values.mobileNo}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.mobileNo && touched.mobileNo ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.mobileNo}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="countryCode1"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Country_LandlineNumber
            </label>
            <select
              placeholder=" Country Code"
              id="countryCode1"
              value={values.countryCode1}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Country
              </option>
              {counntryCode.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
            {errors.countryCode1 && touched.countryCode1 ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.countryCode1}
              </p>
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="landlineNo"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              LandlineNumber
            </label>
            <input
              type="text"
              id="landlineNo"
              name="landlineNo"
              value={values.landlineNo}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.landlineNo && touched.landlineNo ? (
              <p className="font-Marcellus text-start text-red-900">
                {errors.landlineNo}
              </p>
            ) : null}
          </div>

          <div className="flex mt-4">
            <button
              type="button"
              onClick={() => setCompanyCreationModal(false)}
              className="px-4 py-2 mr-5  text-black border-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
