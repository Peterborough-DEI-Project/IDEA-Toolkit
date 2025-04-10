import React from 'react';
import {Outlet} from "react-router";

import AvailableAssessments from "./components/AvailableAssessments.jsx";

function Assessments() {
    return (
        <div className="w-full h-full overflow-auto">
            <AvailableAssessments/>
        </div>
    );
}

export default Assessments;