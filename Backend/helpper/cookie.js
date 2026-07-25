export default (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000, // 7 days
    secure: true,
    sameSite: "none",
  });
};
