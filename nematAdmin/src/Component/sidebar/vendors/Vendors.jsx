import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Vendors = () => {
  const [showform, setShowForm] = useState();
  const [loading, setLoading] = useState(true);
  const [allvandors, setvandors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllVendors();
  }, []);

  const getAllVendors = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/vendor/getall`
      );

      setvandors(response.data);
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
          console.log(error);
          setLoading(false);
        }
      }
    }
  };

  const vendorObject = yup.object({
    name: yup.string().min(2).required("Please Enter the name"),
    WH_number: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(99999999, "Enter 10 digit Number ")
      .max(9999999999)
      .required("Enter the WhatsApp Number"),
    address: yup.string().min(5).required("Please Enter The Address"),
    gstNo: yup
      .string()
      .matches(/^[a-zA-Z0-9]{15}$/, "Please enter  valid  GST number")
      .required("Enter the GST NO")
      .test((val) => val && val.toString().length === 15)
      .min(15)
      .required("Please Enter valid GST number "),
    back_Ac: yup
      .number()
      .typeError("Please Enter a valid Number")
      .integer("Please enter a valid number")
      .min(99999999999, "Enter 12 or 15 digit Number ")
      .max(999999999999999)
      .required("Enter the WhatsApp Number"),
    back_add: yup.string().min(10).required("Please Enter Bank Address "),
  });

  const initialValues = {
    name: "",
    WH_number: "",
    address: "",
    gstNo: "",
    back_Ac: "",
    back_add: "",
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: vendorObject,
    onSubmit: async (values, action) => {
      const palyload = {
        Name: values.name,
        Address: values.address,
        WhatsApp_No: values.WH_number,
        GstNo: values.gstNo,
        Bank_AccNo: values.back_Ac,
        Bank_Add: values.back_add,
      };

      console.log("PAyload ", palyload);

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/vendor/create`,
          palyload
        );

        console.log(response);

        if (response.status === 200) {
          resetForm();
          getAllVendors();
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
            console.log(error.response);
            toast.error(data);
          }
        }
      }
    },
  });

  const handleForm = () => {};

  console.log(allvandors);

  const editHandlerDir = (vendorId) => {
    navigate(`/dashboard/vendors/edit_vendor/${vendorId}`);
  };

  const deleteVendor = async (vendorId) => {
    try {
      const deleteData = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/vendor/deletebyId/${vendorId}`
      );

      if (deleteData.status === 200) {
        toast.success(deleteData.data);

        setvandors((allvandors) =>
          allvandors.filter((vendor) => vendor._id !== vendorId)
        );
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
  };

  useEffect(() => {}, [allvandors]);

  return (
    <div>
      <Toaster />
      <div>
        <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
            Vendors Page
          </span>
        </h1>
      </div>

      {showform ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  placeholder="Enter The Name"
                />
                {errors.name && touched.name ? (
                  <p className="font-Marcellus text-red-900">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="WH_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  WhatsApp_No
                </label>
                <input
                  type="text"
                  name="WH_number"
                  id="WH_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.WH_number}
                  onBlur={handleBlur}
                  placeholder="Enter WhatsApp Number"
                />
                {errors.WH_number && touched.WH_number ? (
                  <p className="font-Marcellus text-red-900">{errors.WH_number}</p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.address}
                  placeholder="Enter the Address"
                >
                   </textarea>
                  {errors.address && touched.address ? (
                  <p className="font-Marcellus text-red-900">{errors.address}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="gstNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNo"
                  id="gstNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.gstNo}
                  placeholder="Enter Gst Number"
                />
                {errors.gstNo && touched.gstNo ? (
                  <p className="font-Marcellus text-red-900">{errors.gstNo}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="back_Ac"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Account
                </label>
                <input
                  type="text"
                  name="back_Ac"
                  id="back_Ac"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  placeholder="Enter Bank Account Number"
                  value={values.back_Ac}
                />
                {errors.back_Ac && touched.back_Ac ? (
                  <p className="font-Marcellus text-red-900">{errors.back_Ac}</p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="back_add"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Address
                </label>
                <textarea
                  id="back_add"
                  name="back_add"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                  value={values.back_add}
                  placeholder="Enter Bank Address"
                >
                   </textarea>
                   {errors.back_add && touched.back_add ? (
                  <p className="font-Marcellus text-red-900">{errors.back_add}</p>
                ) : null}
              </div>
            </div>

            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased ">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                      <input
                        type="text"
                        placeholder="Search for products"
                        required=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    className="bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowForm(true)}
                  >
                    + Create Vendor
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="overflow-x-auto overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs w-[100wh] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="w-full ">
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-all"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label htmlFor="checkbox-all" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </th>
                          {/* <th scope="col" className="p-4">
                          Mobile Image{" "}
                        </th>
                        <th scope="col" className="p-4">
                          Desktop Image
                        </th> */}
                          <th scope="col" className="p-4">
                            Name
                          </th>
                          <th scope="col" className="p-4">
                            Mobile Number
                          </th>
                          <th scope="col" className="p-4">
                            Gst Number
                          </th>

                          <th scope="col" className="p-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {!allvandors || allvandors.length === 0 ? (
                        <p>NO data Found</p>
                      ) : (
                        allvandors.map((item) => (
                          <tbody key={item._id}>
                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    onClick={handleForm}
                                    className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor="checkbox-table-search-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>

                              <td className="px-2 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.Name}
                                </span>
                              </td>
                              <td className="px-2 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.WhatsApp_No}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.GstNo}
                              </td>

                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center space-x-4">
                                  <button
                                    type="button"
                                    onClick={() => editHandlerDir(item._id)}
                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-black bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => deleteVendor(item._id)}
                                    className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      )}
                    </table>
                  </div>
                )}
              </div>

              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      ...
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      100
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Vendors;
