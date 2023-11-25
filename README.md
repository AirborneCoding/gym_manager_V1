#### Auth Routes Structure

- [] create controllers folder
- [] add authController file
- [] export (register,login,logout) functions
- [] res.send('some string value')
- [] create routes folder
- [] setup authRoutes file
- [] import all controllers
- [] setup three routes
- [] post('/register') post('/login') get('/logout')
- [] import authRoutes as authRouter in the app.js
- [] setup app.use('/api/v1/auth', authRouter)

#### Register Controller

- [] create user
- [] send response with entire user (only while testing)
- [] check if email already in use (schema and controller)
- [] ignore 'role'
- [] alternative 'admin' setup

#### Handle Password

- [] UserSchema.pre('save') - hook
- this points to User
- bcrypt.genSalt - number of rounds
- bcrypt.hash

#### JWT

- [] require 'jsonwebtoken' package
- [] create jwt - jwt.sign(payload,secret,options)
- [] verify jwt - jwt.verify(token,secret)
- [] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [] restart the server !!!!
- [] refactor code, create jwt functions in utils
- [] refactor cookie code
- [] setup func attachCookiesToResponse
- [] accept payload(res, tokenUser)
- [] create token, setup cookie
- [] optionally send back the response

#### Login Route

- [] check if email and password exist, if one missing return 400
- [] find user, if no user return 401
- [] check password, if does not match return 401
- [] if everything is correct, attach cookie
  and send back the same response as in register

#### Logout Route

- [] set token cookie equal to some string value
- [] set expires:new Date(Date.now())

#### User Routes Structure

- [] add userController file
- [] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [] res.send('some string value')
- [] setup userRoutes file
- [] import all controllers
- [] setup just one route - router.route('/').get(getAllUsers);
- [] import userRoutes as userRouter in the app.js
- [] setup app.use('/api/v1/users', userRouter)

#### GetAllUsers and GetSingleUser

- [] Get all users where role is 'user' and remove password
- [] Get Single User where id matches id param and remove password
- [] If no user 404

#### Authenticate User Setup

#### Auth User Complete

#### Authorize Permissions Setup

- [] hardcode

#### Authorize Permissions Complete

- [] introduce params

#### ShowCurrentUser

- [] get user from req
- [] send response with user

#### UpdateUserPassword

- [] almost identical to login user
- [] add authenticateUser middleware in the route
- [] check for oldPassword and newPassword in the body
- [] if one missing 400
- [] look for user with req.user.userId
- [] check if oldPassword matches with user.comparePassword
- [] if no match 401
- [] if everything good set user.password equal to newPassword
- [] await user.save()

#### createTokenUser in Utils

- [] create a file in utils (createTokenUser)
- [] setup a function that accepts user object and returns userToken object
- [] export as default
- [] setup all the correct imports/exports and refactor existing code

#### updateUser with User.findOneAndUpdate()

- [] add authenticateUser middleware in the route
- [] check for name and email in the body
- [] if one is missing, send 400 (optional)
- [] use findOneAndUpdate()
- [] create token user, attachCookiesToResponse and send back the tokenUser

#### updateUser with user.save()

#### Setup and Apply checkPermissions()


2FA = Two-Factor Authentication (2FA)


#### aggregate

Client.aggregate([...]): This line initiates the MongoDB aggregation pipeline for the Client collection. The aggregation pipeline is a sequence of data transformation and aggregation operations.

$group Stage:

The $group stage is the first stage in the aggregation pipeline. It groups documents together based on specified criteria and calculates aggregate values.

$group: { _id: null, ... }: In this case, we're grouping all documents into a single group (hence _id: null). The aggregation will create a single document as the output.

Inside the $group stage, we define various fields, such as totalClients, maleClients, femaleClients, etc., and use aggregation operators to calculate values for these fields.

Aggregation Operators ($sum and $cond):

$sum: This operator calculates the sum of specified values.

$cond: This operator is a conditional operator that evaluates a condition and returns one value if the condition is true and another if it's false.

