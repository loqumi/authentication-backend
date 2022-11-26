import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "user not found" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "wrong password" });
  req.session.userId = user.uuid;
  console.log(req.session, user, 1111111111111111111111111111)
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  res.status(200).json({ uuid, name, email });
};
export const Me = async (req, res) => {
  console.log(req.session, 22222332321312321312321321321321312312312)
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "status"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "user not found" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Can't log out" });
    res.status(200).json({ msg: "You have logged out" });
  });
};
