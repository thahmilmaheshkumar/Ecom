import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/user/userslice";
import Loader from "../../components/Loader";

const Register = () => {
  const [preview, setPreview] = useState(
    "https://img.icons8.com/?size=60&id=98957&format=png",
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const { error, success, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3 });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Register Success", { autoClose: 3000 });
      navigate("/");
    }
  }, [dispatch, success]);

  const [avatar, setAvatar] = useState();

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      name: !user.name,
      email: !user.email,
      password: !user.password,
    });
    if (!user.name || !user.email || !user.password) {
      return toast.error("Please enter all details", { autoClose: 3000 });
    }

    const form = new FormData();
    form.append("name", user.name);
    form.append("email", user.email);
    form.append("password", user.password);
    form.append("avatar", avatar || preview);

    dispatch(register(form));
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="shadow-xl w-100 rounded-4xl p-10 ">
        <div className="flex justify-center">
          <h2 className="font-bold text-2xl text-blue-700">Create Account</h2>
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
            <label htmlFor="email">Email</label>
            <motion.input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Email"
              animate={
                errors.email ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }
              }
              className={`border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <motion.input
              name="password"
              type="password"
              id="password"
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

          <div className="flex items-center gap-5">
            <img
              src={preview}
              className="h-14 w-14 object-cover bg-blue-200 rounded-3xl p-1"
            />
            <input
              name="avatar"
              accept="image/*"
              type="file"
              onChange={handleChange}
              className="file:bg-blue-100 hover:file:cursor-pointer block w-full file:px-3 file:py-2 file:mr-4 hover:file:bg-blue-200 file:text-blue-600 file:rounded-full"
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
                "Sign Up"
              )}
            </motion.button>
          </div>

          <div className="flex justify-center">
            <p>
              Already have an account?
              <Link
                to={"/login"}
                className="underline text-blue-400 ml-1 text-lg"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
