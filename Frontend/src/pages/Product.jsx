import React, { useEffect, useState } from "react";
import Navebar from "../components/Navebar";
import Footer from "../components/Footer";
import ProductCom from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeError } from "../redux/products/productSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Paginate from "../components/Paginate";
import Title from "../components/Title";
import Loader from "../components/Loader";

const Product = () => {
  const category = ["accessories", "electronics", "stationary"];
  const { product, productCount, loading, error, totalPages } = useSelector(
    (state) => state.product,
  );
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageurl = parseInt(searchParams.get("page"), 10) || 1;
  const keyword = searchParams.get("k") || "";
  const [page, setPage] = useState(pageurl);
  const [categoryState, setCategoryState] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ keyword, page, category: categoryState }));
  }, [dispatch, keyword, page, categoryState]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [error, dispatch]);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };

  const handleCategory = async (cat) => {
    setCategoryState(cat);
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <Title title={"Products"} />
      <div>
        <div>
          <Navebar />
          <main>
            <div className="flex flex-col md:flex-row p-3 items-center md:items-start gap-6">
              <aside className="w-full h-full p-5 flex flex-col  items-center rounded-lg bg-white md:w-1/4 shadow-lg sticky top-12">
                <h2 className="font-semibold text-lg ">Category</h2>
                <div className="w-full h-full p-3">
                  <ul>
                    {category.map((cat, index) => {
                      return (
                        <li
                          key={index}
                          className="m-4"
                          onClick={() => handleCategory(cat)}
                        >
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
            <Paginate
              count={totalPages}
              onPageChange={handlePageChange}
              page={page - 1}
            />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Product;
