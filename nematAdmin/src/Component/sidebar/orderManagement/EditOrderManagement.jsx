import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { formattedAmount } from "../../common/FormatAmount";
import { statusData } from "../../common/FormatAmount";
import { Documents } from "../../common/FormatAmount"
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "../../common/LoadingSpinner";
 
const EditOrderManagement = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentState, setCurrentState] = useState(0);
  const [Modal, setModal] = useState(false);
  const [uploadfileOrderState, setUploadFileOrderState] = useState();
  const [fileuploadModal, setFileUploadModal] = useState(false);
  const [file , setFile] = useState()
  const { _id } = useParams();

  console.log(_id);

  useEffect(() => {
    getOrderDataById();
  }, []);

  const getOrderDataById = async () => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/admin_order/getOrderById/${_id}`
      );

      console.log(response.data);
      setOrderData(response.data);
      setCurrentState(response.data.Status);
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
          toast.error(data);
          setLoading(false);
        }
      }
    }
  };

  const handleStatusChange = async (event) => {
    const selectedId = parseInt(event.target.value);
    console.log("Selected ID:", selectedId);

    try {
      const payload = {
        order_id: _id,
        order_status: selectedId,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_order/update_status`,
        payload
      );

      console.log(response.data);
      setCurrentState(selectedId);
      toast.success(response.data);
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
        }
      }
    }
  };

  const uploadDocumentHandler = () => {
    setModal(true);
  };

  const filehandlerselect = (event) => {
    console.log(event.target.value);
    setUploadFileOrderState(event.target.value);
    setFileUploadModal(true);
  };


  const uploadFileHandler = async () => {
      try {
         
         const payload = {
            DocumentName : uploadfileOrderState,
            order_id : _id , 
            Documents : file
         }
         console.log("payload " , payload)

         const formData = new FormData();
          [...file].forEach((file) => {
        formData.append("Documents", file);
      });
         formData.append("DocumentName" , uploadfileOrderState)
         formData.append("order_id" , _id)



            let response = await axios.post(
               `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_order/upload_documents`,
               formData 
            )

            console.log(response.data)
            toast.success(response.data)
            setModal(false)

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
        }
      }
  }
}

  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 dark:text-white mb-8">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-600">
      Order View
    </span>
  </h1>
  <Toaster />

  {loading ? (
    <p className="text-center text-gray-600 dark:text-gray-400"><LoadingSpinner/></p>
  ) : (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Company Name: {orderData.CompanyName}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            GST No: {orderData.UserGSTNO}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Email: {orderData.UserEmail}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Billing Address: {orderData.Billing_Address}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Shipping Address: {orderData.Shipping_Address}
          </p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Order No: {orderData.OrderNo}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Order Date: {orderData.OrderedDate}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Total Amount: {formattedAmount(orderData.TotalAmount)}
          </p>
          {orderData.Status !== 5 ? (
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 mb-2">
                Update Order Status
              </label>
              <select
                id="status"
                value={currentState}
                onChange={handleStatusChange}
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              >
                {statusData.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-red-500 font-semibold">Order Status: Cancelled</p>
          )}
        </div>
      </div>

      {orderData.Status !== 5 && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => uploadDocumentHandler()}
            className="bg-green-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-green-600"
          >
            Upload Documents
          </button>
        </div>
      )}

      {Modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between mb-3">
            <label htmlFor="docStatus" className="block text-gray-700 dark:text-gray-300 mb-2">
              Select Order Status
            </label>
            <IoClose size={25} onClick={() => setModal(false)} />
              </div>
            <select
              id="docStatus"
              onChange={filehandlerselect}
              className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
            >
              {Documents.map((status) => (
                <option key={status.id} value={status.title}>
                  {status.title}
                </option>
              ))}
            </select>
            {fileuploadModal && (
              <div>
                <input
                  autoComplete="off"
                  id="File"
                  accept=".pdf"
                  type="file"
                  placeholder="Select Only PDF File"
                  multiple
                  onChange={(e) => setFile(e.target.files)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 w-full py-2 px-4 mb-4"
                />
                <button
                  type="submit"
                  onClick={uploadFileHandler}
                  className="bg-green-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-green-700"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        {orderData.OrderData.map((productData, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <p className="text-lg font-semibold mb-2">Series Name: {productData.seriesName}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Total Quantity: {productData.totalQuantity}</p>
            {productData.Products.map((product, idx) => (
              <div key={idx} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <p className="text-lg font-semibold mb-2">Product Name: {product.ProductName}</p>
                <p className="text-gray-700 dark:text-gray-300">Total Quantity: {product.totalQuantity}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )}
</div>
  );
};

export default EditOrderManagement;
