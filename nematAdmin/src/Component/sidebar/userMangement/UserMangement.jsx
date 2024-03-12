import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNewComponent from "./UserNewComponent";

const UserManagement = () => {
  const [userDatas, setUserDatas] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedArray, setSelectedArray] = useState(null);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    try {
      const userData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/customer/getall`
      );
      setApiData(userData.data);
      // Set the selectedArray to the first array name by default
      setSelectedArray(Object.keys(userData.data)[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setApiData(null);
      setLoading(false);
    }
  };

  const handleArrayClick = (arrayName) => {
    setSelectedArray(arrayName);
  };

  console.log(selectedArray);

  console.log(selectedArray);

  return (
    <div className="overflow-x-auto">
      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Company Management</h1>
      </div>

      {loading ? (
        <p>Loading......</p>
      ) : (
        <div className="bg-white dark:bg-gray-800">
          <nav className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              {apiData && (
                <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                  {Object.keys(apiData).map((arrayName, index) => (
                    <li
                      key={index}
                      onClick={() => handleArrayClick(arrayName)}
                      className={`text-gray-900 dark:text-white hover:underline cursor-pointer transition-colors duration-300 ease-in-out ${
                        selectedArray === arrayName
                          ? "bg-[#666666] text-white rounded-lg px-4 py-2"
                          : ""
                      }`}
                    >
                      {arrayName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
          {selectedArray && apiData && (
            <UserNewComponent selectedArray={apiData[selectedArray]} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