For example, $sum: { $cond: [{ $eq: ['$gender', 'Male'] }, 1, 0] } calculates the sum of 1 for each document where gender is 'Male' and 0 otherwise. This effectively counts the number of male clients.

Extracting Aggregated Data:

After the aggregation is executed, aggregateResult contains the results of the aggregation operations. We extract the aggregated data from this result object.
Preparing the Response:

We create a clientStats object that holds the aggregated data in a structured format.
Sending the Response:

Finally, we send the clientStats object as a JSON response to the client.








-------
(cache, CDN, webperf, REST, graphQL, etc.)

----------
good dashboard design https://codesandbox.io/s/dashboard-zpn6ug?file=/src/components/Chart/Chart.jsx:0-1376
### https://codesandbox.io/examples/package/recharts
------------------





const mongoose = require('mongoose');
const User = require("./user.model")

// Create a schema for clients
const clientSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 gender: {
  type: String,
  enum: ['Male', 'Female'],
  required: true,
 },
 membershipType: {
  type: String,
  enum: ['Musculation', 'Musculation + Cardio', "Cardio"],
  required: true,
 },
 plan: {
  type: String,
  enum: ['month', '3 month', "6 month", "year"],
  default: "month",
 },
 registrationDate: {
  type: Date,
  default: Date.now,
 },
 money: {
  type: Number,
  required: true,
 },

 isMonthEnd: {
  type: Boolean,
  default: false,
 },
 user: {
  type: mongoose.Types.ObjectId,
  ref: "User",
  required: true
 }

});
const cron = require('node-cron');

// 0 0 1 * *
/* const isMonthEnd = cron.schedule('* * * * *', async () => {
 // This will run at midnight on the first day of every month

 // Calculate the date one month ago
 const oneMonthAgo = new Date();
 oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

 try {
  // Find clients whose registrationDate is older than one month
  const clientsToUpdate = await Client.find({
   registrationDate: { $lt: oneMonthAgo },
  });

  // Update isMonthEnd to true for these clients
  clientsToUpdate.forEach(async (client) => {
   client.isMonthEnd = true;
   await client.save();
  });

  console.log(`Updated ${clientsToUpdate.length} clients.`);
 } catch (error) {
  console.error('Error updating clients:', error);
 }
});

// Start the cron job
isMonthEnd.start(); */


clientSchema.pre('save', function (next) {
 const currentDate = new Date();
 const registrationDate = new Date(this.registrationDate);
 // Calculate the difference in months
 const monthsDiff =
  (currentDate.getFullYear() - registrationDate.getFullYear()) * 12 +
  (currentDate.getMonth() - registrationDate.getMonth());

 // If a month has passed, set isMonthEnd to true
 if (monthsDiff >= 1) {
  this.isMonthEnd = true;
 }

 next();
});


const Client = mongoose.model('Client', clientSchema);


// Define a function to update isMonthEnd for clients of a user
const updateIsMonthEndForUserClients = async (userId) => {
 try {
  // Calculate the date one month ago
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Find clients of the specified user whose registrationDate is older than one month
  const clientsToUpdate = await Client.find({
   user: userId,
   registrationDate: { $lt: oneMonthAgo },
  });

  // Update isMonthEnd to true for these clients
  for (const client of clientsToUpdate) {
   client.isMonthEnd = true;
   await client.save();
  }

  console.log(`Updated ${clientsToUpdate.length} clients for user ${userId}.`);
 } catch (error) {
  console.error(`Error updating clients for user ${userId}:`, error);
 }
};

// Schedule the cron job to run every minute for testing purposes
const isMonthEnd = cron.schedule('* * * * *', async () => {
 try {
  // Find all users
  const users = await User.find({}, '_id');

  // Loop through each user and update their clients
  for (const user of users) {
   await updateIsMonthEndForUserClients(user._id);
  }
 } catch (error) {
  console.error('Error updating clients for all users:', error);
 }
});

// Start the cron job
isMonthEnd.start();


module.exports = Client;
