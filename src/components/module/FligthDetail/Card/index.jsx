import { Box } from "@chakra-ui/react";

const CardFlightDetail = ({ w, h, children, ...props }) => {
  return (
    <Box
      bg={"white"}
      h={h}
      w={w}
      position={"absolute"}
      // top={top}
      // left={left}
      borderRadius={15}
      {...props}
    >
      {children}
    </Box>
  );
};
export default CardFlightDetail;
