const asyncWrapper = require('../middleware/async');
const { StatusCodes } = require('http-status-codes');
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

const getAccounts = asyncWrapper(async (req, res) => {
  const accounts = await web3.eth.getAccounts();
  res.status(StatusCodes.OK).json({ Accounts: accounts });
});

const createNewAccount = asyncWrapper(async (req, res) => {
  const newAccount = await web3.eth.accounts.create();
  res.status(StatusCodes.OK).json({
    msg: 'New account succesfully created',
    newAccount: newAccount,
  });
});

const sendTransaction = asyncWrapper(async (req, res) => {
  try {
    const newTransaction = await web3.eth.sendTransaction({
      from: req.body.from,
      to: req.body.to,
      value: req.body.value,
    });
    res.status(StatusCodes.OK).json({
      msg: 'Transaction proceed successfully',
      Reciept: newTransaction,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({ error: `Failed` });
  }
});

const getBalance = asyncWrapper(async (req, res, next) => {
  const { id: accountID } = req.params;
  try {
    const balance = await web3.eth.getBalance(accountID);
    res.status(StatusCodes.OK).json({ Balance: `${balance} WEI` });
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No account with address: ${accountID}` });
  }
});

module.exports = {
  getAccounts,
  createNewAccount,
  sendTransaction,
  getBalance,
};
