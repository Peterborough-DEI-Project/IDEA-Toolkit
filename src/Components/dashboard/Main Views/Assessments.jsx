import React from "react";
import { Outlet } from "react-router";

// Renders a specific subcomponent based on Outlet
// Refer to /src/Utils/Routes.jsx for more information
function Assessments() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Assessments;
