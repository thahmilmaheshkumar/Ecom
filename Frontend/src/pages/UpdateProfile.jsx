import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { isAuthenticate, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      toast.error("Please login...", { autoClose: 300 });
      navigate("/login");
    }
  }, [isAuthenticate]);

  return <div>UpdateProfile</div>;
};

export default UpdateProfile;
