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
      navigate("/login");
    }
  }, [dispatch, success]);

  const [avatar, setAvatar] = useState();

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setPreview(reader.result);
          console.log(user.avatar);
        }

        reader.readAsDataURL(e.target.files[0]);
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      return toast.error("Please enter all details", { autoClose: 3000 });
    }

    const form = new FormData();
    form.append("name", user.name);
    form.append("email", user.email);
    form.append("password", user.password);
    form.append("avatar", user.avatar || preview);

    dispatch(register(form));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="h-screen flex items-center justify-center ">
      <div className="shadow-xl w-100 rounded-4xl p-10 ">
        <div className="flex justify-center">
          <h2 className="font-bold text-2xl">Create Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Full Name"
              className="border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className="border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all"
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
            <button className="h-15 w-90 py-4 px-9 bg-blue-600 rounded-2xl text-white font-semibold">
              Sign Up
            </button>
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
