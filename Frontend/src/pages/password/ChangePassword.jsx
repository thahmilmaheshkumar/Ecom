import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navebar from "../../components/Navebar";
import {
  changePassword,
  removeError,
  removeSuccess,
} from "../../redux/password/password";

const ChangePassword = () => {
  const { loading, error, success, message } = useSelector(
    (state) => state.password,
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [same, setSame] = useState(false);
  const [errors, setErrors] = useState({
    oldPass: false,
    newPass: false,
    confirmPass: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 300 });
      dispatch(removeError());
    }
  }, [dispatch, error]);
  useEffect(() => {
    if (success) {
      toast.success(message, { autoClose: 300 });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      oldPass: !oldPassword,
      newPass: !newPassword,
      confirmPass: !confirmPassword,
    });

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required", { autoClose: 300 });
    }

    if (newPassword !== confirmPassword) {
      setErrors({
        oldPass: false,
        newPass: true,
        confirmPass: true,
      });
      setSame(false);
      return toast.error("Invalid password", { autoClose: 300 });
    }

    setSame(true);

    dispatch(changePassword({ oldPassword, newPassword }));
  };

  return (
    <>
      <Navebar />
      <Title title={"Change Password"} />
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-blue-700 text-2xl md:text-4xl font-semibold">
            Change Password
          </h2>

          <div className="min-h-20 md:min-h-40 w-90 md:w-150 flex p-9 rounded-3xl flex-col gap-9 items-center bg-white shadow-2xl">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full flex flex-col gap-2 p-4">
                <label htmlFor="oldpassword" className="text-lg">
                  Old Password
                </label>
                <motion.input
                  type="password"
                  name="oldpassword"
                  id="oldpassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  animate={
                    errors.oldPass ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }
                  }
                  placeholder="Enter old password"
                  className={`border-gray-400 w-full border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                    errors.oldPass ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div className="w-full flex flex-col gap-2 p-4">
                <label htmlFor="newpassword">New Password</label>
                <motion.input
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  animate={
                    errors.newPass ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }
                  }
                  placeholder="Enter new password"
                  className={`border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                    errors.newPass ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div className="w-full flex flex-col gap-2 p-4">
                <label htmlFor="confirmpassword">Confirm New Password</label>
                <motion.input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  animate={
                    errors.confirmPass
                      ? { x: [0, -50, 50, -50, 50, 0] }
                      : { x: 0 }
                  }
                  placeholder="Confirm new password"
                  className={`border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                    errors.confirmPass ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "tween" }}
                type="submit"
                className={`w-full p-4 ${same ? "" : "bg-blue-200 cursor-not-allowed"}  text-white rounded-xl mb-2  cursor-pointer 
                  ${
                    loading
                      ? "bg-blue-200 cursor-not-allowed"
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
                  "Change Password"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
