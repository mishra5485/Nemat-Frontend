import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { categoryObjectSchema } from "../../FormValidations/data"
import { useFormik } from "formik";

const EditCategory = () => {
   
   const { _id } = useParams();
   const [categoryData , setCategoryData] = useState();
   const [slabeData , setslabeData] = useState();
   const [loading, setLoading] = useState(true);
   const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
 

   useEffect(() => {
      const getCategoryID = async () => {

         try {

             let response = await axios.get(
             `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getbyId/${_id}`
            )

            let cartdiscountschemerespose = await axios.get(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/cartdiscountscheme/getall`
            )


         setCategoryData(response.data)
         setslabeData(cartdiscountschemerespose.data)   
         setLoading(false);

         } catch (error) {
            console.log(error)
            setLoading(false);
         }
      }
      getCategoryID();
   } , [] )

  
   const initialValues = loading
    ? {
        name: "",
        metaTitle: "",
        metaDesc: "",
        metaKeyword: "",
        slugUrl: "",
        cartDiscount: "",
        bannerImageMobile: "",
        bannerImageDesktop: "",
      }
    : {
        name: categoryData.Name,
        metaTitle: categoryData.MetaTitle,
        metaDesc: categoryData?.MetaDesc,
        metaKeyword: categoryData?.MetaKeyWord,
        slugUrl: categoryData?.SlugUrl,
        cartDiscount: "",
        bannerImageMobile: categoryData?.Image,
        bannerImageDesktop: categoryData?.bannerImage,
      };




   const {values , errors , handleChange, handleSubmit , touched, handleBlur , setFieldValue ,  resetForm,} = useFormik({
      initialValues,
      validationSchema:categoryObjectSchema,


      
      onSubmit:async(values , action) => {
          console.log('Submitting form:', values);
     
      const formData = new FormData();
      formData.append('Name', values.name);
      formData.append('MetaTitle', values.metaTitle);
      formData.append('MetaDesc', values.metaDesc);
      formData.append('MetaKeyWord', values.metaKeyword);
      formData.append('SlugUrl', values.slugUrl);
      formData.append('image', values.bannerImageMobile);
      formData.append('bannerImage', values.bannerImageDesktop);
      formData.append('CartDiscountSlab', values.cartDiscount);

      const palyload = {
        Name:values.name,
        MetaTitle:values.metaTitle,
        MetaDesc:values.metaDesc,
        MetaKeyWord:values.metaKeyword,
        SlugUrl:values.slugUrl,
        image:values.bannerImageMobile,
        bannerImage:values.bannerImageDesktop,
        CartDiscountSlab:values.cartDiscount,
      }

      //  console.log(" htmlFormData image-> ",formData.image)
       console.log("PAyload " , palyload)

      try {
        
        let response  = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/updatebyId/${_id}`,
            formData
        )

        console.log(response)

        if (response.status === 200) {
              console.log(" Category Updated ")
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

//   console.log(categoryData?.Image)
   
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
                                 <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cart Discount Slab</label>
                                 <select
                                    id="cartDiscount"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    
                                    onChange={handleChange}
                                    value={values.cartDiscount} 
                                 >
                                    <option value="">Select category</option>
                                    {slabeData.map((slaboption) => (
                                       <option key={slaboption._id} value={slaboption._id}>
                                             {slaboption.Name}
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
                           <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 bg-blue-300">
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

export default EditCategory