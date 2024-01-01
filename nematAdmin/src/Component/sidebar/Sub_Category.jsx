import { useFormik } from "formik";
import * as yup from "yup";
import { useState , useEffect  } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Sub_Category = () => {


  const [showModal, setShowModal] = useState(false)


   
   
  const [categoryData  , setcategoryData] = useState();
  const [quantityData , setQuantityData] = useState();
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getall`
      );

      const quantityResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/quantityscheme/getall`
      );

      setQuantityData(quantityResponse.data)
      setcategoryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  // console.log("setcategoryData -> " , categoryData)
  //  console.log("quantityData -> " , quantityData)

  const categoryObjectSchema = yup.object({
      name:yup.string().min(2).required("Enter Category Name"),
      category:yup.string().required("Please Select Any Category"),
      metaTitle:yup.string().min(2).required("Enter Meta Title For Category"),
      metaDesc:yup.string().min(2).required("Emter Meta Desc for Category"),
      metaKeyword:yup.string().min(2).required("Enter Meta Keywords"),
      slugUrl:yup.string().min(2).required("Enter slugUrl"),
      quantity:yup.string().required("Please Select Any One"),
      sub_category_ML:yup.string().required("Please Enter sub_category_ML"),
      sub_category_SGST:yup.string().required("Please Enter SGST "),
      sub_category_CGST:yup.string().required("Please Enter CGST"),
      bannerImageMobile:yup.string().required("Select the Picture "),
      bannerImageDesktop:yup.string().required("Select the Picture ")
  })

  const initialValues = {
    name:"",
    category:"",
    metaTitle:"",
    metaDesc:"",
    metaKeyword:"",
    slugUrl:"",
    quantity:"",
    sub_category_ML:"",
    sub_category_SGST:"",
    sub_category_CGST:"",
    bannerImageMobile: null,
    bannerImageDesktop: null,

  }

   const {values , errors , handleChange, handleSubmit , touched, handleBlur , setFieldValue ,  resetForm,} = useFormik({
    initialValues,
    validationSchema:categoryObjectSchema,
    onSubmit:async(values , action) => {


      const formData = new FormData();
      formData.append('Name', values.name);
      formData.append('Category' , values.category);
      formData.append('MetaTitle', values.metaTitle);
      formData.append('MetaDesc', values.metaDesc);
      formData.append('MetaKeyWord', values.metaKeyword);
      formData.append('SlugUrl', values.slugUrl);
      formData.append('QuantitySchemeId' , values.quantity);
      formData.append('Ml' , values.sub_category_ML);
      formData.append('SGST' , values.sub_category_SGST)
      formData.append('CGST' , values.sub_category_CGST)
      formData.append('image', values.bannerImageMobile);
      formData.append('bannerImage', values.bannerImageDesktop);
    

      const payload = {
        Name: values.name , 
        Category: values.category,
        MetaTitle:values.metaTitle,
        MetaDes: values.metaDesc,
        MetaKeyWor: values.metaKeyword,
        SlugUrl:values.slugUrl,
        QuantitySchemeId: values.quantity,
        Ml: values.sub_category_ML,
        SGST: values.sub_category_SGST,
        CGST:values.sub_category_CGST,
        image:values.bannerImageMobile,
        bannerImage:values.bannerImageDesktop,
      }


    
        console.log("Payload -> ", payload)
      //  console.log(" formData image-> ",formData)
     

      try {
        
        let response  = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/subcategory/create`,
            formData
        )

        console.log(response)

        if (response.status === 200) {
              console.log("New Category Created ")
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
              }
            }

      }
      // handleResetClick();
    }
  })


    const handleFileChange = (event, field) => {
        const file = event.target.files[0];

        setFieldValue(field, file); // Set the file in the form state

        if (file) {
          // Use FileReader to read the selected file and set the preview
          const reader = new FileReader();
          reader.onloadend = () => {
            if (field === 'bannerImageMobile') {
              setImagePreviewMobile(reader.result);
            } else if (field === 'bannerImageDesktop') {
              setImagePreviewDesktop(reader.result);
            }
          };
          reader.readAsDataURL(file);
        } else {
          // Reset the preview if no file is selected
          if (field === 'bannerImageMobile') {
            setImagePreviewMobile(null);
          } else if (field === 'bannerImageDesktop') {
            setImagePreviewDesktop(null);
          }
        }
      };

  return (
    <div className='text-center'>
      
           <button
        className="bg-black text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create  Sub-Category
      </button>

      
        {showModal ? (
        <>
          <div
            className=" overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                     <div className="  z-50 outline-none focus:outline-none">
                        <form className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md"
                          onSubmit={handleSubmit}
                        >
                {/* Input fields */}
                            <div className="mb-4">
                              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>

                             <div className="mb-4">
                              <label htmlFor="cartDiscount" className="block text-sm font-medium text-gray-600">
                                Category deside
                              </label>
                              <select
                                id="category"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              >
                                <option value="" disabled>Select Category</option>
                                {categoryData.map((category) => (
                                   <option key={category._id} value={category._id}>{category.Name}</option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-4">
                              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-600">
                                Meta Title
                              </label>
                              <input
                                type="text"
                                id="metaTitle"
                                name="metaTitle"
                                value={values.metaTitle}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>

                            <div className="mb-4">
                              <label htmlFor="metaDesc" className="block text-sm font-medium text-gray-600">
                                Meta Description
                              </label>
                              <textarea
                                id="metaDesc"
                                name="metaDesc"
                                value={values.metaDesc}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md resize-none"
                              />
                            </div>

                            <div className="mb-4">
                              <label htmlFor="metaKeyword" className="block text-sm font-medium text-gray-600">
                                Meta Keyword
                              </label>
                              <input
                                type="text"
                                id="metaKeyword"
                                onChange={handleChange}
                                value={values.metaKeyword}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>

                            <div className="mb-4">
                              <label htmlFor="slugUrl" className="block text-sm font-medium text-gray-600">
                                Slug URL
                              </label>
                              <input
                                type="text"
                                id="slugUrl"
                                name="slugUrl"
                                value={values.slugUrl}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>

                             <div className="mb-4">
                              <label htmlFor="cartDiscount" className="block text-sm font-medium text-gray-600">
                                Quantity Schemeld 
                              </label>
                              <select
                                id="quantity"
                                name="quantity"
                                value={values.quantity}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              >
                                <option value="" disabled>Select Quantity Schemeld </option>
                                {quantityData.map((quantity) => (
                                   <option key={quantity._id} value={quantity._id}>{quantity.Name}</option>
                                ))}
                              </select>
                            </div>

                             <div className="mb-4">
                              <label htmlFor="slugUrl" className="block text-sm font-medium text-gray-600">
                                ML
                              </label>
                              <input
                                type="text"
                                id="sub_category_ML"
                                name="sub_category_ML"
                                value={values.sub_category_ML}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>

                             <div className="mb-4">
                              <label htmlFor="slugUrl" className="block text-sm font-medium text-gray-600">
                                SGST
                              </label>
                              <input
                                type="text"
                                id="sub_category_SGST"
                                name="sub_category_SGST"
                                value={values.sub_category_SGST}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>

                             <div className="mb-4">
                              <label htmlFor="slugUrl" className="block text-sm font-medium text-gray-600">
                                CGST
                              </label>
                              <input
                                type="text"
                                id="sub_category_CGST"
                                name="sub_category_CGST"
                                value={values.sub_category_CGST}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>

                           

                {/* File inputs */}
                <div className="mb-4">
                  <label htmlFor="fileInput1" className="block text-sm font-medium text-gray-600">
                    File Input 1
                  </label>
                  <input
                    type="file"
                     id="bannerImageMobile"
                     onChange={(e) => handleFileChange(e, 'bannerImageMobile')}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {imagePreviewMobile && (
                      <img
                        src={imagePreviewMobile}
                        alt="Banner Mobile"
                        className="mt-2 w-full h-auto"
                      />
                    )}
                </div>

                <div className="mb-4">
                  <label htmlFor="fileInput2" className="block text-sm font-medium text-gray-600">
                    File Input 2
                  </label>
                  <input
                    type="file"
                    id="bannerImageDesktop"   
                    onChange={(e) => handleFileChange(e, 'bannerImageDesktop')}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {imagePreviewDesktop && (
                      <img
                        src={imagePreviewDesktop}
                        alt="Banner Mobile"
                        className="mt-2 w-full h-auto"
                      />
                    )}
                </div>

                {/* Submit button */}
                  <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>

                 </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
       

      </div>
  )
}

export default Sub_Category