import { useState } from "react";
import AddAddress from "./common/AddAddress";

const DeliveredAddAddress = ({
  address,
  setAddress,
  selectedAddressId,
  setSelectedAddressId,
}) => {
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
            <h1 className="uppercase font-Marcellus text-xl text-text_Color font-bold">
              Deliver to
            </h1>
          </div>
          {address &&
            address.map((addressData, index) => (
              <div key={index} className="mt-6 w-full">
                <div className="flex justify-start text-text_Color font-roxborough font-semibold text-xl">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedAddressId === addressData._id}
                      onChange={() => handleRadioChange(addressData._id)}
                    />
                    <div className="w-5 h-5 border border-text_Color rounded-sm flex items-center justify-center mr-3">
                      {selectedAddressId === addressData._id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mt-0.5 text-text_Color"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.293 3.293a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414 0l-4.5-4.5a1 1 0 1 1 1.414-1.414L7 11.086l8.293-8.293a1 1 0 0 1 1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p>{addressData.City}</p>
                  </label>
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
            <AddAddress
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              address={address}
              setAddress={setAddress}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveredAddAddress;
