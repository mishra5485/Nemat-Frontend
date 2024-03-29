import React, { useEffect, useState } from "react";
import { formattedAmount } from "../../common/FormatAmount";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { OrderStatus } from "../../common/FormatAmount"
import getToken from "../../common/getToken";

const OrderManagementList = ({ selectedArrays, checkboxCheck , setFlagGetData}) => {
    // console.log("checkboxCheck ===>", checkboxCheck);

  // const [orderData , setOrderData] = useState(selectedArrays)
  const [selectedArray, setSelectedArray] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const [storeDataCase , setStoreDataCase] = useState();
  const [storeDataCheck , setStoreDataCheck] = useState(true)

  const header = getToken()

  useEffect(() => {
    if(checkboxCheck == "0"){
      setStoreDataCase(selectedArrays)
    }
  },[checkboxCheck])
  


  const handleParentCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setAllSelected(isChecked);
    if (isChecked) {
      const allItemIds = selectedArrays.map((item) => item.id);
      setSelectedArray(allItemIds);
    } else {
      setSelectedArray([]);
    }
  };

  //   console.log("selectedArray check ===> ", selectedArray);

  const handleCheckboxChange = (event, itemId) => {
    const isChecked = event.target.checked;
    let updatedSelectedArray;
    if (isChecked) {
      updatedSelectedArray = [...selectedArray, itemId];
    } else {
      updatedSelectedArray = selectedArray.filter((id) => id !== itemId);
    }
    setSelectedArray(updatedSelectedArray);
    setAllSelected(updatedSelectedArray.length === selectedArrays.length);
  };

  const handleDeleteCheckBox = async() => {
    // console.log("Selected Items:", selectedArray);

    if (selectedArray.length == 0) {
      toast.error("Item is Not selected");
      return
    }

    try {

      const payload = {
         OrderIds: selectedArray
      }

      // console.log("payload" , payload);

      let response = await axios.post(
         `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_order/bulk_cancel`,
         payload , 
         header
      )

      if (response.status === 200) {
      // const updatedData = orderData.filter(item => !selectedArray.includes(item.id));
      // setOrderData(updatedData);
      // setSelectedArray([]);
      toast.success(response.data);
      setFlagGetData(true)
    }


    // console.log( " orderData ===> " ,selectedArrays)

      
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
            setFlagGetData(true)
          }
        }
    }

  };


  const  getStatusName = (status) => {
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
}

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
      <Toaster />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {checkboxCheck == "0" && (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={allSelected}
                    onChange={handleParentCheckboxChange}
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            )}

            <th scope="col" className="px-6 py-3">
              Order Number
            </th>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Order Date
            </th>
            <th scope="col" className="px-6 py-3">
              Order Status
            </th>
            <th scope="col" className="px-6 py-3">
               Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {selectedArrays?.map((item) => (
            <tr
              className="bg-white border-b hover:bg-gray-200"
              key={item.id}
            >
              {checkboxCheck == "0" && (
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${item._id}`}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleCheckboxChange(e, item.id)}
                      checked={selectedArray.includes(item.id)}
                    />
                    <label
                      htmlFor={`checkbox-table-search-${item._id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
              )}

              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.OrderNo}
              </th>
              <td className="px-6 py-4">{item.CompanyName}</td>
              <td className="px-6 py-4">{item.OrderedDate}</td>
              <td className="px-6 py-4">{getStatusName(item.Status)}</td>

              <td className="px-6 py-4 ">
                {formattedAmount(item.TotalAmount)}
              </td>

              <td className="px-6 py-4">
                <Link to={`/dashboard/order-mangement/view_order/${item.id}`}>
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Prev
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {checkboxCheck == "0" &&  selectedArray.length != 0 &&  (
        <div className="w-[100%] flex justify-end ">
          <button
            className="px-10 mt-4 text-white bg-[#868686] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2"
            onClick={() => handleDeleteCheckBox()}
          >
            Bulk Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderManagementList;
