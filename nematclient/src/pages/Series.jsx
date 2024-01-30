import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBars from "../component/common/NavBars";
import ProductHeader from "../component/common/ProductHeader";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSliderRefs } from "../hooks/useSliderRefs";
import Footer from "../component/footer/footer";
import { useSelector } from "react-redux";

const Series = () => {
  const { _id } = useParams();
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qunantityData, setQuantityData] = useState([]);
  const [Products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState(Array(Products.length).fill(""));
  const [selectedPackSizes, setSelectedPackSizes] = useState(
    Array(Products.length).fill(null)
  );
  const [productTotals, setProductTotals] = useState([]);
  const [productDataCart, setProductDataCart] = useState();
  const [initialTotal, setInitialTotal] = useState(true);
  const [totalvalue, setTotalValue] = useState(0);

  let { user } = useSelector((store) => store.profile);

  // console.log("USER +++> " , user)

  useEffect(() => {
    getSeriesDataById();
  }, []);

  const getSeriesDataById = async () => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/subcategorypage/getdata/${_id}/6/0`
      );

      setSeriesData(response.data);
      setQuantityData(response.data.QuantitySchemeData);
      setProducts(response.data.SchemeProductsData);
      alltotalValue(response.data.SchemeProductsData);
      setLoading(false);
      setInitialTotal(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log("qunantityData ===> " ,  qunantityData)
  // console.log("products ===>", Products)
  const title = seriesData?.SubCategoriesData?.Name;

  // Slider Functions
  const sliderRefs = useSliderRefs(Products?.length);

  const handleNext = (index) => {
    sliderRefs[index].slickNext();
  };

  const handlePrev = (index) => {
    sliderRefs[index].slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // To Check the current input Valid or Not
  const validateInput = (event, index) => {
    // Get the input value
    let inputValue = event.target.value;

    // Remove any non-numeric characters using a regular expression
    let numericValue = inputValue.replace(/[^0-9]/g, "");

    // Create a new array with the updated quantity for the specific index
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = numericValue;
      return newQuantities;
    });
  };

  const handlePackSizeClick = (packsize, index) => {
    setSelectedPackSizes((prevPackSizes) => {
      const newPackSizes = [...prevPackSizes];
      newPackSizes[index] = packsize;
      return newPackSizes;
    });
  };

  const calculateTotalUnits = (index) => {
    const quantity = parseInt(quantities[index], 10) || 0;
    const selectedPackSize = selectedPackSizes[index];
    return selectedPackSize ? selectedPackSize.size * quantity : 0;
  };

  const addToCart = async (index) => {
    const productTotal = calculateTotalUnits(index);

    if (isNaN(productTotal)) {
      // Handle the case where productTotal is NaN (e.g., invalid input)
      return;
    }

    console.log(`Product Total (${index}):`, productTotal);

    // // Check if productTotals[index] is NaN and replace with 0
    const updatedProductTotals = [...productTotals];
    if (isNaN(updatedProductTotals[index])) {
      updatedProductTotals[index] = 0;
    }

    updatedProductTotals[index] = productTotal;

    // console.log(`Updated Product Totals:`, updatedProductTotals);
    setProductTotals(updatedProductTotals);

    // Reset quantities and selectedPackSizes after adding to the cart
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = "";
      return newQuantities;
    });

    setSelectedPackSizes((prevPackSizes) => {
      const newPackSizes = [...prevPackSizes];
      newPackSizes[index] = null;
      return newPackSizes;
    });

    const productId = Products[index]._id;
    try {
      await addProductCart(productId, updatedProductTotals[index]);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const addProductCart = async (_id, value) => {
    const payload = {
      subcategory_id: seriesData.SubCategoriesData._id,
      product_id: _id,
      quantity: value,
      user_id: user.customer_id,
    };

    console.log("Payload ===> ", payload);

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/add`,
        payload
      );

      if (response.status === 200) {
        setInitialTotal(false);
        setProductDataCart(response.data);
        console.log(response.data);
        setTotalValue(totalvalue + payload.quantity);
        alltotalValue(response.data);
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
          // console.error(response)
          console.log(data);
          // toast.error(data);
        }
      }
    }
  };

  const removeproductCart = async (_id, index) => {
    let values = 0;
    setInitialTotal(true)
    const foundProduct = Products.find((product) => product._id === _id);

    if (foundProduct) {
      values = foundProduct.TotalQuantityInCart;
    }

    // // console.log("Found Product:", foundProduct);
    // console.log("Total Quantity In Cart:", values);

    // console.log("Values ", values);

    const payload = {
      subcategory_id: seriesData.SubCategoriesData._id,
      product_id: _id,
      user_id: user.customer_id,
    };

    // console.log("PAyload ===> " , payload)

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/removeproduct`,
        payload
      );

      if (response.status === 200) {
        console.log(response.data);

        setProducts((prevProducts) => {
          console.log("Previous Products:", prevProducts);

          return prevProducts.map((product, i) =>
            i === index ? { ...product, TotalQuantityInCart: 0 } : product
          );
        });

        setTotalValue((prevTotalValue) => {
          console.log("Previous Total Value:", prevTotalValue);

          return prevTotalValue - values;
        });
        // Update state with the modified arra
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
      }
    }
  };

  const alltotalValue = async (Products) => {
    // console.log("Products Here ===>", Products);

    const calculatedTotalValue = Products.reduce(
      (acc, item) => acc + item.TotalQuantityInCart,
      0
    );
    setTotalValue(calculatedTotalValue);
  };

  return (
    <div>
      <div>
        <NavBars />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-8 mb-8">
          <div className="w-[80%] mx-auto">
            <ProductHeader
              title={title}
              className="flex justify-center items-center"
            />
            <p className="text-center mt-4 font-Marcellus text-text_Color ">
              You can select different products in this series to avail the
              schemes below
            </p>
          </div>

          {/* <div className="mt-10">
            <div className="w-[90%] mx-auto relative ">
              <div className="flex w-full justify-between  mb-5">
              {
                qunantityData.SchemeValues.map((data) => (
                  <div key={data._id} className="">
                      <div className="   ">
                        <h1 className="">{data.min}/PCS</h1>
                      </div>
                  </div>
                ))
              }
              </div>
              <div className="w-full h-[50px] pl-5 pr-5 flex justify-between items-center   bg-green-500">
                  {
                    qunantityData.SchemeValues.map((data) => (
                      <div key={data._id} className="  flex justify-between items-center z-40 h-full">
                        <div className=" flex justify-evenly items-center">
                          <h1 className="w-full flex justify-between ">Rs. {data.value} / pc</h1>
                        </div>
                        
                      </div>
                    ))
                  }
              </div>
            </div>
          </div> */}

          <div>
            <input 
              type="range"
              
            />
          </div>

          <div className="w-[100%] flex flex-col justify-center items-center  mt-4 ">
            <div className="w-[90%] flex bg-LightCream  border  font-Marcellus  uppercase">
              <p className="w-[50%] text-center border-r p-3 ">
                Order Quantity
              </p>
              <p className="w-[50%] text-center p-3">Price per PC</p>
            </div>
            {qunantityData.SchemeValues.map((data, index) => (
              <div
                key={data._id}
                className="w-[90%] bg-LightCream border-l border-r font-Marcellus"
              >
                <div className="flex">
                  {data.max !== undefined ? (
                    <p className="w-[50%] text-center border-r p-1.5">{`${data.min}-${data.max} pcs`}</p>
                  ) : (
                    <p className="w-[50%] text-center border-r p-1.5 border-b">{`${data.min} & Above`}</p>
                  )}
                  {qunantityData.SchemeValues.length === index + 1 ? (
                    <p className="w-[50%] text-center p-1.5 border-b ">
                      {data.value}
                    </p>
                  ) : (
                    <p className="w-[50%] text-center p-1.5 ">{data.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Carousel wrapper --> */}

          <div>
            {Products?.map((product, index) => (
              <div
                key={product._id}
                className="mt-8 overflow-hidden w-[90%] mx-auto"
              >
                <Slider
                  ref={(slider) => (sliderRefs[index] = slider)}
                  {...settings}
                  className="overflow-hidden "
                >
                  {product.ProductOtherImage.map((images, imageIndex) => (
                    <div key={imageIndex} className="mt-8 ">
                      <img
                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                          images.OtherImagesName
                        }`}
                        className="h-[90%] w-[70%] mx-auto object-cover"
                        alt={`Slide ${imageIndex + 1}`}
                      />
                    </div>
                  ))}
                </Slider>

                {/* External Buttons */}
                <div className="flex absolute mt-[-50%] w-[90%] mx-auto">
                  <button
                    onClick={() => handlePrev(index)}
                    className="custom-prev-button ml-[3%]"
                  >
                    <FaAngleLeft />
                  </button>
                  <button
                    onClick={() => handleNext(index)}
                    className="custom-next-button w-full flex justify-end mr-[3%]"
                  >
                    <FaAngleRight />
                  </button>
                </div>

                <div className="flex justify-between">
                  <div className="w-[60%]">
                    <h1 className="w-full flex items-center font-roxborough text-xl font-semibold text-text_Color">
                      {product.Name}{" "}
                      <span className=" ml-2 px-2.5 bg-text_Color text-white rounded-xl  ">
                        i
                      </span>
                    </h1>
                  </div>
                  <button
                    className="flex justify-end items-center mr-3 p-2 border-2 rounded-3xl px-4 font-Marcellus text-text_Color2
                     "
                    onClick={() => removeproductCart(product._id, index)}
                  >
                    Reset QTY
                  </button>
                </div>
                <div>
                  <div className="w-[100%]">
                    <div>
                      <h1 className="font-roxborough text-text_Color">
                        Select Pack Size:
                      </h1>
                    </div>
                    <div className="w-full flex flex-row mt-2">
                      {seriesData.SubCategoriesData.PackSizes.map(
                        (packsize) => (
                          <button
                            key={packsize._id}
                            className={`p-2 border-2 mr-1.5 rounded-3xl flex w-[100%] justify-center items-center bg-Cream font-Marcellus ${
                              selectedPackSizes[index] === packsize
                                ? "bg-blue-500 text-white"
                                : ""
                            }`}
                            onClick={() => handlePackSizeClick(packsize, index)}
                          >
                            {packsize.size}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-between p-2 mt-2">
                    <h1 className="my-auto font-roxborough text-text_Color font-semibold">
                      Purchase Quantity:
                    </h1>
                    <div>
                      <input
                        type="text"
                        id={`quantity_${index}`}
                        className="p-2 border-2 rounded-3xl"
                        value={quantities[index]}
                        onChange={(event) => validateInput(event, index)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <button
                    className="w-full p-3 border-2 rounded-3xl font-Marcellus"
                    onClick={() => addToCart(index)}
                  >
                    ADD TO CART - {calculateTotalUnits(index)} units
                  </button>
                  <button className="w-full p-1 border-2 rounded-3xl mt-3 bg-Cream font-Marcellus ">
                    Total Units In Cart:{" "}
                    {initialTotal
                      ? product?.TotalQuantityInCart
                      : product._id === productDataCart.Product_id
                      ? (product.TotalQuantityInCart =
                          productDataCart.TotalQuantity)
                      : product.TotalQuantityInCart}
                  </button>
                  <h1>{}</h1>
                </div>
                <h1>Total Cart Values {totalvalue}</h1>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Series;
