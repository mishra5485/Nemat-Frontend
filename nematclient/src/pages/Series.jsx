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
import ProgressBar from "../component/common/ProgressBar";
import toast, { Toaster } from "react-hot-toast";

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
  // const [pauseApiCall, setpauseApiCall] = useState(false);
  const [initialTotal, setInitialTotal] = useState(true);
  const [totalvalue, setTotalValue] = useState(0);
  const [page, setPage] = useState(0); // Current page
  const [perPage] = useState(10); // Products per page
  const [observer, setObserver] = useState(null);
  const bottomElementRef = useRef(null);

  let { user } = useSelector((store) => store.profile);



   if (!user) {
    return <div>No user information available</div>;
  }


  console.log("USER +++> " , user.customer_id)

    useEffect(() => {
      getSeriesDataById()
    }, [page]);

    useEffect(() => {
    
        setPage(0);
        setProducts([]); 
        getSeriesDataById();
      console.log("we are here useEffect");
    }, [_id]);

    useEffect(() => {
      if (!observer) {
        setObserver(
          new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting) {
              setPage((prevPage) => prevPage + 1);
            }
          })
        );
      }

      return () => {
        if (observer && bottomElementRef.current) {
          observer.unobserve(bottomElementRef.current);
        }
      };
    }, [observer, loading]);

    useEffect(() => {
      if (observer && bottomElementRef.current) {
        observer.observe(bottomElementRef.current);
      }

      return () => {
        if (observer && bottomElementRef.current) {
          observer.unobserve(bottomElementRef.current);
        }
      };
    }, [observer, loading]);

  // Rest of your component logic here

  const getSeriesDataById = async () => {

    const payload = {
      subcategory_id : _id, 
      user_id : user.customer_id
    }

    try {
      let response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/subcategorypage/getdata/${perPage}/${page}`,
        payload
      );

      setSeriesData(response.data);
      setQuantityData(response?.data?.QuantitySchemeData);
      const seriesPrdouctData = response.data.SchemeProductsData;

      // alltotalValue(seriesPrdouctData);

      setTotalValue(response.data.SeriestotalQuantity)
      
      setLoading(false);
      setInitialTotal(true);

      if (page === 0) {
        return setProducts(seriesPrdouctData);
      }
      setProducts((prevProducts) => [...prevProducts, ...seriesPrdouctData]);

      // setProducts((prevdata) => [response?.data?.SchemeProductsData)];

      // console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // console.log("qunantityData ===> " ,  qunantityData)
  console.log("products ===>", Products);
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

    if (value === 0) {
      toast.error("Select Quantity");
    } else {
      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/add`,
          payload
        );

        if (response.status === 200) {
          setInitialTotal(false);
          // toast.success("Product added to cart")
          setProductDataCart(response.data);
          // console.log("Response Add Cart ====>" , response.data);
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
            // console.log(data);
            toast.error(data);
          }
        }
      }
    }
  };

  const removeproductCart = async (_id, index) => {
    let values = 0;
    setInitialTotal(true);
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
        // console.log("Remove Response ===> " , response.data);

        setProducts((prevProducts) => {
          // console.log("Previous Products:", prevProducts);

          return prevProducts.map((product, i) =>
            i === index ? { ...product, TotalQuantityInCart: 0 } : product
          );
        });

        toast.success(response.data)
        setTotalValue((prevTotalValue) => {
          // console.log("Previous Total Value:", prevTotalValue);

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
        toast.error(data)
      }
    }
  };

