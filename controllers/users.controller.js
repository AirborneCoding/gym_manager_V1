const User = require('../models/user.model');
const Client = require('../models/client.model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const utils = require('../utils');

const getAllUsers = async (req, res) => {
 const users = await User.find({ role: "user" })
  .select("-password")

 res.status(StatusCodes.OK).json({ users })
};

const getSingleUser = async (req, res) => {
 const { id: userId } = req.params
 const user = await User.findById(userId).select("-password")

 if (!user) {
  throw new CustomError.NotFoundError("no user found")
 }

 utils.checkPermissions(req.user, user._id)

 res.status(StatusCodes.OK).json({ user })
};

const showCurrentUser = async (req, res) => {
 res.status(StatusCodes.OK).json({ user: req.user })
};


const updateUser = async (req, res) => {
 //  you can use user.save()
 const { name, email } = req.body
 if (!name) {
  throw new CustomError.BadRequestError("enter name must be")
 }
 if (!email) {
  throw new CustomError.BadRequestError("enter email must be")
 }

 const user = await User.findOneAndUpdate(
  { _id: req.user.userId },
  { email, name },
  { new: true, runValidators: true }
 )

 const tokenUser = utils.createTokenUser(user)
 utils.attachCookiesToResponse({ res, user: tokenUser })

 res.status(StatusCodes.OK).json({ msg: "Success ! Password Updated", user: tokenUser })

};

const updateUserPassword = async (req, res) => {
 const { oldPassword, newPassword } = req.body
 if (!oldPassword) {
  throw new CustomError.BadRequestError("Your Old password is required")
 }
 if (!newPassword) {
  throw new CustomError.BadRequestError("Please enter your new password")
 }

 const user = await User.findOne({ _id: req.user.userId })
 isPasswordMatch = await user.comparePassword(oldPassword)
 if (!isPasswordMatch) {
  throw new CustomError.UnauthenticatedError("Invalid Credentials")
 }

 user.password = newPassword

 await user.save()

 res.status(StatusCodes.OK).json({ msg: "Success ! Password Updated" })

};


const deleteUser = async (req, res) => {
 const user = await User.findOne({ _id: req.user.userId });
 if (!user) {
  throw new CustomError.NotFoundError("user not found")
 }

 await Client.deleteMany({ user: req.user.userId })
 await user.deleteOne()


 res.status(StatusCodes.OK).json({ msg: "user deleted" })

}



module.exports = {
 getAllUsers,
 getSingleUser,
 showCurrentUser,
 updateUser,
 updateUserPassword,
 deleteUser
};

