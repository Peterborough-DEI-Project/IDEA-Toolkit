import { Route } from "react-router";
import dashboardViews from "./dashboardViews.js";

function DashboardRoutes() {
  return (
    <>
      {dashboardViews.map((item) => (
        <Route path={`${item.route}`} key={item.id} element={item.component} />
      ))}
    </>
  );
}

export default DashboardRoutes;
