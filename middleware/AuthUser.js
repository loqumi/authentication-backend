import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }
  const user = await User.findOne({
    where: {
      uuid: token,
    },
  });
  if (user.status) return res.status(406).json({ msg: "you are banned" });
  if (!user) return res.status(404).json({ msg: "user not found" });
  req.userId = user.id;
  next();
};
