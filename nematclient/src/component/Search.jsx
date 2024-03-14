import { useEffect, useState } from "react";
import NavBars from "./common/NavBars";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductHeader from "./common/ProductHeader";
import Flower from "../assets/HomePage//Flower.png";
import Footer from "../component/footer/footer"
import getToken from "./auth/GetToken";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [seriesData, setSeriesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedPackSizes, setSelectedPackSizes] = useState([]); // Track selected pack sizes for each product
  const [quantities, setQuantities] = useState([]); // Track quantities for each product
  const [initialTotal, setInitialTotal] = useState(true);
  const [productDataCart, setProductDataCart] = useState();

  const { user } = useSelector((store) => store.profile);

  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchTerm !== "") {
        try {
          const payload = {
            keyword: debouncedSearchTerm,
            user_id: user.customer_id,
          };

          const header = getToken()

          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/search/getdata`,
            payload , 
            header
          );

          console.log(response.data);
          setSeriesData(response.data.SeriesData);
          setProductData(response.data.ProductsData);
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
              setLoading(false);
            }
          }
        }
      }
    };

    fetchData();
  }, [debouncedSearchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const seriesPageById = (_id) => {
    navigate(`/series/${_id}`);
  };

  const handlePackSizeClick = (packsize, index) => {
    setSelectedPackSizes((prevSelectedPackSizes) => {
      const newSelectedPackSizes = [...prevSelectedPackSizes];
      newSelectedPackSizes[index] = packsize;
      return newSelectedPackSizes;
    });
  };

  const handleQuantityChange = (event, index) => {
    const { value } = event.target;
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value;
      return newQuantities;
    });
  };

  const calculateTotalValue = (index) => {
    const quantity = parseInt(quantities[index]);
    const packsize = selectedPackSizes[index];

    if (!isNaN(quantity) && packsize) {
      const totalValue = quantity * packsize.size;
      return totalValue;
    }

    return 0;
  };

  const addToCart = async (index) => {
    try {
      const selectedPackSize = selectedPackSizes[index];
      const inputValue = quantities[index];
      if (!inputValue || !selectedPackSize) {
        toast.error("Please Insert Value and Select PackSize");
      } else {
        const multipliedValue = inputValue * selectedPackSize.size;
        console.log("multipliedValue ===> ", multipliedValue);

        const payload = {
          subcategory_id: productData[index].SubCategoryId,
          product_id: productData[index]._id,
          quantity: multipliedValue,
          user_id: user.customer_id,
        };

        const header = getToken()

        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/add`,
          payload , 
          header
        );

        console.log(response.data);
        quantities[index] = '';
        selectedPackSizes[index] = null;
        setInitialTotal(false);
        setProductDataCart(response.data);
        setTotalQuantity(totalQuantity + multipliedValue);
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

  const removeproductCart = async (productID, index) => {
    let values = 0;
    setInitialTotal(true);

    const foundProduct = productData.find(
      (product) => product._id === productID
    );

    if (foundProduct) {
      values = foundProduct.TotalQuantityInCart;
    }

    console.log("Found Product:", foundProduct);
    console.log("Total Quantity In Cart:", values);

    console.log("Values ", values);

    const payload = {
      subcategory_id: foundProduct.SubCategoryId,
      product_id: productID,
      user_id: user.customer_id,
    };

    console.log("PAyload ===> ", payload);

    try {

      const header = getToken()

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/removeproduct`,
        payload , 
        header
      );

      if (response.status === 200) {
        // console.log("Remove Response ===> " , response.data);

        setProductData((prevProducts) => {
          return prevProducts.map((product, i) =>
            i === index ? { ...product, TotalQuantityInCart: 0 } : product
          );
        });

        toast.success(response.data);
        setTotalValue((prevTotalValue) => {
          return prevTotalValue - values;
        });
      }
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (
        status === 404 ||
        status === 403 ||
        status === 500 ||
        status === 302 ||
        status === 409 ||
        status === 401 ||
        status === 400
      ) {
        console.log(data);
        toast.error(data);
      }
    }
  };

  return (
    <div>
      <Toaster />
      <div className="bg-Cream">
        <NavBars />
      </div>
      <div className="w-full mt-8">
        <h1 className=" lg:w-[30%] md:w-[40%] sm:w-[60%] mobile:w-[90%] mx-auto text-3xl font-Marcellus text-text_Color font-semibold text-center">
          SEARCH WHAT YOU’RE LOOKING FOR
        </h1>
        <div className="md:w-[50%] lg:w-[40%] sm:w-[70%] mobile:w-[85%] mx-auto mt-8 border-b-2 border-b-[#642F29] ">
          <div className="flex justify-center items-center">
            <input
              className="flex  h-10 w-full text-text_Color text-xl font-Marcellus    bg-transparent   placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50 "
              type="text"
              placeholder="Search"
              id="camponeyname"
              value={searchTerm}
              onChange={handleChange}
            ></input>
            <span>
              <IoSearchOutline size={30} color="#642F29" />
            </span>
          </div>
        </div>
      </div>

      {/* Series Page Data */}

      {seriesData && seriesData.length > 0 && (
        <div className="mt-10">
          <ProductHeader title={"Series"} />
          <div className="w-full flex justify-center items-center mt-8">
            <div className="w-[90%] sm:grid-cols-3 sm:grid mobile:grid mobile:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto">
              {seriesData &&
                seriesData.map((subcategories) => (
                  <div
                    key={subcategories._id}
                    className="flex w-full flex-col justify-center gap-y-3 cursor-pointer items-center mb-2"
                    onClick={() => seriesPageById(subcategories._id)}
                  >
                    <div className="hover:scale-110 transition-transform duration-300">
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                        subcategories.Image
                      }`}
                      className="mobile:p-2 sm:p-5 md:p-5 flex justify-center md:h-[400px] lg:h-[370px] object-contain mobile:h-[250px] items-center"
                      alt={subcategories?.title}
                    />
                    <h1
                      className="font-roxborough text-xl text-center w-full text-text_Color mb-4 overflow-hidden overflow-ellipsis"
                      style={{ minHeight: "3em" }}
                    >
                      {subcategories.Name}
                    </h1>
                    </div>
                    <button className="w-[137px] uppercase h-[43px] hover:bg-[#006400] bg-bg_green rounded-3xl font-Marcellus text-white mb-7">
                      Order NOW
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {productData && productData.length > 0 && (
        <div>
          <div className="p-2 py-5  w-full mb-2">
            <img src={Flower} className="w-full object-cover" />
          </div>

          {/* Product Page Data */}
          <div>
            <ProductHeader title={"Products"} />
            <div className="md:w-[100%] ">
              {productData?.map((product, index) => (
                <div
                  key={product._id}
                  className=" mobile:mt-8 mobile:overflow-hidden mobile:w-[90%] mobile:mx-auto sm:mt-8 sm:overflow-hidden sm:w-[90%] sm:mx-auto md:flex"
                >
                  <div className="md:flex md:w-[40%]">
                    <div className="mt-8 md:relative">
                      <img
                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                          product.ProductOtherImage[0].OtherImagesName
                        }`}
                        className="mobile:h-[90%] mobile:w-[70%] mobile:mx-auto mobile:object-cover sm:h-[90%] sm:w-[70%] sm:mx-auto sm:object-cover  md:w-[320px] md:h-[245px] md:object-contain "
                        alt={` `}
                      />
                    </div>
                  </div>
                  <div className="md:w-[100%]">
                    <div className="flex mobile:justify-between mobile:mt-6  sm:justify-between sm:mt-6 md:w-[100%] ">
                      <div className="mobile:w-[55%] sm:w-[55%]">
                        <h1 className="mobile:w-full mobile:h-full mobile:flex mobile:items-center  font-roxborough text-lg font-semibold text-text_Color sm:w-full sm:h-full sm:flex sm:items-center">
                          {product.Name}{" "}
                          <span className="px-2 bg-text_Color text-white rounded-xl md:ml-3">
                            i
                          </span>
                        </h1>
                      </div>
                      <button
                        className="mobile:flex mobile:justify-end mobile:items-center mobile:mr-3 mobile:px-4 mobile:p-2 sm:p-2 sm:flex sm:justify-end sm:items-center sm:mr-3 sm:px-4  border-2 rounded-3xl  font-Marcellus text-text_Color2
                     "
                        onClick={() => removeproductCart(product._id, index)}
                      >
                        Reset QTY
                      </button>
                    </div>
                    <div>
                      <div className="mobile:w-[100%] sm:w-[100%]">
                        <div>
                          <h1 className="font-roxborough text-text_Color">
                            Select Pack Size:
                          </h1>
                        </div>
                        <div className="mobile:w-full mobile:flex mobile:flex-row mobile:mt-2 sm:w-full sm:flex sm:flex-row sm:mt-2">
                          {product?.PackSizes.map((packsize, currentIndex) =>
                            currentIndex === product.PackSizes.length ||
                            packsize.size === null ? (
                              ""
                            ) : (
                              <button
                                key={packsize._id}
                                className={`mobile:p-2 border-2 mobile:mr-1.5 rounded-3xl mobile:flex mobile:w-[100%] mobile:justify-center mobile:items-center sm:p-2 sm:mr-1.5 sm:flex sm:w-[100%] sm:justify-center sm:items-center bg-Cream font-Marcellus ${
                                  selectedPackSizes[index] === packsize
                                    ? "bg-text_Color text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handlePackSizeClick(packsize, index)
                                }
                              >
                                {/* Render packsize information */}
                                {packsize.size} {packsize.nameConvention}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <div className="md:flex md:mt-3">
                        <div className="mobile:w-full mobile:flex mobile:justify-between mobile:p-2 mobile:mt-2 sm:w-full sm:flex sm:justify-between sm:p-2 sm:mt-2 md:w-[40%]">
                          <h1 className="mobile:my-auto sm:my-auto font-roxborough text-text_Color font-semibold">
                            Purchase Quantity:
                          </h1>
                          <div>
                            <input
                              type="text"
                              //  id={`quantity_${index}`}
                              className="p-2 border-2 rounded-3xl mobile:w-[100%] sm:w-[100%] mobile:p-2 sm:p-2"
                              //  value={quantities[index]}
                              onChange={(event) =>
                                handleQuantityChange(event, index)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="mt-1 ml-[1%] md:w-[59%] md:my-auto ">
                          <button
                            className="mobile:w-full sm:w-full mobile:p-3 sm:p-3 border-2 rounded-3xl font-Marcellus bg-text_Color2 text-white"
                            onClick={() => addToCart(index)}
                          >
                            ADD TO CART {calculateTotalValue(index)} PCS
                          </button>
                        </div>
                      </div>
                      <button className="mobile:w-full sm:w-full p-1 border-2 rounded-3xl mt-3 bg-Cream font-Marcellus ">
                        Total Units In Cart:{" "}
                        {initialTotal
                          ? product?.TotalQuantityInCart
                          : product._id === productDataCart.Product_id
                          ? (product.TotalQuantityInCart =
                              productDataCart.TotalQuantity)
                          : product.TotalQuantityInCart}{" "}
                        {""}PCS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-10">
         <Footer/>
      </div>
    </div>
  );
};

export default Search;
