import toast, { Toaster } from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import getToken  from "../auth/GetToken";

const EditAddress = ({ editModalOpen , setEditModalOpen , selectedAddress , setAddress}) => {

  // console.log("selectedAddress ==> " , selectedAddress)
  const { user } = useSelector((store) => store.profile);


  const [countriesData, setCountriesData] = useState([]);
  const [State, setState] = useState([]);
  const [citydata, setCitydata] = useState([]);
  const [countryIso2, setCountryISO2] = useState("");
  const [country, setCountry] = useState(selectedAddress.Country);
  const [stateName, setStateName] = useState(selectedAddress.State);
  const [city , setCity] = useState(selectedAddress.City)

  let countryiso2Check= selectedAddress.CountryIsoCode;
  let stateiso2Check = selectedAddress.StateIsoCode;

  const API_KEY = "Mk5hNW5Tb1lZSEhITDg2eTVhMUxhbm5mYjBEbGRER3U4ZHFENXdRQQ==";

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
        // console.log("Countries Data:", response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    const getAllStateDataByCountry = async () => {
      try {
      const config = {
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
      };

      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${selectedAddress.CountryIsoCode}/states`,
        config
      );

      // console.log(response.data);
      setState(response.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status, data } = error.response;
        console.error(`Response error - Status: ${status}, Data:`, data);
      }
    }
    }

    const getallcityByStateAndCountry = async () => {
         try {
      const config = {
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
      };

      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${selectedAddress.CountryIsoCode}/states/${selectedAddress.StateIsoCode
}/cities`,
        config
      );

      // console.log(response.data);
      setCitydata(response.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status, data } = error.response;
        console.error(`Response error - Status: ${status}, Data:`, data);
      }
    }
    }

    getallCountriesData();
    getAllStateDataByCountry();
    getallcityByStateAndCountry();
  }, []);

  const EditAddressObject = yup.object({
    location: yup.string().required(),
    streetaddress: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    zipcode: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(999)
      .max(9999999)
      .required("Enter the Zipcode Code"),
  });

  const initialValues = {
    location: selectedAddress.LocationName,
    streetaddress: selectedAddress.StreetAddress,
    country: selectedAddress.Country,
    state: selectedAddress.State,
    city: selectedAddress.City,
    zipcode:selectedAddress.ZipCode,
  };



  const { values, errors, handleChange, handleSubmit, touched, handleBlur , resetForm, } =
    useFormik({
      initialValues,
      validationSchema: EditAddressObject,
      onSubmit: async (values) => {
        const palyload = {
          user_id: user.customer_id,
          address_id:selectedAddress._id,
          LocationName: values.location,
          StreetAddress: values.streetaddress,
          Country:country,
          CountryIsoCode:values.country,
          State:stateName,
          StateIsoCode:values.state,
          City:city,
          CityIsoCode:values.city,
          ZipCode:values.zipcode,
        };


        if(country === selectedAddress.Country ) {
          palyload.CountryIsoCode = countryiso2Check
          
        }

        if(stateName === selectedAddress.State){
          palyload.StateIsoCode = stateiso2Check
        }

        console.log("Payload ==> " , palyload  )

        try {

          const header = getToken(); 

          let response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/user/updateshippingaddress`,
            palyload ,
            header
          );

          console.log(response)

          if (response.status === 200) {
            console.log(response.data);   
            setAddress(response.data)
            resetForm();
            toast.success("New Shipping address added ")
            setEditModalOpen(!editModalOpen)
         }
        //  setIsModalOpen(!isModalOpen)
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
              toast.error(data);
              console.log(error)
            }
          }
        }
      },
    });


    let countryiso2 = selectedAddress.CountryIsoCode  
    const handlerChangeState = async (event) => {

    countryiso2 = event.target.value;
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

  let stateiso2 = selectedAddress.StateIsoCode
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
        `https://api.countrystatecity.in/v1/countries/${countryiso2}/states/${stateiso2}/cities`,
        config
      );

      console.log(response.data);
      setCitydata(response.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status, data } = error.response;
        console.error(`Response error - Status: ${status}, Data:`, data);
      }
    }
  };

  const handlerchangecity =async (event) =>  {

    const selectedIso2 = event.target.value;

    const selectedCountry = citydata.find((city) => city.id == selectedIso2);

    setCity(selectedCountry ? selectedCountry.name : "", () => {
     
    });
  }


  return (
    <div className="z-50">
      <Toaster/>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md w-[500px] h-auto">
                <div className="flex w-[90%] mx-auto">
                  <h2 className="w-[100%] mx-auto text-xl font-bold mb-4 text-text_Color2 font-roxborough ">
                   Edit Address
                  </h2>
                  <p onClick={() => setEditModalOpen(false)}>
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
                        key={values.country}
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
                        <option value="" >
                           {values.country}
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
                        value={values.state}
                      >
                        <option value="">
                          {values.state}
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
                         onChange={
                          async (event) => {
                           await handleChange(event)
                            handlerchangecity(event)
                          } 
                        }
                        value={values.city}
                        className="flex h-10 w-[32%] text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29]"

                      >
                        <option value="">{values.city}</option>
                          
                       {citydata?.map((city) => (
                          <option key={city.id} value={city.id}>
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
                        onChange={handleChange}
                        value={values.zipcode}
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
                  Save Address
                </button>
              </div>
            </div>
    </div>
  )
}

export default EditAddress