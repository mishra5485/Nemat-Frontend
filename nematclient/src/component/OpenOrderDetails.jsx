import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { formattedAmount } from "./common/FormatAmount";
import { MdOutlineFileDownload } from "react-icons/md";

const OpenOrderDetails = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [nodata, setNoData] = useState(false);
  const [openOrderData, setOpenOrderData] = useState([]);
  const [showDocument, setShowDocument] = useState(false);
  const [orderShow , setOrderShow] = useState(openOrderData.map(() => ({
    showDocument: false,
  })));

  useEffect(() => {
    getAllOpenOrderDetails();
  }, []);

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

      console.log("payload===>" , payload)
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

  const documentHandler = () => {
    setShowDocument(!showDocument);
  };

  const toggleOrderVisibility = (index) => {
    const updatedVisibility = [...orderShow];
    updatedVisibility[index] = !updatedVisibility[index];
    setOrderShow(updatedVisibility);
  };

  return (
    <div className="mt-4">
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
                     { orderShow[index] ? <FaAngleUp size={20}   onClick={() => toggleOrderVisibility(index)}/> : <FaAngleDown size={20}   onClick={() => toggleOrderVisibility(index)}/> }
                  </div>

               {
                  orderShow[index] && (
                      <div>
                  {/* Document Download Section */}
                  <div className="w-full mx-auto mt-4">
                    <h1 className="font-roxborough font-bold text-xl text-center">
                      Order Value : {formattedAmount(opneorder.TotalAmount)}
                    </h1>

                    <button
                      type="button"
                      onClick={() => {
                        documentHandler();
                      }}
                      className="uppercase flex justify-center items-center font-Marcellus text-white bg-text_Color2 w-full p-2.5 rounded-3xl mt-3"
                    >
                      Documents{" "}
                      <span className="ml-5">
                        {showDocument ? (
                          <FaAngleUp size={20} />
                        ) : (
                          <FaAngleDown size={20} />
                        )}
                      </span>{" "}
                    </button>
                    {showDocument ? (
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
                     {
                        opneorder.OrderData.map((Order , index ) => (
                           <div key={index} className="border-b-2 pb-4 border-[#C28E5E] pt-3">
                              <div className="text-text_Color2 flex justify-between p-3 font-Marcellus font-semibold  text-xl ">
                                 <h1 className="w-[70%] flex items-start">{Order.seriesName} <span className="my-auto ml-4"><FaAngleDown size={22}/></span></h1>
                                 <p className="w-[20%] text-center">{Order.totalQuantity}</p>
                              </div>

                              {/* <div className="border-b-2 pb-4 border-[#C28E5E]"> */}
                              {
                                 Order.Products.map((product , index) => (
                                    <div key={product._id} className="p-3 text-text_Color font-roxborough font-semibold ">
                                       <div className="flex justify-between">
                                          <h1 className="w-[70%]">{index+1}.  {product.ProductName}</h1>
                                          <p className="w-[20%] text-center">{product.totalQuantity}</p>
                                       </div>
                                    </div>
                                 ))
                              }
                              {/* </div> */}
                           </div>
                        ))
                     }
                  </div>

                  </div>
                  ) 
               }
                 
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
