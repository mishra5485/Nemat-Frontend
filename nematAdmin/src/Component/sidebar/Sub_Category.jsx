import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const Sub_Category = () => {
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [categoryData, setcategoryData] = useState();
  const [categorySelection, setCategorySelection] = useState();
  const [showform, setShowForm] = useState();
  const [quantityData, setQuantityData] = useState();
  const [imagePreviewMobile, setImagePreviewMobile] = useState(null);
  const [imagePreviewDesktop, setImagePreviewDesktop] = useState(null);
  const [allvendor, setAllVendors] = useState([]);
  const [seriesImage, setSeriesImage] = useState(null);
  const [Nodata, setNodata] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!showModal) {
      fetchData();
    }
    getAllSubCategory();
    getAllvendor();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/category/getall`
      );

      const quantityResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/quantityscheme/getall`
      );

      setQuantityData(quantityResponse.data);
      setCategorySelection(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(response.data);
      console.error("Error fetching data:", error);
    }
  };

  const getAllSubCategory = async () => {
    try {
      const SubCategory = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/subcategory/getall`
      );
      if (SubCategory.status === 200) {
        setcategoryData(SubCategory.data);
        setFilteredData(SubCategory.data);
        console.log(SubCategory.data);
        toast.success(data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (
          status === 404 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          console.log(error.response);
          toast.error(error.response.data);
          setcategoryData([]);
          setLoading(false);
        } else if (status === 403) {
          setNodata(true);
        }
      }
    }
  };

  const getAllvendor = async () => {
    try {
      const respones = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/vendor/getall`
      );
      if (respones.status === 200) {
        setAllVendors(respones.data);
        toast.success(data);
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
          toast.error(data);
        }
      }
    }
  };

  // console.log(" categorySelection -> ", categorySelection);
  // console.log("quantityData -> ", quantityData);

  const categoryObjectSchema = yup.object({
    name: yup.string().min(2).required("Enter Category Name"),
    category: yup.string().required("Please Select Any Category"),
    metaTitle: yup.string().min(2).required("Enter Meta Title For Category"),
    metaDesc: yup.string().min(2).required("Emter Meta Desc for Category"),
    metaKeyword: yup.string().min(2).required("Enter Meta Keywords"),
    slugUrl: yup.string().min(2).required("Enter slugUrl"),
    vendor: yup.string().required("Please Select Vendor"),
    quantity: yup.string().required("Please Select Any One"),
    priority: yup.string().nullable(),
    sub_category_ML: yup
      .number()
      .typeError("Please enter a valid number")
      .min(1, "Value must be greater than or equal to 1")
      .max(999999, "Value must be less than or equal to 999999")
      .required("Enter the ML"),
    sub_category_SGST: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(1)
      .max(999999)
      .required("Enter the SGST Number Code"),
    sub_category_CGST: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(1)
      .max(999999)
      .required("Enter the CGST Number  Code"),
    packSizes: yup
      .array()
      .of(
        yup.object().shape({
          size: yup
            .number()
            .typeError("Please enter a valid number")
            .integer("Please enter a valid number")
            .min(1)
            .max(999999),

          // nameConvention: yup.string(),
        })
      )
      .min(1, "At least one pack size is required"),
    // bannerImageMobile: yup.string().required("Select the Picture "),
    // bannerImageDesktop: yup.string().required("Select the Picture "),
    seriesImage: yup.string().required("Select the Picture "),
  });

  const initialValues = {
    name: "",
    category: "",
    metaTitle: "",
    metaDesc: "",
    metaKeyword: "",
    slugUrl: "",
    vendor: "",
    quantity: "",
    priority: "",
    sub_category_ML: "",
    sub_category_SGST: "",
    sub_category_CGST: "",
    packSizes: [
      { size: "", nameConvention: "" },
      { size: "", nameConvention: "" },
      { size: "", nameConvention: "" },
    ],
    // bannerImageMobile: null,
    // bannerImageDesktop: null,
    seriesImage: null,
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
    validationSchema: categoryObjectSchema,
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
      // handleResetClick();
    },
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
        } else {
          setSeriesImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the preview if no file is selected
      if (field === "bannerImageMobile") {
        setImagePreviewMobile(null);
      } else if (field === "bannerImageDesktop") {
        setImagePreviewDesktop(null);
      } else {
        setSeriesImage(null);
      }
    }
  };

  const handleForm = () => {};

  const editHandlerDir = (categoryId) => {
    setShowForm(categoryId);
    navigate(`/dashboard/sub_category/sub_edit/${categoryId}`);
  };

  const DeleteHandler = async (categoryId) => {
    try {
      const deleteData = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/subcategory/deletebyId/${categoryId}`
      );

      if (deleteData.status === 200) {
        toast.success(" Category Deleted");
        getAllSubCategory();
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
        } else {
          setNodata(true);
        }
      }
    }
  };

  const privoritySub_Category = [
    {
      id: 1,
      value: 1,
    },
    {
      id: 2,
      value: 2,
    },
    {
      id: 3,
      value: 3,
    },
    {
      id: 4,
      value: 4,
    },
    {
      id: 5,
      value: 5,
    },
    {
      id: 6,
      value: 6,
    },
    {
      id: 7,
      value: 7,
    },
    {
      id: 8,
      value: 8,
    },
    {
      id: 9,
      value: 9,
    },
    {
      id: 10,
      value: 10,
    },
  ];

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = categoryData.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;

    if (selectedCategoryId === "All") {
      setSelectedCategory("ALL");

      setFilteredData(categoryData);
    } else {
      setSelectedCategory(selectedCategoryId);

      // Perform filtering based on the selected category ID
      // For example, filter your data array based on the selected category ID
      const filteredItems = categoryData.filter(
        (item) => item.Category === selectedCategoryId
      );
      setFilteredData(filteredItems);
    }
  };

  return (
    <div className="text-center">
       <div className="mt-4 mb-6 font-bold text-4xl text-start pb-6 border-b-2 border-black">

          <h1>Sub-Category Page</h1>
        </div>
      <Toaster />
      {showModal ? (
        <>         
                  <form
                    onSubmit={handleSubmit}
                  >
                    {/* Input fields */}
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.name && touched.name ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="cartDiscount"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category deside
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {categorySelection?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.Name}
                          </option>
                        ))}
                      </select>
                      {errors.category && touched.category ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.category}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="metaTitle"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Meta Title
                      </label>
                      <input
                        type="text"
                        id="metaTitle"
                        name="metaTitle"
                        value={values.metaTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.metaTitle && touched.metaTitle ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.metaTitle}
                        </p>
                      ) : null}
                    </div>
                      <br/>
                    <div className="md:col-span-2 mb-4">
                      <label
                        htmlFor="metaDesc"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Meta Description
                      </label>
                      <textarea
                        id="metaDesc"
                        name="metaDesc"
                        value={values.metaDesc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.metaDesc && touched.metaDesc ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.metaDesc}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="metaKeyword"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Meta Keyword
                      </label>
                      <input
                        type="text"
                        id="metaKeyword"
                        onChange={handleChange}
                        value={values.metaKeyword}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.metaKeyword && touched.metaKeyword ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.metaKeyword}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="slugUrl"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Slug URL
                      </label>
                      <input
                        type="text"
                        id="slugUrl"
                        name="slugUrl"
                        value={values.slugUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.slugUrl && touched.slugUrl ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.slugUrl}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="vendor"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Vendor Selection
                      </label>
                      <select
                        id="vendor"
                        name="vendor"
                        value={values.vendor}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Vendor{" "}
                        </option>
                        {allvendor?.map((allvendorName) => (
                          <option
                            key={allvendorName._id}
                            value={allvendorName._id}
                          >
                            {allvendorName.Name}
                          </option>
                        ))}
                      </select>
                      {errors.vendor && touched.vendor ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.vendor}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="cartDiscount"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity Schemeld
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Quantity Schemeld{" "}
                        </option>
                        {quantityData?.map((quantity) => (
                          <option key={quantity._id} value={quantity._id}>
                            {quantity.Name}
                          </option>
                        ))}
                      </select>
                      {errors.quantity && touched.quantity ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.quantity}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="cartDiscount"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={values.priority}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">
                          Select Priority of Sub_Category
                        </option>
                        {privoritySub_Category.map((number) => (
                          <option key={number.id} value={number.value}>
                            {number.value}
                          </option>
                        ))}
                      </select>
                      {errors.priority && touched.priority ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.priority}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="slugUrl"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ML
                      </label>
                      <input
                        type="text"
                        id="sub_category_ML"
                        name="sub_category_ML"
                        value={values.sub_category_ML}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.sub_category_ML && touched.sub_category_ML ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.sub_category_ML}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="slugUrl"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        SGST
                      </label>
                      <input
                        type="text"
                        id="sub_category_SGST"
                        name="sub_category_SGST"
                        value={values.sub_category_SGST}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.sub_category_SGST && touched.sub_category_SGST ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.sub_category_SGST}
                        </p>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="slugUrl"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        CGST
                      </label>
                      <input
                        type="text"
                        id="sub_category_CGST"
                        name="sub_category_CGST"
                        value={values.sub_category_CGST}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.sub_category_CGST && touched.sub_category_CGST ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.sub_category_CGST}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex mt-4">
                      <div className="mb-4 flex flex-col text-center">
                        <label
                          htmlFor="packSizes"
                          className="block text-sm font-medium text-gray-600"
                        >
                          PackSizes
                        </label>
                        <div className="flex flex-col gap-2">
                          {values.packSizes.map((packSize, index) => (
                            <div key={index} className="flex ">
                              <div className="mr-3">
                                <input
                                  type="text"
                                  id={`packSize${index + 1}`}
                                  name={`packSizes[${index}].size`}
                                  value={packSize.size}
                                  onChange={handleChange}
                                  className="mt-1 p-2 w-full border rounded-md"
                                  placeholder="Enter the PackSize"
                                />
                                {errors.packSizes?.[index]?.size && (
                                  <div className="text-red-500">
                                    {errors.packSizes[index].size}
                                  </div>
                                )}
                              </div>
                              <div>
                                <input
                                  type="text"
                                  id={`packName${index + 1}`}
                                  name={`packSizes[${index}].nameConvention`}
                                  value={packSize.nameConvention}
                                  onChange={handleChange}
                                  className="mt-1 p-2 w-full border rounded-md"
                                  placeholder="Enter Pack Size Name "
                                />
                                {errors.packSizes?.[index]?.nameConvention && (
                                  <div className="text-red-500">
                                    {errors.packSizes[index].nameConvention}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* File inputs */}
                    {/* <div className="mb-4">
                      <label
                        htmlFor="fileInput1"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Mobile Banner Image
                      </label>
                      <input
                        type="file"
                        id="bannerImageMobile"
                        onChange={(e) =>
                          handleFileChange(e, "bannerImageMobile")
                        }
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                      {imagePreviewMobile && (
                        <img
                          src={imagePreviewMobile}
                          alt="Banner Mobile"
                          className="mt-2 w-full h-auto"
                        />
                      )}
                    </div> */}

                    {/* <div className="mb-4">
                      <label
                        htmlFor="fileInput2"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Desktop Banner Image
                      </label>
                      <input
                        type="file"
                        id="bannerImageDesktop"
                        onChange={(e) =>
                          handleFileChange(e, "bannerImageDesktop")
                        }
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                      {imagePreviewDesktop && (
                        <img
                          src={imagePreviewDesktop}
                          alt="Banner Mobile"
                          className="mt-2 w-full h-auto"
                        />
                      )}
                    </div> */}

                    <div className="mb-4">
                      <label
                        htmlFor="seriesImage"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Sub-Category Series Image
                      </label>
                      <input
                        type="file"
                        id="seriesImage"
                        onChange={(e) => handleFileChange(e, "seriesImage")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.seriesImage && touched.seriesImage ? (
                        <p className="font-Marcellus text-start text-red-900">
                          {errors.seriesImage}
                        </p>
                      ) : null}
                      {seriesImage && (
                        <img
                          src={seriesImage}
                          alt="Banner Mobile"
                          className="mt-2 w-[400px] h-[300px] object-contain flex justify-center items-center"
                        />
                      )}
                    </div>

                    {/* Submit button */}
                    <div className="md:col-span-2 mb-4 flex justify-end mt-4 mr-9">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-8 py-2 mr-6 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Submit
                      </button>
                    </div>
                    </div>
                  </form>
                
        </>
      ) : (
        <section className=" p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder="Search for Sub-Category"
                        required=""
                        onChange={(event) => handleSearch(event)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div>
                  <select
                    id="category"
                    name="category"
                    className="py-2 w-full border rounded-md"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="All">All</option>
                    {categorySelection?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    className="bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    + Create Sub-Category
                  </button>
                </div>
              </div>

              <div className="">
                {loading ? (
                  <p>
                    <LoadingSpinner />
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs w-[100wh] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="w-full ">
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-all"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label htmlFor="checkbox-all" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </th>
                          {/* <th scope="col" className="p-4">
                          Mobile Image{" "}
                        </th>
                        <th scope="col" className="p-4">
                          Desktop Image
                        </th> */}
                          <th scope="col" className="p-4">
                            Series Image
                          </th>
                          <th scope="col" className="p-4">
                            Name
                          </th>
                          <th scope="col" className="p-4">
                            Ml
                          </th>
                          <th scope="col" className="p-4">
                            SGST{" "}
                          </th>
                          <th scope="col" className="p-4">
                            CGST{" "}
                          </th>
                          <th scope="col" className="p-4">
                            PRIORITY
                          </th>
                          <th scope="col" className="p-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {Nodata ? (
                        <p>No data available</p>
                      ) : (
                        filteredData?.map((item) => (
                          <tbody key={item._id}>
                            <tr className="border-b dark:border-gray-600 hover:bg-red-400 hover:text-black hover:font-bold dark:hover:bg-gray-700">
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    onClick={handleForm}
                                    className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor="checkbox-table-search-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              {/* <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <div className="flex items-center mr-3">
                                <img
                                  src={`${
                                    import.meta.env.VITE_REACT_APP_BASE_URL
                                  }/${item.MobilebannerImage}`}
                                  alt=""
                                  className="h-8 w-auto mr-3"
                                />
                              </div>
                            </th> */}
                              {/* <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <div className="flex items-center mr-3">
                                <img
                                  src={`${
                                    import.meta.env.VITE_REACT_APP_BASE_URL
                                  }/${item.DesktopbannerImage}`}
                                  className="h-8 w-auto mr-3"
                                />
                              </div>
                            </th> */}
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="flex items-center mr-3">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_REACT_APP_BASE_URL
                                    }/${item?.Image}`}
                                    className="h-8 w-auto mr-3"
                                  />
                                </div>
                              </th>
                              <td className="px-4 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.Name}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.Ml}
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.SGST}
                              </td>

                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.CGST}
                              </td>
                              <td className="px-9 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.Priority}
                              </td>

                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center space-x-4">
                                  <button
                                    type="button"
                                    onClick={() => editHandlerDir(item._id)}
                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-black bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => DeleteHandler(item._id)}
                                    className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))
                      )}
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Sub_Category;
