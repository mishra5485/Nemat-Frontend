import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    openOrderGetAll();
  }, []);

  const openOrderGetAll = async () => {
    try {
      const payload = {
        user_id: _id,
      };

      console.log(payload);

      let opneorderResponse = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/getopenorders`,
        payload
      );

      console.log(opneorderResponse.data);
    } catch (error) {
      if (error.opneorderResponse) {
        const { status, data } = error.opneorderResponse;

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          console.log(error.opneorderResponse);
          toast.error(data);
          setLoading(false);
        }
      }
    }
  };

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="text-text_Color">
      <div>
        <div>
          <h1>Orders</h1>
                  <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={toggleSwitch}
          />
          <div
            className={`toggle-switch w-10 h-6 bg-text_Color2 rounded-full p-1 ${
              isChecked ? 'bg-gray-300 ' : ''
            }`}
          >
            <div
              className={`toggle-thumb w-4 h-4 bg-white rounded-full shadow-md transform ${
                isChecked ? 'translate-x-full ' : ''
              }`}
            ></div>
          </div>
        </div>
        <div className="ml-2 text-gray-700 font-medium">Toggle</div>
      </label>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
