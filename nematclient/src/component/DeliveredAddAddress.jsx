import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DeliveredAddAddress = ({ address }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [State, setState] = useState([]);
  const [citys, setCity] = useState([]);
  const [countryIso2, setCountryISO2] = useState("");
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const API_KEY = "Mk5hNW5Tb1lZSEhITDg2eTVhMUxhbm5mYjBEbGRER3U4ZHFENXdRQQ==";

  const { user } = useSelector((store) => store.profile);

  useEffect(() => {
    const getallCountriesData = async () => {
      try {
        // Replace 'your_actual_api_key_here' with your actual API key

        const config = {
          headers: {
            "X-CSCAPI-KEY": API_KEY,
          },
        };

        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries",
          config
        );
        setCountriesData(response.data);
        console.log("Countries Data:", response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getallCountriesData();
  }, []);

  const handleAddAddressClick = () => {
    setIsModalOpen(true);
  };

  const addAddressHandler = async () => {
    try {
      const payload = {
        user_id: customer_id,
        LocationName: LocationName,
        StreetAddress: "",
        Country: "",
        City: "",
        ZipCode: "",
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/addshippingaddress`,
        payload
      );

      toast.success(response.data);
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

  const addAddressObject = yup.object({
    location: yup.string().required(),
    streetaddress: yup.string().required(),
    country: yup.string(),
    state: yup.string(),
    city: yup.string(),
    zipcode: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(999)
      .max(9999999)
      // .required("Enter the Price Code"),
  });

  const initialValues = {
    location: "",
    streetaddress: "",
    country: "",
    state: "",
    city: "",
    zipcode:"",
   
  };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: addAddressObject,
      onSubmit: async (values) => {
        const palyload = {
          user_id: user.customer_id,
          LocationName: values.location,
          StreetAddress: values.streetaddress,
          Country: country,
          State: stateName,
          City: cityName,
          zipcode: values.zipcode,
        };

        console.log("Payload ==> " , palyload  )

        try {
          let response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/user/addshippingaddress`,
            palyload
          );

          console.log(response)

          if (response.status === 200) {
            console.log(response.data);   

          }
        } catch (error) {
          //Error which Coming From Server.
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
              toast.error(data);
            }
          }
        }
      },
    });

  let countryiso2 = "";
  const handlerChangeState = async (event) => {
    console.log("Selected _id:", event);

    countryiso2 = event.target.value;
    console.log("iso2", countryiso2);
    setCountryISO2(event.target.value);
    try {
      const config = {
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
      };

      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryiso2}/states`,
        config
      );

      console.log(response.data);
      setState(response.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status, data } = error.response;
        console.error(`Response error - Status: ${status}, Data:`, data);
      }
    }
  };

  let stateiso2 = "";
  const handlerChangeCity = async (event) => {
    console.log("Selected _id:", event);

    stateiso2 = event.target.value;
    console.log("iso2", stateiso2);

    try {
      const config = {
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
      };

      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateiso2}/cities`,
        config
      );

      console.log(response.data);
      setCity(response.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status, data } = error.response;
        console.error(`Response error - Status: ${status}, Data:`, data);
      }
    }
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
            onClick={handleAddAddressClick}
            className="mt-10 py-2  px-3  uppercase font-Marcellus font-semibold rounded-3xl text-text_Color border border-text_Color"
          >
            Add Address
          </button>

          {/* Add address modal */}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
              {/* Your modal content goes here */}
              <div className="bg-white p-4 rounded-md w-[500px] h-auto">
                <div className="flex w-[90%] mx-auto">
                  <h2 className="w-[100%] mx-auto text-2xl font-bold mb-4 text-text_Color2 font-roxborough ">
                    Add Address
                  </h2>
                  <p onClick={() => setIsModalOpen(false)}>
                    <IoMdCloseCircle className="text-text_Color2" size={25} />
                  </p>
                </div>

               <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}>

               
                <div>
                  <div className="md:w-[90%] mx-auto">
                    <div className="">
                      <input
                        className="flex h-8 w-full text-text_Color font-Marcellus  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm md:mt-2 disabled:opacity-50 "
                        type="text"
                        placeholder="Location Name (Eg: Mumbai Wearhouse)"
                        id="location"
                        onChange={handleChange}
                        value={values.location}
                        required
                      ></input>
                      {/* {errors.camponeyname && touched.camponeyname ? (
                              <p className="font-Marcellus text-red-900">{errors.camponeyname}</p>
                            ) : (
                              null
                            )} */}
                    </div>
                  </div>
                  <div className="md:w-[90%] mx-auto mt-2">
                    <div className="">
                      <input
                        className="flex h-8 w-full text-text_Color font-Marcellus  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm md:mt-2 disabled:opacity-50 "
                        type="text"
                        placeholder="Street Address *"
                        id="streetaddress"
                         onChange={handleChange}
                        value={values.streetaddress}
                        required
                      ></input>
                      {/* {errors.camponeyname && touched.camponeyname ? (
                              <p className="font-Marcellus text-red-900">{errors.camponeyname}</p>
                            ) : (
                              null
                            )} */}
                      {/* Selection tage for state and city  */}
                    </div>
                    <div className="w-full flex gap-x-3 mt-2">
                      {/* Country Selection */}

                      <select
                        id="country"
                        name="country"
                        value={values.country}
                        onChange={async (event) => {
                          await handleChange(event);
                          handlerChangeState(event);

                          const selectedIso2 = event.target.value;

                        
                          const selectedCountry = countriesData.find(
                            (country) => country.iso2 === selectedIso2
                          );
                          setCountry(
                            selectedCountry ? selectedCountry.name :""
                          );

                        }}
                        className="flex h-10 w-[30%] text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29]"
                      >
                        <option value="" disabled>
                          Select Country
                        </option>
                        {countriesData?.map((country, id) => (
                          <option key={country.id} value={country.iso2}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      {/* State Selection */}
                      <select
                        id="state"
                        name="state"
                        value={values.state}
                        onChange={async (event) => {
                          await handleChange(event);
                          handlerChangeCity(event);


                          const selectedIso2 = event.target.value;

                        
                          const selectedCountry = State.find(
                            (country) => country.iso2 === selectedIso2
                          );
                          setStateName(
                            selectedCountry ? selectedCountry.name : ""
                          );

                        }}
                        className="flex h-10 w-[32%] text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29]"
                      >
                        <option value="" disabled>
                          Select State
                        </option>
                        {State?.map((state) => (
                          <option key={state.id} value={state.iso2}>
                            {state.name}
                          </option>
                        ))}
                      </select>

                      {/* City Selection */}
                      <select
                        id="city"
                        name="city"
                        onChange={async (event)=> {
                           await handleChange(event)

                           const selectedIso2 = event.target.value;

                        
                          const selectedCountry = citys.find(
                            (country) => country.iso2 === selectedIso2
                          );
                          setCityName(
                            selectedCountry ? selectedCountry.name : ""
                          );
                        }
                        }
                        value={values.city}
                        className="flex h-10 w-[32%] text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29]"

                      >
                        <option value="">Select City</option>
                        {citys?.map((city) => (
                          <option key={city.id} value={city.iso2}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="">
                      <input
                        className="flex h-10 w-full text-text_Color font-Marcellus  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm md:mt-2 disabled:opacity-50 "
                        type="text"
                        placeholder="Zip Code  *"
                        id="zipcode"
                        value={values.zipcode}
                         onChange={handleChange}
                        pattern="[0-9]*"
                        required
                      ></input>
                    </div>
                  </div>
                </div>
                </form>
                {/* Add your form or any content for adding an address */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-[90%] uppercase flex items-center justify-center mt-3 mx-auto bg-text_Color2 rounded-3xl   py-2 px-4  text-white "
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveredAddAddress;
