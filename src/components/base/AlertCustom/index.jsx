import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const AlertCustom = ({ alertState, count }) => {
  const [visible, setVisible] = useState(false);
  // redux:
  // const { alert, alertKey } = useSelector((state) => state.alert);

  useEffect(() => {
    if (alertState.status !== "idle") {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alertState.status, alertState.message, count]);

  if (!visible || alertState.status == `idle`) return null;

  return (
    <Alert
      fontFamily="Poppins"
      position="absolute"
      w={{ base: "80%", sm: "70%", md: "60%", lg: "50%", xl: "40%" }}
      top={0}
      right={0}
      m={"2rem"}
      status={alertState.status !== `idle` ? alertState.status : "error"}
      variant="top-accent"
      rounded={10}
      zIndex={5}
      boxShadow="xl"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
    >
      <AlertIcon />
      <Box>
        <AlertTitle fontSize="18px">
          {alertState.status == "success"
            ? "Success!"
            : alertState.status == "error"
            ? "Failed!"
            : "No Context"}
        </AlertTitle>
        {alertState.message && (
          <AlertDescription>
            {alertState.message
              ? alertState.message
              : alertState.status !== `idle`
              ? alertState.status
              : "No Context"}
          </AlertDescription>
        )}
      </Box>
    </Alert>
  );
};

export default AlertCustom;
