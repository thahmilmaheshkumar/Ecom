import React, { useEffect } from "react";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import ProductCom from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeError } from "../redux/products/productSlice";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import Paginate from "../components/Paginate";

const Product = () => {
  const category = ["Electronics", "Stationary", "accessories"];
  const { product, productCount, loading, error } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [error, dispatch]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div>
        <div>
          <Navebar />
          <main>
            <div className="flex flex-col md:flex-row p-3 items-center gap-6">
              <aside className="w-full h-full p-5 flex flex-col items-center rounded-lg bg-white md:w-1/4 shadow-lg sticky top-12">
                <h2 className="font-semibold text-lg ">Category</h2>
                <div className="w-full h-full p-3">
                  <ul>
                    {category.map((cat, index) => {
                      return (
                        <li key={index} className="m-4">
                          <button className="cursor-pointer">{cat}</button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
              <div className="h-full w-3/4 grid sm:grid-cols-1 md:grid-cols-3 gap-10">
                {product.map((prod) => (
                  <ProductCom
                    key={prod._id}
                    product={prod}
                    rating={prod.rating}
                  />
                ))}
              </div>
            </div>
            <Paginate />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Product;
