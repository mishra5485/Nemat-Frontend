import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { formattedAmount } from "./FormatAmount";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

const OrderDetailsData = ({ data, _id }) => {
  console.log("data ==> ", data);
  console.log("id", _id);

  const [nodata, setNoData] = useState(false);
  const [openOrderData, setOpenOrderData] = useState([]);
  const [showDocument, setShowDocument] = useState(
    openOrderData.map(() => false)
  );
  const [orderShow, setOrderShow] = useState(
    openOrderData.map(() => ({ showDocument: false }))
  );
  const [showProduct, setShowProduct] = useState(
    openOrderData.map(() => false)
  );

  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setOpenOrderData(data);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const navigate = useNavigate();

  const statusData = [
    {
      id: 1,
      status: "Order placed",
    },
    {
      id: 2,
      status: "Invoice paid",
    },
    {
      id: 3,
      status: "Packend ",
    },
    {
      id: 4,
      status: "Out for delivery ",
    },
    {
      id: 5,
      status: "Delivered",
    },
  ];

  const HandlerDownload = async (DocumentID, OrderId, UserId) => {
    const payload = {
      user_id: UserId,
      order_id: OrderId,
      document_id: DocumentID,
    };

    setClicked(true)

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/downloadDocuments`,
        payload,
        {
          responseType: "blob",
        }
      );

      setClicked(false)

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
         setClicked(false)
      }
    }
  };

  const toggleOrderVisibility = (index) => {
    const updatedVisibility = [...orderShow];
    updatedVisibility[index] = !updatedVisibility[index];
    setOrderShow(updatedVisibility);
  };

  const toggleDocumentVisibility = (orderIndex) => {
    setOrderShow((prevOrderShow) => {
      const updatedOrderShow = [...prevOrderShow];
      updatedOrderShow[orderIndex] = {
        ...updatedOrderShow[orderIndex],
        showDocument: !updatedOrderShow[orderIndex].showDocument,
      };
      return updatedOrderShow;
    });
  };

  const toggleOrderVisibilitydesktop = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleProductVisibility = (orderIndex) => {
    setShowProduct((prevShowProduct) => {
      const updatedShowProduct = [...prevShowProduct];
      updatedShowProduct[orderIndex] = !updatedShowProduct[orderIndex];
      return updatedShowProduct;
    });
  };

  // Reorder Api Calling
  const reorderApiCallHandler = async (orderId, User_id, flag) => {
    try {
      const payload = {
        user_id: User_id,
        order_id: orderId,
      };

      console.log(payload);
      setClicked(true)
      let response;
      if (flag === 1) {
        response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/reorder`,
          payload
        );

        navigate("/cart");
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/cancelorder`,
          payload
        );

        setOpenOrderData((openOrderData) =>
          openOrderData.filter((order) => order._id !== orderId)
        );
      }

      console.log(response.data);

      toast.success(response.data);
      setClicked(false)
    } catch (error) {
      console.log(error);
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
        console.log(data);
        setLoading(false);
        setClicked(false)
      }
    }
  };

  const cacelOrderHandler = () => {
    setCancelOrderModal(true);
  };

  return (
    <div className="sm:mt-4 mobile:mt-4 md:h-auto md:ml-[7%]   ">
      <Toaster />

      <>
        {nodata ? (
          <p>No Open Orders Found</p>
        ) : (
          <div className="text-text_Color">
            {openOrderData.map((opneorder, index) => (
              <div key={index} className="">
                <div className="flex justify-between items-center mobile:pt-4 sm:pt-4 sm:pb-4 mobile:pb-4 md:pb-0 sm:border-b-2 mobile:border-b-2 md:border-none border-text_Color ">
                  <div className="md:flex ">
                    <div className="flex md:justify-start md:items-center mobile:w-full sm:w-full mobile:justify-between mobile:items-center ">
                      <h1 className="font-roxborough text-xl xl:mt-2 font-bold">
                        Order No : {opneorder.OrderNumber}
                      </h1>

                      <div className="ml-4 xl:mt-2">
                        {orderShow[index] ? (
                          <FaAngleUp
                            size={20}
                            onClick={() => toggleOrderVisibility(index)}
                          />
                        ) : (
                          <FaAngleDown
                            size={20}
                            onClick={() => toggleOrderVisibility(index)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* For Desktop View  */}
                  <div className="text-text_Color xl:w-[80%]  mobile:hidden md:block md">
                    {/* Document Download Section */}

                    <div className="w-full mx-auto mt-2 flex md:justify-center md:items-center  ">
                      <h1 className="font-roxborough md:w-full my-auto font-bold text-xl text-center">
                        Order Value : {formattedAmount(opneorder.TotalAmount)}
                      </h1>

                      <button
                        type="button"
                        onClick={() => {
                          toggleOrderVisibilitydesktop(index);
                        }}
                        disabled={clicked}   
                        className="w-[50%] md:hidden xl:block uppercase  font-Marcellus text-white bg-text_Color2 p-2 mb-3 mr-2  rounded-3xl mt-1"
                      >
                        Documents
                      </button>

                      {opneorder.status <= 0 ? (
                        <div className="w-[50%]  mb-3  mt-1">
                            <button
                              type="button"
                              className="w-full text-text_Color2 border-2 p-2 border-text_Color rounded-3xl"
                              onClick={() => cacelOrderHandler()
                              }
                              
                            >
                              Cancel
                            </button>
                            {cancelOrderModal && (
                              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-md w-[300px] h-auto ">
                                  <MdDeliveryDining
                                    size={35}
                                    className="w-full mx-auto text-text_Color"
                                  />
                                  <h1 className="w-[90%] mt-2.5 text-center mx-auto text-xl text-text_Color font-roxborough">
                                    Are you sure you want to Cancel Order?
                                  </h1>
                                  <div className="w-[90%] flex justify-between gap-x-2 mt-3 mx-auto font-Marcellus">
                                    <button
                                      onClick={() =>
                                        setCancelOrderModal(false)
                                      }
                                      className="uppercase p-2 border border-text_Color2 text-text_Color2 rounded-3xl w-[50%]"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                reorderApiCallHandler(
                                  opneorder._id,
                                  opneorder.user_id,
                                  0
                                )
                                      }
                                      disabled={clicked}
                                      className="uppercase p-2 bg-text_Color2 text-white rounded-3xl w-[50%]"
                                    >
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        // <button
                        //   className="w-[50%] text-text_Color2 border-2 md:hidden xl:block  border-text_Color p-2 mb-3  mt-1 rounded-3xl"
                        //   onClick={() =>
                        //     reorderApiCallHandler(
                        //       opneorder._id,
                        //       opneorder.user_id,
                        //       0
                        //     )
                        //   }
                        // >
                        //   Cancel
                        // </button>
                      ) : (
                        <button
                          className="w-[50%] uppercase font-Marcellus md:hidden xl:block  bg-text_Color2 text-white mb-3  mt-1 p-2 rounded-3xl"
                          onClick={() =>
                            reorderApiCallHandler(
                              opneorder._id,
                              opneorder.user_id,
                              1
                            )
                          }
                          disabled={clicked}
                        >
                          Re-order
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* For Desktop */}
                {openIndex === index ? (
                  <div className="mobile:w-[97%] sm:w-[97%] md:w-[49%] md:mx-2 xl:w-[40%] xl:pb-1  xl:ml-[59%] xl:mt-0 mobile:mx-auto sm:mx-auto md:flex md:flex-col md:justify-end md:pb-2  bg-Cream rounded-xl pb-3 mt-1">
                    {opneorder.Documents.map((document) => (
                      <div key={document._id} className="my-auto">
                        <div
                          onClick={() =>
                            HandlerDownload(
                              document._id,
                              opneorder._id,
                              opneorder.user_id
                            )
                          }
                          disabled={clicked}
                          className="w-full mt-3 flex sm:justify-center sm:items-center  mobile:justify-center mobile:items-center cursor-pointer"
                        >
                          <p className="w-[35%] flex justify-end mr-5">
                            <MdOutlineFileDownload size={25} />
                          </p>
                          <button className=" w-[65%] text-start gap-y-2 text-xl font-Marcellus">
                            {" "}
                            {document.DocumentName}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* For Mobile  */}
                {orderShow[index] && (
                  <div className="">
                    {/* Document Download Section */}
                    <div className="w-full mx-auto sm:mobile:mt-4 mobile:mt-4 md:mt-0 ">
                      <h1 className="font-roxborough font-bold text-xl text-center md:hidden lg:hidden xl:hidden">
                        Order Value : {formattedAmount(opneorder.TotalAmount)}
                      </h1>

                      <div className="w-full flex md:flex-row-reverse gap-x-2 xl:hidden ">
                        {opneorder.status <= 0 ? (
                          <div className="w-[50%] mt-3">
                            <button
                              type="button"
                              className="w-full text-text_Color2 border-2  border-text_Color  py-2 rounded-3xl"
                              onClick={() => cacelOrderHandler()
                              }
                            >
                              Cancel
                            </button>
                            {cancelOrderModal && (
                              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-md w-[300px] h-auto ">
                                  <MdDeliveryDining
                                    size={35}
                                    className="w-full mx-auto text-text_Color"
                                  />
                                  <h1 className="w-[90%] mt-2.5 text-center mx-auto text-xl text-text_Color font-roxborough">
                                    Are you sure you want to Cancel Order?
                                  </h1>
                                  <div className="w-[90%] flex justify-between gap-x-2 mt-3 mx-auto font-Marcellus">
                                    <button
                                      onClick={() =>
                                        setCancelOrderModal(false)
                                      }
                                      className="uppercase p-2 border border-text_Color2 text-text_Color2 rounded-3xl w-[50%]"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                reorderApiCallHandler(
                                  opneorder._id,
                                  opneorder.user_id,
                                  0
                                )
                                      }
                                      disabled={clicked}
                                      className="uppercase p-2 bg-text_Color2 text-white rounded-3xl w-[50%]"
                                    >
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            className="w-[50%] uppercase font-Marcellus  bg-text_Color2 text-white  mt-3 rounded-3xl"
                            onClick={() =>
                              reorderApiCallHandler(
                                opneorder._id,
                                opneorder.user_id,
                                1
                              )
                            }
                            disabled={clicked}
                          >
                            Re-order
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            toggleDocumentVisibility(index);
                          }}
                          disabled={clicked}
                          className="w-[50%] uppercase flex justify-center items-center font-Marcellus text-white bg-text_Color2 p-2.5 rounded-3xl mt-3"
                        >
                          Documents{" "}
                          <span className="ml-5">
                            {orderShow[index].showDocument ? (
                              <FaAngleUp size={20} />
                            ) : (
                              <FaAngleDown size={20} />
                            )}
                          </span>{" "}
                        </button>
                      </div>

                      {orderShow[index].showDocument ? (
                        <div className="mobile:w-[97%] sm:w-[97%] md:w-[49%] md:mx-2 xl:w-[40%] xl:pb-1  xl:ml-[59%] xl:mt-0 mobile:mx-auto sm:mx-auto md:flex md:flex-col md:justify-end md:pb-2  bg-Cream rounded-xl pb-3 mt-1 xl:hidden">
                          {opneorder.Documents.map((document) => (
                            <div key={document._id} className="my-auto">
                              <div
                                onClick={() =>
                                  HandlerDownload(
                                    document._id,
                                    opneorder._id,
                                    opneorder.user_id
                                  )
                                }
                                disabled={clicked}
                                className="w-full mt-3 flex sm:justify-center sm:items-center  mobile:justify-center mobile:items-center cursor-pointer"
                              >
                                <p className="w-[35%] flex justify-end mr-5">
                                  <MdOutlineFileDownload size={25} />
                                </p>
                                <button className=" w-[65%] text-start gap-y-2 text-xl font-Marcellus">
                                  {" "}
                                  {document.DocumentName}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* Product Displays */}
                    <div className="mt-5 border-t-2 border-b-2 border-text_Color  p-3 uppercase flex justify-between font-Marcellus font-semibold text-text_Color">
                      <p className="w-[70%]">Series</p>
                      <p className="w-[20%] text-center">Quantity</p>
                    </div>

                    <div>
                      {opneorder.OrderData.map((Order, index) => (
                        <div
                          key={Order._id}
                          className="border-b-2 pb-4 border-[#C28E5E] pt-3"
                        >
                          <div className="text-text_Color2 flex justify-between p-3 font-Marcellus font-semibold  text-xl ">
                            <h1
                              className="w-[70%] flex items-start"
                              onClick={() => toggleProductVisibility(index)}
                            >
                              {Order.seriesName}
                              <span className="my-auto ml-4">
                                {showProduct[index] ? (
                                  <FaAngleUp size={20} />
                                ) : (
                                  <FaAngleDown size={20} />
                                )}
                              </span>
                            </h1>
                            <p className="w-[20%] text-center">
                              {Order.totalQuantity}
                            </p>
                          </div>

                          {/* <div className="border-b-2 pb-4 border-[#C28E5E]"> */}
                          {showProduct[index] && (
                            <div>
                              {Order.Products.map((product, index) => (
                                <div
                                  key={product._id}
                                  className="p-3 text-text_Color font-roxborough font-semibold "
                                >
                                  <div className="flex justify-between">
                                    <h1 className="w-[70%]">
                                      {index + 1}. {product.ProductName}
                                    </h1>
                                    <p className="w-[20%] text-center">
                                      {product.totalQuantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* </div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full flex items-center mt-4 h-16 md:h-12 overflow-x-auto scrollbar scrollbar-w-2 ">
                  {statusData.map((status, index) => (
                    <div
                      key={index}
                      className="mobile:w-[50%] h-full flex items-center sm:w-[30%] md:w-[20%] md:text-xs lg:text-sm xl:text-base  bg-Cream  mobile:flex-shrink-0 sm:flex-shrink-0 "
                    >
                      <h1
                        className={`flex items-center  w-full ${
                          opneorder.status <= index - 1
                            ? "text-gray-400"
                            : "text-text_Color"
                        }`}
                      >
                        <FaCircleCheck className="mx-1" /> {status.status}
                        {index !== statusData.length - 1 && (
                          <FaLongArrowAltRight className="mx-1" />
                        )}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default OrderDetailsData;
