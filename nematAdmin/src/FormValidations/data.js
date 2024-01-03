import * as yup from "yup";

export const categoryObjectSchema = yup.object({
  name: yup.string().min(2).required("Enter Category Name"),
  metaTitle: yup.string().min(2).required("Enter Meta Title For Category"),
  metaDesc: yup.string().min(2).required("Emter Meta Desc for Category"),
  metaKeyword: yup.string().min(2).required("Enter Meta Keywords"),
  slugUrl: yup.string().min(2).required("Enter slugUrl"),
  cartDiscount: yup.string().min(2).required("Enter cartDiscount"),
  bannerImageMobile: yup.string(),
  bannerImageDesktop: yup.string(),
});
