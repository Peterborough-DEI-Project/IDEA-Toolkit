import { Stack } from "@mui/material";
import PropTypes from "prop-types";

Foot.propTypes = {
  children: PropTypes.node,
};

function Foot({ children }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      {children}
    </Stack>
  );
}

export default Foot;
