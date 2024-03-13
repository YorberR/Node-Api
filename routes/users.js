const express = require('express');
const usersServices = require('../services/servicesUsers');
const router = express.Router();

router.get('/', async (req, res) => {
  const getUsers = await usersServices.getAllUsers(req, res)
  return getUsers
});

module.exports = router;
