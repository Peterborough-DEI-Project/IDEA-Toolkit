import { Route } from "react-router";
import adminViews from "./views.js";

function DashboardRoutes({ user }) {

  return (
    <>
      {adminViews.map((item) => (
        <Route path={`${item.route}`} key={item.id} element={item.component} />
      ))}
    </>
  );
}

export default DashboardRoutes;
