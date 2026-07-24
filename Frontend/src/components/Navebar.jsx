import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { logout, removeError, removeSuccess } from "../redux/user/userslice";

const MotionLink = motion.create(Link);
const MotionShoppingCart = motion.create(ShoppingCart);

const Navebar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { isAuthenticate, user, loading, error, success } = useSelector(
    (state) => state.user,
  );

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 300 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/products?k=${search}`);
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return loading ? (
    <Loader />
  ) : (
    <motion.nav
      className="sticky top-0 shadow-md bg-white z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 30,
        duration: 4,
      }}
    >
      <div className="mx-auto flex overflow-hidden items-center justify-around md:justify-between p-4 max-w-6xl ">
        <MotionLink
          to="/"
          className="flex overflow-hidden items-center gap-0.5 w-fit text-xs md:text-lg font-bold text-blue-500"
          whileHover={{ scale: 1.1, color: "#3b82f6" }}
          whileTap={{ scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <ShoppingBag size={18} />
          <motion.span>Thahmil's Store</motion.span>
        </MotionLink>

        <div className="hidden md:flex items-center gap-4">
          <MotionLink
            to="/"
            className="text-gray-700 font-semibold hover:text-blue-800 transition "
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            whileTap={{ scale: 0.5 }}
            transition={{ type: "tween" }}
          >
            Home
          </MotionLink>
          <MotionLink
            to="/products"
            className="text-gray-700 font-semibold hover:text-blue-800 transition"
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            whileTap={{ scale: 0.5 }}
            transition={{ type: "tween" }}
          >
            Products
          </MotionLink>
          <MotionLink
            to="/about"
            className="text-gray-700 font-semibold hover:text-blue-800 transition"
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            whileTap={{ scale: 0.5 }}
            transition={{ type: "tween" }}
          >
            About Us
          </MotionLink>
          <MotionLink
            to="/contact"
            className="text-gray-700 font-semibold hover:text-blue-800 transition"
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            whileTap={{ scale: 0.5 }}
            transition={{ type: "tween" }}
          >
            Contact Us
          </MotionLink>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-x-0.5">
          <input
            type="text"
            placeholder="Search products"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className=" md:flex overflow-hidden px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm w-32 md:w-72 shadow-sm"
          />
          <Search
            size={18}
            className="ml-2 text-blue-500 font-semibold cursor-pointer"
          />
        </form>

        <div className="relative">
          <MotionLink to="/cart">
            <MotionShoppingCart
              size={20}
              className="relative text-gray-700 hover:text-blue-800 transition"
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            />

            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center min-h-5 min-w-5">
              {cartCount}
            </span>
          </MotionLink>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <MotionLink
            to="/login"
            onClick={() => setOpen(false)}
            className={`text-gray-700 font-semibold ${isAuthenticate && "hidden"} hover:text-blue-800 hover:underline`}
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            whileTap={{ scale: 0.5 }}
            transition={{ type: "tween" }}
          >
            Login
          </MotionLink>

          <MotionLink to="/register">
            <motion.button
              className={`flex gap-3 ${isAuthenticate && "hidden"} text-white bg-blue-500 px-3 py-2 rounded-md items-center`}
              whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.9, backgroundColor: "#3b82f6" }}
              transition={{ type: "tween" }}
            >
              <User size={18} className="text-white" />
              Register
            </motion.button>
          </MotionLink>

          <MotionLink
            to="/profile"
            onClick={() => setOpen(false)}
            className={`text-gray-700 font-semibold ${isAuthenticate || "hidden"} hover:text-blue-800 `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.5 }}
            transition={{ type: "tween" }}
          >
            <img
              src={user?.avathar?.url}
              className="h-10 w-10 object-cover rounded-full"
            />
          </MotionLink>

          <span
            onClick={handleLogout}
            className={`text-red-500 ${isAuthenticate || "hidden"} cursor-pointer hover:underline transition ease-in duration-300`}
          >
            Logout
          </span>
        </div>

        <div className="flex md:hidden ">
          <button className="mx-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <div
          className={`md:hidden w-full transition-all
            onClick={()=>setOpen(false)} ease-in-out duration-1000 absolute top-14 left-0  bg-white shadow-lg ${open ? "max-h-96 opacity-90  translate-y-0" : "max-h-0 opacity-0 -translate-y-2"} overflow-hidden`}
        >
          <div className="flex flex-col gap-4 p-4">
            <MotionLink
              to="/"
              onClick={() => setOpen(false)}
              className="text-gray-700  font-semibold hover:text-blue-800 transition "
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            >
              Home
            </MotionLink>
            <MotionLink
              to="/products"
              onClick={() => setOpen(false)}
              className="text-gray-700 font-semibold hover:text-blue-800 transition"
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            >
              Products
            </MotionLink>
            <MotionLink
              to="/about"
              onClick={() => setOpen(false)}
              className="text-gray-700 font-semibold hover:text-blue-800 transition"
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            >
              About Us
            </MotionLink>
            <MotionLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="text-gray-700 font-semibold hover:text-blue-800 transition"
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            >
              Contact Us
            </MotionLink>

            <MotionLink
              to="/login"
              onClick={() => setOpen(false)}
              className={`text-gray-700 font-semibold ${isAuthenticate && "hidden"} hover:text-blue-800`}
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            >
              Login
            </MotionLink>

            <MotionLink
              to="/register"
              onClick={() => setOpen(false)}
              className={`text-gray-700 font-semibold ${isAuthenticate && "hidden"} hover:text-blue-800 `}
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            >
              Register
            </MotionLink>

            <MotionLink
              to="/profile"
              onClick={() => setOpen(false)}
              className={`text-gray-700 font-semibold ${isAuthenticate || "hidden"} hover:text-blue-800 `}
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            >
              Profile
            </MotionLink>

            <span
              onClick={handleLogout}
              className={`text-red-500 ${isAuthenticate || "hidden"} cursor-pointer hover:underline transition ease-in duration-300`}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navebar;
