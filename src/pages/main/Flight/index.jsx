import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FlightDetailHeader from "../../../components/module/FligthDetail/Header";
import { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import CardFlightDetail from "../../../components/module/FligthDetail/Card";
import { CiCircleCheck } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FlightDetail = () => {
  const [countryCode, setCountryCode] = useState("+62");
  const { isOpen, onToggle } = useDisclosure();
  const [form, setForm] = useState({
    fullname: "Jhon Doe",
    email: "example@gmail.com",
    phone: "812967127",
  });
  const FORM = [
    {
      label: "Fullname",
      onChange: "",
      value: form?.fullname,
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      onChange: "",
      value: form?.email,
      type: "email",
      name: "email",
    },
  ];
  const handleChange = (e) => {
    if (e?.target?.name === "phone") {
      setForm({ ...form, phone: `${countryCode} + ${e.target.value}` });
    }
    setForm({ ...form, [e?.target?.name]: e?.target?.value });
  };
  return (
    <Box h={"100vh"} bg={"gray.200"}>
      <FlightDetailHeader />
      <Flex position={"relative"}>
        <CardFlightDetail
          h={"400px"}
          w={"50%"}
          top={-20}
          left={90}
          px={10}
          py={8}
        >
          <FormControl spacing={3} fontFamily={"Lato"} isRequired>
            {FORM?.map((item, i) => (
              <Box key={i} mb={5}>
                <FormLabel color={"gray.500"}>{item?.label}</FormLabel>
                <Input
                  variant="flushed"
                  value={item?.value}
                  focusBorderColor="gray.400"
                  type={item?.type}
                  name={item?.name}
                  onChange={(e) => handleChange(e)}
                />
              </Box>
            ))}
            <Flex
              alignItems={"end"}
              gap={3}
              borderBottom={"1px solid"}
              borderColor={"gray.400"}
            >
              <Box>
                <FormLabel color={"gray.500"}>Phone</FormLabel>
                <Select
                  variant="flushed"
                  w={70}
                  fontSize={14}
                  focusBorderColor="transparent"
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+62">+62</option>
                  <option value="+63">+63</option>
                  <option value="+64">+64</option>
                </Select>
              </Box>
              <Stack h={8} w={"2px"} bg={"gray.300"}></Stack>
              <Input
                py={2}
                variant="unstyled"
                placeholder="Phone number"
                focusBorderColor="transparent"
                type="text"
                border={"none"}
                borderColor="transparent"
                value={form?.phone}
                name="phone"
                onChange={(e) => handleChange(e)}
              />
            </Flex>
          </FormControl>
          <Flex
            bg={"red.100"}
            w={"full"}
            py={4}
            px={10}
            mt={5}
            borderRadius={10}
            gap={5}
          >
            <IoIosWarning color="red" size={25} />
            <Text as="p">Make sure the customer data is correct.</Text>
          </Flex>
        </CardFlightDetail>
        <CardFlightDetail w={"30%"} top={-20} right={90} py={5}>
          <Flex
            alignItems={"center"}
            gap={"30px"}
            fontFamily={"Poppins"}
            px={10}
          >
            <Image src="/src/assets/garuda_indonesia.png" />
            <Text as={"p"} fontWeight={500}>
              Garuda Indonesia
            </Text>
          </Flex>
          <Flex
            fontFamily={"Poppins"}
            fontSize={18}
            gap={"20px"}
            px={10}
            mt={5}
          >
            <Text fontWeight={500}>Medan (IDN) </Text>
            <Image src="/src/assets/flight.svg" />
            <Text fontWeight={500}>Medan (IDN) </Text>
          </Flex>
          <Flex
            fontFamily={"Poppins"}
            alignItems={"center"}
            fontSize={14}
            gap={"20px"}
            mt={3}
            px={10}
            color={"#6B6B6B"}
          >
            <Text fontWeight={400}>Sunday, 15 August 2020 </Text>
            <Box bg={"gray.500"} h={2} w={2} borderRadius={"full"}></Box>
            <Text fontWeight={400}>12:33 - 15:21</Text>
          </Flex>
          <Box
            color={"#2395FF"}
            fontWeight={500}
            fontFamily={"Poppins"}
            px={10}
          >
            <Flex alignItems={"center"} gap={2} my={3}>
              <CiCircleCheck color="#2395FF" size={24} />
              <Text fontWeight={400}>Refundable</Text>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <CiCircleCheck color="#2395FF" size={24} />
              <Text fontWeight={400}>Can reschedule</Text>
            </Flex>
          </Box>
          <Flex
            borderTop={"1px solid"}
            borderColor={"gray.300"}
            mt={10}
            px={10}
            alignItems={"center"}
            justifyContent={"space-between"}
            h={100}
            fontFamily={"Poppins"}
            // bg={'red'}
          >
            <Text fontWeight={600} fontSize={18}>
              Total Payment
            </Text>
            <Flex alignItems={"center"} gap={2}>
              <Text fontWeight={600} fontSize={24} color={"#2395FF"}>
                $ 149,90
              </Text>
              <Button variant={"unstyled"} onClick={onToggle}>
                {isOpen ? (
                  <FaChevronUp color="#2395FF" size={20} />
                ) : (
                  <FaChevronDown color="#2395FF" size={20} />
                )}
              </Button>
            </Flex>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Box px={10} fontFamily={"Poppins"}>
              <Flex
                alignItems={"center"}
                gap={3}
                w={"full"}
                justifyContent={"space-between"}
                color={"gray.500"}
                pr={"20px"}
              >
                <Text fontWeight={400} fontSize={16}>
                  Ticket amount per 1 ticket
                </Text>
                <Text fontWeight={400} fontSize={14}>
                  $ 72,50
                </Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={3}
                w={"full"}
                justifyContent={"space-between"}
                color={"gray.500"}
                pr={"20px"}
                mt={2}
              >
                <Text fontWeight={400} fontSize={16}>
                  Total Passenger
                </Text>
                <Text fontWeight={400} fontSize={14}>
                  2 Person
                </Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={3}
                w={"full"}
                justifyContent={"space-between"}
                color={"gray.500"}
                pr={"20px"}
                mt={2}
              >
                <Text fontWeight={400} fontSize={16}>
                  Tax
                </Text>
                <Text fontWeight={400} fontSize={14}>
                  2%
                </Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={3}
                w={"full"}
                justifyContent={"space-between"}
                color={"gray.500"}
                pr={"20px"}
                mt={2}
              >
                <Text fontWeight={400} fontSize={16}>
                  Service fee
                </Text>
                <Text fontWeight={400} fontSize={14}>
                  $2
                </Text>
              </Flex>
              <Text
                as={"small"}
                color={"red.400"}
                mt={4}
                display={"inline-block"}
              >
                *The ticket price for both adults and childrens remains charged
                at 1 ticket per seat
              </Text>
            </Box>
          </Collapse>
        </CardFlightDetail>
      </Flex>
    </Box>
  );
};
export default FlightDetail;
