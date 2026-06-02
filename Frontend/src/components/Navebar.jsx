import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);
const MotionShoppingCart = motion.create(ShoppingCart);

const Navebar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);

  return (
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

        <div className="flex items-center gap-x-0.5">
          <input
            type="text"
            placeholder="Search products"
            className=" md:flex overflow-hidden px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm w-32 md:w-72 shadow-sm"
          />
          <Search
            size={18}
            className="ml-2 text-blue-500 font-semibold cursor-pointer"
          />
        </div>

        <div className="relative">
          <MotionLink to="cart">
            <MotionShoppingCart
              size={20}
              className="relative text-gray-700 hover:text-blue-800 transition"
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              whileTap={{ scale: 0.5 }}
              transition={{ type: "tween" }}
            />
          </MotionLink>
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center min-h-5 min-w-5">
            {cartCount}
          </span>
        </div>

        <div className="hidden md:flex">
          <MotionLink to="register">
            <motion.button
              className="flex gap-3 text-white bg-blue-500 px-3 py-2 rounded-md items-center"
              whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.9, backgroundColor: "#3b82f6" }}
              transition={{ type: "tween" }}
            >
              <User size={18} className="text-white" />
              Register
            </motion.button>
          </MotionLink>
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
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navebar;
