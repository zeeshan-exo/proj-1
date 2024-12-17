const User = require("../models/user");

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const users = await User.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);
    const pagination = {
      totalUsers,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      pagination,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
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
