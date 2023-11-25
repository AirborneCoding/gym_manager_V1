const express = require('express');
const router = express.Router();
const {
 createClient,
 updateClient,
 deleteClient,
 getAllClients,
 countClients,
 aggregateClientData,
 updateIsMonthEndToFalse
} = require('../controllers/client.controller');

const { authenticateUser, authorizePermissions } = require("../middleware/authentication")

router.route('/')
 .post(authenticateUser, createClient)
 .get(authenticateUser, getAllClients);

router.get("/MoneyData", authenticateUser, countClients)
router.get("/clientsData", authenticateUser, aggregateClientData)
router.put("/updateMonth/:id", authenticateUser, updateIsMonthEndToFalse)

router.route('/:id')
 .patch(authenticateUser, updateClient)
 .delete(authenticateUser, deleteClient);

module.exports = router;
