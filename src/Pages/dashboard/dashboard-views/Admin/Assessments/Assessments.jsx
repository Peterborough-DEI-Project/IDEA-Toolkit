
import { Outlet } from "react-router";
import AssessmentsTable from './components/AssessmentsTable.jsx'
// Renders a specific subcomponent based on Outlet
// Refer to /src/Utils/Routes.jsx for more information
function Assessments() {
  return (
      <div className="w-full h-full overflow-auto">
        <AssessmentsTable/>
      </div>
  );
}

export default Assessments;
