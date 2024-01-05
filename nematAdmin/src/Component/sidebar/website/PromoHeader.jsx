import axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

const PromoHeader = () => {
  const [promoHeader, setPromoHeader] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetechPromoHeader();
   
  }, []);

  const fetechPromoHeader = async () => {
    try {
      let responseHeader = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/promoheader/get`
      );

      setPromoHeader(responseHeader.data);
       setLoading(false)
    } catch (error) {
       setLoading(false)
      console.log(error);
    }
  };

  

  const promoObject = yup.object({
      promo:yup.string().min(3).required("Please Enter New Title")
  })

  const initialValues = loading
    ? {
        promo: "",
      }
    : {
        promo:promoHeader.Title,
      };


  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: promoObject,
    enableReinitialize: true,

    onSubmit:async(values) => {
      const _id = promoHeader?._id
      const payload = {
        Title: values.promo,
      };

     

      try {
        let response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/promoheader/update/${_id}`,
          payload
        );


        if (response.status === 200) {
          console.log("New Category Created ");
          toast.success("Updated Successfully")
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

 

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
          Promo Header
        </span>
      </h1>
      <Toaster/>
      {loading ? (
      <p>Loading...</p>
    ) : (
         
         <div
        className=" h-[350px] w-full "
        style={{
          boxShadow:
            "-10px -10px 15px rgba(255,255,255,0.5), 10px 10px 15px rgba(70,70,70,0.12)",
        }}
      >
        
   <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 mx-auto my-[5%]" 
       onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
   >
      <div className="flex w-full  flex-wrap -mx-3 mb-6">
         <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Promo Header</h2>
         <div className="w-full md:w-full px-3 mb-2 mt-2">
            <input className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
             name="promo" 
             id="promo"
             value={values.promo} 
            onChange={handleChange}
            
            />
           
         </div>
         <div className="w-full md:w-full flex items-start  px-3">
            
            <div className="-mr-1 mx-auto w-full  flex justify-center">
               <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Update Promo Here'
                  
               />
            </div>
         </div>
         </div>
      </form>
      </div>
    ) 
}
    </div>
      
  );
};

export default PromoHeader;
