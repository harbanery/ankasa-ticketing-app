import { Box, Image, Stack, Text } from "@chakra-ui/react";

const CircleCard = ({ image, city }) => {
  return (
    <Stack alignItems={"center"}>
      <Box
        display="flex"
        flexDirection={"column"}
        p={2}
        color={"gray"}
        bg={"transparent"}
        rounded="full"
        w={{base: "100px",lg: "150px"}}
        h={{base: "100px",lg: "150px"}}
        border="5px solid"
        borderColor={"white"}
        mb={5}
      >
        <Image src={image} />
      </Box>
      <Box>
        <Text fontWeight={400} fontSize={18}>{city}</Text>
      </Box>
    </Stack>
  );
};

export default CircleCard;
