const User = require('../models/user');

module.exports = {
  signup
};

async function signup(req, res, next) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}