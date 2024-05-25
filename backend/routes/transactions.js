const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const { signIn, getUser } = require("../controllers/siginin");
const { signUp } = require("../controllers/signup");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense)

  .post("/sign-in", signIn)
  .post("/sign-up", signUp)
  .get("/user", getUser);

module.exports = router;
