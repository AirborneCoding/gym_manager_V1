const CustomError = require("../errors")
const utils = require("../utils")

const authenticateUser = async (req, res, next) => {
 const token = req.signedCookies.token

 if (!token) {
  throw new CustomError.UnauthenticatedError("Authentication Invalid")
 }

 try {
  const payload = utils.isTokenValid({ token })
  const { userId, name, role } = payload
  req.user = { userId, name, role }
  next()
 } catch (error) {
  throw new CustomError.UnauthenticatedError("Authentication Invalid")

 }
}


//roles = rest operator
// call back function
const authorizePermissions = (...roles) => { 
 return (req, res, next) => {
  if (!roles.includes(req.user.role)) {
   throw new CustomError.UnauthorizedError("Unauthorized to access this route")
  }
  next()
 }
}


module.exports = {
 authenticateUser,
 authorizePermissions
}