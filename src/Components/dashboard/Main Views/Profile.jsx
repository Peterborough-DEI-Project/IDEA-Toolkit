import React from "react";

import { useQuery } from "@tanstack/react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserProfile } from "/src/Utils/API.js";

function Profile() {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: ["profileData"],
  });

  if (isLoading) {
    return (
      <Backdrop open={isLoading} sx={{ zIndex: 9999 }}>
        <CircularProgress size={60} />
      </Backdrop>
    );
  }
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default Profile;
