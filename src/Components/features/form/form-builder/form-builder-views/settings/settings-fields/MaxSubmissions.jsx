import {useState} from 'react';
import PropTypes from "prop-types";

MaxSubmissions.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}


// Component for modifying the max number of submissions a user can make
// 0 = unlimited
function MaxSubmissions({value, onChange}) {
    const [disabled, setDisabled] = useState(value === 0); // State to track if the input is disabled

    // Handle changes in the number input
    const handleChange = (e) => {
        const newValue = e.target.value === '' ? 0 : Number(e.target.value); // Convert value to number
        if (newValue <= 0) { // Disable if value is 0 or less
            setDisabled(true);
            onChange(0);
        } else {
            onChange(newValue);
        }
    }

    // Handle toggle between limited and unlimited submissions
    const handleToggle = (e) => {
        const checked = e.target.checked; // Track checkbox state
        setDisabled(checked);
        if (checked === true) {
            onChange(0); // Set to unlimited if checked
        } else {
            onChange(1); // Set to 1 by default if unchecked
        }
    }

    return (
        <div className="flex flex-col gap-1 max-w-32">
            {/* Number input field for max submissions */}
            <input
                className={`${!disabled ? "" : "bg-gray-100 text-gray-500 border-gray-400"}`}
                id="settingfield-maxsubmissions"
                disabled={disabled}
                type="number" pattern="[0-9]"
                size="small" value={Number(value) || 0}
                min={0}
                onChange={handleChange}
            />
            <label>No limit</label>
            {/* Toggle checkbox for enabling/disabling input */}
            <input
                id="settingfield-maxsubmissions-toggle"
                type="checkbox"
                onChange={handleToggle}
                checked={disabled}
            />
        </div>
    );
}

export default MaxSubmissions;