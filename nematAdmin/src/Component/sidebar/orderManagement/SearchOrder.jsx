import axios from "axios";
import { useEffect, useState } from "react";
import OrderManagementList from "./OrderManagementList";



const SearchOrder = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      
      const passOrderNumber = parseInt(debouncedSearchTerm)

      try {
        const payload = {
          OrderNumber: passOrderNumber,
        };

        // console.log("Payload" , payload)

        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/admin_order/get/searchData`,
          payload
        );

        
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
            setLoading(false);
          }
        }
      }
    };

    // Fetch data only if search term is not empty
    if (debouncedSearchTerm !== "") {
      fetchData();
    } else {
      // If search term is empty, reset filtered data to initial data
      // setFilteredData(allProductData);
    }
  }, [debouncedSearchTerm]);

   const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };



  return (
    <div>
      <form className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
          <input
            type="text"
            placeholder="Search"
            id="camponeyorder"
            value={searchTerm}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchOrder;
