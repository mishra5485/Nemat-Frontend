export const formattedAmount = (amount) => {
  const formatAmount = amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return formatAmount;
};


export const OrderStatus = {
   OpenOrder: 0,
   InvoicePaid: 1,
   Packed: 2,
   OutForDelivery: 3,
   Delivered: 4,
   Cancelled: 5,
 };

export const statusData = [
  {
    id: 0,
    title: "OpenOrder",
  },
  {
    id: 1,
    title: "InvoicePaid",
  },
  {
    id: 2,
    title: "Packed",
  },
  {
    id: 3,
    title: "OutForDelivery",
  },
  {
    id: 4,
    title: "Delivered",
  },
];

export const Documents = [
  {
    id: 0,
    title: "Sales Order",
  },
  {
    id: 1,
    title: "GST Invoice",
  },
  {
    id: 2,
    title: "E-Invoice",
  },
  {
    id: 3,
    title: "E Way Bill",
  },
  {
    id: 4,
    title: "Transport Form",
  },
  {
    id: 5,
    title: "Lorry Receipt",
  },
];