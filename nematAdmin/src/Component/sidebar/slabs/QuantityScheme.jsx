import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

const QuantityScheme = () => {
  const [inputSets, setInputSets] = useState([{ id: 1 }]);
  const [showForm, setShowForm] = useState(false);
  const [TableDiscountSlabs, setTableDiscountSlabs] = useState();
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/quantityscheme/getall`
      );

      setTableDiscountSlabs(response.data);
      setFilteredData(response.data)
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      console.log(error.data);
      setLoading(false);
    }
  };

  console.log(TableDiscountSlabs);

  const addInputSet = (e) => {
    e.preventDefault();
    setInputSets((prevSets) => [...prevSets, { id: prevSets.length + 1 }]);
  };

  const removeInputSet = (idToRemove) => {
    setInputSets((prevSets) => prevSets.filter((set) => set.id !== idToRemove));
  };

  const discountSlabeObject = yup.object({
    name: yup.string().required("Please enter the Name for Discount Slabe"),
    min: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .required("Please enter the From price for the Slabe"),
    to: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .nullable(),
    discountSlabe: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .required("Please enter the Discount Slabe"),
  });

  const initialValues = {
    name: "",
    min: 0,
    max: 0,
    discountSlabe: 0,
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: discountSlabeObject,
    onSubmit: async (values) => {
      // const formData = new FormData();

      const payload = {
        Name: values.name,
        SchemeValues: inputSets.map((set) => ({
          min: set.min,
          max: set.max,
          value: set.discountSlabe,
        })),
      };

      // const formData = new FormData();
      // formData.append("Name", payload.Name);
      //    payload.DiscountSlabs.forEach((slab, index) => {
      //    formData.append(`DiscountSlabs[${index}][from]`, slab.from);
      //    formData.append(`DiscountSlabs[${index}][to]`, slab.to);
      //    formData.append(`DiscountSlabs[${index}][discountPercent]`, slab.discountPercent);
      //    });

      console.log("Payload is here ->", payload);

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/quantityscheme/create`,
          payload
        );

        console.log(response);

        if (response.status === 200) {
          toast.success("New Discount Slabs is Created ");
          console.log("New Category Created ");
          setShowForm(false);
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
    },
  });

  const handleRowChange = (rowId, field, value) => {
    setInputSets((prevSets) =>
      prevSets.map((set) =>
        set.id === rowId ? { ...set, [field]: value } : set
      )
    );
  };

  const handleForm = () => {};

  const editHandlerDir = (categoryId) => {
    navigate(`/dashboard/quantityscheme/scheme_edit/${categoryId}`);
  };
  
  const deleteQuantityScheme = async (quantityScheme_Id) => {
       try {
      const deleteData = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/quantityscheme/deletebyId/${quantityScheme_Id}`
      );

      if (deleteData.status === 200) {
        toast.success(deleteData.data)
        setTableDiscountSlabs([])
        fetchData()
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
        } else if (status === 403) {
          setTableDiscountSlabs([])
        }
      }
    }
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase(); 
    const filtered = TableDiscountSlabs.filter(item => item.Name.toLowerCase().includes(searchTerm)); 
    setFilteredData(filtered);
  };


  return (
    <div>
      <Toaster />

      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
          <h1>Quantity Scheme </h1>
        </div>


      {showForm ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div className="mt-[3%]">
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
                onChange={handleChange}
                value={values.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[50%] p-2.5  "
                placeholder="Enter Quantity Scheme Name"
              />
            </div>

            <div>       
                

              <div className="flex w-[100%]">
                <label className="ml-2 w-[30%] text-start block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Min
                </label>
                <label className=" w-[30%] block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Max
                </label>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  value
                </label>
              </div>

              <div className="w-full justify-between">
                {inputSets.map((set) => (
                  <div key={set.id} className="flex w-full justify-between gap-x-3">
                    <div className="w-[30%]">
                     
                      <input
                        className="appearance-none block w-[100%]  text-gray-700 border border-[#868686] rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id={`min_${set.id}`}
                        name={`min_${set.id}`}
                        type="text"
                        value={set.from}
                        onChange={(e) =>
                          handleRowChange(set.id, "min", e.target.value)
                        }
                        placeholder="min"
                      />
                     
                    </div>
                    <div className="w-[30%]">
                      
                      <input
                        className="appearance-none block w-[100%]   text-gray-700 border border-[#868686] rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id={`max_${set.id}`}
                        name={`max_${set.id}`}
                        type="text" 
                        value={set.to}
                        onChange={(e) =>
                          handleRowChange(set.id, "max", e.target.value)
                        }
                        placeholder="max"
                      />
                      
                    </div>
                    <div className="w-[30%]">
                     
                      <input
                        className="appearance-none block w-[100%] text-gray-700 border border-[#868686] rounded-xl  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id={`discountSlabe_${set.id}`}
                        type="text"
                        name={`discountSlabe_${set.id}`}
                        value={set.discountSlabe}
                        onChange={(e) =>
                          handleRowChange(
                            set.id,
                            "discountSlabe",
                            e.target.value
                          )
                        }
                        placeholder="Jane"
                      />
                     
                    </div>

                    {set.id !== 1 ? (
                      <button onClick={() => removeInputSet(set.id)} className="w-[10%] mb-3">
                        Delete
                      </button>
                    ) : <div className="w-[10%]"></div> }
                  </div>
                ))}
              </div>

            </div>
            <h1
                  onClick={addInputSet}
                  className="mb-6 text-gray-500 flex  text-xl  items-center cursor-pointer uppercase"
                >
                  <span className="mr-2">
                  <IoMdAddCircle size={25} /> 
                  </span>
                 Add Input Fields
                </h1>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="px-10 mt-4 text-white bg-[#868686] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"
              type="submit"
            >
              Submit
            </button>
            <button
              className="mt-4 border-2 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 ">
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
                        placeholder="Search for products"
                        onChange={(event) => handleSearch(event)}
                        required=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    className="bg-[#868686] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowForm(true)}
                  >
                    + Create Quantity Scheme
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
                            Discount Slabs Names{" "}
                          </th>
                          <th scope="col" className="p-4">
                            Discount Slabs variation
                          </th>
                          <th scope="col" className="p-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {filteredData?.map((item) => (
                        <tbody key={item._id}>
                          <tr className="border-b dark:border-gray-600 hover:bg-red-400 hover:text-black dark:hover:bg-gray-700">
                            <td className="px-4 py-3">
                              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                {item.Name}
                              </span>
                            </td>
                            <td className="px-16 py-3 font-medium text-start text-gray-900 whitespace-nowrap dark:text-white">
                              {item.SchemeValues.length}
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
                                  onClick={() => deleteQuantityScheme(item._id)}
                                  className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ))}
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

export default QuantityScheme;
