import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  console.log(history, "his");

  return (
    <HistoryStyled>
      <div className=" flex justify-between">
        <h1 class="text-2xl font-semibold mb-4">Recent History</h1>

        <span> See All</span>
      </div>

      {history.map((item) => {
        const { _id, title, amount, type, date } = item;
        return (
          <div
            class="flex items-center  space-x-4 pb-4 justify-between border-b-2"
            key={_id}
          >
            <div>
              <div
                class="text-gray-600 text-xl"
                // style={{
                //   color: type === "expense" ? "red" : "var(--color-green)",
                // }}
              >
                {title}
              </div>
              <div class="text-gray-900 text-sm font-semibold">{date}</div>
            </div>

            <div className="flex flex-col items-end">
              <div
                className="text-sm"
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {type === "expense" ? `- NPR  ` : `+ NPR `}
              </div>
              <div
                className="text-gray-900 text-2xl font-semibold"
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {amount}
              </div>
            </div>
          </div>

          //   <div key={_id} className="history-item">
          //     <p
          //       style={{
          //         color: type === "expense" ? "red" : "var(--color-green)",
          //       }}
          //     >
          //       {title}
          //     </p>
          //     <span>{date}</span>

          //     <p
          //       style={{
          //         color: type === "expense" ? "red" : "var(--color-green)",
          //       }}
          //     >
          //       {type === "expense"
          //         ? `-${amount <= 0 ? 0 : amount}`
          //         : `+${amount <= 0 ? 0 : amount}`}
          //     </p>
          //   </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
