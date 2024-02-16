import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

const AboutUs = () => {
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
  const [aboutUsdata, setAboutUsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AboutUsData();
  }, []);

  const AboutUsData = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/aboutus/getData`
      );

      console.log(response.data);
      setAboutUsData(response.data);
      setLoading(false);
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
      formData.append("Name", values.name);
      formData.append("Category", values.category);
      formData.append("MetaTitle", values.metaTitle);
      formData.append("MetaDesc", values.metaDesc);
      formData.append("MetaKeyWord", values.metaKeyword);
      formData.append("SlugUrl", values.slugUrl);
      formData.append("VendorId", values.vendor);
      formData.append("QuantitySchemeId", values.quantity);
      formData.append("Priority", values.priority);
      formData.append("Ml", values.sub_category_ML);
      formData.append("SGST", values.sub_category_SGST);
      formData.append("CGST", values.sub_category_CGST);
      formData.append("PackSizes", JSON.stringify(values.packSizes));
      // formData.append("MobilebannerImage", values.bannerImageMobile);
      // formData.append("DesktopbannerImage", values.bannerImageDesktop);
      formData.append("Image", values.seriesImage);

      if (values.priority === "") {
        formData.delete("Priority", values.priority);
      }

      console.log("packsizes ==> ", values.packSizes);

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
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/subcategory/create`,
          formData
        );

        console.log(response);

        if (response.status === 200) {
          console.log("New Sub_Category Created ");
          toast.success("New Sub_Category Created  ");
          getAllSubCategory();
          setShowModal(false);
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
            toast.error(error.data);
          }
        }
      }
    },
  });

  return (
    <div>
      <div>
        <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
            About Us Page
          </span>
        </h1>
      </div>

      <div>
        {loading ? (
          <p>Loaddding....</p>
        ) : (
          <form>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="bannerHeading"
                  className="block text-sm font-medium text-gray-600"
                >
                  BannerHeading
                </label>
                <input
                  type="text"
                  id="bannerHeading"
                  value={values.bannerHeading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-[70%] border rounded-md"
                />
                {errors.bannerHeading && touched.bannerHeading ? (
                  <p className="font-Marcellus text-start text-red-900">
                    {errors.bannerHeading}
                  </p>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="Bannerdesc"
                  className="block text-sm font-medium text-gray-600"
                >
                  Banner Description
                </label>
                <textarea
                  id="Bannerdesc"
                  name="Bannerdesc"
                  value={values.Bannerdesc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-full border rounded-md resize-none"
                />
                {errors.Bannerdesc && touched.Bannerdesc ? (
                  <p className="font-Marcellus text-start text-red-900">
                    {errors.Bannerdesc}
                  </p>
                ) : null}
              </div>

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
                      className="mt-2 w-[90%] h-[250px]"
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
                      className="mt-2 w-[90%] h-[250px]"
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

              <div className="mb-4">
                <label
                  htmlFor="familyheading"
                  className="block text-sm font-medium text-gray-600"
                >
                  FamilyDetail Heading
                </label>
                <input
                  type="text"
                  id="familyheading"
                  value={values.familyheading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-[70%] border rounded-md"
                />
                {errors.familyheading && touched.familyheading ? (
                  <p className="font-Marcellus text-start text-red-900">
                    {errors.familyheading}
                  </p>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="Bannerdesc"
                  className="block text-sm font-medium text-gray-600"
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

              {aboutUsdata.FamilyDetails_Images.map((familytdetail) => (
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
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
