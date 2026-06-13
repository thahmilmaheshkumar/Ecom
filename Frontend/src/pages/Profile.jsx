import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navebar from "../components/Navebar";
import Title from "../components/Title";

const Profile = () => {
  const { isAuthenticate, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      toast.error("Please login...", { autoClose: 300 });
      navigate("/login");
    }
  }, [isAuthenticate]);

  return (
    <div>
      <Title title={"Profile"} />
      <Navebar />
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-blue-700 text-2xl md:text-4xl font-semibold">
            My Profile
          </h1>
          <div className="min-h-20 md:min-h-40 w-90 md:w-150 flex p-9 rounded-3xl flex-col gap-9 items-center bg-white shadow-2xl">
            <img
              src={user?.avathar?.url}
              alt={user?.name}
              className="h-30 w-30 rounded-full"
            />

            <div className="w-full flex flex-col gap-2 p-4 bg-blue-50 rounded-xl">
              <span className="text-lg">Full Name</span>
              <h2 className="text-blue-800 capitalize font-semibold text-2xl">
                {user?.name}
              </h2>
            </div>

            <div className="w-full p-4 bg-blue-50 rounded-xl">
              <span className="text-lg">Email Address</span>
              <h2 className="text-blue-800 font-semibold text-2xl">
                {user?.email}
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "tween" }}
              className="w-full p-4 bg-blue-700 text-white rounded-xl mb-2 cursor-pointer"
              onClick={() => navigate("/profile/update")}
            >
              Edit Profile
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
