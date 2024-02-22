import toast from "react-hot-toast";

export const showToast = (message, type) => {
  let toastType = toast.success; // Default toast type is success

  // Customize toast type based on provided type
  if (type === 'error') {
    toastType = toast.error;
  }

  toastType(message, {
    style: {
      background: type === 'error' ? "#FEEEE2" : "#F0F9EB", // Background color for error or success toast
      color: type === 'error' ? "#642F29" : "#135E01", // Font color for error or success toast
      fontFamily: "Marcellus", // Font family for toast
    },
    iconTheme: {
      primary: type === 'error' ? "#642F29" : "#135E01", // Color of error or success icon
      secondary: "#FFFFFF", // Background color of error or success icon
    },
  });
};