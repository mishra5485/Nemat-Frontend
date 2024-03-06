import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderManagementList from './OrderManagementList';

const OrderManagementTable = () => {

    const [selectedArray, setSelectedArray] = useState(null);
  const [apiData, setApiData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [checkboxCheck , setCheckboxCheck] = useState("PlacedOrders");

   useEffect(() => {
      getallOrder();
   },[])

   const getallOrder = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_order/getallorders`
      );

      setApiData(response.data);
      setSelectedArray(Object.keys(response.data)[0]);
      console.log(response.data);
      setLoading(false)
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
          setLoading(false)
        }
      }
    }
  };

   const handleArrayClick = (arrayName) => {
    setSelectedArray(arrayName);
    console.log( " arrayName ===>" , arrayName)
    setCheckboxCheck(arrayName)
   };

  return (
     <div className="overflow-x-auto">
      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Order Management</h1>
      </div>

      {loading ? (
        <p>Loading......</p>
      ) : (
        <div className="bg-white dark:bg-gray-800">
          <nav className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              {apiData && (
                <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                  {Object.keys(apiData).map((arrayName, index) => (
                    <li
                      key={index}
                      onClick={() => handleArrayClick(arrayName)}
                      className={`text-gray-900 dark:text-white hover:underline cursor-pointer transition-colors duration-300 ease-in-out ${
                        selectedArray === arrayName
                          ? "bg-[#666666] text-white rounded-lg px-4 py-2"
                          : ""
                      }`}
                    >
                      {arrayName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
          {selectedArray && apiData && (
            <OrderManagementList selectedArrays={apiData[selectedArray]} checkboxCheck={checkboxCheck} />
          )}
        </div>
      )}
    </div>
  )
}

export default OrderManagementTable