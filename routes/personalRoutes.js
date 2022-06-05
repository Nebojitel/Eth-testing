const express = require('express');
const router = express.Router();

const {
  getAccounts,
  createNewAccount,
  sendTransaction,
  getBalance,
} = require('../controllers/personalController');

router.route('/').post(getAccounts);
router.route('/sendTransaction').post(sendTransaction);
router.route('/createAccount').post(createNewAccount);
router.route('/:id').post(getBalance);

module.exports = router;
