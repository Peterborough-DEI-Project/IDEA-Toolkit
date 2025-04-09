import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PropTypes from "prop-types";

Date.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

function Date({ value, onChange, disabled }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker disabled={disabled} className="bg-gray-50" />
    </LocalizationProvider>
  );
}

export default Date;
