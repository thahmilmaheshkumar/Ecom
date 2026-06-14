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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/products" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/forgot/password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
