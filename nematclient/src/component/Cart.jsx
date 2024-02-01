import { useSelector } from "react-redux";
import NavBars from "./common/NavBars";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { formattedAmount } from "../component/common/FormatAmount";
import { data } from "autoprefixer";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [productDisplay, setProductDisplay] = useState();
  const [orderSummary, setOrderSummary] = useState([]);
  const [expandedIndices, setExpandedIndices] = useState([]);

  const { user } = useSelector((store) => store.profile);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCartData();
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
      setOrderSummary(response.data.RightSideData);
      setLoading(false);
      // console.log(response.data);
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
          setLoading(false);
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

  console.log("orderSummary ===> ", orderSummary);

  return (
    <div>
      <div>
        <NavBars />
      </div>

      {loading ? (
        <p>Loaddding....</p>
      ) : (
        <div className="mt-10 w-[100%]">
          <div className="w-[90%] mx-auto">
            <h1 className="font-roxborough text-text_Color text-2xl w-full text-start font-semibold">
              Your Cart
            </h1>

            {/* Order Products display  */}
            <div className="mt-8">
              {productDisplay.map((product, index) => (
                <div key={product.CartDiscountSchemeId} className="">
                  <div className="flex w-full justify-between">
                    <h1 className="text-bg_green text-xl font-Marcellus font-semibold">
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

                  <div className="w-full flex justify-between mt-3 mb-2 font-Marcellus text-text_Color text-sm pb-3 border-b-2 border-text_Color">
                    <h1>Quantity:{product.totalQuantity}</h1>
                    <h1>Total: {formattedAmount(product.TotalSeriesPrice)}</h1>
                  </div>

                  {expandedIndices.includes(index) && (
                    <div>
                      <div className="w-full mt-2 mb-3">
                        {product.data.map((cartProduct, index) => (
                          <div key={index} className="flex mt-4  h-[180px]">
                            <div className="w-[38%] mr-4">
                              <img
                                src={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/${
                                  cartProduct.product_img[0].OtherImagesName
                                }`}
                                className="w-full h-full object-contain "
                              />
                            </div>
                            <div className="w-[60%] font-Marcellus text-text_Color font-medium h-full flex flex-col justify-center">
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
                      <div className="w-full mt-6 mb-14 border-t-2 border-text_Color border-b-2 cursor-pointer">
                        <p
                          onClick={() =>
                            seriesPageHandler(product.SubCategoryId)
                          }
                          className="p-3"
                        >
                          {product.UpsellString}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-[90%] mx-auto">
                <h1>Order Summary</h1>
              {orderSummary.map((data, index) => (
                <div key={index}>
                        {typeof data === "object" ? (
                          Object.entries(data).map((discount , index) => (
                            <div key={index}>
                              <h1>{discount.Total}</h1>
                            </div>
                          ))
                        ) : (
                          <p>No Object</p>
                        )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
