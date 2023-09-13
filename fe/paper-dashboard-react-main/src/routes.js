import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import HistoryTable from "views/History.js";
import Action from "views/Action.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/history",
    name: "History",
    icon: "nc-icon nc-tile-56",
    component: <HistoryTable />,
    layout: "/admin",
  },
  {
    path: "/action",
    name: "Action",
    icon: "nc-icon nc-caps-small",
    component: <Action />,
    layout: "/admin",
  },
];
export default routes;
