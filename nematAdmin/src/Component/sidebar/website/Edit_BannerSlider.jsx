import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../common/LoadingSpinner";

const Edit_BannerSlider = () => {

   const {_id} = useParams();
   const [showBannerData , setShowBannerData ] = useState()
   const [loading, setLoading] = useState(true);
   const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
   const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
   const [allCategoryData , setAllCategoryData ] = useState()
   const [AllSub_CategoryData , setAllSub_CategoryData] = useState([])

   const navigator = useNavigate();

   useEffect(() => {
      getBannerById();
   } , [])

   const getBannerById = async() => {
      try {

         let bannerData = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/homebannerslider/getbyId/${_id}`
         )

         let categoryData = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getall`
         )

         setShowBannerData(bannerData.data);
         setAllCategoryData(categoryData.data)
         setAllSub_CategoryData(bannerData.SubCategoryName)
         setLoading(false)
      } catch (error) {
         console.error(error)
         toast.error(error.data)
         setLoading(false)
      }
   }

   console.log("showBannerData ===>" , showBannerData)

   const bannerObjectSchema = yup.object({
      bannerImageDesktop: yup.string().required(),
      bannerImageMobile: yup.string().required(),
      heading: yup.string().min(2).required(),
      subHeading: yup.string().min(2).required(),
      desc: yup.string().min(2).required(),
      sub_CategoryId:yup.string().required()
   })

    const initialValues = loading ?
    {
         bannerImageDesktop : "",
         bannerImageMobile : "",
         heading : "",
         subHeading :"" ,
         desc :"",
         sub_CategoryId:"",
     }
     : {
         bannerImageDesktop :showBannerData?.DesktopbannerImage,
         bannerImageMobile : showBannerData?.MobilebannerImage,
         heading : showBannerData?.Heading,
         subHeading :showBannerData?.SubHeading,
         desc :showBannerData?.Desc,
         sub_CategoryId:showBannerData.SubcategoryId

     }

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

    onSubmit:async(values) => {

       console.log("Form submitted with values:", values);

      const formData = new FormData();
      formData.append("DesktopbannerImage", values.bannerImageDesktop);
      formData.append("MobilebannerImage", values.bannerImageMobile);
      formData.append("Heading", values.heading);
      formData.append("SubHeading", values.subHeading);
      formData.append("Desc", values.desc);
      formData.append("SubcategoryId" , values.sub_CategoryId)

   

      // const payload = {
      //   DTimage : values.bannerImageDesktop,
      //   MIimage : values.bannerImageMobile,
      //   categoryId : values.sub_CategoryId,
      // }

      // console.log("payload ===>" , payload)

      try {
        let response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL}/homebannerslider/updatebyId/${_id}`,
            formData
        );

        console.log(response.data)

        if (response.status === 200) {
          console.log("New Banner is  Created ");
          toast.success("Updated Successfully")
          getAllBannerData();
          setShowForm(true)
          
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

    }
  });


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

  const handlerChangefunction = async (category_ID) => {
    const _id = category_ID;

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
       <div className="overflow-x-hidden">
        <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Edit Banner Slider</h1>
      </div>
         <Toaster/>
      {loading ? (
        <p><LoadingSpinner/></p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="grid gap-4 mb-4 sm:grid-cols-2 mt-6">
            <div>
              <label
                htmlFor="heading"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="heading"
                id="heading"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                onChange={handleChange}
                value={values.heading}
                placeholder="Type product name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subHeading"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Title
              </label>
              <input
                type="text"
                name="subHeading"
                id="subHeading"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.subHeading}
                placeholder="Type product name"
                required
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
                  handlerChangefunction(event.target.value); // removed from here
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" >
                  Select Category
                </option>
                {allCategoryData?.map((category) => (
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
                Select Sub-Category
              </label>
              <select
                id="sub_CategoryId"
                key={values.sub_CategoryId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.sub_CategoryId}
              >
                {
                  AllSub_CategoryData == undefined ? <option value="">{showBannerData.SubCategoryName}</option>: <option value="">Select category</option>
                }
                {/* {console.log(AllSub_CategoryData)} */}
                
                {AllSub_CategoryData?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meta Description
              </label>
              <textarea
                id="desc"
                name="desc"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleChange}
                value={values.desc}
                placeholder="Write product description here"
                required
              ></textarea>
            </div>
         

          <div className="mb-4">
            <label
              htmlFor="fileInput1"
              className="block text-sm font-medium text-gray-600"
            >
              File Input 1
            </label>
            <input
              type="file"
              id="bannerImageMobile"
              onChange={(e) => handleFileChange(e, "bannerImageMobile")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            <div className="flex justify-center">
              {imagePreviewMobile ? (
                <img
                  src={imagePreviewMobile}
                  alt="Banner Mobile"
                  className="mt-2 w-[90%] h-[250px] object-contain"
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                    showBannerData?.MobilebannerImage
                  }`}
                  alt="Banner Mobile"
                  className="mt-2 w-[90%] h-[250px] object-contain"
                />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="fileInput2"
              className="block text-sm font-medium text-gray-600"
            >
              File Input 2
            </label>
            <input
              type="file"
              id="bannerImageDesktop"
              onChange={(e) => handleFileChange(e, "bannerImageDesktop")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            <div className="flex justify-center">
              {imagePreviewDesktop ? (
                <img
                  src={imagePreviewDesktop}
                  alt="Banner Desktop"
                  className="mt-2 w-[90%] h-[250px] object-contain"
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                    showBannerData?.DesktopbannerImage
                  }`}
                  alt="Banner Desktop"
                  className="mt-2 w-[90%] h-[250px] object-contain"
                />
              )}
            </div>
          </div>
           </div>
          <div className="w-full flex justify-end ">
            <button
              type="submit"
              className="px-10 mt-4 text-white bg-[#868686] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"
            >
              Submit
            </button>

            <button
              data-modal-toggle="createProductModal"
              type="button"
              onClick={()=> navigator("/dashboard/website/bannerSlider")}
              className="mt-4 border-2 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
            >
              Discard
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Edit_BannerSlider