import {
  accounts,
  dashboard,
  expenses,
  transactions,
  trend,
} from "../utils/Icons";

// import { MdDashboard } from "react-icons/md";
// import { GiReceiveMoney } from "react-icons/gi";
// import { GiPayMoney } from "react-icons/gi";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    // icon: <MdDashboard className=" h-9 w-9  text-black" />,
    icon: accounts,

    link: "/dashboard",
  },
  {
    id: 2,
    title: "View Transactions",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Incomes",
    // icon: <GiReceiveMoney className=" h-9 w-9 text-black" />,
    icon: accounts,

    link: "/dashboard",
  },
  {
    id: 4,
    title: "Expenses",
    // icon: <GiPayMoney className=" h-9 w-9 text-black" />,
    icon: accounts,

    link: "/dashboard",
  },
  {
    id: 5,
    title: "Profile",
    icon: accounts,
    link: "/dashboard",
  },
];
