import { useSelector } from "react-redux";
import NavBars from "./common/NavBars";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { formattedAmount } from "../component/common/FormatAmount";
import Footer from "../component/footer/footer";
import AddAddress from "./AddAddress";
import ContinueCheckout from "./products/ContinueCheckout";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [productDisplay, setProductDisplay] = useState();
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [orderSummarydetails, setOrderSummaryDetails] = useState([]);
  const [grandTotaldata , setGrandTotalData] = useState([])
  const [discountSlabe, setDiscountSlabe] = useState([]);
  const [categoryTotal , setCategoryTotal] = useState([])
  const [address , setAddress ] = useState([]);

  const { user } = useSelector((store) => store.profile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          getAllCartData(),
          getAllDiscountSlabe(),
        ]);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAllCartData = async () => {
    try {
      const payload = {
        user_id: user.customer_id,
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/getcartpagedata`,
        payload
      );

      setProductDisplay(response.data.LeftSideData);
      setOrderSummaryDetails(response.data.RightSideData[0]);
      setGrandTotalData(response.data.RightSideData[1])
      setCategoryTotal(response.data.RightSideData[2])
      setAddress(response.data.ShippingAddress)

      console.log(response.data);
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
          // toast.error(data);
        }
      }
    }
  };

  const getAllDiscountSlabe = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cartdiscountscheme/getall`
      );

      setDiscountSlabe(response.data);
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
          // toast.error(data);
        }
      }
    }
  };

  const seriesPageHandler = async (_id) => {
    navigate(`/series/${_id}`);
  };

  const toggleExpansion = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

 
  // console.log( "address ===>" , address );

  let nextDiscountPercent = null;
  return (
    <div>
      <div>
        <NavBars />
      </div>

      {loading ? (
        <p>Loaddding....</p>
      ) : (
        <div className="mt-10 w-[100%]">
          <div className="w-[90%] mx-auto ">
            <h1 className="font-roxborough px-5 mb-6 text-text_Color text-2xl w-full text-start font-semibold">
              Your Cart
            </h1>

            {/* Order Products display  */}
            <div className="md:flex md:w-[100%] md:mx-auto px-5">
            <div className="mt-8 md:w-[50%]  md:mt-0">
              {productDisplay.map((product, index) => (
                <div key={product.CartDiscountSchemeId} className="">
                  <div className="mobile:flex mobile:w-full mobile:justify-between sm:flex sm:w-full sm:justify-between">
                    <h1 
                    onClick={() =>
                            seriesPageHandler(product.SubCategoryId)
                          }
                    className="text-bg_green text-xl font-Marcellus font-semibold cursor-pointer">
                      {product.seriesName}
                    </h1>
                    <div onClick={() => toggleExpansion(index)}>
                      {expandedIndices.includes(index) ? (
                        <FaAngleUp size={20} />
                      ) : (
                        <FaAngleDown size={20} />
                      )}
                    </div>
                  </div>

                  <div className="mobile:w-full mobile:flex  mobile:justify-between mobile:mt-3 mobile:mb-2 font-Marcellus text-text_Color text-sm mobile:pb-3 border-b-2 border-text_Color sm:w-full sm:flex sm:justify-between sm:mt-3 sm:mb-2 sm:pb-3 ">
                    <h1>Quantity:{product.totalQuantity}</h1>
                    <h1>Total: {formattedAmount(product.TotalSeriesPrice)}</h1>
                  </div>

                  {expandedIndices.includes(index) && (
                    <div>
                      <div className="mobile:w-full sm:w-full mt-2 mb-3">
                        {product.data.map((cartProduct, index) => (
                          <div key={index} className="mobile:flex mt-4  mobile:h-[180px] sm:flex sm:h-[180px]">
                            <div className="mobile:w-[38%] sm:w-[38%] mr-4">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${
                                  cartProduct.product_img[0].OtherImagesName
                                }`}
                                className="mobile:w-full mobile:h-full mobile:object-contain sm:w-full sm:h-full sm:object-contain "
                              />
                            </div>
                            <div className="mobile:w-[60%] font-Marcellus text-text_Color font-medium mobile:h-full mobile:flex mobile:flex-col mobile:justify-center sm:w-[60%] sm:h-full sm:flex sm:flex-col sm:justify-center">
                              <h1 className="">{cartProduct.product_name}</h1>
                              <p className="mt-2">
                                Price/pc ₹ {product.PricePerPiece}
                              </p>

                              <p className="p-2 bg-Cream rounded-3xl mt-2">
                                Quantity: {cartProduct.quantity}{" "}
                              </p>
                              <p className="mt-2">
                                Total:{" "}
                                {formattedAmount(cartProduct.totalproductprice)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Mobile View Slider  */}
                      {
                        product.UpsellString !== null ? (
                          <div className="mobile:w-full sm:w-full mt-6 mb-14 border-t-2 border-text_Color border-b-2 cursor-pointer md:hidden sm:block mobile:block font-Marcellus">
                        <p
                          className="p-3"
                          onClick={() =>
                            seriesPageHandler(product.SubCategoryId)
                          }
                        >
                          {product.UpsellString}
                        </p>
                      </div>
                        )  : null
                      }
                      

                      
                    </div>
                  )}

                  {/* Desktop View Slider  */}
                  {
                    product.UpsellString !== null ? (
                        <div className="mobile:w-full sm:w-full mt-6 mb-14  cursor-pointer sm:hidden  mobile:hidden md:block md:bg-Cream  font-Marcellus">
                        <p
                          onClick={() =>
                            seriesPageHandler(product.SubCategoryId)
                          }
                          className="p-3"
                        >
                          {product.UpsellString}
                        </p>
                      </div>
                    ) : null
                  }
                  

                     
                </div>
              ))}
              <div className="mt-6"> 
                      <AddAddress address={address}/>
                     </div>
            </div>

            <div className="mobile:w-[96%] sm:w-[96%]  mobile:mx-auto mobile:h-auto sm:mx-auto sm:h-auto bg-CartRightColor mt-10 md:w-[45%] md:mt-0">
              <h1 className="mobile:text-center sm:text-center mt-6 font-roxborough text-text_Color font-bold text-xl">Order Summary</h1>
              {/* Left Side Part  */}
              {orderSummarydetails.map((data, index) => (
                <div key={index} className="mt-6  text-text_Color">
                  <div className="flex justify-between w-[90%] mx-auto">
                    <h1 className="font-roxborough font-semibold">{data.Name}</h1>
                    <p className="font-Marcellus">{formattedAmount(data.totalSeriesPrice)}</p>
                  </div>
                  <div className="flex justify-between w-[90%] mx-auto mt-3">
                    <p className="font-roxborough font-semibold">Discount</p>
                    <p className="font-Marcellus">
                      {data.DiscountPercent}% ( -
                      {formattedAmount(data.DiscountAmount)} )
                    </p>
                  </div>
                  <div className="flex justify-between w-[90%] mx-auto mt-3">
                    <p className="font-roxborough font-semibold"> Sub total after discount:</p>
                    <p className="font-Marcellus">{formattedAmount(data.AmountAfterDiscount)}</p>
                  </div>
                  <div className="flex justify-between w-[90%] mx-auto mt-3">
                    <p className="font-roxborough font-semibold">GST:</p>
                    <p className="font-Marcellus">
                      {data.GST}% ( +{formattedAmount(data.GSTAdditionAmount)} )
                    </p>
                  </div>
                  <div className=" w-[100%] mx-auto mt-6 pt-4 border-t-2 border-text_Color mb-8">
                    <div className="flex justify-between w-[90%] mx-auto">
                      <p className="font-roxborough font-semibold">Total for Fragrances </p>
                      <p className="font-Marcellus">{formattedAmount(data.Total)}</p>
                    </div>
                  </div>

                  {/* Right Side Part  */}
                  {discountSlabe.map((discountItem) => (
                    <div key={discountItem._id} className="bg-Cream border-t-[1px] border-dashed border-text_Color">
                      {data.CartDiscountSchemeId === discountItem._id && (
                        <div className="flex flex-col w-[100%] justify-between mx-auto">
                          <div className="flex w-[90%] justify-between mx-auto">
                            {discountItem.DiscountSlabs.map(
                              (DSPercentage, index) => {
                                if (
                                  data.DiscountPercent ===
                                  DSPercentage.discountPercent
                                ) {
                                  // Find the next value without checking the condition
                                  const nextMatch =
                                    discountItem.DiscountSlabs.slice(
                                      index + 1
                                    ).find((nextDSPercentage) => true);

                                  // Store the next value in the variable
                                  if (nextMatch) {
                                    nextDiscountPercent =
                                      nextMatch.discountPercent;
                                  }

                                  return (
                                    <div key={index}>
                                      <div className="px-4 bg-text_Color2">
                                        <h1
                                          className={
                                            nextDiscountPercent
                                              ? "bg-text_Color2 p-2 text-white font-roxborough"
                                              : "p-2"
                                          }
                                        >
                                          {DSPercentage.discountPercent}%
                                        </h1>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={index}>
                                    <div className="px-4">
                                      <h1 className="p-2 font-roxborough">
                                        {DSPercentage.discountPercent}%
                                      </h1>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div className="bg-text_Color2 p-2  text-center">
                            {discountItem.DiscountSlabs.map((total, index) => (
                              <div key={index} className="w-[80%] mx-auto text-white font-Marcellus ">
                                {data.totalSeriesPrice >= total.from &&
                                data.totalSeriesPrice <= total.to ? (
                                  <h1 className="">
                                    Spend {formattedAmount(total.to - data.totalSeriesPrice)}{" "}
                                    more to get {nextDiscountPercent}% discount
                                    on your order
                                  </h1>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* Total of Both Items */}
              <div className="mt-5 text-text_Color">
                  {
                    grandTotaldata.map((total , index) => (
                      <div key={index} className="">
                          <div className="flex w-[90%] justify-between mx-auto mb-3">
                            <p className="font-roxborough font-semibold">{total.name} Sub Total</p>
                            <p className="font-Marcellus"> { formattedAmount(total.amountAfterSGSTCGST)}</p>
                          </div>
                      </div>
                    ))
                  }
              </div>

              {/* Category Total */}
              <div className="text-text_Color ">
                  {
                    categoryTotal.map((CGtotal , index) => (
                      <div key={index} className="flex w-[90%] border-t-2 border-text_Color py-3 justify-between mx-auto">
                        <p className="font-roxborough font-semibold">Grand Total</p>
                        <p className="font-Marcellus">{formattedAmount(CGtotal.totalAmount)}</p>
                      </div>
                    ))
                  }
              </div>

              <ContinueCheckout user = {user}/>
            </div>
            </div>
          </div>
          <div className="mt-7">
             <Footer/>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
