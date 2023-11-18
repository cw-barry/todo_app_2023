const router = require('express').Router();
const query = require('../middlewares/query');
const todoCtrl = require('../controllers/todo');
const { isLogin } = require('../middlewares/permisions');
const Todo = require('../models/Todo');

router.use(isLogin);

router.route('/').get(todoCtrl.list).post(todoCtrl.create);

router
  .route('/:id')
  .get(todoCtrl.read)
  .put(todoCtrl.update)
  .patch(todoCtrl.update)
  .delete(todoCtrl.delete);

module.exports = router;
