const router = require('express').Router();

// EndPoint : /api/auth
router.use('/auth', require('./auth'));
// EndPoint: /api/todos
router.use('/todos', require('./todo'));

module.exports = router;
