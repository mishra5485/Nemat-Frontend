import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";

const EditSub_Category = () => {


   const { _id } = useParams();
   const [Sub_CategoryData , setSub_CategoryData] = useState();
   const [categorys , setcategory] = useState();
   const [QuantitySchemeIds , setQuantitySchemeId ] = useState();
   const [slabeData , setslabeData] = useState();

   const [loading, setLoading] = useState(true);
   const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
   const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const getCategoryID = async () => {

         try {

             let response = await axios.get(
             `${import.meta.env.VITE_REACT_APP_BASE_URL}/subcategory/getbyId/${_id}`
            )

            let cartdiscountschemerespose = await axios.get(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getall`
            )

            let QuantitySchemeIdResponse = await axios.get(
               `${import.meta.env.VITE_REACT_APP_BASE_URL}/quantityscheme/getall`
            )

         setSub_CategoryData(response.data)
         setcategory(cartdiscountschemerespose.data)   
         setQuantitySchemeId(QuantitySchemeIdResponse.data)
         setLoading(false);

         } catch (error) {
            console.log(error)
            setLoading(false);
         }
      }
      getCategoryID();
   } , [] )

   //  console.log(Sub_CategoryData)
   // console.log(categorys);
   // console.log(QuantitySchemeIds)
   

         const initialValues = loading
    ? {
        name: "",
        category:"",
        metaTitle: "",
        metaDesc: "",
        metaKeyword: "",
        slugUrl: "",
        ml:"",
        sgst:"",
        cgst:"",
        quantity:"",
        bannerImageMobile: "",
        bannerImageDesktop: "",
      }
    :{
        name: Sub_CategoryData?.Name,
        category:Sub_CategoryData?.Category,
        metaTitle:Sub_CategoryData.MetaTitle,
        metaDesc: Sub_CategoryData.MetaDesc,
        metaKeyword: Sub_CategoryData.MetaKeyWord,
        slugUrl: Sub_CategoryData.SlugUrl,
        ml:Sub_CategoryData.Ml,
        sgst:Sub_CategoryData.SGST,
        cgst:Sub_CategoryData.CGST,
        quantity:Sub_CategoryData.QuantitySchemeId,
        bannerImageMobile:null,
        bannerImageDesktop:null
      };


      // console.log(Sub_CategoryData)

  const categoryObjectSchema = yup.object({
  name: yup.string().min(2).nullable(),
  category:yup.string().min(2).nullable(),
  metaTitle: yup.string().min(2).nullable(),
  metaDesc: yup.string().min(2).nullable(),
  metaKeyword: yup.string().min(2).nullable(),
  slugUrl: yup.string().nullable(),
  sgst:yup.string().nullable(),
  cgst:yup.string().nullable(),
  quantity:yup.string().min(2).nullable(),
  bannerImageMobile: yup.string().nullable(),
  bannerImageDesktop: yup.string().nullable(),
});


      const {values , errors , handleChange, handleSubmit , touched, handleBlur , setFieldValue ,  resetForm,} = useFormik({
      initialValues,
      validationSchema:categoryObjectSchema,
      enableReinitialize: true,
      onSubmit:async(values , action) => {
         //  console.log('Submitting form:', values);
     
      const formData = new FormData();
      formData.append('Name', values.name);
      formData.append('Category' , values.category);
      formData.append('MetaTitle', values.metaTitle);
      formData.append('MetaDesc', values.metaDesc);
      formData.append('MetaKeyWord', values.metaKeyword);
      formData.append('SlugUrl', values.slugUrl);
      formData.append('Ml', values.ml);
      formData.append('SGST', values.sgst);
      formData.append('CGST', values.cgst);
      formData.append('QuantitySchemeId', values.quantity);
      // Check if imagePreviewMobile is not null before appending to FormData
         if (imagePreviewMobile !== null) {
         formData.append('MobilebannerImage', values.bannerImageMobile);
         }

         // Check if imagePreviewDesktop is not null before appending to FormData
         if (imagePreviewDesktop !== null) {
         formData.append('DesktopbannerImage', values.bannerImageDesktop);
         }

     


      try {
        
        let response  = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/subcategory/updatebyId/${_id}`,
            formData
        )

        console.log(response)

        if (response.status === 200) {
              console.log(" Category Updated ")
               navigate("/dashboard/sub_category")
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
      handleResetClick();
    }
  })



   const handleFileChange = (event, field) => {
        const file = event.target.files[0];

        setFieldValue(field, file); 

        if (file) {
         
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

         <div className="overflow-x-hidden">
         {
            loading ? (

               <p>Loading...</p>

            ) : (
               <form  onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
                           <div className="grid gap-4 mb-4 sm:grid-cols-2">
                              <div>
                                 <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                 <input type="text" 
                                 name="name" 
                                 id="name"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                                 onChange={handleChange}
                                 value={values.name} placeholder="Type product name" />
                              </div>
                               <div>
                                 <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                 <select
                                    id="category"
                                    key={values.category}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    
                                    onChange={handleChange}
                                    value={values.category} 
                                 >
                                    <option value="">Select category</option>
                                    {categorys?.map((category) => (
                                       <option key={category._id} value={category._id}>
                                             {category.Name}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                              <div>
                                 <label htmlFor="metaTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meta Title</label>
                                 <input type="text" name="metaTitle" id="metaTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                 onChange={handleChange}
                                 value={values.metaTitle} placeholder="Type product name" />
                              </div>
                              
                              <div>
                                 <label htmlFor="metaKeyword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meta Keyword</label>
                                 <input type="text" name="metaKeyword" id="metaKeyword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                 onChange={handleChange}
                                 value={values.metaKeyword} placeholder="Type product name" />
                              </div>
                              <div>
                                 <label htmlFor="slugUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug URL</label>
                                 <input type="text" name="slugUrl" id="slugUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                 onChange={handleChange}
                                 placeholder="Type product name" value={values.slugUrl} />
                              </div>
                               <div>
                                 <label htmlFor="ml" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ML</label>
                                 <input type="text" name="ml" id="ml" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                 onChange={handleChange}
                                 placeholder="Type product name" value={values.ml} />
                              </div>
                               <div>
                                 <label htmlFor="sgst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SGST </label>
                                 <input type="text" name="sgst" id="sgst" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                 onChange={handleChange}
                                 placeholder="Type product name" value={values.sgst} />
                              </div>
                               <div>
                                 <label htmlFor="cgst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CGST</label>
                                 <input type="text" name="cgst" id="cgst" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                 onChange={handleChange}
                                 placeholder="Type product name" value={values.cgst} />
                              </div>
                              <div>
                                 <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity Scheme </label>
                                 <select
                                    id="quantity"
                                    key={values.quantity}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    
                                    onChange={handleChange}
                                    value={values.quantity} 
                                 >
                                    <option value="">Select category</option>
                                    {QuantitySchemeIds?.map((QuantitySchemeId) => (
                                       <option key={QuantitySchemeId._id} value={QuantitySchemeId._id}>
                                             {QuantitySchemeId.Name}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                                       
                             
                              
                              
                              
                              <div className="sm:col-span-2"><label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meta Description</label><textarea id="metaDesc" name="metaDesc" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                             
                              onChange={handleChange}
                              value={values.metaDesc} placeholder="Write product description here"></textarea></div>
                           </div>
                           
                              
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
                                 <div className="flex justify-center">

                                   {imagePreviewMobile ? (
                                      <img
                                      src={imagePreviewMobile}
                                      alt="Banner Mobile"
                                      className="mt-2 w-[90%] h-[250px]"
                                      />
                                      ) : (
                                         <img
                                         src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${Sub_CategoryData?.MobilebannerImage}`}
                                         alt="Banner Mobile"
                                         className="mt-2 w-[90%] h-[250px]"
                                         />
                                         )}
                                    </div>
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
                              <div className="flex justify-center">

                                 {imagePreviewDesktop ? (
                                    <img
                                    src={imagePreviewDesktop}
                                    alt="Banner Desktop"
                                    className="mt-2 w-[90%] h-[250px]"
                                    />
                                    ) : (
                                       <img
                                       src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${Sub_CategoryData?.DesktopbannerImage}`}
                                       alt="Banner Desktop"
                                       className="mt-2 w-[90%] h-[250px]"
                                       />
                                       )}
                              </div>

                           </div>
                           <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                                 <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                    Submit
                                    </button>
                              
                              <button data-modal-toggle="createProductModal" type="button" className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 ">
                                 
                                 Discard
                              </button>
                           </div>
                     </form>
            )
         }
         
    </div>

  )
}

export default EditSub_Category