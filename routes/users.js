const express = require('express');
const usersServices = require('../services/servicesUsers');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const getUsers = await usersServices.getAllUsers(req, res)
    return res.send({getUsers})
  } catch (error) {
    next(error)
  }
});

module.exports = router;
