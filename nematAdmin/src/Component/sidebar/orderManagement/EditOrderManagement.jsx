import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { formattedAmount } from "../../common/FormatAmount";
import { statusData } from "../../common/FormatAmount";
import { Documents } from "../../common/FormatAmount"
 
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

  console.log("file ====> ", file)

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
    <div>
      <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r  to-emerald-600 from-sky-400">
          Order view
        </span>
      </h1>
      <Toaster />
      {loading ? (
        <p>loadding</p>
      ) : (
        <div>
          <div className="w-full mt-6">
            <div className="flex justify-between gap-x-2">
              <p className="w-[50%]">Company Name :- {orderData.CompanyName}</p>
              <p className="w-[50%]">GST No:- {orderData.UserGSTNO}</p>
            </div>
            <p className="w-full mt-4">Email :- {orderData.UserEmail}</p>
            <div className="flex gap-x-1 mt-4">
              <p className="w-[50%]">
                Billing Address :- {orderData.Billing_Address}
              </p>
              <p className="w-[50%]">
                Shipping Address :- {orderData.Shipping_Address}
              </p>
            </div>

            <div className="w-[100%] mt-5 flex">
              <div className="w-[50%]"></div>
              <div className="w-[50%] flex  flex-col ">
                <p>Order No:- {orderData.OrderNo}</p>
                <p>Order Date :- {orderData.OrderedDate}</p>
                <p>Total Amount :- {formattedAmount(orderData.TotalAmount)}</p>
                {orderData.Status !== 5 ? (
                  <div className="mt-4">
                    <label>Update Order Status</label>
                    <select
                      value={currentState}
                      onChange={handleStatusChange}
                      className="bg-gray-50 border w-[90%] mt-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  pl-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      {statusData.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.title}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p>Order Status: Cancelled</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-6">
            <button
               type="button"
              onClick={() => uploadDocumentHandler()}
              className="p-2 bg-green-500 rounded-3xl text-white"
            >
              Upload Documents
            </button>
          </div>

          {/* If Modal is True  */}
          {Modal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex items-center justify-center">
              <div className="h-auto w-[350px] bg-white p-3 rounded-xl">
                <div>
                  <label className="ml-5">Select Order Status</label>
                  <select
                    onChange={filehandlerselect}
                    className="bg-gray-50 border w-[90%] mx-auto mt-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  pl-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {Documents.map((status , index) => (
                      <option key={status.id} value={status.title}>
                        {status.title}
                      </option>
                    ))}
                  </select>
                </div>
                {fileuploadModal && (
                  <div>
                     
                  <div className="w-[90%] mx-auto mt-4">
                    <input
                      autoComplete="off"
                      id="File"
                      accept=".pdf"
                      type="file"
                      multiple
                      onChange={(e) => setFile(e.target.files)}
                      className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button type="submit" onClick={uploadFileHandler} className="w-[90%] p-2 mt-4 bg-green-600 text-white text-center rounded-3xl uppercase ml-5">Upload</button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            {orderData.OrderData.map((productData, index) => (
              <div key={index} className="mt-3 mb-3">
                <div className=" w-[100%]  gap-x-2 flex ">
                  <p className="w-[55%]">
                    Series Name :- {productData.seriesName}
                  </p>
                  <p className="w-[45%]">
                    Total Quantity :- {productData.totalQuantity}
                  </p>
                </div>
                {productData.Products.map((product, index) => (
                  <div key={index} className="">
                    <div className="flex  gap-x-2">
                      <p className="w-[55%]">
                        Product Name :- {product.ProductName}
                      </p>
                      <p className="w-[45%]">
                        Total Quantity :- {product.totalQuantity}
                      </p>
                    </div>
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