//   const alltotalValue = async (Products) => {
//     const calculatedTotalValue = Products.reduce(
//       (acc, item) => acc + item.TotalQuantityInCart,
//       totalvalue // Use the current totalValue as the initial accumulator value
//     );
//     setTotalValue(calculatedTotalValue);
// };
  return (
    <div>
      <div>
        <NavBars />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-8 mb-8">
          {/* Top Section  */}
          <div className="md:w-[70%] md:mx-auto">
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
            {/* <div  className="fixed top-[60px] left-0 w-full bg-white z-40"> */}

            <div className="mt-8 mb-6">
              <ProgressBar
                qunantityData={qunantityData}
                totalvalue={totalvalue}
              />
            </div>
            {/* </div> */}

            <Toaster className="w-[30%] h-[50px]" />
            <div className="w-[100%] flex flex-col justify-center items-center  mt-4 ">
              <div className="w-[90%] flex bg-LightCream  border  font-Marcellus  uppercase">
                <p className="w-[50%] text-center border-r p-3 ">
                  Order Quantity
                </p>
                <p className="w-[50%] text-center p-3">Price per PC</p>
              </div>
              {qunantityData?.SchemeValues?.map((data, index) => (
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
                        ₹ {data.value} PC
                      </p>
                    ) : (
                      <p className="w-[50%] text-center p-1.5 ">
                        ₹ {data.value} PC
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <!-- Carousel wrapper --> */}

          <div className="md:w-[100%] ">
            {Products?.map((product, index) => (
              <div
                key={product._id}
                className=" mobile:mt-8 mobile:overflow-hidden mobile:w-[90%] mobile:mx-auto sm:mt-8 sm:overflow-hidden sm:w-[90%] sm:mx-auto md:flex"
              >
                <div className="md:flex md:w-[40%]">
                  <Slider
                    ref={(slider) => (sliderRefs[index] = slider)}
                    {...settings}
                    className="mobile:overflow-hidden sm:overflow-hidden md:overflow-hidden"
                  >
                    {product.ProductOtherImage.map((images, imageIndex) => (
                      <div key={imageIndex} className="mt-8 md:relative">
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                            images.OtherImagesName
                          }`}
                          className="mobile:h-[90%] mobile:w-[70%] mobile:mx-auto mobile:object-cover sm:h-[90%] sm:w-[70%] sm:mx-auto sm:object-cover  md:w-[320px] md:h-[245px] md:object-contain "
                          alt={`Slide ${imageIndex + 1}`}
                        />
                      </div>
                    ))}
                  </Slider>

                  {/* External Buttons */}
                  <div className="mobile:flex  mobile:absolute mobile:mt-[-50%] mobile:w-[90%] mobile:mx-auto sm:flex  sm:absolute sm:mt-[-50%] sm:w-[90%] sm:mx-auto  md:w-[25.5%] lg:w-[25.7%] md:mt-[140px] md:mr-2 md:object-cover">
                    <button
                      onClick={() => handlePrev(index)}
                      className="mobile:ml-[3%] sm:ml-[3%]"
                    >
                      <FaAngleLeft size={25} />
                    </button>
                    <button
                      onClick={() => handleNext(index)}
                      className="mobile:w-full mobile:flex  mobile:justify-end  mobile:mr-[3%] sm:w-full sm:flex sm:justify-end sm:mr-[3%] "
                    >
                      <FaAngleRight size={25} />
                    </button>
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
                        {seriesData?.SubCategoriesData?.PackSizes?.map(
                          (packsize, currentIndex) =>
                            currentIndex ===
                              seriesData.SubCategoriesData.PackSizes.length ||
                            packsize.size === null ? (
                              console.log(currentIndex)
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
                            id={`quantity_${index}`}
                            className="p-2 border-2 rounded-3xl mobile:w-[100%] sm:w-[100%] mobile:p-2 sm:p-2"
                            value={quantities[index]}
                            onChange={(event) => validateInput(event, index)}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-1 ml-[1%] md:w-[59%] md:my-auto ">
                        <button
                          className="mobile:w-full sm:w-full mobile:p-3 sm:p-3 border-2 rounded-3xl font-Marcellus bg-text_Color2 text-white"
                          onClick={() => addToCart(index)}
                        >
                          ADD TO CART - {calculateTotalUnits(index)} PCS
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
                      PCS
                    </button>
                  </div>
                  <h1>Total Cart Values {totalvalue}</h1>
                </div>
              </div>
            ))}
            <div ref={bottomElementRef} style={{ height: "10px" }}></div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Series;
