import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import UpdateAboutRoadMap from "./UpdateAboutRoadMap";
import getToken from "../../common/getToken";

const AboutUs = () => {
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
  const [aboutUsdata, setAboutUsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(false);
  const [allImageFile, setAllImageFile] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [roadMapDataUpdate, setRoadMapDataUpdate] = useState();
  const [callApiAfterUpdate , setCallApiAfterUpdate] = useState(true)



  const header = getToken()

  useEffect(() => {
    if(callApiAfterUpdate){
      AboutUsData();
    }
  }, [callApiAfterUpdate]);

  let _id = "";

  const AboutUsData = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/aboutus/getData`,header
      );

      // console.log(response.data);
      setAboutUsData(response.data);
      _id = response.data._id;
      setLoading(false);
      setCallApiAfterUpdate(false)
    } catch (error) {
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
        setLoading(false);
        setCallApiAfterUpdate(false)
      }
    }
  };

  const AboutUsObject = yup.object({
    bannerImageDesktop: yup.string().required(),
    bannerImageMobile: yup.string().required(),
  });

  const initialValues = loading
    ? {
        bannerImageDesktop: "",
        bannerImageMobile: "",
        bannerHeading: "",
        Bannerdesc: "",
        familyheading: "",
        familydesc: "",
      }
    : {
        bannerHeading: aboutUsdata.BannerHeading,
        Bannerdesc: aboutUsdata.BannerDescription,
        familydesc: aboutUsdata.FamilyDetails_Description,
        familyheading: aboutUsdata.FamilyDetails_Heading,
        bannerImageMobile: aboutUsdata.MobileBannerImagePath,
        bannerImageDesktop: aboutUsdata.DesktopBannerImagePath,
        familyImage: aboutUsdata.FamilyDetails_Images,
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
    validationSchema: AboutUsObject,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      console.log("Submitt button here");

      const formData = new FormData();
      formData.append("BannerHeading", values.bannerHeading);
      formData.append("BannerDescription", values.Bannerdesc);
      formData.append("FamilyDetails_Heading", values.familyheading);
      formData.append("FamilyDetails_Description", values.familydesc);
      formData.append("MobileBannerImage", values.bannerImageMobile);
      formData.append("DesktopBannerImage", values.bannerImageDesktop);
      [...allImageFile].forEach((image) => {
        formData.append("FamilyDetails_Images", image);
      });

      // const payload = {
      //   // Name: values.name,
      //   // Category: values.category,
      //   // MetaTitle: values.metaTitle,
      //   // MetaDes: values.metaDesc,
      //   // MetaKeyWor: values.metaKeyword,
      //   // SlugUrl: values.slugUrl,
      //   // QuantitySchemeId: values.quantity,
      //   // Ml: values.sub_category_ML,
      //   // SGST: values.sub_category_SGST,
      //   // CGST: values.sub_category_CGST,
      //   // packSize:values.packSizes,
      //   // image: values.bannerImageMobile,
      //   // bannerImage: values.bannerImageDesktop,
      // };

      // console.log("Payload -> ", payload);
      // console.log(" formData image-> ", formData);

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/aboutus/updatebyId/${
            aboutUsdata._id
          }`,
          formData
        );

        // console.log(response);

        if (response.status === 200) {
          toast.success(response.data);
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

  const handleFileForFamilyImages = (e, fieldName) => {
    const newImage = e.target.files;

    // Update form values with the new image
    setFieldValue(fieldName, [newImage]);

    // For display update new Images
    setNewImage(true);
    setFieldValue("familyImage", []);
    setAllImageFile(newImage);
    // console.log("newImage =====>", newImage);
  };

  const handleUpdate = (data) => {
    // console.log("Data For Update ", data);
    setRoadMapDataUpdate(data);
    setUpdateData(true);
  };

  return (
    <div>
      <div className="mt-4 mb-6 font-bold text-4xl text-start pb-6 border-b-2 border-black">

          <h1>About us Page</h1>
        </div>
      <Toaster />
      <div>
        {loading ? (
          <p>Loaddding....</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <div className="">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="mb-2">
                <label
                  htmlFor="bannerHeading"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  BannerHeading
                </label>
                <input
                  type="text"
                  id="bannerHeading"
                  value={values.bannerHeading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.bannerHeading && touched.bannerHeading ? (
                  <p className="font-Marcellus text-start text-red-900">
                    {errors.bannerHeading}
                  </p>
                ) : null}
              </div>

              <div className="md:col-span-2 mb-4">
                <label
                  htmlFor="Bannerdesc"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Banner Description
                </label>
                <textarea
                  id="Bannerdesc"
                  name="Bannerdesc"
                  value={values.Bannerdesc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.Bannerdesc && touched.Bannerdesc ? (
                  <p className="font-Marcellus text-start text-red-900">
                    {errors.Bannerdesc}
                  </p>
                ) : null}
              </div>

              {/* Banner Images section */}
              <div className="mb-4">
                <label
                  htmlFor="fileInput1"
                  className="block text-sm font-medium text-gray-600"
                >
                  Mobile Banner Image
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
                      className="mt-2 w-[90%] h-[350px] object-contain"
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                        aboutUsdata?.MobileBannerImagePath
                      }`}
                      alt="Banner Mobile"
                      className="mt-2 w-[90%] h-[350px] object-contain"
                    />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fileInput2"
                  className="block text-sm font-medium text-gray-600"
                >
                  Desktop Banner Image
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
                        aboutUsdata?.DesktopBannerImagePath
                      }`}
                      alt="Banner Desktop"
                      className="mt-2 w-[90%] h-[250px] object-contain"
                    />
                  )}
                </div>
              </div>
            </div>


              {/* Family Banner Images */}
              <h1 className="text-2xl font-bold text-start my-6">
                Family Details{" "}
              </h1>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="mb-2">
                <label
                  htmlFor="familyheading"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  FamilyDetail Heading
                </label>
                <input
                  type="text"
                  id="familyheading"
                  value={values.familyheading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.familyheading && touched.familyheading ? (
                  <p className="font-Marcellus text-start text-red-900">
                    {errors.familyheading}
                  </p>
                ) : null}
              </div>

              <div className="md:col-span-2 mb-4">
                <label
                  htmlFor="Bannerdesc"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  FamilyDetails Description
                </label>
                <textarea
                  id="familydesc"
                  name="familydesc"
                  value={values.familydesc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-full border rounded-md resize-none"
                />
                {errors.familydesc && touched.familydesc ? (
                  <p className="font-Marcellus text-start text-red-900">
                    {errors.familydesc}
                  </p>
                ) : null}
              </div>

              {/* {aboutUsdata.FamilyDetails_Images.map((familytdetail) => (
                <div className="mb-4">
                  <label
                    htmlFor="fileInput2"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Info Images
                  </label>
                  <input
                    type="file"
                    id=""
                    // onChange={(e) => handleFileChange(e, "bannerImageDesktop")}
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
                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                          familytdetail?.Family_ImagePath
                        }`}
                        alt="Banner Desktop"
                        className="mt-2 w-[90%] h-[250px] object-contain"
                      />
                    )}
                  </div>
                </div>
              ))} */}

              <div className="mb-4">
                <label
                  htmlFor="fileInput1"
                  className="block text-sm font-medium text-gray-600"
                >
                  Family Images
                </label>
                <input
                  type="file"
                  id="familyImage"
                  onChange={(e) => handleFileForFamilyImages(e, "familyImage")}
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
                      {aboutUsdata.FamilyDetails_Images &&
                        aboutUsdata.FamilyDetails_Images.map(
                          (familytdetail, index) => (
                            <div key={index}>
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${familytdetail?.Family_ImagePath}`}
                                alt={`Product Image ${index}`}
                                className="mt-2 w-[90%] h-[250px]"
                              />
                              {/* You can include delete or other actions if needed */}
                            </div>
                          )
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>


              <h1 className="text-2xl font-bold text-start my-6 uppercase">
                {" "}
                RoadMapData Details{" "}
              </h1>

              

              <div className="overflow-x-auto w-full">
                <table className="table-auto border-collapse border border-gray-800 w-full">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Heading</th>
                      <th className="px-6 py-4">Years</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {aboutUsdata.RoadMapData.map((roaddata, index) => (
                      <tr
                        key={roaddata._id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <div className="h-24 w-24 relative">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${roaddata?.ImagePath}`}
                                alt="Banner Desktop"
                                className="w-full h-full object-cover rounded-lg shadow-md"
                              />
                            </div>
                          </div>
                        </td>
                        <td className=" px-6 py-4">{roaddata.Heading}</td>
                        <td className="px-6 py-4">{roaddata.Year}</td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleUpdate(roaddata)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {updateData && (
                <UpdateAboutRoadMap
                  roadMapDataUpdate={roadMapDataUpdate}
                  aboutUsdata={aboutUsdata}
                  setUpdateData={setUpdateData}
                  setCallApiAfterUpdate={setCallApiAfterUpdate}
                />
              )}
            </div>

            <button type="submit" onClick={handleSubmit}
              className="bg-blue-500 mt-7 w-[25%] py-3 rounded-3xl hover:bg-blue-700 text-white font-bold  px-4  focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
