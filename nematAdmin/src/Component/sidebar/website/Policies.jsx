import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Policies = () => {
  const [loading, setLoading] = useState(true);
  const [showform, setShowForm] = useState();
  const [policiesdata, setPoliciesData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/policies/getall`
      );

      if (response.status === 200) {
        setPoliciesData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data);
      setLoading(false)
    }
  };

  console.log("policiesdata ===> ", policiesdata);

  const PoliciesObject = yup.object({
    heading: yup.string().min(3).required("Please Enter the heading"),
    Description: yup.string().min(3).required("Please Enter Description"),
  });

  const initialValues = {
    heading: "",
    Description: "",
  };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: PoliciesObject,
      enableReinitialize: true,

      onSubmit: async (values) => {
        const payload = {
          Name: values.heading,
          Data: values.Description,
        };

        try {
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/policies/create`,
            payload
          );

          if (response.status === 200) {
            toast.success(response.data);
            fetchAllData()
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
            else if(status === 403){
              setPoliciesData([])
            }
          }
        }
      },
    });


    // Edit funality for Policies Page 
    const editHandlerDir = (_id) => {
      navigate(`/dashboard/website/policies/edit_policies/${_id}`)
    }

    // Delete funality For Policies Page
    const DeleteHandler = async (_id) => {
      try {
      const deleteData = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/policies/deletebyId/${_id}`
      );

      if (deleteData.status === 200) {
        toast.success(" Category Deleted");
        setPoliciesData([])
        fetchAllData()
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (
          status === 404 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          console.log(error.response);
          toast.error(data);
        } else if (status === 403) {
          setPoliciesData([]);
        }
      }
    }
    }

  return (
    <div>
      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Policies Page</h1>
      </div>
      <Toaster />
      {showform ? (
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label
                htmlFor="heading"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Heading
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={values.heading}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
              />
            </div>

            <div className="md:col-span-2 mb-4">
              <label
                htmlFor="Description"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="Description"
                rows={17}
                name="Description"
                value={values.Description}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="">
            <button
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900  mr-4"
              type="submit"
            >
              Create
            </button>
            <button
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
              type="button"
              onClick={() => setShowForm(false)}
            >
              Go Back
            </button>
          </div>
        </form>
      ) : (
        <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4">
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
                    className="bg-[#868686] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowForm(true)}
                  >
                    + Create Policies
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
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {!policiesdata || policiesdata.length === 0 ? (
                        <p>NO data Found</p>
                      ) : (
                        policiesdata.map((item) => (
                          <tbody key={item._id}>
                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    // onClick={handleForm}
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
                              <td className="px-4 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.Name}
                                </span>
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
                                    onClick={() => DeleteHandler(item._id)}
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

export default Policies;
