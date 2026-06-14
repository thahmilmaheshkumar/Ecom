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

  return (
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "tween" }}
              type="submit"
              className={`w-full p-4 bg-blue-700 text-white rounded-xl mb-2 cursor-pointer ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-1">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: dot * 0.2,
                      }}
                    />
                  ))}
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </div>

          <div className="flex flex-col gap2 justify-center items-center">
            <p>
              New User?
              <Link
                to={"/register"}
                className="underline text-blue-400 ml-1 text-lg"
              >
                Sign Up
              </Link>
            </p>

            <p>
              Forgot password?
              <Link
                to={"/forgot/password"}
                className="underline text-blue-400 ml-1 text-lg"
              >
                Forgot
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
