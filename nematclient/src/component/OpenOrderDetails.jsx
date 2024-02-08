import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { formattedAmount } from "./common/FormatAmount";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";

const OpenOrderDetails = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getAllOpenOrderDetails();
  }, []);

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

  const getAllOpenOrderDetails = async () => {
    const payload = {
      user_id: _id,
    };

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/getopenorders`,
        payload
      );

      console.log(response.data);
      setOpenOrderData(response.data);
      setLoading(false);
    } catch (error) {
      const { status, data } = error.response;

      if (
        status === 404 ||
        status === 500 ||
        status === 302 ||
        status === 409 ||
        status === 401 ||
        status === 400
      ) {
        if (status === 403) {
          setNoData(true);
        }
        console.log(error.response);
        setLoading(false);
      }
    }
  };

  const HandlerDownload = async (DocumentID, OrderId, UserId) => {
    const payload = {
      user_id: UserId,
      order_id: OrderId,
      document_id: DocumentID,
    };

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/downloadDocuments`,
        payload
      );

      console.log("payload===>", payload);
      console.log(response.data);
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

  const toggleProductVisibility = (orderIndex) => {
    setShowProduct((prevShowProduct) => {
      const updatedShowProduct = [...prevShowProduct];
      updatedShowProduct[orderIndex] = !updatedShowProduct[orderIndex];
      return updatedShowProduct;
    });
  };

  return (
    <div className="sm:mt-4 mobile:mt-4 md:h-auto ">
      {loading ? (
        <p>Loaddding....</p>
      ) : (
        <>
          {nodata ? (
            <p>No Open Orders Found</p>
          ) : (
            <div className="text-text_Color">
              {openOrderData.map((opneorder, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center pt-4 pb-4 border-b-2 border-text_Color">
                    <h1 className="font-roxborough text-xl font-bold">
                      Order No : {opneorder.OrderNumber}
                    </h1>
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

                  {orderShow[index] && (
                    <div>
                      {/* Document Download Section */}
                      <div className="w-full mx-auto mt-4">
                        <h1 className="font-roxborough font-bold text-xl text-center">
                          Order Value : {formattedAmount(opneorder.TotalAmount)}
                        </h1>

                        <button
                          type="button"
                          onClick={() => {
                            toggleDocumentVisibility(index);
                          }}
                          className="uppercase flex justify-center items-center font-Marcellus text-white bg-text_Color2 w-full p-2.5 rounded-3xl mt-3"
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
                        {orderShow[index].showDocument ? (
                          <div className="w-[97%] mx-auto bg-Cream rounded-xl pb-3">
                            {opneorder.Documents.map((document) => (
                              <div key={document._id}>
                                <div
                                  onClick={() =>
                                    HandlerDownload(
                                      document._id,
                                      opneorder._id,
                                      opneorder.user_id
                                    )
                                  }
                                  className="w-full mt-3 flex justify-center items-center cursor-pointer"
                                >
                                  <p className="w-[35%] flex justify-end mr-5">
                                    <MdOutlineFileDownload size={25} />
                                  </p>
                                  <button className=" w-[65%] text-start gap-y-2 text-xl font-Marcellus">
                                    {" "}
                                    {document.DocumentTypeName}
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

                  <div className="w-full flex items-center mt-4 h-16 overflow-x-auto scrollbar scrollbar-w-2">
                    {statusData.map((status, index) => (
                      <div
                        key={index}
                        className="mobile:w-[50%] h-full flex items-center sm:w-[30%] bg-Cream flex-shrink-0"
                      >
                        <h1
                          className={`flex items-center w-full ${
                            opneorder.status <= index-1
                              ? "text-gray-400"
                              : "text-text_Color"
                          }`}
                        >
                          <FaCircleCheck className="mx-1" /> {status.status}{" "}
                          <IoRemoveOutline className="mx-1" />{" "}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OpenOrderDetails;
