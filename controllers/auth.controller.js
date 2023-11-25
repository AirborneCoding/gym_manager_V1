const User = require("../models/user.model")
const { StatusCodes } = require("http-status-codes")
const CustomErrors = require("../errors")
// const { createJWT } = require("../utils")
const utils = require("../utils")

const register = async (req, res) => {
 // 01-check for email
 const { email } = req.body
 const emailAlreadyExist = await User.findOne({ email })
 if (emailAlreadyExist) {
  throw new CustomErrors.BadRequestError("Email already exists")
 }

 // 02- check from role
 const isFirstAccount = await User.countDocuments({})
 const role = isFirstAccount === 0 ? "admin" : "user"

 // 03-create User
 const user = await User.create({ ...req.body, role })

 // 04-create token (both works)
 const tokenUser = utils.createTokenUser(user)
 // * normal toekn send
 // const token = utils.createJWT({ payload: tokenUser })
 // const token = user.createToken()

 // * token with cookie
 utils.attachCookiesToResponse({ res, user: tokenUser })

 // 05- send response
 res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
 const { email, password } = req.body
 let missingFields = [];
 if (!email) {
  missingFields.push("email");
 }

 if (!password) {
  missingFields.push("password");
 }

 if (missingFields.length > 0) {
  let errorMessage = `Please Provide ${missingFields.join(" and ")}.`;
  throw new CustomErrors.BadRequestError(errorMessage)
 }

 const user = await User.findOne({ email })
 if (!user) {
  throw new CustomErrors.UnauthenticatedError("Invalid Credentials")
 }

 const isPasswordMatch = await user.comparePassword(password)
 if (!isPasswordMatch) {
  throw new CustomErrors.UnauthenticatedError("Invalid Credentials")
 }

 // const tokenUser = { userId: user.id, name: user.name, role: user.role }
 const tokenUser = utils.createTokenUser(user)
 utils.attachCookiesToResponse({ res, user: tokenUser })

 res.status(StatusCodes.OK).send({ user: tokenUser })

}

const logout = async (req, res) => {
 res.cookie("token", "logout", {
  httpOnly: true,
  expires: new Date(Date.now() + 5 * 1000)  //+ 5 * 1000 = 5s  /// +1000
 })

 res.status(StatusCodes.OK).json({ msg: "logout user" })
}

module.exports = {
 register, login, logout
}