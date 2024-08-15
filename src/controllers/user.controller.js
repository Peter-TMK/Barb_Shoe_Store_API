const userModel = require("../models/user.model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      res.status(404).send(`User with id:${id} not found!`);
    }
    res.status(200).json(user);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updateUser = await userModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    // const updateUser = await userModel.findById(id);
    if (!updateUser) {
      res.status(404).send(`User with id:${id} not found!`);
    }
    res.status(200).send(updateUser);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send(`User with id:${id} not found!`);
    }
    res.status(204).end();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser };
