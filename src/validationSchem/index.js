import * as yup from "yup";
 
export const RegisterobjectSchema = yup.object({
  camponeyname: yup.string().min(2).required("Enter your Company Name"),
  gstno: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .test((val) => val && val.toString().length === 15)
    .min(15)
    .required("Enter the Gst NO"),
  address: yup.string().required("Please Enter the Company Address"),
  state: yup.string().min(3).required("Enter the State Name"),
  city: yup.string().min(3).required("Enter the City Name"),
  zipcode: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .test((val) => val && val.toString().length === 6)
    .min(6)
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
    .test((val) => val && val.toString().length === 3)
    .min(3)
    .required("Enter the 3 digit no"),
  mobileNo: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid Mobile number")
    .test((val) => val && val.toString().length === 10)
    .min(10)
    .required("Enter the 10 digit no"),
  whatappcheck: yup
    .number()
    .oneOf([0, 1])
    .required("Select the checkbox value"),
  countryCode1: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid Mobile number")
    .test((val) => val && val.toString().length === 3)
    .min(3)
    .required("Enter the 3 digit no"),
  landlineNo: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid LandLine number")
    .test((val) => val && val.toString().length === 10)
    .min(10)
    .required("Enter the 10 digit no"),
});


export const CompanyschemaObject = yup.object({
  camponeyname: yup.string().min(2).required("Enter your Company Name"),
  gstno: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .test((val) => val && val.toString().length === 15)
    .min(15)
    .required("Enter the Gst NO"),
  address: yup.string().required("Please Enter the Company Address"),
  state: yup.string().min(3).required("Enter the State Name"),
  city: yup.string().min(3).required("Enter the City Name"),
  zipcode: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Please enter a valid number")
    .test((val) => val && val.toString().length === 6)
    .min(6)
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
       .email("Enter the Valid Email id")
       .required("Enter Your Email"),
     password: yup.string().min(5).required("Enter the Password"),
   });
