import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getToken from "../../common/getToken";

const BannerSlider = () => {
  const [loading, setLoading] = useState(true);
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
  const [allBannerData, setAllBannerData] = useState();
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [AllSub_CategoryData, setAllSub_CategoryData] = useState();
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate();

  const header = getToken()

  useEffect(() => {
    getAllBannerData();
    if (!showForm) {
      getAllCategoryData();
    }
  }, [showForm]);

  const getAllBannerData = async () => {
    try {
      let allDataResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/homebannerslider/getall` , header
      );

      if (allDataResponse.status === 200) {
        setAllBannerData(allDataResponse.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to load Data");
      setAllBannerData();
      setLoading(false);
    }
  };

  const getAllCategoryData = async () => {
    try {
      let allDataResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getall`,header
      );

      if (allDataResponse.status === 200) {
        setAllCategoryData(allDataResponse.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data);
      setLoading(false);
    }
  };

  // console.log("allCategoryData =====>", allCategoryData);

  const bannerObjectSchema = yup.object({
    desktopbannerImage: yup.string().required(),
    mobilebannerImage: yup.string().required(),
    heading: yup.string().min(2).required(),
    subHeading: yup.string().min(2).required(),
    desc: yup.string().min(2).required(),
    CategoryId: yup.string().required(),
    sub_CategoryId: yup.string().required(),
  });

  const initialValues = {
    desktopbannerImage: "",
    mobilebannerImage: "",
    heading: "",
    subHeading: "",
    desc: "",
    CategoryId: "",
    sub_CategoryId: "",
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: bannerObjectSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      // console.log("Form submitted with values:", values);

      const formData = new FormData();
      formData.append("DesktopbannerImage", values.desktopbannerImage);
      formData.append("MobilebannerImage", values.mobilebannerImage);
      formData.append("Heading", values.heading);
      formData.append("SubHeading", values.subHeading);
      formData.append("Desc", values.desc);
      formData.append("SubcategoryId", values.sub_CategoryId);

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/homebannerslider/create`,
          formData , 
          header
        );

        // console.log(response.data);

        if (response.status === 200) {
          // console.log("New Banner is  Created ");
          toast.success("Updated Successfully");
          getAllBannerData();
          setShowForm(true);
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (
            status === 404 ||
            // status === 403 ||
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

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];

    setFieldValue(field, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "mobilebannerImage") {
          setImagePreviewMobile(reader.result);
        } else if (field === "desktopbannerImage") {
          setImagePreviewDesktop(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the preview if no file is selected
      if (field === "mobilebannerImage") {
        setImagePreviewMobile(null);
      } else if (field === "desktopbannerImage") {
        setImagePreviewDesktop(null);
      }
    }
  };


  const editHandlerDir = (categoryId) => {
    navigate(`/dashboard/website/bannerSlider/edit_bannerslider/${categoryId}`);
  };

  const deleteHandler = async (BannerId) => {
    try {
      let deleteBanner = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/homebannerslider/deletebyId/${BannerId}` , header
      );

      if (deleteBanner.status === 200) {
        toast.success(deleteBanner.data);
        getAllBannerData();
      }

      // console.log("Data Deleted ");
    } catch (error) {
      console.log(error);
      toast.error(error.data);
    }
  };

  const handlerChangefunction = async (event) => {
    // console.log("Selected _id:", event);

    const _id = event.target.value;
    // console.log("_id", _id);

    try {
      const subCategoryResponse = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/product/getsubcategorybyId/${_id}` , header
      );

      // console.log("Response:", subCategoryResponse);

      if (subCategoryResponse.status === 200) {
        setAllSub_CategoryData(subCategoryResponse.data);
      } else {
        console.error(
          "Unexpected response status:",
          subCategoryResponse.status
        );
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status, data } = error.response;
        console.error(`Response error - Status: ${status}, Data:`, data);
      }
    }
  };

  // console.log("AllSub_CategoryData ==== >", AllSub_CategoryData);

  return (
    <div>
      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Banner Slider</h1>
      </div>

      {showForm ? (
        <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2">
                  {/* <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder="Search Banner Name"
                        required=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form> */}
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    className="bg-[#868686]  text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowForm(false)}
                  >
                    + Create New Banner
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
                            Mobile  Banner{" "}
                          </th>
                          <th scope="col" className="p-4">
                            Desktop  Banner
                          </th>
                          <th scope="col" className="p-4">
                            Banner Heading
                          </th>
                          <th scope="col" className="p-4">
                            Banner Sub-Heading
                          </th>
                          <th scope="col" className="p-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {allBannerData?.map((item) => (
                        <tbody key={item._id}>
                          <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                           
                            <th
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
                            </th>
                            <th
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
                            </th>

                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item.Heading}
                            </td>

                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item.SubHeading}
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
                                  onClick={() => deleteHandler(item._id)}
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
            </div>
          </div>
        </section>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2 mt-6">
            <div className="">
              <label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                Heading
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    name="heading"
                    id="heading"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={values.heading}
                    onChange={handleChange}
                    placeholder="Sample Heading"
                  />
                </div>
              </div>
            </div>

            <div className="">
              <label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                SubHeading
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    name="subHeading"
                    id="subHeading"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={values.subHeading}
                    onChange={handleChange}
                    placeholder="Sample subHeading"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="cartDiscount"
                className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
              >
               Select Category 
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
                <option value="">Select Category</option>
                {allCategoryData?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.Name}
                  </option>
                ))}
              </select>
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

            <div className="col-span-full ">
              <label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                Description{" "}
              </label>
              <div className="mt-2">
                <textarea
                  id="desc"
                  name="desc"
                  rows="2"
                  value={values.desc}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="mb-4 ">
              <label
                htmlFor="fileInput1"
                className="block text-sm font-medium text-gray-600"
              >
                Select For Mobile View Banner
              </label>
              <input
                type="file"
                id="mobilebannerImage"
                onChange={(e) => handleFileChange(e, "mobilebannerImage")}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {imagePreviewMobile && (
                <img
                  src={imagePreviewMobile}
                  alt="Banner Mobile"
                  className="mt-2 w-[300px] h-[300px] object-contain"
                />
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="fileInput1"
                className="block text-sm font-medium text-gray-600"
              >
                Select For Desktop View Banner
              </label>
              <input
                type="file"
                id="desktopbannerImage"
                onChange={(e) => handleFileChange(e, "desktopbannerImage")}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {imagePreviewDesktop && (
                <img
                  src={imagePreviewDesktop}
                  alt="Banner Mobile"
                  className="mt-2 w-[300px] h-[300px] object-contain"
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-end ">
            <button
              type="submit"
              className="px-10 mt-4 text-white bg-[#868686] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-4 border-2 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
            >
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BannerSlider;
