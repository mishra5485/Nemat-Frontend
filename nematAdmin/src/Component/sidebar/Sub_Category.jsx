import { useFormik } from "formik";
import * as yup from "yup";
import { useState , useEffect  } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const Sub_Category = () => {


  const [showModal, setShowModal] = useState(false)


  
  const [loading, setLoading] = useState(true); 
  const [categoryData  , setcategoryData] = useState();
  const [showform , setShowForm] = useState()
  const [quantityData , setQuantityData] = useState();
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
  const navigate  = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/subcategory/getall`
      );

      const quantityResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/quantityscheme/getall`
      );

      setQuantityData(quantityResponse.data)
      setcategoryData(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


  console.log(categoryData)


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

      const handleForm = () => {

      }

      const editHandlerDir = (categoryId) => {
        setShowForm(categoryId)
        navigate(`/dashboard/sub_category/sub_edit/${categoryId}`);
      }

  return (
    <div className='text-center'>
      
      
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
       

       <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
            <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    
                    <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                       
                                    </div>
                                    <input type="text" id="simple-search" placeholder="Search for products" required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                          <button
                              className="bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(true)}
                            >
                              +  Create Slider 
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
                                            <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="p-4">Mobile Image </th>
                                    <th scope="col" className="p-4">Desktop Image</th>
                                    <th scope="col" className="p-4">Name</th>
                                    <th scope="col" className="p-4">Ml</th>
                                    <th scope="col" className="p-4">SGST </th>
                                    <th scope="col" className="p-4">CGST </th>
                                    
                                </tr>
                            </thead>
                            
                            {
                                categoryData?.map((item) => (
                                     <tbody key={item._id}>
                                <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-4 w-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" onClick={handleForm} className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center mr-3">
                                            <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${item.MobilebannerImage}`} alt="" className="h-8 w-auto mr-3"/>
                                            
                                        </div>
                                    </th>
                                     <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center mr-3">
                                            <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${item.DesktopbannerImage}`} className="h-8 w-auto mr-3"/>
                                        </div>
                                    </th>
                                    <td className="px-4 py-3">
                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{item.Name}</span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.Ml}</td>
                                     <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.SGST}</td>
                                    
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.CGST}</td>
                       
                                    
                                   
                                    
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center space-x-4">
                                            <button type="button" 

                                            onClick={() => editHandlerDir(item._id)}
                                  
                                            className="py-2 px-3 flex items-center text-sm font-medium text-center text-black bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                
                                                Edit
                                            </button>
                                            <button type="button" data-drawer-target="drawer-read-product-advanced" data-drawer-show="drawer-read-product-advanced" aria-controls="drawer-read-product-advanced" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                               
                                                Preview
                                            </button>
                                            <button type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                               
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                               
                              
                            </tbody>
                                ))
                            }
                           
                        </table>
                    </div>
                          
                        )}
                    </div>


                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                        
                        <ul className="inline-flex items-stretch -space-x-px">
                            <li>
                                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>

      </div>
  )
}

export default Sub_Category