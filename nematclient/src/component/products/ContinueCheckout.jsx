import axios from "axios";
import React, { useState } from "react";
import { GoDownload } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";

const ContinueCheckout = ({user , selectedAddressId}) => {


  console.log("selectedAddressId ===> ", selectedAddressId)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const user_id = user.customer_id

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const checoutorder = async() => {

      const payload = {
         user_id : user_id,
         shippingAddress_id : selectedAddressId
      }


      try {

         let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/placeorder` ,
            payload
         )

         if(response.status === 200){
          setIsModalOpen(true)
          toast.success(response.data)
         }

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
        }
      }
      }
  };

  return (
    <div>
      <Toaster/>
      <div className=" w-[80%] mx-auto text-center  items-center p-2 rounded-3xl bg-text_Color2 font-Marcellus text-lg mb-5 ">
        <button className="uppercase text-white " onClick={() => {checoutorder()}}>
          Continue to checkout
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center ">
          {/* Your modal content goes here */}
          <div className="bg-white p-4 rounded-md w-[600px] h-[230px]">
            <div className="w-[90%] h-[90%] m-auto">
              <div className="w-[80%] text-center mx-auto text-text_Color">
                <h1 className="text-text_Color font-roxborough font-semibold text-xl">
                  We have received your order
                </h1>
                <p className="font-Marcellus  mt-4">
                  Please download sales order(s) and complete bank transfer to
                  confirm your order.
                </p>
              </div>

              <div className="flex w-[90%] mx-auto mt-7 justify-between ">
                <button
                  onClick={handleCloseModal}
                  className="py-2 w-[40%]  border-text_Color border-2 rounded-3xl"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="text-white w-[55%] bg-text_Color2 rounded-3xl   font-medium  flex justify-center py-2 text-center  items-center  uppercase"
                >
                  <GoDownload  size={25} className="mr-2"/>
                     Sales order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContinueCheckout;
