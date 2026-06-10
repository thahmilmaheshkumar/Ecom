import React, { useEffect } from "react";
import Imageslider from "../components/Imageslider";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeError } from "../redux/products/productSlice";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import Title from "../components/Title";

const Home = () => {
  const { product, productCount, loading, error } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ keyword: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [error, dispatch]);

  const offers = [
    "https://images.unsplash.com/photo-1609017604163-e4ca9c619b9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9mZmVyc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  ];

  return loading ? (
    <Loader />
  ) : (
    <>
      <Title title={"Home"} />
      <div>
        <Navebar />
        <Imageslider image={offers} />
        <div className="mx-auto max-w-6xl p-4 flex flex-col items-center justify-center gap-4">
          <motion.h1
            className="text-blue-600 font-bold text-3xl"
            initial={{ x: -10000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 30,
              duration: 2,
            }}
          >
            Welcome to Our Store
          </motion.h1>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {product.map((prod) => (
              <Product key={prod._id} product={prod} rating={prod.rating} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
