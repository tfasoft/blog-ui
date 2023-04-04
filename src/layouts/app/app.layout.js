import { Box } from "@mui/material";

import { useSelector } from "react-redux";

import API from "@/api";

const AppLayout = ({ children }) => {
  const token = useSelector((state) => state.token);

  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return <Box>{children}</Box>;
};

export default AppLayout;
