import "./App.css";
import Admin_login from "./Component/Admin_login";
import { Navigate, Route, Routes } from "react-router-dom";
import Error from "./Component/Error";
import Dashboard from "./Component/Dashboard";
import { PrivateRoute } from "./Component/auth/PrivateRoute";
import Check from "./Component/Check";
import Category from "./Component/sidebar/Category";
import Sub_Category from "./Component/sidebar/Sub_Category";
import Product from "./Component/sidebar/Product";
import Review from "./Component/sidebar/Review";
import EditCategory from "./Component/sidebar/EditCategory";
import EditSub_Category from "./Component/sidebar/EditSub_Category";
import DiscountSlabe from "./Component/sidebar/slabs/DiscountSlabe";
import Edit_DiscountSlabe from "./Component/sidebar/slabs/Edit_DiscountSlabe";
import QuantityScheme from "./Component/sidebar/slabs/QuantityScheme";
import Edit_QuantityScheme from "./Component/sidebar/slabs/Edit_QuantityScheme";
import PromoHeader from "./Component/sidebar/website/PromoHeader";
import BannerSlider from "./Component/sidebar/website/BannerSlider";
import VerifyUser from "./Component/sidebar/registerUser/verifyUser";
import Edit_BannerSlider from "./Component/sidebar/website/Edit_BannerSlider";
import Fragrance from "./Component/sidebar/slabs/Fragrance";
import Edit_Fragrance from "./Component/sidebar/slabs/Edit_Fragrance";
import UserMangement from "./Component/sidebar/userMangement/UserMangement";
import Edit_UserManagement from "./Component/sidebar/userMangement/Edit_UserManagement";
import { useSelector } from "react-redux";
import Edit_Product from "./Component/sidebar/Edit_Product";
import AdminContact from "./Component/sidebar/website/AdminContact";
import Smtp from "./Component/settings & Config/Smtp";
import Policies from "./Component/sidebar/website/Policies";
import Edit_Policies from "./Component/sidebar/website/Edit_Policies";
import Vendors from "./Component/sidebar/vendors/Vendors";
import Edit_Vendors from "./Component/sidebar/vendors/Edit_Vendors";
import OrderManagement from "./Component/sidebar/orderManagement/OrderManagement";
import EditOrderManagement from "./Component/sidebar/orderManagement/EditOrderManagement";
import AboutUs from "./Component/sidebar/website/AboutUs";
import CustomerQueries from "./Component/sidebar/customerQueries/CustomerQueries";
import PrevCustomerQueries from "./Component/sidebar/customerQueries/PrevCustomerQueries";
import OrderManagementTable from "./Component/sidebar/orderManagement/OrderManagementTable";



function App() {
  const { user } = useSelector((store) => store.profile);
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin_login />} />
        <Route path="*" element={<Error />} />
        {/* <Route path="verifyuser/:_id" element={<VerifyUser />} /> */}
       


        <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      >
                
          <Route path="check" element={<Check />} />
          {/* Category with Category Edit after Creation  */}
          <Route path="category" element={<Category />} />
          <Route path="category/edit/:_id" element={<EditCategory />} />

          {/* Sub_Category with Category Edit after Creation  */}
          <Route path="sub_category" element={<Sub_Category />} />
          <Route
            path="sub_category/sub_edit/:_id"
            element={<EditSub_Category />}
          />

          <Route path="product" element={<Product />} />
            <Route path="product/edit_product/:_id" element={<Edit_Product/>}/>
          <Route path="product_review" element={<Review />} />

          <Route path="discountSlabe" element={<DiscountSlabe />} />
          <Route
            path="discountSlabe/Slabs_edit/:_id"
            element={<Edit_DiscountSlabe />}
          />

          <Route path="quantityscheme" element={<QuantityScheme />} />
          <Route
            path="quantityscheme/scheme_edit/:_id"
            element={<Edit_QuantityScheme />}
          />
          
          <Route path="fragrance"  element={<Fragrance/>}/>
            <Route path="fragrance/fragrance_edit/:_id" element={<Edit_Fragrance/>}/>


        {/* {Website Content App Router } */}
          <Route path="website/promoHeader" element={<PromoHeader />} />

          <Route path="website/bannerSlider" element={<BannerSlider />} />
            <Route path="website/bannerSlider/edit_bannerslider/:_id" element={<Edit_BannerSlider/>}/>

          <Route path="website/admincontact" element={<AdminContact/>}/>

           <Route path="website/policies" element={<Policies/>}/>
           <Route path="website/policies/edit_policies/:_id" element={<Edit_Policies/>}/>

           <Route path="website/aboutus" element={<AboutUs/>}/>

          {/* Vendors Details */}

          <Route path="vendors" element={<Vendors/>}/>
            <Route path="vendors/edit_vendor/:_id" element={<Edit_Vendors/>}/>

          {/* User Mangemant Routes  */}
          <Route path="user-mangement" element={<UserMangement/>} />
            <Route path="user-mangement/user_prev/:_id" element={<Edit_UserManagement/>}/>

          {/* User Management Routes  */}
          <Route path="order-mangement" element={<OrderManagementTable/>}/>
            <Route path="order-mangement/view_order/:_id" element={<EditOrderManagement/>}/>

          {/* Customer Queries  */}
          <Route path="customer-queries" element={<CustomerQueries/>}/>
            <Route path="customer-queries/prev-queries/:_id" element={<PrevCustomerQueries/>}/>
            

          {/* Setting User or Config Routes  */}
          <Route path="settings/smtp" element={<Smtp/>}/>
            
        </Route>
      </Routes>
    </>
  );
}

export default App;
