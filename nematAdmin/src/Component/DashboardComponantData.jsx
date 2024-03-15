import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { formattedAmount } from "./common/FormatAmount";
import { OrderStatus } from "./common/FormatAmount";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./common/LoadingSpinner";
import getToken from "./common/getToken";

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
      
      const header = getToken();

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_dashboard/getdata`,
        payload , 
        header
      );

      // console.log("New  Data is here ===> ", response.data);
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

  // console.log("LOaddding ", loading);

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

      
      // console.log("PAyload ==> ", payload);

      const dateDifference = moment(values.toDate).diff(
        moment(values.fromDate),
        "days"
      );

      if (dateDifference > 30) {
        toast.error("Date range cannot exceed 30 days");
        return;
      }
      
      try {
        
        setLoading(true);
        const header = getToken()

        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_dashboard/getdata`,
          payload,
          header
        );

        if (response.status === 200) {
          // console.log(response.data);
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
    // console.log(event.target.value);
    const fillterData = event.target.value;

    try {
      setLoading(true);

      const payload = {
        filterString: fillterData,
      };

      const header = getToken()

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_dashboard/getdata`,
        payload,
        header
      );

      if (response.status === 200) {
        // console.log("Filltered Data is here ===> ", response.data);
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
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    const filtered = OrderManagement.filter((item) =>
      item.OrderNo.includes(searchTerm)
    );
    setFilteredOrders(filtered);
  };

  const editHandlerDir = (orderId) => {
    navigate(`/dashboard/order-mangement/view_order/${orderId}`);
  };

  return (
    <div className="">
      <Toaster />
      <div className="w-full flex justify-between  border-b-2 border-text_Color">
        <select
          id="docStatus"
          onChange={filehandlerselect}
           defaultValue="Last 7 Days"
          className="w-[25%] h-11 bg-gray-100 mt-6 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-1  px-2 mb-4 "
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
          className="w-[50%] rounded-md mb-4 "
        >
          <div className="w-[100%]">
            <div className="flex justify-between  ">
              <div className="flex flex-col w-full pr-3 ">
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
                  style={{
                    border: "1px solid #60713A", // Set border color to #60713A // Set background color to #60713A
                  }}
                />
                {touched.fromDate && errors.fromDate && (
                  <div className="text-red-500">{errors.fromDate}</div>
                )}
              </div>

              <div className="flex flex-col w-full pr-3">
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
                className="w-full mt-6 pr-3 lg:w-auto bg-[#868686] text-white font-semibold py-2 px-4 rounded-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

     
      {orderStatus && orderStatus.length !== 0 ? (
        <div className="mt-6">
          <h1 className="mt-6 text-2xl  font-bold mb-4">
            Order Status
          </h1>
          <div className="flex justify-between mx-auto">
            {orderStatus.map((orderData, index) => (
              <div
                key={index}
                className="w-[95%] flex justify-center items-center "
              >
                <div className="p-3 border-2 border-black  rounded-xl w-[90%] flex flex-col justify-between ">
                <p className="text-start text-xl h-[45px]   font-semibold w-[90%]">
                  {orderData.Name} :-
                </p>
                <h1 className="text-3xl text-start text-text_Color mt-2 font-bold">
                  {orderData.Value}
                </h1>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="">
        <section className=" p-3 sm:p-5 antialiased mt-4">
          <div className="mx-auto   ">
            <div className=" relative ">
              
                <div className="w-full md:w-1/2 mb-4">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-[70%]">
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder="Search for Order Number"
                        required=""
                        onChange={handleSearch}
                        className="border-[1px] border-black text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2 "
                      />
                    </div>
                  </form>
                </div>
             

              <div className="">
                {loading ? (
                  <p>
                    <LoadingSpinner />
                  </p>
                ) : (
                  <div className="overflow-x-auto     rounded-lg">
                   <table className="w-full text-sm text-left rounded-2xl  ">
                      <thead className="text-xs w-full  uppercase bg-gray-200 rounded-2xl">
                        <tr className="w-full ">
                            <th scope="col" className="p-4">
                            Order Number
                          </th>
                           <th scope="col" className="p-4">
                            Order Date
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
                        <p className="px-4 text-xl  mt-2">NO data Found</p>
                      ) : (
                        filteredOrders?.map((item) => (
                          <tbody key={item._id}>
                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {item.OrderNo}
                              </th>
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {item.OrderedDate}
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardComponantData;
