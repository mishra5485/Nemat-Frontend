import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetailsData from "./common/orderDetailsData";
import getToken from "./auth/GetToken";


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

  const navigate = useNavigate()

  useEffect(() => {
    getAllOpenOrderDetails();
  }, []);

  const getAllOpenOrderDetails = async () => {
    const payload = {
      user_id: _id,
    };

    try {

      const header = getToken();

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/getopenorders`,
        payload , 
        header
      );

      console.log(response.data);
      setOpenOrderData(response.data);
      setLoading(false);
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
        if (status === 403) {
          setNoData(true);
        }
        console.log(error.response);
        setLoading(false);
      }
    }
  };

  return (
    // <div className="sm:mt-4 mobile:mt-4 md:h-auto md:ml-[7%]   ">
      <div>
      {loading ? (
        <p>Loaddding....</p>
      ) : (
        <>
          {nodata ? (
            <p>No Open Orders Found</p>
          ) : (
            <OrderDetailsData data={openOrderData} _id={_id}/>
          )}
        </>
      )}
    </div>
  );
};

export default OpenOrderDetails;
