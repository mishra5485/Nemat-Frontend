import * as yup from "yup";
 
export const RegisterobjectSchema = yup.object({
  camponeyname: yup.string().min(2).required("Enter your Company Name"),
  gstno: yup
    .string()
    .matches(/^[a-zA-Z0-9]{15}$/, "Please enter  valid  GST number")
    .required("Enter the GST NO")
    .test((val) => val && val.toString().length === 15)
    .min(15)
    .required("Please Enter valid GST number "),
  address: yup.string().required("Please Enter  Address"),
  state: yup.string().min(3).required(" Please Enter State "),
  city: yup.string().min(3).required(" Please Enter  City Name"),
  zipcode: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .required("Enter the Zip Code"),
  fullname: yup
    .string()
    .required("Full name is required")
    .min(4)
    .matches(/^([a-zA-Z]+ ?){1,4}$/, "Invalid full name"),
  email: yup
    .string()
    .email("Enter the Valid Email id")
    .required("Enter Your Email"),
  countryCode: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid Mobile number")
    .min(1, "Enter valid Country Code")
    .max(999, "Enter valid Country Code")
    .required("Enter the valid Number"),
  mobileNo: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid Mobile number")
    .test((val) => val && val.toString().length === 10)
    .min(1, "Please Enter 10 digit number")
    .max(9999999999, "Enter 10 digit number ")
    .required("Enter the 10 digit no"),
  whatappcheck: yup
    .number()
    .oneOf([0, 1])
    .required("Select the checkbox value"),
  countryCode1: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid Mobile number"),
  landlineNo: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid LandLine number"),
});


export const CompanyschemaObject = yup.object({
  camponeyname: yup.string().min(2).required("Enter your Company name"),
  gstno: yup
    .string()
    .matches(/^[a-zA-Z0-9]{15}$/, "Please enter  valid  GST number")
    .required("Enter the GST NO")
    .test((val) => val && val.toString().length === 15)
    .min(15)
    .required("Please Enter valid GST number "),
  address: yup.string().required("Please Enter the Company Address"),
  state: yup.string().min(3).required("Enter the State Name"),
  city: yup.string().min(3).required("Enter the City Name"),
  zipcode: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .required("Enter the Zip Code"),
});

export const PasswordChangeObjectSchema = yup.object({
  currentpassword: yup.string().min(5).required("Enter the current Password"),
  newpassword: yup.string().min(5).required("Enter the New Password"),
  confirmPWD: yup
    .string()
    .min(5)
    .oneOf([yup.ref("newpassword"), null], "Passwords must match")
    .required("Confirm the Password"),
});


export  const LoginObjectSchema = yup.object({
     email: yup
       .string()
       .email("Enter your Valid Email id")
       .required("Enter Your Email"),
     password: yup.string().min(5).required("Enter the Password"),
   });
