import { useEffect } from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

const SellesOrder = () => {
  const [sellesOrderData, setSellesOrderData] = useState([]);
  const [useDetails, setUserDetails] = useState();
  const [vendorDetails, setVendorDetails] = useState();
  const [salesOrderDate, setSalesOrderDate] = useState();

  const useDetailsObjects = {
    BillingAddress: "testaddress mumbai teststate 421301",
    ShippingAddress:
      "Somewhere in Rondom world , random street , Badlapur, 421503, Maharashtra,India",
    customerGST: "123456123456123",
  };

  const productData = [
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "Premium Masala Agarbatti Each",
      Item: "Premium Masala Agarbatti",
      HSN_CODE: "30003210",
      Quantity: 500,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 5750000,
      Rate: 11500,
      Trade_Discount: 18,
      InterState_GST: 5,
      GrandTotalAmount: 4950750,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "ATTAR 96 LONDON SERIES 2.5ML-1 Each",
      Item: "ATTAR 96 LONDON SERIES 2.5ML-1",
      HSN_CODE: "30003210",
      Quantity: 140,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 3780,
      Rate: 27,
      Trade_Discount: 0,
      InterState_GST: 18,
      GrandTotalAmount: 4460.4,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "ATTAR 96 LONDON SERIES 2.5ML-3 Each",
      Item: "ATTAR 96 LONDON SERIES 2.5ML-3",
      HSN_CODE: "30003210",
      Quantity: 700,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 18900,
      Rate: 27,
      Trade_Discount: 0,
      InterState_GST: 18,
      GrandTotalAmount: 22302,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "Premium Masala Agarbatti Each",
      Item: "Premium Masala Agarbatti",
      HSN_CODE: "30003210",
      Quantity: 500,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 5750000,
      Rate: 11500,
      Trade_Discount: 18,
      InterState_GST: 5,
      GrandTotalAmount: 4950750,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "ATTAR 96 LONDON SERIES 2.5ML-1 Each",
      Item: "ATTAR 96 LONDON SERIES 2.5ML-1",
      HSN_CODE: "30003210",
      Quantity: 140,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 3780,
      Rate: 27,
      Trade_Discount: 0,
      InterState_GST: 18,
      GrandTotalAmount: 4460.4,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "ATTAR 96 LONDON SERIES 2.5ML-3 Each",
      Item: "ATTAR 96 LONDON SERIES 2.5ML-3",
      HSN_CODE: "30003210",
      Quantity: 700,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 18900,
      Rate: 27,
      Trade_Discount: 0,
      InterState_GST: 18,
      GrandTotalAmount: 22302,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "Premium Masala Agarbatti Each",
      Item: "Premium Masala Agarbatti",
      HSN_CODE: "30003210",
      Quantity: 500,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 5750000,
      Rate: 11500,
      Trade_Discount: 18,
      InterState_GST: 5,
      GrandTotalAmount: 4950750,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "ATTAR 96 LONDON SERIES 2.5ML-1 Each",
      Item: "ATTAR 96 LONDON SERIES 2.5ML-1",
      HSN_CODE: "30003210",
      Quantity: 140,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 3780,
      Rate: 27,
      Trade_Discount: 0,
      InterState_GST: 18,
      GrandTotalAmount: 4460.4,
    },
    {
      vendor_Id: "9093298f-3d24-4c36-9f42-ec3d4e482a6e",
      ProductName: "ATTAR 96 LONDON SERIES 2.5ML-3 Each",
      Item: "ATTAR 96 LONDON SERIES 2.5ML-3",
      HSN_CODE: "30003210",
      Quantity: 700,
      user_Id: "9ea17cfb-5af3-4e1a-b3f5-75f14e7e180a",
      Amount: 18900,
      Rate: 27,
      Trade_Discount: 0,
      InterState_GST: 18,
      GrandTotalAmount: 22302,
    },
  ];

  const vendorDetailObjects = {
    vendorName: "Nemat Spray Perfumes",
    vendorAddress:
      "Admin Off: 43, Princess Street,\n2nd Floor, Devkaran Mansion\nMumbai, Maharashtra - 400002 ",
    VendorGstNo: "27AADFN0649R1ZQ",
    VendorWhatsApp_No: 976992545,
    VendorBankAddress:
      "Admin Off: 43, Princess Street,\n2nd Floor, Devkaran Mansion\nMumbai, Maharashtra - 400002 ",
    VendorBankAccountNo: "1426194288124",
  };

  const salesOrderDateobject = {
    SalesOrderDate: "02-03-2024",
  };

  useEffect(() => {
    setSellesOrderData(productData);
    setUserDetails(useDetailsObjects);
    setVendorDetails(vendorDetailObjects);
    setSalesOrderDate(salesOrderDateobject);
  }, []);

  //   const handleDownloadPDF = () => {
  //   // Create a new jsPDF instance
  //   const pdf = new jsPDF();

  //   // Add content to the PDF
  //   const element = document.querySelector('.pdf-container');
  //   pdf.text(20, 20, 'Sales Order');
  //   pdf.text(20, 30, element.innerText);

  //   // Save the PDF
  //   pdf.save('sales_order.pdf');
  // };

