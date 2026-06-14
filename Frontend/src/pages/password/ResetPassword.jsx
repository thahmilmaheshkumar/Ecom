import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navebar from "../../components/Navebar";
import {
  otpVerify,
  removeError,
  removeSuccess,
  resetPassword,
} from "../../redux/password/password";
import OtpInput from "react-otp-input";

const ResetPassword = () => {
  const { loading, error, success, message, isVerified, emailSent } =
    useSelector((state) => state.password);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3 });
    }
    dispatch(removeError());
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, { autoClose: 3000 });
    }
    dispatch(removeSuccess());
  }, [dispatch, success, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(!email);

    if (!email) {
      return toast.error("Please enter email", { autoClose: 3000 });
    }

    dispatch(resetPassword({ email }));
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log(otp);
    setOtpError(!otp);

    if (!otp) {
      return toast.error("Please OTP", { autoClose: 3000 });
    }

    dispatch(otpVerify({ otp }));
  };

  return (
    <>
      <Navebar />
      <div className="h-screen w-screen flex justify-center items-center flex-col gap-6">
        <div className="text-2xl font-bold text-blue-600">
          <h2>Forgot Password</h2>
        </div>
        <div className="bg-white md:w-150 rounded-3xl shadow-2xl p-6 m-h-20">
          <form onSubmit={emailSent ? handleOtpSubmit : handleSubmit}>
            <div className="flex flex-col gap-5">
              {emailSent || (
                <div className="flex flex-col gap-5">
                  <label htmlFor="email">Email Address</label>
                  <motion.input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    animate={
                      errors ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }
                    }
                    type="email"
                    placeholder="example@gmail.com"
                    className={`border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                      errors ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
              )}

              {emailSent && (
                <div className="flex flex-col gap-5">
                  <label htmlFor="otp">Enter OTP</label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    containerStyle={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "center",
                    }}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="h-14 w-14 text-center
  text-xl font-bold
  bg-white/80
  backdrop-blur-sm
  border-3 border-gray-200
  rounded-xl
  outline-none
  shadow-lg
  focus:border-blue-500
  focus:shadow-xl
  transition-all duration-300
"
                      />
                    )}
                  />
                  {/* <motion.input
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    animate={
                      otpError ? { x: [0, -50, 50, -50, 50, 0] } : { x: 0 }
                    }
                    type="number"
                    placeholder="OTP"
                    className={`border-gray-400 border-2 rounded-xl p-4 h-12 focus:ring-2 focus:border-transparent outline-none focus:ring-blue-500 transition-all ${
                      otpError ? "border-red-500" : "border-gray-300"
                    }`}
                  /> */}
                </div>
              )}

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
                ) : emailSent ? (
                  "Verify OTP"
                ) : (
                  "Send reset link"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
