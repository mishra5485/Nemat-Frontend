
import React, {  useState } from "react";
import DeliveredOrderDetails from "./DeliveredOrderDetails";
import OpenOrderDetails from "./OpenOrderDetails";

const OrderDetails = () => {

  const [isChecked, setIsChecked] = useState(false);
  

  
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="text-text_Color mb-6">
      <div>
        <div className="flex justify-between mt-4 border-b-2 pb-5 border-Cream">
          <h1 className="font-roxborough font-bold  text-xl">Orders</h1>
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
            className={`toggle-switch w-10 h-6  bg-gray-300 rounded-full p-1 ${
              isChecked ? ' bg-text_Color2 ' : ''
            }`}
          >
            <div
              className={`toggle-thumb w-4 h-4 bg-white rounded-full shadow-md transform ${
                isChecked ? 'translate-x-full ' : ''
              }`}
            ></div>
          </div>
        </div>
        {
          isChecked ? (
            <div>
              <h1 className="ml-2 text-text_Color2 font-medium font-Marcellus">Delivered orders</h1>
            </div>
          ) : (
            <h1 className="ml-2 text-text_Color font-medium font-Marcellus">Delivered orders</h1>
          )
        }        
      </label>
        </div>
      </div>

      {
        isChecked ? (
          <div>
            <DeliveredOrderDetails/>
          </div>
        ) : (
        <div>
          <OpenOrderDetails/>
        </div> 
        )
      }
    </div>
  );
};

export default OrderDetails;
