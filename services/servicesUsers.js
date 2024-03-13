


const getAllUsers = (req, res) => {
  try {
    const {limit, offset} = req.query
    if(limit && offset) {
      res.json({
        'limit': limit,
        'offset': offset
      });
    } else {
      res.send('There are no parameters');
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllUsers
}
