import { Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { color, motion } from "framer-motion";

const Footer = () => {
  const [instaHover, setInstaHover] = useState(false);
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col text-center md:flex-row md:text-left justify-between items-start gap-8 px-4">
          {/*contact*/}
          <div className="flex-1 gap-1 flex flex-col items-center justify-center w-full">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>123 Main Street, City, Country</p>
            <p className="flex  items-center gap-2">
              <Phone size={16} />
              Phone: +1 (123) 456-7890
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} />
              Email: info@mycompany.com
            </p>
          </div>

          {/* my social media links */}
          <div className="flex-1 gap-3 flex flex-col items-center justify-center w-full">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex items-center gap-4">
              <motion.p
                className="flex items-center gap-2 "
                whileHover={{ scale: 1.1, color: "#FF0000" }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "tween" }}
              >
                <a href="#" className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.5 6.2a2.97 2.97 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A2.97 2.97 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a2.97 2.97 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a2.97 2.97 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
                  </svg>
                </a>
              </motion.p>

              <motion.p
                className="flex items-center gap-2 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "tween" }}
                onHoverStart={() => setInstaHover(true)}
                onHoverEnd={() => setInstaHover(false)}
              >
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="transition-colors duration-300"
                  >
                    <defs>
                      <linearGradient
                        id="instagramGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#833AB4" />
                        <stop offset="50%" stopColor="#E4405F" />
                        <stop offset="100%" stopColor="#F77737" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zm5.25-3.25a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25z"
                      fill={instaHover ? "url(#instagramGradient)" : "#fff"}
                    />
                  </svg>
                </a>
              </motion.p>

              <motion.p
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1, color: "#0969DA" }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "tween" }}
              >
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 5.9 8.6a4.4 4.4 0 0 1 .1-3.2s1-.3 3.3 1.2a11.6 11.6 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.3c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
                  </svg>
                </a>
              </motion.p>
            </div>
          </div>

          {/* about */}
          <div className="flex-1 gap-1 flex flex-col min-w-60">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p>
              We are a leading e-commerce store dedicated to providing the best
              products and exceptional customer service. Our mission is to make
              online shopping easy, enjoyable, and accessible to everyone.
            </p>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-4 border-t border-gray-600 text-center text-sm text-gray-500">
          @2026 My Company All rights reserved by Thahmil
        </div>
      </div>
    </footer>
  );
};

export default Footer;
