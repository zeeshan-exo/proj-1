const User = require("../models/user");

exports.getAll = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) throw new Error("data not found");

    res.status(200).json({ data: users });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
exports.create = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({ name, email, password, role });
    console.log(newUser);

    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw new Error("user not found");
    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { name, email, role } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );
    if (!updateUser) {
      throw new Error("user not updated");
    }
    res.status(200).json({
      success: true,
      data: updateUser,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      throw new Error("user not found");
    }
    res.status(200).json({
      success: true,
      data: deleteUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      messsage: err.message,
    });
  }
};
