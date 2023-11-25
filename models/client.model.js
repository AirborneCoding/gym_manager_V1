const mongoose = require('mongoose');
const User = require('./user.model');
const cron = require('node-cron');

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
    enum: ['Musculation', 'Musculation + Cardio', 'Cardio'],
    required: true,
  },
  plan: {
    type: String,
    enum: ['month', '3 month', '6 month', 'year'],
    default: 'month',
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
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Pre-save middleware to update isMonthEnd for clients
clientSchema.pre('save', function (next) {
  const currentDate = new Date();
  const registrationDate = new Date(this.registrationDate);

  // Calculate the difference in months
  const monthsDiff =
    (currentDate.getFullYear() - registrationDate.getFullYear()) * 12 +
    (currentDate.getMonth() - registrationDate.getMonth());

  // Determine the next expected isMonthEnd date based on the plan
  const nextExpectedDate = new Date(registrationDate);
  switch (this.plan) {
    case 'month':
      nextExpectedDate.setMonth(nextExpectedDate.getMonth() + 1);
      break;
    case '3 month':
      nextExpectedDate.setMonth(nextExpectedDate.getMonth() + 3);
      break;
    case '6 month':
      nextExpectedDate.setMonth(nextExpectedDate.getMonth() + 6);
      break;
    case 'year':
      nextExpectedDate.setFullYear(nextExpectedDate.getFullYear() + 1);
      break;
    default:
      nextExpectedDate.setMonth(nextExpectedDate.getMonth() + 1);
  }

  // If the current date is equal to or after the next expected date, set isMonthEnd to true
  if (currentDate >= nextExpectedDate) {
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

    // Update isMonthEnd for these clients
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
