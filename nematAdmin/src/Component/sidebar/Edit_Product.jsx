import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Edit_Product = () => {
  const { _id } = useParams();
  const [ProductData, setProductData] = useState();
  const [loading, setLoading] = useState(true);
  const [AllCategoryData, setAllCategoryData] = useState();
  const [AllSub_CategoryData, setAllSub_CategoryData] = useState();
  // const [AllFragranceData, setAllFragranceData] = useState();
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [allImageFile, setAllImageFile] = useState([]);
  const [newImage , setNewImage] = useState(false)
  // const [isChecked, setIsChecked] = useState();

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
        await handlerChangefunction(productResponse.data.CategoryId)
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

      // const fragranceResponse = await axios.get(
      //   `${import.meta.env.VITE_REACT_APP_BASE_URL}/fragrances/getall`
      // );
      // if (fragranceResponse.status === 200) {
      //   setAllFragranceData(fragranceResponse.data);
      // } else {
      //   allDataLoadedSuccessfully = false;
      // }

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
          toast.error(error.data);
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
    // FragranceId: yup
    //   .string()
    //   .min(2)
    //   .required("Please Select Any Fragrance Name"),
    // AutheticStepFlag: yup
    //   .number()
    //   .typeError("Please enter a valid number")
    //   .integer("Please enter a valid number")
    //   .min(1)
    //   .max(999999)
    //   .required("Enter the Zip Code"),
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
        // FragranceId: "",
        // AutheticStepFlag: 0,
        Price: "",
        metaTitle: "",
        metaDesc: "",
        metaKeyword: "",
        slugUrl: "",
      }
    : {
        productimg: ProductData.ProductOtherImage,
        productName: ProductData.Name,
        Description: ProductData.Description,
        CategoryId: ProductData.CategoryId,
        sub_CategoryId: ProductData.SubCategoryId,
        // FragranceId: ProductData.FragranceId,
        // AutheticStepFlag: ProductData.AuthenticStepflag,
        Price: ProductData.Price,
        metaTitle: ProductData.MetaTitle,
        metaDesc: ProductData.MetaDesc,
        metaKeyword: ProductData.MetaKeyWord,
        slugUrl: ProductData.SlugUrl,
      };


    let ProductName = ProductData?.Name

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
    validationSchema:ProductObject,
    enableReinitialize: true,

    onSubmit:async (values ) => {

      console.log("I am inside Sumbit Page ")

      const formData = new FormData();
      [...allImageFile].forEach((image) => {
        formData.append("ProductOtherImage", image);
      });
      formData.append("Name", values.productName);
      formData.append("Description", values.Description);
      formData.append("CategoryId", values.CategoryId);
      formData.append("SubCategoryId", values.sub_CategoryId);
      // const selectedFragranceValues = selectedFragrance.map(item => ({ value: item._id }));
      // formData.append("Fragrances", JSON.stringify(selectedFragranceValues));
      // formData.append("AuthenticStepflag", values.AutheticStepFlag);
      formData.append("SlugUrl", values.slugUrl);
      formData.append("MetaTitle", values.metaTitle);
      formData.append("MetaDesc", values.metaDesc);
      formData.append("MetaKeyWord", values.metaKeyword);
      formData.append("Price", values.Price);


      if (values.productName === ProductName) {
      formData.delete("Name", values.name);
      }

      const payload = {
        CategoryId: values.CategoryId,
        SubCategoryId : values.sub_CategoryId
      }

      console.log("payload" ,  payload)

       try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/product/updatebyId/${_id}`,
          formData
        );

        console.log(response);

        if (response.status === 200) {
          console.log("New Product Created ");
          toast.success(response.data);
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

    }
  });

  console.log("ProductData => ", ProductData);

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

  // const handleCheckboxChange = () => {
  //   setIsChecked((prevValue) => (prevValue === 1 ? 0 : 1));
  //   setFieldValue("AutheticStepFlag", isChecked === 1 ? 0 : 1);
  // };

 const handleFileChange = (e, fieldName) => {
  const newImage = e.target.files;

  // Update form values with the new image
  setFieldValue(fieldName, [newImage]);

  // For display update new Images 
  setNewImage(true)
  setFieldValue("productimg", []);
  setAllImageFile(newImage)
  console.log("newImage =====>" , newImage)
};

console.log("allImageFile ===>", allImageFile)

// const handleDeleteImage = (index) => {
//   const updatedImages = values.productimg.filter((_, i) => i !== index);
//   setFieldValue("productimg", updatedImages);
// };

  const handlerChangefunction = async (category_ID ) => {
    const _id = category_ID

    // console.log(category_ID === undefined);
    // const _id = category_ID === undefined ? event.target.value  : category_ID;
    
    console.log("_id =>", _id);

   

    try {
      const subCategoryResponse = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/product/getsubcategorybyId/${_id}`
      );

      console.log("Response:", subCategoryResponse);

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

  return (
    <div>
      <Toaster/>
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
              multiple
            />
            <div className="flex  justify-center">

              {newImage ? (
                  <div>
      {/* Display new images here */}
              {Array.from(allImageFile).map((file, index) => (
  <div key={index}>
    <img
      src={URL.createObjectURL(file)}
      alt={`New Image ${index}`}
      className="mt-2 w-[90%] h-[250px]"
    />
  </div>
))}
            </div>
              ) : (
            <div>
              {ProductData.ProductOtherImage &&
                ProductData.ProductOtherImage.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${image.OtherImagesName}`}
                      alt={`Product Image ${index}`}
                      className="mt-2 w-[90%] h-[250px]"
                    />
                    {/* You can include delete or other actions if needed */}
                  </div>
                ))}
                  </div>
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
                required
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
                onChange={async (event) => {
                  await handleChange(event);
                  handlerChangefunction(event.target.value); 
                }}
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
                required
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
                id="sub_CategoryId"
                key={values.sub_CategoryId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.sub_CategoryId}
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
                required
              />
            </div>
                  
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
                required
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
                required
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
                required
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
                required
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
