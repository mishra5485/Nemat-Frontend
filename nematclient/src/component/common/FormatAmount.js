export const formattedAmount = (amount) => {
  const formatAmount = amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return formatAmount;
};



