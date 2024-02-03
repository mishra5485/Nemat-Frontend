import React, { useState } from "react";

const AddAddress = ({ address }) => {
  console.log("address ===> " , address);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddressClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <div>
        <h1 className="uppercase font-Marcellus text-text_Color font-bold">
          Deliver to
        </h1>
      </div>
      {address  &&
        address.map((addressData, index) => (
          <div key={index} className="mt-6 w-full">
               <div className="flex  justify-start text-text_Color font-roxborough font-semibold text-xl">
                  <input 
                     type="radio"
                     className="w-5 h-5 my-auto"
                  />
                  <p className=" ml-3 ">{addressData.City}</p>
               </div>
               <div className="w-[70%] ml-8 text-text_Color font-Marcellus mt-3">
                  <p>
                     {addressData.StreetAddress} {addressData.LocationName} {addressData.ZipCode}
                  </p>
               </div>
          </div>
        ))}
        <button 
         onClick={handleAddAddressClick}
        className="mt-10 py-2  px-3  uppercase font-Marcellus font-semibold rounded-3xl text-text_Color border border-text_Color">

         Add Address
        </button>

        {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
          {/* Your modal content goes here */}
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add Address</h2>
            {/* Add your form or any content for adding an address */}
            <button
              onClick={handleCloseModal}
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddress;
