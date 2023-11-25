const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt/jwt")

const createTokenUser = require("./jwt/createTokenUser")
const checkPermissions = require("./jwt/checkPermission")


module.exports = {
 createJWT, isTokenValid, attachCookiesToResponse,
 createTokenUser,
 checkPermissions
}