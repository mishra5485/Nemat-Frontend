import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { formattedAmount } from "./common/FormatAmount";
import { OrderStatus } from "./common/FormatAmount";
import { useNavigate } from "react-router-dom";

const DashboardComponantData = () => {
  const [OrderManagement, setOrderManagement] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllDashBoardData();
  }, []);

  const dropDownData = [
    {
      id: 1,
      Value: "Today",
    },
    {
      id: 2,
      Value: "Yesterday",
    },
    {
      id: 3,
      Value: "Last 7 Days",
    },
    {
      id: 4,
      Value: "Last 30 Days",
    },
  ];

  const getStatusName = (status) => {
    switch (status) {
      case OrderStatus.OpenOrder:
        return "Open Order";
      case OrderStatus.InvoicePaid:
        return "Invoice Paid";
      case OrderStatus.Packed:
        return "Packed";
      case OrderStatus.OutForDelivery:
        return "Out for Delivery";
      case OrderStatus.Delivered:
        return "Delivered";
      case OrderStatus.Cancelled:
        return "Cancelled";
      default:
        return "Unknown Status";
    }
  };

  const getAllDashBoardData = async () => {
    try {
      const payload = {
        filterString: "Last 7 Days",
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_dashboard/getdata`,
        payload
      );

      console.log("New  Data is here ===> ", response.data);
      setOrderManagement(response.data.OrderData);
      setFilteredOrders(response.data.OrderData);
      setOrderStatus(response.data.OrderStats);
      setLoading(false);
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
          setLoading(false);
          toast.error(data);
        }
      }
    }
  };

  console.log("LOaddding ", loading);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.getDate()}-${
      formattedDate.getMonth() + 1
    }-${formattedDate.getFullYear()}`;
  };

  const validationSchema = yup.object().shape({
    fromDate: yup.date().required("From date is required"),
    toDate: yup
      .date()
      .required("To date is required")
      .min(yup.ref("fromDate"), "To date must be after from date"),
  });

  const initialValues = {
    fromDate: "",
    toDate: "",
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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        From: formatDate(values.fromDate),
        To: formatDate(values.toDate),
      };

      setLoading(true);

      console.log("PAyload ==> ", payload);

      const dateDifference = moment(values.toDate).diff(
        moment(values.fromDate),
        "days"
      );

      if (dateDifference > 30) {
        toast.error("Date range cannot exceed 30 days");
        return;
      }

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_dashboard/getdata`,
          payload
        );

        if (response.status === 200) {
          console.log(response.data);
          setFilteredOrders([]);
          setOrderManagement([]);
          setOrderStatus([]);
          setOrderManagement(response.data.OrderData);
          setFilteredOrders(response.data.OrderData);
          setOrderStatus(response.data.OrderStats);
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
            setLoading(false);
          }
        }
      }
    },
  });

  const filehandlerselect = async (event) => {
    console.log(event.target.value);
    const fillterData = event.target.value;

    try {
      setLoading(true);

      const payload = {
        filterString: fillterData,
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_dashboard/getdata`,
        payload
      );

      if (response.status === 200) {
        console.log("Filltered Data is here ===> ", response.data);
        setFilteredOrders([]);
        setOrderManagement([]);
        setOrderStatus([])
        setOrderManagement(response.data.OrderData);
        setFilteredOrders(response.data.OrderData);
        setOrderStatus(response.data.OrderStats);
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
          setLoading(false);
        }
      }
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    const filtered = OrderManagement.filter((item) =>
      item.OrderNo.includes(searchTerm)
    );
    setFilteredOrders(filtered);
  };

  const handleForm = () => {};

  const editHandlerDir = (orderId) => {
    navigate(`/dashboard/order-mangement/view_order/${orderId}`);
  };

  return (
    <div className="">
      <Toaster />
      <div className="w-full">
        <select
          id="docStatus"
          onChange={filehandlerselect}
          className="w-[70%] bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
        >
          <option>Select Date</option>
          {dropDownData.map((filterData) => (
            <option key={filterData.id} value={filterData.Value}>
              {filterData.Value}
            </option>
          ))}
        </select>

        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto p-4 bg-gray-100 shadow-md rounded-md "
        >
          <div className="w-[100%] flex justify-end items-end ">
            <div className="flex justify-center items-center">
              <div className="flex flex-col w-full lg:w-auto">
                <label htmlFor="fromDate" className="text-gray-700">
                  From Date
                </label>
                <input
                  id="fromDate"
                  name="fromDate"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fromDate}
                  className={`w-full px-4 py-2 rounded-md border ${
                    touched.fromDate && errors.fromDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {touched.fromDate && errors.fromDate && (
                  <div className="text-red-500">{errors.fromDate}</div>
                )}
              </div>

              <div className="flex flex-col w-full lg:w-auto">
                <label htmlFor="toDate" className="text-gray-700">
                  To Date
                </label>
                <input
                  id="toDate"
                  name="toDate"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.toDate}
                  className={`w-full px-4 py-2 rounded-md border ${
                    touched.toDate && errors.toDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {touched.toDate && errors.toDate && (
                  <div className="text-red-500">{errors.toDate}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-6 lg:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {orderStatus && orderStatus.length !== 0 ? (
        <div>
          <h1 className="mt-6 text-2xl text-center font-bold mb-4">
            Order Status
          </h1>
          <div className="flex flex-wrap justify-center items-center">
            {orderStatus.map((orderData, index) => (
              <div
                key={index}
                className="w-[90%] sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 sm:h-[150px] lg:h-[100px] xl:h-[100px] bg-gray-400  border-2 border-black mb-4  p-4"
              >
                <p className="text-center text-lg text-gray-800 font-semibold">
                  {orderData.Name}
                </p>
                <h1 className="text-3xl text-center text-white mt-2 font-bold">
                  {orderData.Value}
                </h1>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div>
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
                        placeholder="Search for Order Number"
                        required=""
                        onChange={handleSearch}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
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
                            Order Number
                          </th>
                          <th scope="col" className="p-4">
                            Company Name
                          </th>
                          <th scope="col" className="p-4">
                            Order Status
                          </th>
                          <th scope="col" className="p-4">
                            Order Amount
                          </th>
                          <th scope="col" className="p-4">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {!filteredOrders || filteredOrders.length === 0 ? (
                        <p>NO data Found</p>
                      ) : (
                        filteredOrders?.map((item) => (
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
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {item.OrderNo}
                              </th>

                              <td className="px-4 py-3">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {item.CompanyName}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {getStatusName(item.Status)}
                              </td>

                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {formattedAmount(item.TotalAmount)}
                              </td>

                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center space-x-4">
                                  <button
                                    type="button"
                                    onClick={() => editHandlerDir(item.id)}
                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-black bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                  >
                                    View
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
      </div>
    </div>
  );
};

export default DashboardComponantData;
