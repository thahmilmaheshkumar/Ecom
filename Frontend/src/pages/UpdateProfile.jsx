import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navebar from "../components/Navebar";
import Title from "../components/Title";
import {
  editProfile,
  removeError,
  removeSuccess,
} from "../redux/user/userslice";

const UpdateProfile = () => {
  const { isAuthenticate, user, loading, error, success } = useSelector(
    (state) => state.user,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState(user?.avathar?.url);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      toast.error("Please login...", { autoClose: 300 });
      navigate("/");
    }
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
    }
  }, [isAuthenticate, user]);

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3 });
    }
  }, [dispatch, error]);

  const handleChangeImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("avatar", avatar);

    dispatch(editProfile(form));
  };

  return (
    <>
      <div>
        <Title title={"Profile"} />
        <Navebar />
        <div className="flex items-center justify-center h-screen w-full">
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-blue-700 text-2xl md:text-4xl font-semibold">
              My Profile
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="min-h-20 md:min-h-40 w-90 md:w-150 flex p-9 rounded-3xl flex-col gap-9 items-center bg-white shadow-2xl">
                <img
                  src={preview}
                  alt={user?.name}
                  className="h-30 w-30 rounded-full shadow-blue-300 shadow-lg"
                />

                <div>
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer bg-blue-100 text-blue-600 text-sm font-medium p-3 rounded-2xl"
                  >
                    Change Image
                  </label>
                  <input
                    name="avatar"
                    accept="image/*"
                    type="file"
                    id="avatar"
                    onChange={handleChangeImage}
                    className="hidden"
                  />
                </div>

                <div className="w-full flex flex-col gap-2 p-4 rounded-xl">
                  <span className="text-lg">Full Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-blue-800 px-4 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all py-4 shadow-2xl border-2 focus:outline-none border-gray-400 rounded-2xl text-2xl"
                  />
                </div>

                <div className="w-full p-4  flex flex-col gap-2 rounded-xl">
                  <span className="text-lg">Email Address</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-blue-800 shadow-2xl px-4 py-4 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all focus:outline-none border-2 border-gray-400 rounded-2xl text-2xl"
                  />
                </div>

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
                  onClick={() => navigate("/profile/update")}
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
                    "Update Profile"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
