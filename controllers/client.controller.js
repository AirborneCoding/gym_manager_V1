const Client = require('../models/client.model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const moment = require('moment');
const utils = require("../utils")
const mongoose = require("mongoose")


const createClient = async (req, res) => {
  let { name, gender, membershipType, plan } = req.body;
  req.body.user = req.user.userId;

  if (!name || !gender || !membershipType) {
    throw new CustomError.BadRequestError("Enter the client information");
  }

  let price;
  if (membershipType === 'Musculation') {
    switch (plan || 'month') {
      case 'month':
        price = 200;
        break;
      case '3 month':
        price = 500;
        break;
      case '6 month':
        price = 900;
        break;
      case 'year':
        price = 1500;
        break;
    }
  } else if (membershipType === 'Musculation + Cardio') {
    switch (plan || 'month') {
      case 'month':
        price = 300;
        break;
      case '3 month':
        price = 600;
        break;
      case '6 month':
        price = 1100;
        break;
      case 'year':
        price = 1800;
        break;
    }
  } else if (membershipType === 'Cardio') {
    req.body.plan = "month"
    price = 100;
  }

  req.body.money = price;

  const client = await Client.create(req.body);

  res.status(StatusCodes.CREATED).json({ client });
};


const getAllClients = async (req, res) => {
  const userId = req.user.userId;

  const { search, gender, membershipType, isMonthEnd, sort, plan } = req.query
  let filterObject = {}
  // membershipType

  if (search) {
    filterObject.name = { $regex: search, $options: "i" }
  }

  if (gender && gender !== 'all') {
    filterObject.gender = gender;
  }
  if (membershipType && membershipType !== 'all') {
    filterObject.membershipType = membershipType;
  }
  if (plan && plan !== 'all') {
    filterObject.plan = plan;
  }

  if (isMonthEnd && isMonthEnd !== 'all') {
    filterObject.isMonthEnd = isMonthEnd === "Members" ? false : true;
  }

  // let result = Client.find(filterObject);
  let result = Client.find({ ...filterObject, user: userId }).sort("-registrationDate");;


  if (sort === 'latest') {
    result = result.sort('-registrationDate');
  }
  if (sort === 'oldest') {
    result = result.sort('registrationDate');
  }
  if (sort === 'a-z') {
    result = result.sort('name');
  }
  if (sort === 'z-a') {
    result = result.sort('-name');
  }


  // all', 'Members', , 'memberShip End

  // Pagination logic
  const pageInt = Number(req.query.page) || 1;
  const limit = Number(req.query.pageSize) || 12;
  const skip = (pageInt - 1) * limit;

  result = result.skip(skip).limit(limit)
  // .sort("-createdAt");

  let clients = await result

  // const totalClients = await Client.countDocuments(filterObject);
  const totalClients = await Client.countDocuments({ ...filterObject, user: userId });

  const pageCount = Math.ceil(totalClients / limit);

  const pagination = {
    page: pageInt,
    pageSize: limit,
    pageCount,
    total: totalClients,
  };

  res.status(StatusCodes.OK).json({ count: clients.length, clients, pagination });
}

const updateClient = async (req, res) => {
  const { id: clientId } = req.params

  let money = 0
  if (req.body.membershipType === "Musculation") {
    money = 200
  } else if (req.body.membershipType === "Musculation + Cardio") {
    money = 300
  }
  else {
    money = 100
  }

  const client = await Client.findByIdAndUpdate(
    clientId,
    { ...req.body, money },
    { new: true, runValidators: true }
  )
  if (!client) {
    throw new CustomError.NotFoundError("client not found")
  }

  utils.checkPermissions(req.user, client.user)

  res.status(StatusCodes.OK).json({ msg: "Success ,Client updated", client })
}

const deleteClient = async (req, res) => {
  const { id: clientId } = req.params
  const client = await Client.findById(clientId)
  if (!client) {
    throw new CustomError.NotFoundError("client not found")
  }

  utils.checkPermissions(req.user, client.user)
  await client.deleteOne()

  res.status(StatusCodes.OK).json({ msg: "Success ,Client deleted" })
}


const countClients = async (req, res) => {
  /*  const AllClients = await Client.countDocuments({})
   const maleClients = await Client.countDocuments({ gender: "Male" })
   const FemaleClients = await Client.countDocuments({ gender: "Female" })
   const CardioClients = await Client.countDocuments({ membershipType: "Cardio" })
   const MusculationClients = await Client.countDocuments({ membershipType: "Musculation" })
   const FullGymClients = await Client.countDocuments({ membershipType: "Musculation + Cardio" }) */
  const userId = req.user.userId;
  let monthlyMoneyData = await Client.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        totalMoney: { $sum: '$money' },
      },
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 }, 
      // ! it was 1  (, 'totalMoney': -1 )
    },
  ]);


  // Prepare the response
  // monthlyMoneyData = monthlyMoneyData
  // .map((result) => ({
  //   year: result._id.year,
  //   month: result._id.month,
  //   totalMoney: result.totalMoney,
  // }));

  monthlyMoneyData = monthlyMoneyData
    .map((item) => {
      const {
        _id: { year, month },
        totalMoney,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, totalMoney };
    })
    .reverse();

  // console.log(monthlyMoneyData[0].totalMoney);
  console.log(monthlyMoneyData);


  res.status(StatusCodes.OK).json({ monthlyMoneyData })
}

const aggregateClientData = async (req, res) => {
  // Aggregate client data using MongoDB aggregation pipeline
  const userId = req.user.userId;
  const aggregateResult = await Client.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalClients: { $sum: 1 },
        maleClients: {
          $sum: { $cond: [{ $eq: ['$gender', 'Male'] }, 1, 0] },
        },
        femaleClients: {
          $sum: { $cond: [{ $eq: ['$gender', 'Female'] }, 1, 0] },
        },
        cardioClients: {
          $sum: { $cond: [{ $eq: ['$membershipType', 'Cardio'] }, 1, 0] },
        },
        musculationClients: {
          $sum: { $cond: [{ $eq: ['$membershipType', 'Musculation'] }, 1, 0] },
        },
        fullGymClients: {
          $sum: {
            $cond: [
              { $eq: ['$membershipType', 'Musculation + Cardio'] },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  console.log(aggregateResult);

  // Check if there are any results
  if (aggregateResult.length === 0) {
    return res.status(StatusCodes.OK).json({
      clientStats: {
        totalClients: 0,
        maleClients: 0,
        femaleClients: 0,
        cardioClients: 0,
        musculationClients: 0,
        fullGymClients: 0,
      },
    });
  }

  // Extract the aggregated data from the result
  const {
    totalClients,
    maleClients,
    femaleClients,
    cardioClients,
    musculationClients,
    fullGymClients,
  } = aggregateResult[0];

  // Prepare the response
  const clientStats = {
    totalClients,
    maleClients,
    femaleClients,
    cardioClients,
    musculationClients,
    fullGymClients,
  };


  res.status(StatusCodes.OK).json({ clientStats });
};




const updateIsMonthEndToFalse = async (req, res) => {
  const { id: clientId } = req.params;
  const client = await Client.findById(clientId);

  if (!client) {
    throw new CustomError.NotFoundError("Client not found")
  }

  // Set isMonthEnd to false
  client.isMonthEnd = false;
  client.registrationDate = Date.now();

  utils.checkPermissions(req.user, client.user)
  await client.save();

  res.status(StatusCodes.OK).json({ msg: "Client Payed" });
};




module.exports = {
  createClient,
  updateClient,
  deleteClient,
  getAllClients,
  countClients,
  aggregateClientData,
  updateIsMonthEndToFalse
}



