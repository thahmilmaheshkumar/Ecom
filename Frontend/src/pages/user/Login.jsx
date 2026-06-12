import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { login } from "../../redux/user/userslice";
import Loader from "../../components/Loader";

const Login = () => {
  const { error, success, loading } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    password: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3 });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Login Success", { autoClose: 3000 });
      navigate("/");
    }
  }, [dispatch, success]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      name: !user.name,
      password: !user.password,
    });
    if (!user.name || !user.password) {
      return toast.error("Please enter all details", { autoClose: 3000 });
    }

    dispatch(login(user));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="h-screen flex items-center justify-center ">
      <div className="shadow-xl w-100 rounded-4xl p-10 ">
        <div className="flex justify-center">
          <h2 className="font-bold text-2xl text-blue-700">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <motion.input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Full Name"
              animate={errors.name ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }}
              className={`border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <motion.input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              animate={
                errors.password ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }
              }
              className={`border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="h-15 cursor-pointer w-90 py-4 px-9 bg-blue-600 rounded-2xl text-white font-semibold"
            >
              Sign In
            </motion.button>
          </div>

          <div className="flex justify-center">
            <p>
              New User?
              <Link
                to={"/register"}
                className="underline text-blue-400 ml-1 text-lg"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
