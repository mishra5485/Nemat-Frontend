import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import getToken from "../../common/getToken";

const UpdateAboutRoadMap = ({ roadMapDataUpdate , aboutUsdata  , setUpdateData , setCallApiAfterUpdate}) => {
  const [roadmapImage, setRoadmapImage] = useState(null);

  const header =  getToken()

  const updateRoadMapObject = yup.object({
    roadMapheading: yup.string().required("Please Enter Road Map Heading"),
    roadmapyears: yup.string().required("Please Enter Road Map Year"),
    roadmapdesc: yup.string().required("Please Enter Road Map Heading"),
  });

  const initialValues = {
    roadMapheading: roadMapDataUpdate.Heading,
    roadmapyears: roadMapDataUpdate.Year,
    roadmapdesc: roadMapDataUpdate.Description,
    roadMapImage:roadMapDataUpdate.ImagePath,
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
    validationSchema: updateRoadMapObject,
    enableReinitialize: true,
    onSubmit: async (values) => {
      
      const formData = new FormData();
      formData.append("AboutUs_Id", aboutUsdata._id)
      formData.append("RoadMap_Id", roadMapDataUpdate._id)
      formData.append("Image", values.roadMapImage);
      formData.append("Heading", values.roadMapheading);
      formData.append("Year", values.roadmapyears);
      formData.append("Description", values.roadmapdesc);


      const payload = {
         aboutId : aboutUsdata._id,
         RoadMap_Id :  roadMapDataUpdate._id ,
         Image : values.roadMapImage,
         Heading: values.roadMapheading ,
         Year : values.roadmapyears ,
         Description : values.roadmapdesc
      }
      
      // console.log("Payload " , payload)

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/aboutus/UpdateAboutUsRoadMapData`,
          formData , 
          header
        );

        // console.log(response.data);

        if (response.status === 200) {
          toast.success(response.data);
          setUpdateData(false)
          setCallApiAfterUpdate(true)
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
    },
  });

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];

    setFieldValue(field, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "roadMapImage") {
          setRoadmapImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the preview if no file is selected
      field === "roadMapImage";
      setRoadmapImage(null);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md w-[600px] h-auto ">
        {/* Image Editor  */}
        <Toaster/>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="roadMapImage"
              className="block text-sm font-medium text-gray-600"
            >
              Mobile Banner Image
            </label>
            <input
              type="file"
              id="roadMapImage"
              onChange={(e) => handleFileChange(e, "roadMapImage")}
              className="mt-1 p-1 w-full border rounded-md"
            />
            <div className="flex justify-center">
              {roadmapImage ? (
                <img
                  src={roadmapImage}
                  alt="Banner Mobile"
                  className="mt-2 w-[90%] h-[200px] object-contain"
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                    roadMapDataUpdate?.ImagePath
                  }`}
                  alt="Banner Mobile"
                  className="mt-2 w-[90%] h-[200px] object-contain"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">
              Heading
            </label>
            <input
              type="text"
              id="roadMapheading"
              name="roadMapheading"
              value={values.roadMapheading}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter RoadMap Heading"
            />
          </div>
          <div>
            <label className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">
              Years
            </label>
            <input
              type="text"
              id="roadmapyears"
              name="roadmapyears"
              value={values?.roadmapyears}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Years description"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="roadmapdesc"
              className="block text-sm font-medium text-gray-600"
            >
              Road Map Description
            </label>
            <textarea
              id="roadmapdesc"
              name="roadmapdesc"
              value={values.roadmapdesc}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 p-2 w-full border rounded-md resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
           <button
            type="button"
            onClick={() => setUpdateData(false)}
            className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAboutRoadMap;
