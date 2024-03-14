import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { formattedAmount } from "../../common/FormatAmount";
import { OrderStatus } from "../../common/FormatAmount";
import getToken from "../../common/getToken";

const Edit_UserManagement = () => {
  const { _id } = useParams();
  console.log(_id);
  const [PrevUserID, setPrevUserID] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderStatus , setOrderStatus] = useState([]);

  const header = getToken();

  const navigator = useNavigate();

  useEffect(() => {
    fetechUserData();
  }, []);

  const fetechUserData = async () => {
    try {
      let userDetails = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/users/customer/getuserdetails/${_id}` , header
      );

      console.log(userDetails.data.OrderStats);

      setPrevUserID(userDetails.data.CustomerData);
      setOrderData(userDetails.data.OrderData);
      setFilteredOrders(userDetails.data.OrderData);
      setOrderStatus(userDetails.data.OrderStats)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const activeateUserHandler = async () => {
    try {
      let activateUser = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/users/customer/activate/${_id}`,header
      );

      if (activateUser.status === 200) {
        toast.success("User activate Scessfully");
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = orderData.filter((item) =>
      item.OrderNo.includes(searchTerm)
    );
    setFilteredOrders(filtered);
  };

  const handleForm = () => {};

  const editHandlerDir = (orderId) => {
    navigator(`/dashboard/order-mangement/view_order/${orderId}`);
  };

  const activeUserAgain = async () => {
    try {
      let activateUser = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/users/customer/enable/${_id}`,header
      );

      if (activateUser.status === 200) {
        toast.success("User activate Scessfully");
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

  const disableUser = async () => {
    try {
      let activateUser = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/users/customer/disable/${_id}`,header
      );

      if (activateUser.status === 200) {
        toast.success(activateUser.data);
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

  return (
    <div>

       <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>User Management</h1>
      </div>
      <Toaster />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className="mt-8">
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                User Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                value={PrevUserID?.CustomerName}
                placeholder="Type product name"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Mobile Number
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                value={[
                  `+ ${PrevUserID.Country_MobileNumber} ${PrevUserID.MobileNumber}`,
                ]}
                placeholder="Type product name"
              />
            </div>
            <div>
              <label
                htmlFor="metaTitle"
                className="mb-2 text-sm flex font-medium text-gray-900 dark:text-white"
              >
                Email Address{" "}
                {PrevUserID.email_verified === 1 ? (
                  <span className="ml-1">
                    <MdVerified color="green" size={18} />
                  </span>
                ) : null}
              </label>
              <input
                type="text"
                name="metaTitle"
                id="metaTitle"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={PrevUserID.Email}
                placeholder="Type product name"
              />
            </div>

            <br />

            <div className="flex gap-6">
              <h1>
                Status :-{" "}
                {PrevUserID.status === 1 ? (
                  <span class=" ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-500 rounded">
                    Active
                  </span>
                ) : (
                  <span class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-red-500 rounded">
                    Inactive
                  </span>
                )}{" "}
              </h1>

              <h1 className="">
                DefaultpasswordChanged :-
                {PrevUserID.DefaultpasswordChanged === 1 ? (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-500 rounded">
                    Yes
                  </span>
                ) : (
                  <span className=" ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-red-500 rounded">
                    No
                  </span>
                )}{" "}
              </h1>
            </div>

            <br />
            <div>
              <label
                htmlFor="slugUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company Name
              </label>
              <input
                type="text"
                name="slugUrl"
                id="slugUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                value={PrevUserID.CompanyName}
              />
            </div>
            <div>
              <label
                htmlFor="slugUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                GST Number
              </label>
              <input
                type="text"
                name="slugUrl"
                id="slugUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                value={PrevUserID.GstNo}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company Address
              </label>
              <textarea
                id="metaDesc"
                name="metaDesc"
                rows="3"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={[
                  `${PrevUserID.Company_StreetAddress} , ${PrevUserID.Company_City} , ${PrevUserID.Company_State} , ${PrevUserID.Company_ZipCode}`,
                ]}
                placeholder="Write product description here"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end w-[98%]">
            {PrevUserID.email_verified !== 0 ? (
              PrevUserID.status === 2 && PrevUserID.email_verified === 1 ? (
                <button
                  onClick={() => activeUserAgain()}
                  type="button"
                  className="w-full justify-center bg-[#666666] text-white sm:w-auto  inline-flex items-center  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                >
                  Activate Again
                </button>
              ) : PrevUserID.status === 1 ? (
                <button
                  onClick={() => disableUser()}
                  type="button"
                  className="w-full bg-[#666666] text-white justify-center sm:w-auto inline-flex items-center  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                >
                  Disable
                </button>
              ) : (
                <button
                  onClick={() => activeateUserHandler()}
                  type="button"
                  className="w-full justify-center bg-[#666666] text-white sm:w-auto inline-flex items-center  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                >
                  Activate
                </button>
              )
            ) : null}

            <button
              onClick={() => navigator("/dashboard/user-mangement")}
              type="button"
              className="w-full justify-center sm:w-auto ml-6 text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
            >
              Go Back
            </button>
          </div>
        </form>
      )}

      <hr className="mt-6"/>

      {orderStatus && orderStatus.length !== 0 ? (
        <div className="mt-6">
          <h1 className="mt-6 text-2xl text-black  font-bold mb-4">
            Order Status
          </h1>
          <div className="flex justify-between mx-auto">
            {orderStatus.map((orderData, index) => (
              <div
                key={index}
                className="w-[95%] flex justify-center items-center "
              >
                <div className="p-3 border-2 border-[#868686] rounded-xl w-[90%] flex flex-col justify-between ">
                <p className="text-start text-xl h-[45px] text-[#868686]  font-semibold w-[90%]">
                  {orderData.Name} :-
                </p>
                <h1 className="text-3xl text-start text-black   mt-2 font-bold">
                  {orderData.Value}
                </h1>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}


      <hr className="mt-6"/>

    {
      orderData && orderData.length !== 0? (
         <div className="">
        <h1 className="mt-6 text-2xl ml-10 text-start font-bold mb-4">
          User’s Order Management
        </h1>
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
            </div>
          </div>
        </section>
      </div>
      ) : null
    }
     
    </div>
  );
};

export default Edit_UserManagement;
