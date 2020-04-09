const router = require('express').Router();
const usersCtrl = require('../../controllers/users');

router.post('/signup', usersCtrl.signup);
// router.post('/login', usersCtrl.login);
// router.get('/logout', usersCtrl.logout);

module.exports = router;