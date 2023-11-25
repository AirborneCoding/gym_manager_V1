require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const morgan = require("morgan")
const cookieParser = require("cookie-parser") // to access cookie in server
const cors = require("cors")

const connectDB = require("./db/connectDB")

const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const clientRouter = require("./routes/client.routes")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(cors());
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET)) // signed our cookie 


app.get("/", (req, res) => {
 // throw new Error("hell off!")
 res.send("e-commerce api")
})
app.get("/api/v1", (req, res) => {
 // console.log(req);
 // console.log(req.cookies);
 console.log(req.signedCookies); // only when we signed cookie
 res.send("eco")
})

const { authenticateUser } = require("./middleware/authentication")

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/client", clientRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
 try {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, () => console.log("server is running on port : " + PORT))
 } catch (error) {
  console.log("something went wrong", error);
 }
}

start()