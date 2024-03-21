import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { formattedAmount } from "../../common/FormatAmount";
import { statusData } from "../../common/FormatAmount";
import { Documents } from "../../common/FormatAmount";
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "../../common/LoadingSpinner";
import { MdOutlineFileDownload } from "react-icons/md";
import getToken from "../../common/getToken";

const EditOrderManagement = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentState, setCurrentState] = useState(0);
  const [Modal, setModal] = useState(false);
  const [uploadfileOrderState, setUploadFileOrderState] = useState();
  const [fileuploadModal, setFileUploadModal] = useState(false);
  const [file, setFile] = useState();
  const [downloadDocument, setDownloadDocument] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { _id } = useParams();

  const header = getToken();

  // console.log(_id);

  useEffect(() => {
    getOrderDataById();
  }, []);

  const getOrderDataById = async () => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/admin_order/getOrderById/${_id}`,
        header
      );

      console.log(response.data);
      setOrderData(response.data);
      setCurrentState(response.data.Status);
      setDownloadDocument(response.data.Documents);
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
    // console.log("Selected ID:", selectedId);

    try {
      const payload = {
        order_id: _id,
        order_status: selectedId,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_order/update_status`,
        payload,
        header
      );

      // console.log(response.data);
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
    // console.log(event.target.value);
    setUploadFileOrderState(event.target.value);
    setFileUploadModal(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const uploadFileHandler = async () => {
    try {
      const payload = {
        DocumentName: uploadfileOrderState,
        order_id: _id,
        Documents: file,
      };
      // console.log("payload ", payload);

      const formData = new FormData();
      [...file].forEach((file) => {
        formData.append("Documents", file);
      });
      formData.append("DocumentName", uploadfileOrderState);
      formData.append("order_id", _id);

      let response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/admin_order/upload_documents`,
        formData,
        header
      );

      // console.log(response.data);
      toast.success(response.data);
      setModal(false);
      getOrderDataById();
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

  const HandlerDownload = async (DocumentID, OrderId) => {
    const payload = {
      order_id: OrderId,
      document_id: DocumentID,
    };

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/downloadDocuments`,
        payload,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/zip" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "documents.zip");
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
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
      }
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className=" mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Order View</h1>
      </div>
      <Toaster />

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          <LoadingSpinner />
        </p>
      ) : (
        <div className="w-[96%] bg-[#FAFAFA] mx-auto mt-6 rounded-xl">
          <div className="mt-6">
            <p className="text-black mb-4 p-3 text-2xl font-bold">
              Order No: {orderData.OrderNo}
            </p>

            <div className="w-full flex justify-between px-3 text-lg">
              <p className="text-black mb-2 w-[50%]">
                Order Date:-{" "}
                <span className="font-bold">{orderData.OrderedDate}</span>
              </p>
              <p className="  w-[50%] text-black  mb-4">
                Total Amount:-{" "}
                <span className="font-bold">
                  {formattedAmount(orderData.TotalAmount)}
                </span>
              </p>
            </div>

            <hr />

            <div className="w-full flex justify-between mt-5 px-3 text-lg">
              <p className="text-black mb-2  w-[50%]">
                Company Name:-{" "}
                <span className="font-semibold">{orderData.CompanyName}</span>
              </p>
              <p className="text-black mb-2 w-[50%]">
                GST No:-{" "}
                <span className="font-semibold">{orderData.UserGSTNO}</span>
              </p>
            </div>

            <div className="w-full flex justify-between mt-4   px-3 text-lg">
              <div className="w-[50%]">
                <p className="text-black mb-2 w-[75%]">
                  Billing Address:-{" "}
                  <span className="w-[50%] font-semibold">
                    {orderData.Billing_Address}
                  </span>
                </p>
              </div>
              <div className="w-[50%]">
                <p className="text-black mb-2 w-[75%] ">
                  Shipping Address:-{" "}
                  <span className="w-[50%] font-semibold">
                    {" "}
                    {orderData.Shipping_Address}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="w-[50%] flex justify-between mt-4  mb-3 px-3 text-lg">
                {orderData.Status !== 5 ? (
                  <div className="mb-4 w-[90%]">
                    <label
                      htmlFor="status"
                      className="block text-black dark:text-gray-300 mb-2 font-bold"
                    >
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
                  <p className="text-red-500 font-semibold">
                    Order Status: Cancelled
                  </p>
                )}
              </div>

              <div className="w-[50%] mt-6">
                <p className="text-black mb-2 w-[50%]">
                  Mobile No:-{" "}
                  <span className="font-semibold">{orderData.MobileNumber}</span>
                </p>
              </div>
            </div>
            <hr />

            <div className="flex">
              <div className="w-[50%]  mt-2  mb-6 px-3 text-lg">
                {orderData.Status !== 5 && (
                  <div className="text-center mt-4 w-[90%]">
                    <h1 className="text-start font-bold mb-3 text-xl">
                      Upload Document
                    </h1>
                    <button
                      type="button"
                      onClick={() => uploadDocumentHandler()}
                      className="bg-[#666666] w-full text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-green-600"
                    >
                      Upload Documents
                    </button>
                  </div>
                )}
              </div>

              <div className="w-[50%] mt-2 mb-6 px-3 text-lg">
                <div className="text-center mt-4 w-[90%]">
                  <h1 className="text-start font-bold mb-3 text-xl">
                    Download Document
                  </h1>
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="w-full bg-[#666666] py-2 px-4 rounded-full text-white mt-3 flex sm:justify-center sm:items-center mobile:justify-center mobile:items-center cursor-pointer"
                    >
                      <button className="w-[65%] text-center gap-y-2  font-Marcellus">
                        {" "}
                        Download Document
                      </button>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg mt-2">
                        {downloadDocument.map((document, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              HandlerDownload(document._id, orderData.id)
                            }
                            className="cursor-pointer p-2 hover:bg-gray-100"
                          >
                            {document.DocumentName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="w-full  justify-between mt-5 px-3 text-lg">
              <h1 className="text-start font-bold mb-3 text-2xl">
                Product Details
              </h1>

              <div className="w-full">
                {orderData.OrderData.map((productData, index) => (
                  <div key={index} className="p-4 mb-2 w-full">
                    <div className="w-full flex">
                      <p className="text-lg  mb-2 w-[50%]">
                        Series Name:-{" "}
                        <span className="font-bold">
                          {" "}
                          {productData.seriesName}
                        </span>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 w-[50%]">
                        Total Quantity:{" "}
                        <span className="font-bold">
                          {productData.totalQuantity}
                        </span>
                      </p>
                    </div>
                    {productData.Products.map((product, idx) => (
                      <div
                        key={idx}
                        className=" border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex w-full justify-between">
                          <p className="text-lg mb-2 w-[65%]">
                            Product Name:{" "}
                            <span className="font-bold">
                              {product.ProductName}
                            </span>
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 w-[39%]">
                            {product.totalQuantity}
                          </p>
                        </div>
                      </div>
                    ))}
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {Modal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <div className="flex justify-between mb-3">
                  <label
                    htmlFor="docStatus"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Select Document Type
                  </label>
                  <IoClose size={25} onClick={() => setModal(false)} />
                </div>
                <select
                  id="docStatus"
                  onChange={filehandlerselect}
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                >
                  <option disabled selected value="">
                    Select Document Type
                  </option>
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

          {/* <div className="mt-8">
            {orderData.OrderData.map((productData, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 p-4 mb-4"
              >
                <p className="text-lg font-semibold mb-2">
                  Series Name: {productData.seriesName}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Total Quantity: {productData.totalQuantity}
                </p>
                {productData.Products.map((product, idx) => (
                  <div
                    key={idx}
                    className="pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-lg font-semibold mb-2">
                      Product Name: {product.ProductName}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Total Quantity: {product.totalQuantity}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default EditOrderManagement;
