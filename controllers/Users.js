import User from "../models/UserModel.js";
import argon2 from "argon2";

const getUser = async (id) => {
  return await User.findOne({
    where: {
      uuid: id,
    },
  });
};

const removeUser = async (id) => {
  return await User.destroy({
    where: {
      uuid: id,
    },
  });
};

const getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

const updateUserInfo = (data) => {
  return User.update(
    {
      ...data,
      status: Number(data.status),
    },
    {
      where: {
        uuid: data.uuid,
      },
    }
  );
};

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "status", "createdAt", "updatedAt"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "status", "createdAt", "updatedAt"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  const emailExist = await getUserByEmail(email);
  if (emailExist) return res.status(409).json({ msg: "Email already used" });
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "password and confirm password do not match" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "successful registration" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const blockUsers = (req, res) => {
  const data = req.body;
  Promise.all(data.map(updateUserInfo))
    .then(() => res.status(200).json({ msg: "all complete" }))
    .catch((error) => res.status(500).json({ msg: error.message }));
};

export const deleteUser = (req, res) => {
  const user = getUser(req.params.id);
  if (!user) return res.status(404).json({ msg: "user not found" });
  try {
    removeUser(user.id);
    res.status(200).json({ msg: "successful deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUsers = (req, res) => {
  const selectedUsers = req.body;
  Promise.all(selectedUsers.map(removeUser)).then(() =>
    res.status(200).json({ msg: "all complete" })
  );
};
