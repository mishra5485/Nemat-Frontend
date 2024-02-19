import "./App.css";
import Login from "./component/Login";
import ChangePassword from "./component/ChangePassword";
import CompanyDetails from "./regestation/CompanyDetails";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Error from "./pages/Error";
import { PrivateRoute } from "./component/auth/PrivateRoute";
import RequestSent from "./regestation/RequestSent";
import PasswordUpdated from "./component/passwordUpdated";
import Cart from "./component/Cart";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import ContactUs from "./pages/ContactUs";
import Series from "./pages/Series";
import VerifyUser from "./pages/VerifyUser";
import Profile from "./pages/Profile";
import ChangePasswordComponent from "./component/ChangePasswordComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/resetpassword/:_token" element={<ResetPassword />} />
        {/* <Route  path='/resetpassword' element={<ResetPassword/>}/> */}

        <Route path="verifyuser/:_id" element={<VerifyUser />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/companydetails"
          element={
              <CompanyDetails />
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/series/:_id"
          element={
            <PrivateRoute>
              <Series />
            </PrivateRoute>
          }
        />

        <Route
          path="/changepassword"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        <Route
          path="/changepasswordprofile"
          element={
            <PrivateRoute>
              <ChangePasswordComponent />
            </PrivateRoute>
          }
        />

        <Route
          path="/passwordUpdated"
          element={
            <PrivateRoute>
              <PasswordUpdated />
            </PrivateRoute>
          }
        />

        <Route
          path="/contactus"
          element={
            <PrivateRoute>
              <ContactUs />
            </PrivateRoute>
          }
        />

        <Route
          path="/companydetails/requestsent"
          element={
              <RequestSent />
          }
        />

        <Route
          path="/profile/:_id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Error Router  */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
