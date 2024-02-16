import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";


const Edit_DiscountSlabe = () => {
  const { _id } = useParams();
  const [slabsData, setSlabsData] = useState();
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  
  
  useEffect(() => {
    fetchDataDsSlabe();
  }, []);

  const fetchDataDsSlabe = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/cartdiscountscheme/getbyId/${_id}`
    );

    setSlabsData(response.data);
    setLoading(false);
  };

  const Edit_DiscountSlabsObject = yup.object({
    name: yup.string().required("Please enter the Name for Discount Slabe"),
    from: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .nullable(),
      
    to: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .nullable(),
    discountSlabe: yup
      .number()
      .integer("Please enter a valid number")
      .nullable(),
  });

   const initialValues = loading
    ? {
        name: "raj",
        discountSlabs: [
          { from: 1, to: 2, discountSlabe: 3 },
        ],
      }
    : {
        name: slabsData.Name,
        discountSlabs: slabsData.DiscountSlabs.map((slabs) => ({
          from: slabs.from,
          to: slabs.to,
          discountSlabe: slabs.discountPercent,
        })),
      };

  // console.log("initialValues -> ", initialValues);

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
    validationSchema: Edit_DiscountSlabsObject,
    enableReinitialize: true,

    onSubmit:async(values) => {

      const payload = {
        Name: values.name,
        DiscountSlabs:values.discountSlabs.map((set) => ({
          from: set.from,
          to: set.to,
          discountPercent: set.discountSlabe,
        })),
      };

      console.log("Payload is here ->", payload);

      try {
        let response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/cartdiscountscheme/updatebyId/${_id}`,
          payload
        );

        console.log(response);

        if (response.status === 200) {
          console.log("New Category Created ");
          toast.success("Updated Successfully")
          // navigator("/dashboard/discountSlabe")
          fetchData();
          
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

  const handleRowChange = (rowId, field, value) => {
    setFieldValue(`discountSlabs.${rowId}.${field}`, value);
    // console.log("Form values after handleRowChange => ", values);
  };
  // console.log(slabsData);

   const handleGoBack = () => {
    // Go back by one step in the history
    navigate(-1);
  };


  return (
    <div>
       <h1 className="text-4xl  text-center mb-4"> Discount Slabe </h1>
      <Toaster/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                onChange={handleChange}
                value={values.name}
                placeholder="Type product name"
              />
            </div>

            <div className="">
              {values.discountSlabs.map((set, index) => (
                <div key={index} className="flex gap-x-3">
                  <div>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      From
                    </label>
                    <input
                      className="appearance-none block w-[100%] bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id={`from_${index}`}
                      name={`discountSlabs.${index}.from`}
                      type="text"
                      value={values.discountSlabs[index].from}
                      onChange={(e) =>
                        handleRowChange(index, "from", e.target.value)
                      }
                      placeholder="From"
                    />
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Please Enter Only Number
                    </label>
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      To
                    </label>
                    <input
                      className="appearance-none block w-[100%] bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id={`to_${index}`}
                      name={`discountSlabs.${index}.to`}
                      type="text"
                      value={values.discountSlabs[index].to}
                      onChange={(e) =>
                        handleRowChange(index, "to", e.target.value)
                      }
                      placeholder="To"
                    />
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Please Enter Only Number
                    </label>
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      DS Slabe
                    </label>
                    <input
                      className="appearance-none block w-[100%] bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id={`discountSlabe_${index}`}
                      name={`discountSlabs.${index}.discountSlabe`}
                      type="text"
                      value={values.discountSlabs[index].discountSlabe}
                      onChange={(e) =>
                        handleRowChange(index, "discountSlabe", e.target.value)
                      }
                      placeholder="Jane"
                    />
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Please Do not Include Percentage Sign (%)
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>

             <button
              className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
               onClick={handleGoBack}
               type="button"
            >
              Discard
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Edit_DiscountSlabe;
