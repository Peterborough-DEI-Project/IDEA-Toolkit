
import { Outlet } from "react-router";

// Renders a specific subcomponent based on Outlet
// Refer to /src/Utils/Routes.jsx for more information
function Assessments() {
  return (
      <div className="w-full h-full overflow-auto">
        <Outlet/>
      </div>
  );
}

export default Assessments;
