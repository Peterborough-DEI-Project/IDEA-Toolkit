import { BrowserRouter } from "react-router";
import { Route } from "react-router";
import menuItems from "./menuItems.js";

function DashboardRoutes() {
  return (
    <>
      {menuItems.map((item) => (
        <Route path={`${item.route}`} key={item.id} element={item.component} />
      ))}
    </>
  );
}

export default DashboardRoutes;
