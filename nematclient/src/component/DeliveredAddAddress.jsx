
import {useState } from "react";
import AddAddress from "./common/AddAddress";

const DeliveredAddAddress = ({ address , setAddress , selectedAddressId , setSelectedAddressId}) => {

  
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleAddAddressClick = () => {
    setIsModalOpen(true);
  };

  
  const handleRadioChange = (addressId) => {
    setSelectedAddressId(addressId);
  };

  return (
    <div>
      <div className="mt-6">
        <div>
          <div>
            <h1 className="uppercase font-Marcellus text-text_Color font-bold">
              Deliver to
            </h1>
          </div>
          {address &&
            address.map((addressData, index) => (
              <div key={index} className="mt-6 w-full">
                <div className="flex  justify-start text-text_Color font-roxborough font-semibold text-xl">
                  <input
                    type="radio"
                    className="w-5 h-5 my-auto"
                    checked={selectedAddressId === addressData._id}
                    onChange={() => handleRadioChange(addressData._id)}
                  />
                  <p className=" ml-3 ">{addressData.City}</p>
                </div>
                <div className="w-[70%] ml-8 text-text_Color font-Marcellus mt-3">
                  <p>
                    {addressData.StreetAddress} {addressData.LocationName}{" "}
                    {addressData.ZipCode}
                  </p>
                </div>
              </div>
            ))}
          <button
            type="button"
            onClick={handleAddAddressClick}
            className="mt-10 py-2  px-3  uppercase font-Marcellus font-semibold rounded-3xl text-text_Color border border-text_Color"
          >
            Add Address
          </button>

          {/* Add address modal */}
          {isModalOpen && (
            <AddAddress setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} address={address} setAddress={setAddress} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveredAddAddress;
