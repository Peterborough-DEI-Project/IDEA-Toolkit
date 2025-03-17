import { Stack, Typography } from "@mui/material";
import construction from "../../../assets/construction.png";

function ComingSoon() {
  return (
      <div className="w-full mx-8 p-10">
          <Stack spacing={2} direction="column">
              <Typography variant="h4" component="div">
                  Coming Soon
              </Typography>
              <img
                  src={construction}
                  alt="An illustration of a house under construction"
              />
          </Stack>
      </div>
          );
          }

          export default ComingSoon;
