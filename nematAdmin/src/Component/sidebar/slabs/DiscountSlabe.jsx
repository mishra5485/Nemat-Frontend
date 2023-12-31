import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DiscountSlabe = () => {
  const [inputSets, setInputSets] = useState([{ id: 1 }]);
  const [showForm , setShowForm] = useState(false)
  const [TableDiscountSlabs , setTableDiscountSlabs] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 
  

  useEffect(() => {
   fetchData();
  } , [])

  const fetchData = async () => {
      try {
         
         let response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/cartdiscountscheme/getall`
         )

         setTableDiscountSlabs(response.data)
         setLoading(false);
      } catch (error) {
         toast.error(error.data)
         console.log(error.data)
         setLoading(false);
      }
  }

  console.log(TableDiscountSlabs)

  const addInputSet = (e) => {
    e.preventDefault();
    setInputSets((prevSets) => [...prevSets, { id: prevSets.length + 1 }]);
  };

  const removeInputSet = (idToRemove) => {
    setInputSets((prevSets) => prevSets.filter((set) => set.id !== idToRemove));
  };

  const discountSlabeObject = yup.object({
    name: yup.string().required("Please enter the Name for Discount Slabe"),
    from: yup
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
    from: 0,
    to: 0,
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
        DiscountSlabs: inputSets.map((set) => ({
          from: set.from,
          to: set.to,
          discountPercent: set.discountSlabe,
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
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/cartdiscountscheme/create`,
          payload
        );

        console.log(response);

        if (response.status === 200) {
          toast.success("New Discount Slabs is Created ")
          console.log("New Category Created ");
          setShowForm(false)
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
    navigate(`/dashboard/discountSlabe/Slabs_edit/${categoryId}`);
  };

  return (
    <div>
      <Toaster/>

      <h1 class="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">Discount Slabe</span></h1>

      {
         showForm ? (

             <form
         onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
         }}
         >
         <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div className="mt-[5%]">
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
               placeholder="Type product name"
               />
            </div>

            <div>
               <div className="flex">
               <h1 className="bg-black text-white p-3 rounded-full w-fit mb-6">
                  Dynamically Add and Remove Input Fields
               </h1>
               <button
                  onClick={addInputSet}
                  className="mb-6 p-3 ml-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
               >
                  Add
               </button>
               </div>

               <div className="">
               {inputSets.map((set) => (
                  <div key={set.id} className="flex gap-x-3">
                     <div>
                     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        From
                     </label>
                     <input
                        className="appearance-none block w-[100%] bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id={`from_${set.id}`}
                        name={`from_${set.id}`}
                        type="text"
                        value={set.from}
                        onChange={(e) =>
                           handleRowChange(set.id, "from", e.target.value)
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
                        id={`to_${set.id}`}
                        name={`to_${set.id}`}
                        type="text"
                        value={set.to}
                        onChange={(e) =>
                           handleRowChange(set.id, "to", e.target.value)
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
                        id={`discountSlabe_${set.id}`}
                        type="text"
                        name={`discountSlabe_${set.id}`}
                        value={set.discountSlabe}
                        onChange={(e) =>
                           handleRowChange(set.id, "discountSlabe", e.target.value)
                        }
                        placeholder="Jane"
                     />
                     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Please Do not Include Percentage Sign (%)
                     </label>
                     </div>
                     {set.id !== 1 && (
                     <button onClick={() => removeInputSet(set.id)}>
                        Delete 
                     </button>
                     )}
                  </div>
               ))}
               </div>
            </div>
         </div>
         <div>

          <button
              className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
              >
              Submit
          </button>
          <button
              className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                onClick={() => setShowForm(false)}
              >
              Cancel 
          </button>
          </div>
         </form>

         ) : (
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
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
                      placeholder="Search for products"
                      required=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  className="bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowForm(true)}
                >
                  + Create Discount-Slabs
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
                        <th scope="col" className="p-4">
                          Discount Slabs Names{" "}
                        </th>
                        <th scope="col" className="p-4">
                           Discount Slabs variation
                        </th>
                      </tr>
                    </thead>

                    {TableDiscountSlabs?.map((item) => (
                      <tbody key={item._id}>
                        <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
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
                         
                         
                          <td className="px-4 py-3">
                            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                              {item.Name}
                            </span>
                          </td>
                          <td className="px-16 py-3 font-medium text-start text-gray-900 whitespace-nowrap dark:text-white">
                            {item.DiscountSlabs.length}
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
                                data-modal-target="delete-modal"
                                data-modal-toggle="delete-modal"
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

            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
         )
      }
      
        
    </div>
  );
};

export default DiscountSlabe;
