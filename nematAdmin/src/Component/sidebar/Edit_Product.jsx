import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Edit_Product = () => {
  const { _id } = useParams();
  const [ProductData, setProductData] = useState();
  const [loading, setLoading] = useState(true);
  const [AllCategoryData, setAllCategoryData] = useState();
  const [AllSub_CategoryData, setAllSub_CategoryData] = useState();
  const [AllFragranceData, setAllFragranceData] = useState();
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);

  useEffect(() => {
    FetchProductDetailId();
  }, []);

  const FetchProductDetailId = async () => {
    try {
      const productResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/product/getbyId/${_id}`
      );

      if (productResponse.status === 200) {
        setProductData(productResponse.data);

        await requiredData();

        setLoading(false);
      }
    } catch (error) {
      if (error.productResponse) {
        const { status } = error.productResponse;

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
          setLoading(false);
        }
      }
    }
  };

  const requiredData = async () => {
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

      const subCategoryResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/subcategory/getall`
      );
      if (subCategoryResponse.status === 200) {
        setAllSub_CategoryData(subCategoryResponse.data);
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

  // console.log("Category => " , AllCategoryData)
  // console.log("AllSub_CategoryData => " , AllSub_CategoryData)
  // console.log("AllFragranceData => " , AllFragranceData)

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
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(1)
      .max(999999)
      .required("Enter the Zip Code"),
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

  const initialValues = loading
    ? {
        productimg: null,
        productName: "",
        Description: "",
        CategoryId: "",
        sub_CategoryId: "",
        FragranceId: "",
        AutheticStepFlag: "",
        Price: "",
        metaTitle: "",
        metaDesc: "",
        metaKeyword: "",
        slugUrl: "",
      }
    : {
        productimg: null,
        productName: ProductData.Name,
        Description: ProductData.Description,
        CategoryId: ProductData.CategoryId,
        sub_CategoryId: ProductData.SubCategoryId,
        FragranceId: ProductData.FragranceId,
        AutheticStepFlag: ProductData.AuthenticStepflag,
        Price: ProductData.Price,
        metaTitle: ProductData.MetaTitle,
        metaDesc: ProductData.MetaDesc,
        metaKeyword: ProductData?.metaKeyword,
        slugUrl: ProductData.SlugUrl,
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
    validationSchema:ProductObject
  });

  console.log("ProductData => ", ProductData);

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];

    setFieldValue(field, file); // Set the file in the form state

    if (file) {
      // Use FileReader to read the selected file and set the preview
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "bannerImageMobile") {
          setImagePreviewMobile(reader.result);
        } else if (field === "bannerImageDesktop") {
          setImagePreviewDesktop(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the preview if no file is selected
      if (field === "bannerImageMobile") {
        setImagePreviewMobile(null);
      } else if (field === "bannerImageDesktop") {
        setImagePreviewDesktop(null);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="grid   gap-4 mb-4 sm:grid-cols-2">
             <div className="mb-4">
            <label
              htmlFor="fileInput1"
              className="block text-sm font-medium text-gray-600"
            >
              Product Image
            </label>
            <input
              type="file"
              id="productimg"
              onChange={(e) => handleFileChange(e, "productimg")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            <div className="flex  justify-center">
              {imagePreviewMobile ? (
                <img
                  src={imagePreviewMobile}
                  alt="Banner Mobile"
                  className="mt-2 w-[90%] h-[250px]"
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                    ProductData?.ProductImage
                  }`}
                  alt="Banner Mobile"
                  className="mt-2 w-[90%] h-[250px]"
                />
              )}
            </div>
          </div>
          <br/>
            <div>
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                onChange={handleChange}
                value={values.productName}
                placeholder="Type product name"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Category
              </label>
              <select
                id="CategoryId"
                key={values.CategoryId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.CategoryId}
              >
                <option value="">Select category</option>
                {AllCategoryData?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>
             <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Product  Description
              </label>
              <textarea
                id="Description"
                name="Description"
                rows="3"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.Description}
                placeholder="Write product description here"
              ></textarea>
            </div>
             <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Sub-Category
              </label>
              <select
                id="CategoryId"
                key={values.CategoryId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.CategoryId}
              >
                <option value="">Select category</option>
                {AllSub_CategoryData?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>
             <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Fragrance 
              </label>
              <select
                id="CategoryId"
                key={values.CategoryId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.CategoryId}
              >
                <option value="">Select category</option>
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="text"
                name="Price"
                id="Price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.Price}
                placeholder="Type product name"
              />
            </div>
            <br/>

             <div className="flex items-start justify-start mb-6">
            <div className="flex items-start mb-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="whatappcheck"
                  // checked={isChecked === 1}
                  // onChange={handleCheckboxChange}
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
          <br/>
                  
            <div>
              <label
                htmlFor="slugUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Slug URL
              </label>
              <input
                type="text"
                name="slugUrl"
                id="slugUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                placeholder="Type product name"
                value={values.slugUrl}
              />
            </div>
            <div>
              <label
                htmlFor="metaTitle"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Title
              </label>
              <input
                type="metaTitle"
                name="metaTitle"
                id="metaTitle"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                placeholder="Type product name"
                value={values.metaTitle}
              />
            </div>
            <div>
              <label
                htmlFor="metaKeyword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta KeyWord{" "}
              </label>
              <input
                type="text"
                name="metaKeyword"
                id="metaKeyword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                placeholder="Type product name"
                value={values.metaKeyword}
              />
            </div>
  

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta  Description
              </label>
              <textarea
                id="metaDesc"
                name="metaDesc"
                rows="3"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.metaDesc}
                placeholder="Write product description here"
              ></textarea>
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
              data-modal-toggle="createProductModal"
              type="button"
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
            >
              Discard
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Edit_Product;