//   const chunkSize = 10;

  const handleDownloadPDF = () => {
  const element = document.querySelector('.pdf-container');

  html2pdf(element);
};

  

  return (
    <>
      <div className="w-full h-full mb-10 pdf-container">
        <div className="w-[95%] mt-5 mx-auto my-auto  ">
          <div className="w-full flex justify-between">
            <div className="w-[50%]">
              <h1 className="text-2xl font-Marcellus pb-3 text-text_Color font-bold ">
                {vendorDetails?.vendorName}
              </h1>
              <p className="w-[70%] text-text_Color2 pb-1 font-Marcellus font-normal">
                {vendorDetails?.vendorAddress}
              </p>
              <p className="w-[70%] text-text_Color2 pb-1 font-Marcellus font-normal">
                GST IN :- {vendorDetails?.VendorGstNo}
              </p>

              <p className="text-text_Color font-Marcellus pb-1 font-normal">
                WhatsApp No: {vendorDetails?.VendorWhatsApp_No}
              </p>
            </div>
            <div className="w-[50%] flex flex-col justify-start items-end ">
              <div className="w-[60%] border-2 border-text_Color bg-[#F1F0F6] ">
                <h1 className="p-2 border-b-[1px] text-xl border-text_Color text-center text-text_Color font-roxborough font-semibold">
                  Sales Order
                </h1>
                <div className="flex justify-between font-Marcellus text-text_Color ">
                  <p className="py-2 w-[40%] text-center border-r-[1px] border-text_Color">
                    DATE
                  </p>
                  <p className="py-2 w-[60%] text-center">
                    {salesOrderDate?.SalesOrderDate}
                  </p>
                </div>
                <div className="flex justify-between font-Marcellus text-text_Color border-t-[1px] border-text_Color ">
                  <p className="py-2 w-[40%] text-center border-r-[1px] border-text_Color">
                    S.O.NO
                  </p>
                  <p className="py-2 w-[60%] text-center">23/24-388</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between mt-5 gap-x-5">
            <div className="w-[50%] h-[200px] bg-Cream border-[1px] border-text_Color">
              <div className="w-full h-[75%] mx-auto text-text_Color font-Marcellus">
                <p className=" p-2 pb-1">Billed To :- </p>
                <p className="px-2 pb-1">{useDetails?.BillingAddress}</p>
              </div>
              <div className="w-full h-[25%] border-t-2 border-b-2 border-[1px] border-text_Color overflow-hidden">
                <div className="flex text-text_Color text-center font-Marcellus ">
                  <p className="w-[15%] py-3 border-r-2 border-text_Color pb-2 ">
                    GSTIN
                  </p>
                  <p className="w-[35%] py-3  border-r-2 border-text_Color pb-2">
                    {useDetails?.customerGST}
                  </p>
                  <p className="w-[20%] py-3  border-r-2 border-text_Color pb-2">
                    PAN No.
                  </p>
                  <p className="w-[30%] py-3 pb-2">AATFS2084F</p>
                </div>
              </div>
            </div>

            {/* Address Section  */}
            <div className="w-[50%]  h-[200px] border-[1px] border-text_Color bg-Cream">
              <div className="w-full h-[75%] mx-auto text-text_Color font-Marcellus">
                <p className=" p-2 pb-1">Shipped to: :- </p>
                <p className="px-2 pb-1">{useDetails?.ShippingAddress}</p>
              </div>
              <div className="w-full h-[25%] border-t-2 border-b-2 border-[1px] border-text_Color overflow-hidden">
                <div className="flex text-text_Color text-center  ">
                  <p className="w-[20%] py-3 border-r-2 border-text_Color pb-2 ">
                    State Code
                  </p>
                  <p className="w-[30%] py-3  border-r-2 border-text_Color pb-2">
                    08
                  </p>
                  <p className="w-[20%] py-3  border-r-2 border-text_Color pb-2">
                    P.O. No
                  </p>
                  <p className="w-[30%] py-3 pb-2">AATFS2084F</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-5 h-auto border-[1px] border-text_Color text-center">
            <div>
              <div className="w-full h-[25%] flex  text-text_Color font-Marcellus">
                <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                  Item
                </p>
                <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                  Description
                </p>
                <p className="w-[10%] py-3 border-r-[1px] border-text_Color">
                  Qty
                </p>
                <p className="w-[10%] py-3 border-r-[1px] border-text_Color">
                  Rate
                </p>
                <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                  HSN CODE
                </p>
                <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                  Amount
                </p>
                <p className="w-[13%] py-3 border-r-[1px] border-text_Color text-center">
                  InterState <br /> GST
                </p>
                <p className="w-[13%] py-3 border-r-[1px] border-text_Color">
                  Trade <br /> Discount
                </p>
                <p className="w-[15%] py-3">Total Amount</p>
              </div>
            </div>
            <div className="w-full">
              <div>
                {sellesOrderData?.map((data, index) => (
                  <div key={index} className="flex">
                    <div className="w-full h-[25%] flex border-t-[1px] text-text_Color2 font-Marcellus border-text_Color">
                      <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                        {data.Item}
                      </p>
                      <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                        {data.ProductName}
                      </p>
                      <p className="w-[10%] py-3 border-r-[1px] border-text_Color">
                        {data.Quantity}
                      </p>
                      <p className="w-[10%] py-3 border-r-[1px] border-text_Color">
                        {data.Rate}
                      </p>
                      <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                        {data.HSN_CODE}
                      </p>
                      <p className="w-[15%] py-3 border-r-[1px] border-text_Color">
                        {data.Amount}
                      </p>
                      <p className="w-[13%] py-3 border-r-[1px] border-text_Color">
                        {data.InterState_GST}%
                      </p>
                      <p className="w-[13%] py-3 border-r-[1px] border-text_Color">
                        {data.Trade_Discount}%
                      </p>
                      <p className="w-[15%] py-3">{data.GrandTotalAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[100%] flex flex-col justify-end items-end  border-t-[1px] border-text_Color text-text_Color2 font-Marcellus">
              <div className="flex w-[34%] justify-between border-l-[1px] border-text_Color  ">
                <p className="pb-1 ml-2">Total</p>
                <p className="pb-1 mr-2">4977512.40</p>
              </div>
              <div className="flex w-[34%] justify-between border-l-[1px] border-text_Color ">
                <p className="pb-1 ml-2">Round Off Amount</p>
                <p className="pb-1 mr-2">-0.40</p>
              </div>
              <div className="flex w-[34%] justify-between border-l-[1px] border-text_Color ">
                <p className="pb-1 ml-2">Grand Total Amount</p>
                <p className="pb-1 mr-2">4977512</p>
              </div>
            </div>

            <div className="w-full border-t-[1px] border-text_Color flex ">
              <p className="w-[35%] py-3 text-center border-r-[1px] border-text_Color text-text_Color">
                This S O is Valid For 30 Days Only.
              </p>
              <p className="w-[65%] py-3 px-6 text-center text-text_Color">
                Our Bank Account No {vendorDetails?.VendorBankAccountNo}{" "}
                {vendorDetails?.VendorBankAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="p-2 text-center bg-red-600 mt-5"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>
    </>
  );
};

export default SellesOrder;
