const router = require('express').Router();
const authCtrl = require('../controllers/auth');

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/logout', authCtrl.logout);

module.exports = router;
