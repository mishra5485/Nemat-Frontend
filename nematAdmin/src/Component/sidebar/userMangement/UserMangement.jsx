import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNewComponent from "./UserNewComponent";
import toast, { Toaster } from "react-hot-toast";


const UserManagement = () => {
  const [userDatas, setUserDatas] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedArray, setSelectedArray] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [maxData, setMaxData] = useState(1);
  const [flagSend, setFlagSend] = useState("1");
  const [flagGetData, setFlagGetData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  useEffect(() => {
    getAllUserData();
  }, [flagSend, currentPage]);

  const companyDropDown = [
    {
      id: 1,
      value: 1,
      title: "ActiveUsers",
    },
    {
      id: 2,
      value: 3,
      title: "EmailVerified",
    },
    {
      id: 3,
      value: 4,
      title: "EmailNotVerified",
    },
    {
      id: 4,
      value: 2,
      title: "DisabledUsers",
    },
  ];

  const getAllUserData = async () => {
    const statusCheck = parseInt(flagSend);
    const payload = {
      flag: statusCheck,
    };

    try {
      const userData = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/users/customer/getall/${pageSize}/${currentPage}`,
        payload
      );

      console.log(userData.data);

      setApiData(userData.data.CustomerData);
      setOriginalData(userData.data.CustomerData);

      if (currentPage == 0) {
        setMaxData(Math.ceil(response.data.otalCustomerDataLength / pageSize));
      }

      setLoading(false);

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
          setApiData(null);
          setOriginalData(null)
          toast.error(data);
          setLoading(false);
        }
      }
    }
  };

  const handleArrayClick = async (value) => {
    setFlagSend(value);
    // setFlagGetData(true);
    setCurrentPage(0);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setFlagGetData(true);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFlagGetData(true);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const payload = {
          keyword: debouncedSearchTerm,
        };

        console.log("Payload", payload);

        let response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/users/customer/get/searchData`,
          payload
        );

        console.log(response.data);
        setApiData(response.data);
        setLoading(false);
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
            toast.error(data)
            setLoading(false);
          }
        }
      }
    };

    // Fetch data only if search term is not empty
    if (debouncedSearchTerm !== "") {
      fetchData();
    } else {
      setApiData(originalData);
    }
  }, [debouncedSearchTerm , originalData]);


  // console.log("currentPage" , currentPage)
  // console.log("MAx value " , maxData)

  return (
    <div className="overflow-x-auto">
      <div className="mt-4 mb-2 font-bold text-4xl text-start pb-6 border-b-2 border-black">
        <h1>Company Management</h1>
      </div>

      <Toaster/>

      {loading ? (
        <p>Loading......</p>
      ) : (
        <div className="bg-white dark:bg-gray-800">
          <div className="bg-white dark:bg-gray-800">
            <nav className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center justify-between">
                <select
                  value={flagSend}
                  onChange={(e) => handleArrayClick(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2 dark:bg-gray-700 "
                >
                  {companyDropDown.map((data) => (
                    <option key={data.id} value={data.value}>
                      {data.title}
                    </option>
                  ))}
                </select>
                <div className=" w-[80%] xl:w-[45%]  justify-end ml-3">
                  <div>
                    <form className="flex items-center">
                      <label htmlFor="simple-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                        <input
                          type="text"
                          placeholder="Search with User Name"
                          id="camponeyorder"
                          value={searchTerm}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {
            apiData && (
              <>
                 <UserNewComponent selectedArray={apiData} />
                 
                <div className="flex  px-4 py-3">
                  {currentPage !== 0 && (
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 0 || loading}
                      className="bg-gray-200 mr-5 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded"
                    >
                      Prev
                    </button>
                 )}

                  {currentPage + 1 !== maxData && (
                    <button
                      onClick={goToNextPage}
                      disabled={loading}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )
          }
        </div>
      )}
    </div>
  );
};

export default UserManagement;
