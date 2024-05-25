import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";
import { IoMdNotifications } from "react-icons/io";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleNotificationClick = () => {
    if (totalExpenses() > totalIncome()) {
      setShowPopup(true);
    }
  };

  // debugger;

  const email = localStorage.getItem("display");

  // Extract username from email
  const atIndex = email.indexOf("@");
  const username = email.slice(0, atIndex);

  // Capitalize initial letter of username
  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  console.log(capitalizedUsername);

  return (
    <DashboardStyled>
      <div className=" h-64 bg-gradient-to-b from-[#5362b2]  to-blue-900 rounded-b-3xl  ">
        <div className="w-full p-8 relative">
          <span className="text-white text-center block">
            Good Morning, <br />
            <span className="text-3xl">{capitalizedUsername}</span>
          </span>
          {totalExpenses() > totalIncome() && (
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <IoMdNotifications
                className="text-white h-12 w-12 cursor-pointer"
                onClick={handleNotificationClick}
              />
              <span className="bg-red-500 text-white rounded-full text-xs p-1 absolute top-0 right-0 transform translate-x-2 translate-y-2">
                !
              </span>
            </div>
          )}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Alert</h2>
                <p>You have gone over budget.</p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div class="max-w-sm mx-auto  ml-[30%] bottom-0">
          {/* position: absolute; left: 35%; bottom: -100px; width: 500px; height:
          270px; */}

          <div class="bg-[#5362b2] opacity-90 shadow-lg rounded-lg p-6  absolute  w-2/5 h-64  top-[15%] flex flex-col justify-evenly">
            {/* total balance  */}
            <div class="flex items-center space-x-4 pb-4 justify-start">
              <div>
                <div class="text-gray-200 text-sm">Total Balance</div>
                <div class="text-gray-100 text-3xl font-semibold">
                  NPR {totalBalance()}
                </div>
              </div>
            </div>

            <div className=" flex justify-between">
              <div class="flex items-center space-x-4">
                <div class="p-2 bg-purple-200 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 15v4a2 2 0 002 2h3v-4"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 15h16"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-gray-200 text-sm">Total Income</div>
                  <div class="text-green-500 text-3xl font-semibold">
                    {totalIncome()}
                  </div>
                </div>
              </div>

              {/* expense  */}
              <div class="flex items-center space-x-4">
                <div class="p-2 bg-purple-200 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 15v4a2 2 0 002 2h3v-4"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 15h16"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-gray-200 text-sm">Total Expenses</div>
                  <div class="text-red-500 text-3xl font-semibold">
                    {totalExpenses()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InnerLayout className=" mt-[130px]">
        <div class=" py-8">
          <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="md:w-3/5">
                <Chart />
              </div>
              <div class="md:w-2/5">
                <History />
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
