import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ViewProduct from "./pages/ViewProduct";
import Product from "./pages/Product";
import Register from "./pages/user/Register";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ResetPassword from "./pages/password/ResetPassword";
import ChangePassword from "./pages/password/ChangePassword";

import CheckOut from "./components/CheckOut";
import OrdersPage from "./pages/OrdersPage";
import SingleOrder from "./pages/SingleOrder";
import { useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const { isAuthenticate } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/products" element={<Product />} />

        {isAuthenticate ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/forgot/password" element={<ResetPassword />} />
            <Route path="/password/change" element={<ChangePassword />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order" element={<OrdersPage />} />
            <Route path="/orders/single/:id" element={<SingleOrder />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
