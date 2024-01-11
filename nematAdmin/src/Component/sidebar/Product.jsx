import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [AllCategoryData, setAllCategoryData] = useState();
  const [AllSub_CategoryData, setAllSub_CategoryData] = useState();
  const [AllFragranceData, setAllFragranceData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChecked, setIsChecked] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [allProductData , setAllProductData] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    if(showModal){
      getAllData();
      // handlerChangefunction(values.CategoryId);
      getAllProductData()
    }
     
  }, [showModal ]);

  const getAllData = async () => {
    let allDataLoadedSuccessfully = true;

    try {
      const categoryResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getall`
      );

      if (categoryResponse.status === 200) {
        setAllCategoryData(categoryResponse.data);
      } else {
        allDataLoadedSuccessfully = false;
      }

      const fragranceResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/fragrances/getall`
      );
      if (fragranceResponse.status === 200) {
        setAllFragranceData(fragranceResponse.data);
      } else {
        allDataLoadedSuccessfully = false;
      }

      // Set loading state only if all data loaded successfully
      if (allDataLoadedSuccessfully) {
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
          toast.error(error.message);
        }
      }

      // Set loading state to false if there's an error
      setLoading(false);
    }
  };

  const getAllProductData = async () => {
    try {

      const FetchAllProductData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/product/getall`
      )

      if(FetchAllProductData.status === 200){
        setAllProductData(FetchAllProductData.data)
        setLoading(false)
      }

    } catch (error) {
      if (error.FetchAllProductData) {
          const { status, data } = error.FetchAllProductData;

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
            toast.error(error.message)
            setLoading(false)
          }
        }
    }
  }

  console.log(allProductData)

  const ProductObject = yup.object({
    productName: yup.string().min(2).required("Please Enter Product Name"),
    Description: yup
      .string()
      .min(2)
      .required("Please Enter Product Decription"),
    CategoryId: yup.string().min(2).required("Please Select Any Category "),
    sub_CategoryId: yup.string().min(2).required("Please Select Any Category "),
    FragranceId: yup
      .string()
      .min(2)
      .required("Please Select Any Fragrance Name"),
    AutheticStepFlag: yup
       .number()
    .oneOf([0, 1])
    .required("Select the checkbox value"),
    Price: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(1)
      .max(999999)
      .required("Enter the Zip Code"),
    metaTitle: yup.string().min(2).required("Enter Meta Title For Product "),
    metaDesc: yup.string().min(2).required("Emter Meta Desc for Product"),
    metaKeyword: yup.string().min(2).required("Enter Meta Keywords"),
    slugUrl: yup.string().min(2).required("Enter slugUrl"),
  });

  const initialValues = {
    productimg: null,
    productName: "",
    Description: "",
    CategoryId:"",
    sub_CategoryId: "",
    FragranceId: "",
    AutheticStepFlag: 0,
    Price: "",
    metaTitle: "",
    metaDesc: "",
    metaKeyword: "",
    slugUrl: "",
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
    validationSchema: ProductObject,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ProductImage", values.productimg);
      formData.append("Name", values.productName);
      formData.append("Description", values.Description);
      formData.append("CategoryId", values.CategoryId);
      formData.append("SubCategoryId", values.sub_CategoryId);
      formData.append("FragranceId", values.FragranceId);
      formData.append("AuthenticStepflag", values.AutheticStepFlag);
      formData.append("SlugUrl", values.slugUrl);
      formData.append("MetaTitle", values.metaTitle);
      formData.append("MetaDesc", values.metaDesc);
      formData.append("MetaKeyWord", values.metaKeyword);
      formData.append("Price", values.Price);

      // const payload = {
      //   ProductImage: values.productimg,
      //   Name: values.productName,
      //   Description: values.Description,
      //   CategoryId: values.CategoryId,
      //   SubCategoryId: values.sub_CategoryId,
      //   FragranceId: values.FragranceId,
      //   AuthenticStepflag: values.AutheticStepFlag,
      //   SlugUrl: values.slugUrl,
      //   MetaTitle: values.metaTitle,
      //   MetaDesc: values.metaDesc,
      //   MetaKeyWord: values.metaKeyword,
      //   Price: values.Price,
      // };

      // console.log("Payload => ", payload);

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/product/create`,
          formData
        );

        console.log(response);

        if (response.status === 200) {
          console.log("New Product Created ");
          toast.success("New Product Created");
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
            toast.error(error.message);
          }
        }
      }
    },
  });

  const handleFileChange = (e) => {
    const File = e.target.files[0];
    setSelectedImage(URL.createObjectURL(File));
    setFieldValue("productimg", File);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevValue) => (prevValue === 1 ? 0 : 1));
  setFieldValue("AutheticStepFlag", isChecked === 1 ? 0 : 1);
  };

  const handleForm = () => {};

  const editHandlerDir = (categoryId) => {
    navigate(`/dashboard/product/edit_product/${categoryId}`);
  };

  const handlerChangefunction = async (event) => {
  

  console.log("Selected _id:",event);

  const _id = event.target.value
  console.log("_id" , _id)
 
  try {
    const subCategoryResponse = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/product/getsubcategorybyId/${_id}`
    );

    console.log("Response:", subCategoryResponse);

    if (subCategoryResponse.status === 200) {
      setAllSub_CategoryData(subCategoryResponse.data);
    } else {
      console.error("Unexpected response status:", subCategoryResponse.status);
    }
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      const { status, data } = error.response;
      console.error(`Response error - Status: ${status}, Data:`, data);
    }
  }
};

  // console.log("AllSub_CategoryData Data on Change =>" , AllSub_CategoryData)

  return (
    <div className="text-center">
      <Toaster />
      <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
          Product Page
        </span>
      </h1>

      {
        showModal ? (
          // Form Createation div 
           <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="m-4 text-start">
          <label className="inline-block text-start mb-2 text-gray-500">
            Upload Image (jpg, png, svg, jpeg)
          </label>
          <div className="flex items-center justify-start w-full">
            <label className="flex flex-col w-[370px] h-[370px] border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 relative">
              <div className="flex h-full items-center justify-center">
                <input
                  type="file"
                  id="productimg"
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full h-full border rounded-md opacity-0 absolute inset-0"
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Product Image"
                    className="object-cover w-full h-full"
                  />
                )}
                {!selectedImage && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600 absolute"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </label>
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">
              Product name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={values.productName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cartDiscount"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Category deside
            </label>
            <select
              id="CategoryId"
              name="CategoryId"
              value={values.CategoryId}
               onChange={async (event) => {
                await handleChange(event);
                handlerChangefunction(event); // removed from here
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Category
              </option>
              {AllCategoryData?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.Name}
                </option>
              ))}
            </select>
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
              name="Description"
              value={values.Description}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sub_CategoryId"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Sub-Category
            </label>
            <select
              id="sub_CategoryId"
              name="sub_CategoryId"
              value={values.sub_CategoryId}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Category
              </option>
              {AllSub_CategoryData?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="FragranceId"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Fragrance
            </label>
            <select
              id="FragranceId"
              name="FragranceId"
              value={values.FragranceId}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Category
              </option>
              {AllFragranceData?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="Price"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price
            </label>
            <input
              type="text"
              id="Price"
              name="Price"
              value={values.Price}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
          </div>
          <br />

          {/* { Other Section  } */}
          <div className="flex items-start justify-start mb-6">
            <div className="flex items-start mb-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="whatappcheck"
                  checked={isChecked === 1}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 border mt-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                <span className="text-blue-600 text-2xl hover:underline dark:text-blue-500">
                  Authentic Step{" "}
                </span>
                .
              </label>
            </div>
          </div>

          <div className="md:col-span-2 mb-4">
            <h1 className="text-4xl text-start font-extrabold dark:text-white">
              Other Details
            </h1>
          </div>

          {/* Section 2 called Other Part */}

          <div>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Flowbite"
              required
            />
          </div>
          <div>
            <label
              htmlFor="metaTitle"
              className="block mb-2  text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Meta Title
            </label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={values.metaTitle}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="metaKeyword"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Meta KeyWord
            </label>
            <input
              type="text"
              id="metaKeyword"
              name="metaKeyword"
              value={values.metaKeyword}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="flowbite.com"
              required
            />
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
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
          </form>
        ) : (
          // Display All Data OF Product
          <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
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
                      id="simple-search"
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
                  onClick={() => setShowModal(true)}
                >
                  + Create Category
                </button>
              </div>
            </div>

            <div className="">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="overflow-x-auto">
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
                        <th scope="col" className="p-4">
                          Product Image{" "}
                        </th>
                        <th scope="col" className="p-4">
                          Product Name
                        </th>
                        <th scope="col" className="p-4">
                          Category
                        </th>
                        <th scope="col" className="p-4">
                          Sub Category
                        </th>
                        <th scope="col" className="p-4">
                          SlugUrl
                        </th>
                      </tr>
                    </thead>

                    {allProductData?.map((item) => (
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
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="flex items-center mr-3">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${item.ProductImage}`}
                                alt=""
                                className="h-8 w-auto mr-3"
                              />
                            </div>
                          </th>
                         
                          <td className="px-4 py-3">
                            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                              {item.Name}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.CategoryName}
                          </td>

                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.SubCategoryName}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.SlugUrl}
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
                                data-modal-target="delete-modal"
                                data-modal-toggle="delete-modal"
                                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
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
        )
      }



     
    </div>
  );
};

export default Product;
