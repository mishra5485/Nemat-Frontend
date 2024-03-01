import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [showform, setShowForm] = useState();
  const [slabeData, setslabeData] = useState();
  const [allCategoryData, setAllCategoryData] = useState();
  // const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  // const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    slabdata();
  }, []);

  const slabdata = async () => {
    try {
      let respose = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cartdiscountscheme/getall`
      );
      setslabeData(respose.data);

      let allCategoryResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getall`
      );

      setAllCategoryData(allCategoryResponse.data);
      setFilteredData(allCategoryResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  console.log("allCategoryData => ", allCategoryData);

  const categoryObjectSchema = yup.object({
    name: yup.string().min(2).required("Enter Category Name"),
    metaTitle: yup.string().min(2).required("Enter Meta Title For Category"),
    metaDesc: yup.string().min(2).required("Emter Meta Desc for Category"),
    metaKeyword: yup.string().min(2).required("Enter Meta Keywords"),
    slugUrl: yup.string().min(2).required("Enter slugUrl"),
    cartDiscount: yup.string().min(2).required("Please Select CartDiscount "),
    priority: yup.string(),
    // bannerImageMobile: yup.string().required("Select the Picture "),
    // bannerImageDesktop: yup.string().required("Select the Picture "),
  });

  const initialValues = {
    name: "",
    metaTitle: "",
    metaDesc: "",
    metaKeyword: "",
    slugUrl: "",
    cartDiscount: "",
    priority: "",
    // bannerImageMobile: null,
    // bannerImageDesktop: null,
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
    validationSchema: categoryObjectSchema,
    onSubmit: async (values, action) => {
      // const formData = new FormData();
      // formData.append("Name", values.name);
      // formData.append("MetaTitle", values.metaTitle);
      // formData.append("MetaDesc", values.metaDesc);
      // formData.append("MetaKeyWord", values.metaKeyword);
      // formData.append("SlugUrl", values.slugUrl);
      // // formData.append("MobilebannerImage", values.bannerImageMobile);
      // // formData.append("DesktopbannerImage", values.bannerImageDesktop);
      // formData.append("CartDiscountSlab", values.cartDiscount);

      const palyload = {
        Name: values.name,
        MetaTitle: values.metaTitle,
        MetaDesc: values.metaDesc,
        MetaKeyWord: values.metaKeyword,
        SlugUrl: values.slugUrl,
        CartDiscountSlab: values.cartDiscount,
        Priority: values.priority,
        // image:values.bannerImageMobile,
        // bannerImage:values.bannerImageDesktop,
      };

      // console.log(" formData image-> ", formData.image);

      if (values.priority === "") {
        delete palyload.Priority;
      }

      console.log("PAyload ", palyload);

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/create`,
          palyload
        );

        console.log(response);

        if (response.status === 200) {
          console.log("New Category Created ");
          toast.success("New Category Created");
          slabdata();
          resetForm();
          setFieldValue(null);
          setShowModal(false);
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

  // const handleFileChange = (event, field) => {
  //   const file = event.target.files[0];

  //   setFieldValue(field, file); // Set the file in the form state

  //   if (file) {
  //     // Use FileReader to read the selected file and set the preview
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (field === "bannerImageMobile") {
  //         setImagePreviewMobile(reader.result);
  //       } else if (field === "bannerImageDesktop") {
  //         setImagePreviewDesktop(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     // Reset the preview if no file is selected
  //     if (field === "bannerImageMobile") {
  //       setImagePreviewMobile(null);
  //     } else if (field === "bannerImageDesktop") {
  //       setImagePreviewDesktop(null);
  //     }
  //   }
  // };

  const handleForm = () => {};

  const editHandlerDir = (categoryId) => {
    setShowForm(categoryId);
    navigate(`/dashboard/category/edit/${categoryId}`);
  };

  const DeleteHandler = async (categoryId) => {
    try {
      const deleteData = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/category/deletebyId/${categoryId}`
      );

      if (deleteData.status === 200) {
        toast.success(" Category Deleted");
        setAllCategoryData([]);
        slabdata();
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
        } else if (status === 403) {
          setAllCategoryData([]);
        }
      }
    }
  };

  console.log(" send Id in URl", showform);

  const privorityCategory = [
    {
      id: 1,
      value: 1,
    },
    {
      id: 2,
      value: 2,
    },
    {
      id: 3,
      value: 3,
    },
    {
      id: 4,
      value: 4,
    },
    {
      id: 5,
      value: 5,
    },
    {
      id: 6,
      value: 6,
    },
    {
      id: 7,
      value: 7,
    },
    {
      id: 8,
      value: 8,
    },
    {
      id: 9,
      value: 9,
    },
    {
      id: 10,
      value: 10,
    },
  ];

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = allCategoryData.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="overflow-hidden">

        <div className="mt-4 mb-6 text-text_Color text-4xl text-start pb-6 border-b-2 border-text_Color">

          <h1>Category Page</h1>
        </div>
      
      <Toaster />
      {showModal ? (
        <>
          <form
            onSubmit={handleSubmit}
          >
            {/* Input fields */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="">
              <label
                htmlFor="name"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.name && touched.name ? (
                <p className="font-Marcellus text-start text-red-900">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="">
              <label
                htmlFor="metaTitle"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={values.metaTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

              />
              {errors.metaTitle && touched.metaTitle ? (
                <p className="font-Marcellus text-start text-red-900">
                  {errors.metaTitle}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2 mb-4">
              <label
                htmlFor="metaDesc"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Description
              </label>
              <textarea
                id="metaDesc"
                name="metaDesc"
                value={values.metaDesc}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.metaDesc && touched.metaDesc ? (
                <p className="font-Marcellus text-start text-red-900">
                  {errors.metaDesc}
                </p>
              ) : null}
            </div>

            <div className="">
              <label
                htmlFor="metaKeyword"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Keyword
              </label>
              <input
                type="text"
                id="metaKeyword"
                onChange={handleChange}
                value={values.metaKeyword}
                onBlur={handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.metaKeyword && touched.metaKeyword ? (
                <p className="font-Marcellus text-start text-red-900">
                  {errors.metaKeyword}
                </p>
              ) : null}
            </div>

            <div className="">
              <label
                htmlFor="slugUrl"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Slug URL
              </label>
              <input
                type="text"
                id="slugUrl"
                name="slugUrl"
                value={values.slugUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.slugUrl && touched.slugUrl ? (
                <p className="font-Marcellus text-start text-red-900">
                  {errors.slugUrl}
                </p>
              ) : null}
            </div>

            <div className="">
              <label
                htmlFor="cartDiscount"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Cart Discount Slab
              </label>
              <select
                id="cartDiscount"
                name="cartDiscount"
                value={values.cartDiscount}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select Cart Discount Slab
                </option>
                {slabeData?.map((slaboption) => (
                  <option key={slaboption._id} value={slaboption._id}>
                    {slaboption.Name}
                  </option>
                ))}
              </select>
              {errors.cartDiscount && touched.cartDiscount ? (
                <p className="font-Marcellus text-start text-red-900">
                  {errors.cartDiscount}
                </p>
              ) : null}
            </div>

            <div className="">
              <label
                htmlFor="priority"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
                Category Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={values.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Priority of Category
                </option>
                {privorityCategory.map((number) => (
                  <option key={number.id} value={number.value}>
                    {number.value}
                  </option>
                ))}
              </select>
              {errors.priority && touched.priority ? (
                <p className="font-Marcellus text-start text-red-900">
                  {errors.priority}
                </p>
              ) : null}
            </div>

            {/* File inputs */}
            {/* <div className="mb-4">
                      <label
                        htmlFor="fileInput1"
                        className="block text-sm font-medium text-gray-600"
                      >
                        File Input 1
                      </label>
                      <input
                        type="file"
                        id="bannerImageMobile"
                        onChange={(e) =>
                          handleFileChange(e, "bannerImageMobile")
                        }
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                      {imagePreviewMobile && (
                        <img
                          src={imagePreviewMobile}
                          alt="Banner Mobile"
                          className="mt-2 w-full h-auto"
                        />
                      )}
                    </div> */}

            {/* <div className="mb-4">
                      <label
                        htmlFor="fileInput2"
                        className="block text-sm font-medium text-gray-600"
                      >
                        File Input 2
                      </label>
                      <input
                        type="file"
                        id="bannerImageDesktop"
                        onChange={(e) =>
                          handleFileChange(e, "bannerImageDesktop")
                        }
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                      {imagePreviewDesktop && (
                        <img
                          src={imagePreviewDesktop}
                          alt="Banner Mobile"
                          className="mt-2 w-full h-auto"
                        />
                      )}
                    </div> */}

            {/* Submit button */}
            <div className="flex mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 mr-5  text-black border-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
            </div>
          </form>
        </>
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
                        onChange={(event) => handleSearch(event)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    className="bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    + Create Category
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto">
                {loading ? (
                  <p>
                    <LoadingSpinner />
                  </p>
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
                            Category
                          </th>
                          <th scope="col" className="p-4">
                            Cart Discount Name
                          </th>
                          <th scope="col" className="p-4">
                            PRIORITY
                          </th>

                          <th scope="col" className="p-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {!filteredData || filteredData.length === 0 ? (
                        <p>NO data Found</p>
                      ) : (
                        filteredData.map((item) => (
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
                              {/* <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="flex items-center mr-3">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${item.MobilebannerImage}`}
                                alt=""
                                className="h-8 w-auto mr-3"
                              />
                            </div>
                          </th> */}
                              {/* <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="flex items-center mr-3">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${item.DesktopbannerImage}`}
                                className="h-8 w-auto mr-3"
                              />
                            </div>
                          </th> */}
                              <td className="px-4 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.Name}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.CartDiscountName}
                                </span>
                              </td>
                              <td className="px-8 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.Priority}
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

export default Category;
