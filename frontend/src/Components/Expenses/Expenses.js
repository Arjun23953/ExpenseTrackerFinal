import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";

function Expenses() {
  const { addIncome, expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <ExpenseStyled>
      <div className=" h-64 bg-gradient-to-b from-[#5362b2]  to-blue-900 rounded-b-3xl  ">
        <div className=" w-full p-8">
          <span className="text-white text-center block">
            <span className=" text-3xl">EXPENSES</span>
          </span>
        </div>
      </div>

      <InnerLayout>
        <h2 className="total-income">
          Total Expense:{" "}
          <span className=" text-red-700">NPR {totalExpenses()}</span>
        </h2>
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-3/5">
              {" "}
              <ExpenseForm />
            </div>
            <div class="md:w-2/5">
              {" "}
              <div className="incomes">
                {expenses.map((income) => {
                  const {
                    _id,
                    title,
                    amount,
                    date,
                    category,
                    description,
                    type,
                  } = income;
                  console.log(income);
                  return (
                    <IncomeItem
                      key={_id}
                      id={_id}
                      title={title}
                      description={description}
                      amount={amount}
                      date={date}
                      type={type}
                      category={category}
                      indicatorColor="var(--color-green)"
                      deleteItem={deleteExpense}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              console.log(income);
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div> */}
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Expenses;
