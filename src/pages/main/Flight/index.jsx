import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import FlightDetailHeader from "../../../components/module/FligthDetail/Header";
import { useEffect, useRef, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import CardFlightDetail from "../../../components/module/FligthDetail/Card";
import { CiCircleCheck } from "react-icons/ci";
import { RiLuggageDepositFill } from "react-icons/ri";
import { PiArmchair, PiArmchairDuotone } from "react-icons/pi";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import {
  FlightIcon,
  HamburgerIcon,
  InFlightMealIcon,
  LuggageIcon,
  RestroomIcon,
  StarIcon,
  WifiIcon,
} from "../../../components/base/Icons";
import garudaIndonesiaLogo from "../../../assets/garuda-indonesia-logo.png";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import { formatScheduleDate, formatTimeFull } from "../../../utils/date";
import { rupiah } from "../../../utils/currency";

function CardFlightHeading({ children, ...props }) {
  return (
    <Heading
      fontFamily="Poppins"
      fontSize={{ base: "1.125rem", md: "24px" }}
      fontWeight="600"
      {...props}
    >
      {children}
    </Heading>
  );
}

const FlightDetail = () => {
  let { id } = useParams();

  const [data, setData] = useState({
    ticket: {},
    contact_person: {
      name: "",
      email: "",
      phone: "",
    },
    passengers: [
      {
        id: 1,
        type: "adult",
        title: "Mr.",
        name: "",
        nationality: "",
        readOnly: false,
        seat_selected: {},
      },
    ],
    cost: {
      price: 0,
      tax: 0,
      service_fee: 0,
      travel_insurance: 0,
      total_price: 0,
    },
  });

  const [passengerIdSelected, setPassengerIdSelected] = useState(1);
  const [passengerIdCounter, setPassengerIdCounter] = useState(2);
  const [insurance, setInsurance] = useState(false);
  //   const [countryCode, setCountryCode] = useState("+62");
  const {
    isOpen: isOpenModalSeat,
    onOpen: onOpenModalSeat,
    onClose: onCloseModalSeat,
  } = useDisclosure();
  const {
    isOpen: isOpenModalFlight,
    onOpen: onOpenModalFlight,
    onClose: onCloseModalFlight,
  } = useDisclosure();
  const {
    isOpen: isOpenAlertDialog,
    onOpen: onOpenAlertDialog,
    onClose: onCloseAlertDialog,
  } = useDisclosure();
  const cancelRef = useRef();
  const FORM_CONTACTPERSON = [
    {
      label: "Full Name",
      value: data?.contact_person?.name,
      type: "text",
      name: "name",
      readOnly: true,
      placeholder: "Full name (ex. Mike Kowalski)",
    },
    {
      label: "Email",
      value: data?.contact_person?.email,
      type: "email",
      name: "email",
      readOnly: true,
      placeholder: "example@mail.com",
    },
    {
      label: "Phone",
      value: data?.contact_person?.phone,
      type: "number",
      name: "phone",
      readOnly: false,
      placeholder: "08xxx",
    },
  ];

  const handlePassengerIdClick = (passengerId) => {
    setPassengerIdSelected(passengerId);
    onOpenModalSeat();
  };

  const handleChangeContactPerson = (e) => {
    // if (e?.target?.name === "phone") {
    //   setForm({ ...form, phone: `${countryCode} + ${e.target.value}` });
    // }
    // setForm({ ...form, [e?.target?.name]: e?.target?.value });
    setData({
      ...data,
      contact_person: {
        ...data.contact_person,
        [e?.target?.name]: e?.target?.value,
      },
    });
  };

  const handleAddPassenger = () => {
    setData({
      ...data,
      passengers: [
        ...data.passengers,
        {
          id: passengerIdCounter,
          type: "adult",
          title: "Mr.",
          name: "",
          nationality: "",
          readOnly: false,
          seat_selected: {},
        },
      ],
    });
    setPassengerIdCounter(passengerIdCounter + 1);
  };

  const handleChangePassenger = (id, key, value) => {
    const updatedPassengers = data.passengers.map((passenger) => {
      if (passenger.id === id) {
        let newPassenger = { ...passenger, [key]: value };

        return newPassenger;
      }
      return passenger;
    });

    setData({
      ...data,
      passengers: updatedPassengers,
    });
  };

  const handleSeatSelect = (passengerId, seatId) => {
    setData((prevData) => {
      const updatedPassengers = prevData.passengers.map((passenger) => {
        if (passenger.id === passengerId) {
          const seat = data?.ticket?.seats?.find((seat) => seat.id === seatId);
          return { ...passenger, seat_selected: seat };
        }
        return passenger;
      });
      return { ...prevData, passengers: updatedPassengers };
    });
  };

  const handleRemovePassenger = (id) => {
    setData({
      ...data,
      passengers: data.passengers.filter((passenger) => passenger.id !== id),
    });
  };

  const handleChangeSameContact = (e) => {
    const isChecked = e.target.checked;

    handleChangePassenger(
      1,
      "name",
      isChecked ? data?.contact_person?.name : ""
    );

    // handleChangePassenger(1, "readOnly", isChecked);
  };

  const handleChangeTravelInsurance = (e) => {
    const isChecked = e.target.checked;

    setInsurance(isChecked);
  };

  const getCost = () => {
    const passengerCount = data?.passengers?.length;
    const ticketPrice = data?.ticket?.price || 0;

    const tax = 0.125 * ticketPrice;

    const serviceFee =
      ((data?.ticket?.is_luggage && 1) +
        (data?.ticket?.is_inflight_meal && 1) +
        (data?.ticket?.is_wifi && 1)) *
      0.03 *
      ticketPrice;

    const travelInsurance = 0.02 * passengerCount * ticketPrice + 10000;

    const totalPayment =
      passengerCount * ticketPrice +
      tax +
      serviceFee +
      (insurance && travelInsurance);

    setData({
      ...data,
      cost: {
        price: ticketPrice,
        tax,
        service_fee: serviceFee,
        travel_insurance: travelInsurance,
        total_price: totalPayment,
      },
    });
  };

  const getTickets = async (ticket_id) => {
    try {
      const [responseProfile, responseTicket] = await Promise.all([
        api.get(`customer/profile`),
        api.get(`tickets/${ticket_id}`),
      ]);

      setData({
        ...data,
        ticket: responseTicket?.data?.data,
        contact_person: {
          name: responseProfile?.data?.data?.username,
          email: responseProfile?.data?.data?.email,
          phone: responseProfile?.data?.data?.phone_number,
        },
      });
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  useEffect(() => {
    getTickets(id);
  }, []);

  useEffect(() => {
    if (data?.ticket && Object.keys(data.ticket).length > 0) {
      getCost();
    }
  }, [data.ticket, data.passengers.length, insurance]);

  console.log(data);

  return (
    <Box bg={"gray.200"} fontFamily="Poppins" pb="35px">
      <FlightDetailHeader />
      <Container maxW="1226px" px="28px" position="relative">
        <Grid
          gap="25px"
          gridTemplateColumns="repeat(12, minmax(0px, 1fr))"
          alignItems="start"
        >
          <Box
            flex="1"
            mt="-120px"
            display="grid"
            gap="50px"
            flexShrink="0"
            gridColumn={{ base: "1/span 12", lg: "1/span 8" }}
          >
            <ContactPersonDetails
              form={FORM_CONTACTPERSON}
              callback={(e) => handleChangeContactPerson(e)}
            />
            <Box as="section">
              <Box mb="25px">
                <CardFlightHeading color="black">
                  Passenger Details
                </CardFlightHeading>
              </Box>
              <CardFlightDetail px={10} py={8}>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems={{ base: "stretch", md: "center" }}
                  gap={{ base: "6px", md: 0 }}
                  justifyContent="space-between"
                  mb="30px"
                  rounded="10px"
                  px="28px"
                  py="12px"
                  bgColor="#2395FF1A"
                  fontFamily="Lato"
                  color="#595959"
                >
                  <Text>
                    Passenger:{" "}
                    {`${
                      data?.passengers?.filter(
                        (passenger) => passenger.type === "adult"
                      ).length
                    } Adult${
                      data?.passengers?.filter(
                        (passenger) => passenger.type === "adult"
                      ).length > 1
                        ? "s"
                        : ""
                    }${
                      data?.passengers?.filter(
                        (passenger) => passenger.type === "child"
                      ).length > 0
                        ? `, ${
                            data?.passengers?.filter(
                              (passenger) => passenger.type === "child"
                            ).length
                          } Child${
                            data?.passengers?.filter(
                              (passenger) => passenger.type === "child"
                            ).length > 1
                              ? "s"
                              : ""
                          }`
                        : ""
                    }`}
                  </Text>
                  <Flex alignItems="center" gap="15px">
                    <FormLabel htmlFor="same_as_contact_person" mb="0">
                      Same as contact person
                    </FormLabel>
                    <Switch
                      id="same_as_contact_person"
                      onChange={handleChangeSameContact}
                    />
                  </Flex>
                </Flex>
                <FormControl spacing={3} fontFamily={"Lato"} isRequired>
                  <Box mb="30px">
                    <FormLabel color={"gray.500"}>Title</FormLabel>
                    <Select
                      variant="flushed"
                      onChange={(e) =>
                        handleChangePassenger(1, "title", e.target.value)
                      }
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                    </Select>
                  </Box>
                  <Box mb="30px">
                    <FormLabel color={"gray.500"}>Full Name</FormLabel>
                    <Input
                      variant="flushed"
                      name="name"
                      value={data.passengers?.[0]?.name || ""}
                      onChange={(e) =>
                        handleChangePassenger(1, "name", e.target.value)
                      }
                      placeholder="Full name (ex. Mike Kowalski)"
                      readOnly={data.passengers?.[0]?.readOnly}
                    />
                  </Box>
                  <Box mb="30px">
                    <FormLabel color={"gray.500"}>Nationality</FormLabel>
                    <Input
                      variant="flushed"
                      name="nationality"
                      value={data.passengers?.[0]?.nationality || ""}
                      onChange={(e) =>
                        handleChangePassenger(1, "nationality", e.target.value)
                      }
                      placeholder="United States"
                    />
                  </Box>
                  {/* <Box>
                    <FormLabel color={"gray.500"}>Nationality</FormLabel>
                    <Select variant="flushed">
                      <option value="mr">Indonesia</option>
                      <option value="mrs">Malaysia</option>
                      <option value="mrs">Belanda</option>
                      <option value="mrs">Jepang</option>
                    </Select>
                  </Box> */}
                  <Flex mb="30px">
                    <Button
                      onClick={() =>
                        handlePassengerIdClick(data?.passengers?.[0]?.id)
                      }
                      isDisabled={
                        data?.passengers?.[0]?.name === "" ? true : false
                      }
                    >
                      Choose Seat
                    </Button>
                  </Flex>
                  <ModalSeat
                    isOpen={isOpenModalSeat}
                    onClose={onCloseModalSeat}
                    row_seats={data?.ticket?.row_seats}
                    seats={data?.ticket?.seats}
                    passengers={data?.passengers}
                    passenger_id={passengerIdSelected}
                    onSelectSeat={handleSeatSelect}
                    size="full"
                  />
                </FormControl>
                {data?.passengers?.length > 1 && (
                  <Accordion mb="30px" allowMultiple>
                    {data?.passengers?.slice(1).map((passenger) => (
                      <AccordionItem key={passenger.id}>
                        <h2>
                          <AccordionButton>
                            <Box
                              as="span"
                              fontFamily="Lato"
                              flex="1"
                              textAlign="center"
                              textTransform="capitalize"
                            >
                              {passenger?.name
                                ? `${passenger?.type}${
                                    passenger?.name && " - "
                                  }${passenger?.name}`
                                : `New Passenger ${passenger.id - 1}`}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={0}>
                          <CardFlightDetail>
                            <FormControl
                              spacing={3}
                              fontFamily={"Lato"}
                              isRequired
                            >
                              <Box mb="30px">
                                <FormLabel color={"gray.500"}>Type</FormLabel>
                                <Select
                                  variant="flushed"
                                  onChange={(e) =>
                                    handleChangePassenger(
                                      passenger.id,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="adult">Adult</option>
                                  <option value="child">Child</option>
                                </Select>
                              </Box>
                              {passenger?.type === "adult" && (
                                <Box mb="30px">
                                  <FormLabel color={"gray.500"}>
                                    Title
                                  </FormLabel>
                                  <Select
                                    variant="flushed"
                                    onChange={(e) =>
                                      handleChangePassenger(
                                        passenger.id,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                  </Select>
                                </Box>
                              )}
                              <Box mb="30px">
                                <FormLabel color={"gray.500"}>
                                  Full Name
                                </FormLabel>
                                <Input
                                  variant="flushed"
                                  placeholder="Full name (ex. Mike Kowalski)"
                                  name="name"
                                  value={passenger?.name || ""}
                                  onChange={(e) =>
                                    handleChangePassenger(
                                      passenger.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                              </Box>
                              <Box mb="30px">
                                <FormLabel color={"gray.500"}>
                                  Nationality
                                </FormLabel>
                                <Input
                                  variant="flushed"
                                  placeholder="United States"
                                  name="nationality"
                                  value={passenger?.nationality || ""}
                                  onChange={(e) =>
                                    handleChangePassenger(
                                      passenger.id,
                                      "nationality",
                                      e.target.value
                                    )
                                  }
                                />
                              </Box>

                              <Flex gap={3} mb="30px">
                                <Button
                                  variant="solid"
                                  isDisabled={
                                    passenger?.name === "" ? true : false
                                  }
                                  onClick={() =>
                                    handlePassengerIdClick(passenger.id)
                                  }
                                >
                                  Choose Seat
                                </Button>
                                <Button
                                  variant="solid"
                                  colorScheme="red"
                                  onClick={() =>
                                    handleRemovePassenger(passenger.id)
                                  }
                                >
                                  <FaTrashAlt />
                                </Button>
                              </Flex>

                              <ModalSeat
                                isOpen={isOpenModalSeat}
                                onClose={onCloseModalSeat}
                                row_seats={data?.ticket?.row_seats}
                                seats={data?.ticket?.seats}
                                passengers={data?.passengers}
                                passenger_id={passengerIdSelected}
                                onSelectSeat={handleSeatSelect}
                                size="full"
                              />
                            </FormControl>
                          </CardFlightDetail>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
                <Button
                  variant="ghost"
                  fontFamily="Lato"
                  onClick={handleAddPassenger}
                  w="full"
                >
                  Add New Passenger
                </Button>
              </CardFlightDetail>
            </Box>
            <Box as="section">
              <CardFlightDetail>
                <Flex
                  px="28px"
                  pb="20px"
                  pt="34px"
                  alignItems="center"
                  justifyContent="space-between"
                  fontFamily="Lato"
                  borderBottom="1px solid #E6E6E6"
                >
                  <Checkbox
                    gap={{ base: 0, md: "15px" }}
                    fontSize={{ base: "10px", md: "18px" }}
                    fontWeight="600"
                    color="black"
                    onChange={handleChangeTravelInsurance}
                    value={insurance}
                  >
                    Travel Insurance
                  </Checkbox>
                  <Text
                    fontSize={{ base: "17px", md: "18px" }}
                    fontWeight="700"
                    color="#2395FF"
                  >
                    {rupiah(data?.cost?.travel_insurance)}
                    <Text
                      as="span"
                      fontSize="14px"
                      fontWeight="600"
                      color="#6B6B6B"
                    >
                      /pax
                    </Text>
                  </Text>
                </Flex>
                <Box px="28px" pb="34px" pt="20px">
                  <Text fontSize="14px" color="black">
                    Get travel compensation up to {rupiah(10000)}
                  </Text>
                </Box>
              </CardFlightDetail>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              display={{ base: "none", lg: "flex" }}
            >
              <Button
                onClick={onOpenAlertDialog}
                type="submit"
                bg="#2395FF"
                borderRadius="10px"
                py="28px"
                px="60px"
                fontSize="18px"
                fontWeight="700"
                color="white"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                boxShadow="0px 8px 10px 0px #2395FF4D"
                _hover={{ bg: "#1971c2" }}
                _active={{
                  bg: "#dddfe2",
                  boxShadow: "0px 8px 10px 0px #dddfe24D",
                }}
              >
                Proceed to Payment
              </Button>
            </Flex>
          </Box>
          <Box
            mt={{ base: "0px", lg: "-120px" }}
            display={{ base: "none", lg: "grid" }}
            gridColumn={{ base: "1/span 12", lg: "9/span 4" }}
          >
            <FlightDetails
              ticket={data?.ticket}
              passengers={data?.passengers}
              cost={data?.cost}
              insurance={insurance}
            />
            {/* ui buat seat */}
            <Box>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                mb="25px"
              >
                <CardFlightHeading color="black">
                  Seat Details
                </CardFlightHeading>
              </Flex>
              <CardFlightDetail w="full">
                <Flex
                  px="28px"
                  py="30px"
                  alignItems="center"
                  justifyContent="space-between"
                  fontFamily="Lato"
                  borderBottom="1px solid #E6E6E6"
                >
                  {data?.passengers?.[0]?.name !== "" ? (
                    <VStack
                      divider={
                        <StackDivider
                          display={{ base: "none", lg: "block" }}
                          borderColor="gray.200"
                        />
                      }
                      spacing={2}
                      align="stretch"
                      w={{ base: "full" }}
                      my={{ base: 0, lg: 4 }}
                    >
                      {data?.passengers
                        ?.filter((passenger) => passenger?.name !== "")
                        .map((passenger) => (
                          <Box
                            key={passenger?.id}
                            userSelect="none"
                            display={{ base: "flex" }}
                            justifyContent={{ base: "space-between" }}
                            alignItems={{ base: "center" }}
                            borderLeft="4px solid #2395FF"
                            px={2}
                          >
                            <Stack spacing={1}>
                              <Text
                                fontSize={{ base: "16px", xl: "18px" }}
                                fontWeight={500}
                              >
                                {`${
                                  passenger?.type === "adult"
                                    ? passenger?.title
                                    : ""
                                } ${passenger?.name}`}
                              </Text>
                              <Text
                                fontSize={{ base: "20px" }}
                                fontWeight={600}
                                textTransform="capitalize"
                              >
                                {`${passenger?.type}`}
                              </Text>
                            </Stack>
                            <HStack
                              bg={
                                Object.values(passenger?.seat_selected)
                                  .length !== 0
                                  ? "#2395FF1A"
                                  : "transparent"
                              }
                              py={1}
                              px={2}
                              rounded="15px"
                              spacing={
                                Object.values(passenger?.seat_selected)
                                  .length !== 0
                                  ? 1
                                  : 0
                              }
                              maxW="35%"
                              fontSize={
                                Object.values(passenger?.seat_selected)
                                  .length !== 0
                                  ? { base: 22, xl: 36 }
                                  : { base: 16, xl: 20 }
                              }
                              textAlign="right"
                              fontWeight={
                                Object.values(passenger?.seat_selected)
                                  .length !== 0
                                  ? 700
                                  : 500
                              }
                            >
                              {Object.values(passenger?.seat_selected)
                                .length !== 0 ? (
                                <>
                                  <Text>
                                    {
                                      passenger?.seat_selected?.code?.split(
                                        "-"
                                      )[0]
                                    }
                                  </Text>
                                  <Text>-</Text>
                                  <Text>
                                    {
                                      passenger?.seat_selected?.code?.split(
                                        "-"
                                      )[1]
                                    }
                                  </Text>
                                </>
                              ) : (
                                <Text>No Seat Selected</Text>
                              )}
                            </HStack>
                          </Box>
                        ))}
                    </VStack>
                  ) : (
                    <Stack
                      bg={"#F245451A"}
                      w={"full"}
                      py={{ base: 4 }}
                      px={{ base: 4, lg: 8 }}
                    >
                      <Text as="p" fontSize="14px">
                        Complete your passenger data first!
                      </Text>
                    </Stack>
                  )}
                </Flex>
              </CardFlightDetail>
            </Box>
          </Box>

          <Box display={{ base: "block", lg: "none" }} gridColumn="1/-1">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              color="black"
              fontWeight="600"
              my="2rem"
            >
              <Heading
                fontFamily="Poppins"
                fontSize={{ base: "1.125rem", md: "24px" }}
              >
                Flight Details
              </Heading>
              <Text
                userSelect="none"
                cursor="pointer"
                onClick={onOpenModalFlight}
                fontSize={{ base: "1rem", md: "22px" }}
              >
                View Details
              </Text>
              <ModalFlight
                isOpen={isOpenModalFlight}
                onClose={onCloseModalFlight}
                cost={data?.cost}
                passengers={data?.passengers}
                insurance={insurance}
              />
            </Flex>
            <Box bgColor="white" rounded="0.5rem" overflow="hidden">
              <Box px="1.25rem" py="2.5rem" borderBottom="1px solid #E6E6E6">
                <Flex justifyContent="space-between" mb="1.5rem">
                  <Box>
                    <Text fontSize="16px" fontWeight="500" color="black">
                      {data?.ticket?.departure_city} (
                      {data?.ticket?.departure_country_code})
                    </Text>
                    <Text fontSize="0.75rem" color="#6B6B6B">
                      {formatTimeFull(data?.ticket?.departure_schedule)}
                    </Text>
                  </Box>
                  <Box mt="0.15rem">
                    <FlightIcon />
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="16px" fontWeight="500" color="black">
                      {data?.ticket?.arrival_city} (
                      {data?.ticket?.arrival_country_code})
                    </Text>
                    <Text fontSize="0.75rem" color="#6B6B6B">
                      {formatTimeFull(data?.ticket?.arrival_schedule)}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap={5}
                  mb="1.875rem"
                  fontFamily="Poppins"
                >
                  <Box w="75px">
                    <Image
                      w="full"
                      src={data?.ticket?.merchant_image}
                      alt={data?.ticket?.merchant_name}
                    />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="10px">
                    {data?.ticket?.is_refund && (
                      <Flex
                        alignItems={"center"}
                        gap={2}
                        justifyContent="flex-end"
                      >
                        <Text fontWeight={400}>Refundable</Text>
                        <CiCircleCheck color="#2395FF" size={20} />
                      </Flex>
                    )}
                    {data?.ticket?.is_reschedule && (
                      <Flex
                        alignItems={"center"}
                        gap={2}
                        justifyContent="flex-end"
                      >
                        <Text align="right" fontWeight={400}>
                          Can reschedule
                        </Text>
                        <CiCircleCheck color="#2395FF" size={20} />
                      </Flex>
                    )}
                  </Box>
                </Flex>
                <Flex gap="20px" justifyContent="space-between">
                  <Box fontFamily="Lato" maxW="50%">
                    <Text fontSize="0.75rem" color="#A5A5A5">
                      Schedule
                    </Text>
                    <Text fontSize="0.875rem" fontWeight="500" color="#595959">
                      {formatScheduleDate(data?.ticket?.departure_schedule)}
                    </Text>
                  </Box>
                  <Box fontFamily="Lato">
                    <Text fontSize="0.75rem" color="#A5A5A5">
                      Class
                    </Text>
                    <Text fontSize="0.875rem" fontWeight="500" color="#595959">
                      {data?.ticket?.class}
                    </Text>
                  </Box>
                  <Box fontFamily="Lato">
                    <Text fontSize="0.75rem" color="#A5A5A5">
                      Gate
                    </Text>
                    <Text fontSize="0.875rem" fontWeight="500" color="#595959">
                      {data?.ticket?.gate}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                px="1.25rem"
                pt="1.25rem"
                pb="1.875rem"
                shadow="0px 8px 27px 0px #0E3F6C30"
              >
                <Flex
                  alignItems="center"
                  justifyContent={
                    data?.passengers?.filter(
                      (passenger) => passenger.type === "child"
                    ).length > 0
                      ? "space-between"
                      : "flex-end"
                  }
                >
                  {data?.passengers?.filter(
                    (passenger) => passenger.type === "child"
                  ).length > 0 && (
                    <Flex alignItems="center" gap="16px">
                      <Text
                        as="span"
                        fontWeight="700"
                        fontSize="1.125rem"
                        w="36px"
                        aspectRatio="1/1"
                        color="#2395FF"
                        bgColor="#2395FF2E"
                        rounded="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {
                          data?.passengers?.filter(
                            (passenger) => passenger.type === "child"
                          ).length
                        }
                      </Text>
                      <Text fontSize="0.875rem" color="#979797">
                        Child
                        {`${
                          data?.passengers?.filter(
                            (passenger) => passenger.type === "child"
                          ).length > 1
                            ? "s"
                            : ""
                        }`}
                      </Text>
                    </Flex>
                  )}
                  <Flex alignItems="center" gap="16px">
                    <Text
                      as="span"
                      fontWeight="700"
                      fontSize="1.125rem"
                      w="36px"
                      aspectRatio="1/1"
                      color="#2395FF"
                      bgColor="#2395FF2E"
                      rounded="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {
                        data?.passengers?.filter(
                          (passenger) => passenger.type === "adult"
                        ).length
                      }
                    </Text>
                    <Text fontSize="0.875rem" color="#979797">
                      Adult
                      {`${
                        data?.passengers?.filter(
                          (passenger) => passenger.type === "adult"
                        ).length > 1
                          ? "s"
                          : ""
                      }`}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box
            display={{ base: "block", lg: "none" }}
            gridColumn="1/-1"
            mb="40px"
          >
            <Box mb="0.75rem">
              <Heading fontSize="0.875rem" fontWeight="600">
                Facilities
              </Heading>
            </Box>
            <List
              display="flex"
              alignItems="center"
              gap="0.75rem"
              flexWrap="wrap"
            >
              {data?.ticket?.is_luggage && (
                <ListItem
                  px="1.25rem"
                  py="1rem"
                  bgColor="#E45D32"
                  rounded="0.625rem"
                  display="flex"
                  alignItems="center"
                  gap="20px"
                  color="white"
                >
                  <RiLuggageDepositFill size={22} />
                  <Text fontSize="0.875rem" fontWeight="600">
                    Luggage
                  </Text>
                </ListItem>
              )}
              {data?.ticket?.is_inflight_meal && (
                <ListItem
                  px="1.25rem"
                  py="1rem"
                  bgColor="#7861D7"
                  rounded="0.625rem"
                  display="flex"
                  alignItems="center"
                  gap="20px"
                  color="white"
                >
                  <HamburgerIcon />
                  <Text fontSize="0.875rem" fontWeight="600">
                    Meal
                  </Text>
                </ListItem>
              )}
              {data?.ticket?.is_wifi && (
                <ListItem
                  px="1.25rem"
                  py="1rem"
                  bgColor="#6DDA6B"
                  rounded="0.625rem"
                  display="flex"
                  alignItems="center"
                  gap="20px"
                  color="white"
                >
                  <WifiIcon />
                  <Text fontSize="0.875rem" fontWeight="600">
                    Wi-Fi
                  </Text>
                </ListItem>
              )}
            </List>
          </Box>
          <Box display={{ base: "block", lg: "none" }} gridColumn="1/-1">
            <Flex alignItems="center" justifyContent="space-between" mb="30px">
              <Text fontSize="0.875rem" fontWeight="500" color="#6B6B6B">
                Total you'll pay
              </Text>
              <Text fontSize="1.5rem" fontWeight="600" color="#2395FF">
                {rupiah(data?.cost?.total_price)}
              </Text>
            </Flex>
            <Flex>
              <Button
                onClick={onOpenAlertDialog}
                type="submit"
                bg="#2395FF"
                borderRadius="10px"
                py="28px"
                px="60px"
                fontSize="18px"
                fontWeight="700"
                color="white"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                boxShadow="0px 8px 10px 0px #2395FF4D"
                width={{ base: "100%", md: "50%" }}
                mx="auto"
                _hover={{ bg: "#1971c2" }}
                _active={{
                  bg: "#dddfe2",
                  boxShadow: "0px 8px 10px 0px #dddfe24D",
                }}
              >
                Proceed to Payment
              </Button>
              <AlertDialogFlight
                cancelRef={cancelRef}
                onClose={onCloseAlertDialog}
                isOpen={isOpenAlertDialog}
              />
            </Flex>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

const SeatsFlight = ({
  count_row = 0,
  seats = [],
  passenger_id = 0,
  passengers = [],
  onSelectSeat,
}) => {
  const handleSeatClick = (id) => {
    let seat_selected_passenger = passengers.find(
      (passenger) => passenger.seat_selected.id === id
    );
    if (!seat_selected_passenger) {
      onSelectSeat(passenger_id, id);
    }
  };

  // console.log(passenger_seat_selected);

  const data_dummy = [
    {
      code: "1-A",
      id: 1,
      is_booking: false,
    },
    {
      code: "1-B",
      id: 2,
      is_booking: false,
    },
    {
      code: "1-C",
      id: 3,
      is_booking: false,
    },
    {
      code: "1-D",
      id: 4,
      is_booking: false,
    },
    {
      code: "2-A",
      id: 5,
      is_booking: false,
    },
    {
      code: "2-B",
      id: 6,
      is_booking: false,
    },
    {
      code: "2-C",
      id: 7,
      is_booking: false,
    },
  ];
  // Function to split seats into rows and add spacing
  const arrangeSeats = (data, seatsPerRow) => {
    const rows = [];
    let numRows = data[0]?.code.split("-")[0] || 1;

    // let code_data = data[0]?.code;
    // console.log(code_data.split("-")[0]);
    const generateAlphabetRow = (seatPositions) => {
      const row = [];
      let seatIndex = 0;
      for (let i = 0; i < seatPositions.length; i++) {
        if (seatPositions[i] === null) {
          row.push(null);
        } else {
          row.push((seatIndex + 10).toString(36).toUpperCase());
          seatIndex++;
        }
      }

      return row;
    };

    // Fungsi untuk menyusun kursi dengan slot null yang teratur
    const generateRow = (rowSeats, seatPositions, numberOfRows) => {
      const row = [];
      let seatIndex = 0;
      for (let i = 0; i < seatPositions.length; i++) {
        if (seatPositions[i] === null) {
          row.push(numberOfRows); // Tambah null di posisi yang sesuai
        } else {
          row.push(rowSeats[seatIndex] || null); // Tambah kursi jika ada, jika tidak ada isi dengan null
          seatIndex++;
        }
      }
      return row;
    };

    // Template posisi kursi berdasarkan jumlah seatsPerRow
    const seatLayouts = {
      4: [0, 1, null, 2, 3],
      6: [0, 1, 2, null, 3, 4, 5],
      7: [0, 1, null, 2, 3, 4, null, 5, 6],
      8: [0, 1, 2, null, 3, 4, 5, null, 6, 7],
      9: [0, 1, 2, null, 3, 4, 5, null, 6, 7, 8],
      10: [0, 1, 2, null, 3, 4, 5, 6, null, 7, 8, 9],
    };

    rows.push(generateAlphabetRow(seatLayouts[seatsPerRow]));

    for (let i = 0; i < data.length; i += seatsPerRow) {
      const rowSeats = data.slice(i, i + seatsPerRow);

      if (seatsPerRow <= 10) {
        // Jika seatsPerRow ada di layout yang ditentukan, gunakan fungsi generateRow
        rows.push(generateRow(rowSeats, seatLayouts[seatsPerRow], numRows));
      } else {
        rows.push(rowSeats); // Jika lebih dari 10, masukkan kursi secara langsung
      }

      numRows++;
    }

    return rows;
  };

  const seatRows = arrangeSeats(seats, count_row);
  // console.log(seatRows);

  return (
    <Box
      bg="gray.50"
      w="full"
      minW={{ base: "auto", lg: "605px" }}
      maxW={{ base: "auto", lg: "700px" }}
      p="12px"
      maxH={{ base: "70vh", md: "75vh", lg: "90vh" }}
      overflowY="auto"
      style={{
        "::WebkitScrollbar": { display: "none" },
        msOverflowStyle: "auto",
        scrollbarWidth: "thin",
      }}
    >
      {seatRows.map((row, rowIndex) => (
        <Grid
          key={rowIndex}
          templateColumns={`repeat(${
            count_row <= 6 ? count_row + 1 : count_row <= 10 ? count_row + 2 : 4
          }, 1fr)`}
          mb={5} // Margin between rows
        >
          {row.map((seat, seatIndex) =>
            seat ? (
              typeof seat === "object" ? (
                <Tooltip
                  key={seatIndex}
                  fontFamily="Poppins"
                  label={seat?.code}
                  placement="top"
                  openDelay={200}
                  bg="#979797"
                  rounded="10px"
                >
                  <IconButton
                    aria-label={`Seat ${seat?.code}`}
                    icon={<PiArmchairDuotone size={48} />}
                    size="lg"
                    mx="auto"
                    variant="unstyled"
                    color={
                      passengers.find(
                        (passenger) => passenger.seat_selected.id === seat.id
                      )
                        ? "#2395FF"
                        : "#6B6B6B"
                    }
                    _focus={{ boxShadow: "none" }}
                    _hover={{
                      color:
                        seat?.is_booking === true
                          ? passengers.find(
                              (passenger) =>
                                passenger.seat_selected.id === seat.id
                            )
                            ? "#2395FF"
                            : "#6B6B6B"
                          : passengers.find(
                              (passenger) =>
                                passenger.seat_selected.id === seat.id
                            )
                          ? "#2395FF"
                          : "#000000",
                    }}
                    onClick={() => handleSeatClick(seat?.id)}
                    isDisabled={seat?.is_booking === true ? true : false}
                  />
                </Tooltip>
              ) : (
                <Flex
                  key={seatIndex}
                  minW="48px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontFamily="Poppins" fontSize="large" fontWeight={600}>
                    {seat}
                  </Text>
                </Flex>
              )
            ) : (
              <Stack minW="48px" key={seatIndex} />
            )
          )}
        </Grid>
      ))}
    </Box>
  );
};

const ModalSeat = ({
  row_seats = 0,
  seats = [],
  passengers = [],
  passenger_id = 1,
  onSelectSeat,
  ...props
}) => {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent w="full" pt="1rem" mx="1rem">
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          gap={{ base: 3, lg: 10 }}
          my={{ base: 6, lg: 4 }}
          fontFamily="Poppins"
        >
          <SeatsFlight
            passenger_id={passenger_id}
            passengers={passengers}
            count_row={row_seats}
            seats={seats}
            onSelectSeat={onSelectSeat}
          />
          <VStack
            divider={
              <StackDivider
                display={{ base: "none", lg: "block" }}
                borderColor="gray.200"
              />
            }
            spacing={2}
            align="stretch"
            w={{ base: "full" }}
          >
            <Box display="flex" flexDirection="column" gap={2} fontSize="20px">
              <Text fontWeight={700}>Information: </Text>
              <Flex
                flexDirection={{ base: "row", lg: "column" }}
                justifyContent={{ base: "space-between", lg: "flex-start" }}
                gap={{ base: 2, lg: 1 }}
                flexWrap={{ base: "wrap", lg: "nowrap" }}
                fontWeight={500}
              >
                <Flex gap={2} alignItems="center">
                  <IconButton
                    icon={<PiArmchairDuotone size={48} />}
                    size="lg"
                    w="40px"
                    variant="unstyled"
                    color={"#6B6B6B"}
                    _focus={{ boxShadow: "none" }}
                  />
                  <Text>Available</Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <IconButton
                    icon={<PiArmchairDuotone size={48} />}
                    size="lg"
                    w="40px"
                    variant="unstyled"
                    color={"#6B6B6B"}
                    _focus={{ boxShadow: "none" }}
                    isDisabled
                  />
                  <Text>Reserved</Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <IconButton
                    icon={<PiArmchairDuotone size={48} />}
                    size="lg"
                    w="40px"
                    variant="unstyled"
                    color={"#2395FF"}
                    _focus={{ boxShadow: "none" }}
                  />
                  <Text>Selected</Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              display={{ base: "none", lg: "flex" }}
              flexDirection="column"
              gap={2}
              fontSize="20px"
            >
              <Text fontWeight={700}>Passengers: </Text>
              <VStack
                divider={
                  <StackDivider
                    display={{ base: "none", lg: "block" }}
                    borderColor="gray.200"
                  />
                }
                spacing={2}
                align="stretch"
                w={{ base: "full" }}
                my={{ base: 0, lg: 4 }}
              >
                {passengers
                  ?.filter((passenger) => passenger?.name !== "")
                  .map((passenger) => (
                    <Box
                      key={passenger?.id}
                      display={{ base: "flex" }}
                      justifyContent={{ base: "space-between" }}
                      alignItems={{ base: "center" }}
                      borderLeft="4px solid #2395FF"
                      px={2}
                    >
                      <Stack spacing={3}>
                        <Text
                          fontSize={{ base: "18px", xl: "20px" }}
                          fontWeight={500}
                        >
                          {`${
                            passenger?.type === "adult" ? passenger?.title : ""
                          } ${passenger?.name}`}
                        </Text>
                        <Text
                          fontSize={{ base: "20px" }}
                          fontWeight={600}
                          textTransform="capitalize"
                        >
                          {`${passenger?.type}`}
                        </Text>
                      </Stack>
                      <HStack
                        bg={
                          Object.values(passenger?.seat_selected).length !== 0
                            ? "#2395FF1A"
                            : "transparent"
                        }
                        py={1}
                        px={2}
                        rounded="15px"
                        textAlign="right"
                        spacing={
                          Object.values(passenger?.seat_selected).length !== 0
                            ? 1
                            : 0
                        }
                        fontSize={
                          Object.values(passenger?.seat_selected).length !== 0
                            ? { base: 24, xl: 36 }
                            : { base: 16, xl: 20 }
                        }
                        fontWeight={
                          Object.values(passenger?.seat_selected).length !== 0
                            ? 700
                            : 500
                        }
                        letterSpacing={
                          Object.values(passenger?.seat_selected).length !== 0
                            ? { base: 2, xl: 4 }
                            : { base: 0 }
                        }
                      >
                        {Object.values(passenger?.seat_selected).length !==
                        0 ? (
                          <>
                            <Text>
                              {passenger?.seat_selected?.code?.split("-")[0]}
                            </Text>
                            <Text>-</Text>
                            <Text>
                              {passenger?.seat_selected?.code?.split("-")[1]}
                            </Text>
                          </>
                        ) : (
                          <Text>No Seat Selected</Text>
                        )}
                      </HStack>
                    </Box>
                  ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ModalFlight = ({
  cost = {},
  passengers = [],
  insurance = false,
  ...props
}) => {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent pt="1rem" mx="1rem">
        <ModalCloseButton />
        <ModalBody>
          <CostDetails
            cost={cost}
            passengers={passengers}
            insurance={insurance}
            px={2}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const AlertDialogFlight = ({ cancelRef, onClose, isOpen }) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent pt="1rem" mx="1rem" fontFamily="Poppins">
        <AlertDialogHeader>Confirm to proceed?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Are you sure to proceed the payment?.</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose} variant="solid">
            No, Let me check again!
          </Button>
          <Button bg="#2395FF" color="white" ml={3}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ContactPersonDetails = ({ form = [], callback }) => {
  return (
    <Box as="section">
      <Box mb="25px">
        <CardFlightHeading color="white">
          Contact Person Details
        </CardFlightHeading>
      </Box>
      <CardFlightDetail px={10} py={8}>
        <FormControl spacing={3} fontFamily={"Lato"} isRequired>
          {form?.map((item, i) => (
            <Box key={i} mb={5}>
              <FormLabel color={"gray.500"}>{item?.label}</FormLabel>
              <Input
                variant="flushed"
                value={item?.value}
                focusBorderColor="gray.400"
                type={item?.type}
                name={item?.name}
                onChange={callback}
                readOnly={item?.readOnly}
                placeholder={item?.placeholder}
              />
            </Box>
          ))}
          {/* <Flex
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
      </Flex> */}
        </FormControl>
        <Flex
          bg={"#F245451A"}
          w={"full"}
          py={{ base: 4 }}
          px={{ base: 4, lg: 8 }}
          mt={5}
          borderRadius={10}
          gap={5}
          alignItems="center"
          fontFamily="Lato"
        >
          <Stack w="24px">
            <IoIosWarning color="red" size={24} />
          </Stack>
          <Text as="p" fontSize="14px">
            Make sure the customer data is correct.
          </Text>
        </Flex>
      </CardFlightDetail>
    </Box>
  );
};

// const PassengerDetails = ({ data = {}, callback }) => {
//   return (
//     <>
//       <Box as="section">
//         <Box mb="25px">
//           <CardFlightHeading color="black">Passenger Details</CardFlightHeading>
//         </Box>
//         <CardFlightDetail px={10} py={8}>
//           <Flex
//             flexDirection={{ base: "column", md: "row" }}
//             alignItems={{ base: "stretch", md: "center" }}
//             gap={{ base: "6px", md: 0 }}
//             justifyContent="space-between"
//             mb="30px"
//             rounded="10px"
//             px="28px"
//             py="12px"
//             bgColor="#2395FF1A"
//             fontFamily="Lato"
//             color="#595959"
//           >
//             <Text>
//               Passenger:{" "}
//               {`${
//                 data?.passengers?.filter(
//                   (passenger) => passenger.type === "adult"
//                 ).length
//               } Adult${
//                 data?.passengers?.filter(
//                   (passenger) => passenger.type === "adult"
//                 ).length > 1
//                   ? "s"
//                   : ""
//               }${
//                 data?.passengers?.filter(
//                   (passenger) => passenger.type === "child"
//                 ).length > 0
//                   ? `, ${
//                       data?.passengers?.filter(
//                         (passenger) => passenger.type === "child"
//                       ).length
//                     } Child${
//                       data?.passengers?.filter(
//                         (passenger) => passenger.type === "child"
//                       ).length > 1
//                         ? "s"
//                         : ""
//                     }`
//                   : ""
//               }`}
//             </Text>
//             <Flex alignItems="center" gap="15px">
//               <FormLabel htmlFor="same_as_contact_person" mb="0">
//                 Same as contact person
//               </FormLabel>
//               <Switch
//                 id="same_as_contact_person"
//                 onChange={handleChangeSameContact}
//               />
//             </Flex>
//           </Flex>
//           <FormControl spacing={3} fontFamily={"Lato"} isRequired>
//             <Box mb="30px">
//               <FormLabel color={"gray.500"}>Title</FormLabel>
//               <Select
//                 variant="flushed"
//                 onChange={(e) =>
//                   handleChangePassenger(1, "title", e.target.value)
//                 }
//               >
//                 <option value="Mr.">Mr.</option>
//                 <option value="Mrs.">Mrs.</option>
//               </Select>
//             </Box>
//             <Box mb="30px">
//               <FormLabel color={"gray.500"}>Full Name</FormLabel>
//               <Input
//                 variant="flushed"
//                 name="name"
//                 value={data.passengers?.[0]?.name || ""}
//                 onChange={(e) =>
//                   handleChangePassenger(1, "name", e.target.value)
//                 }
//                 placeholder="Full name (ex. Mike Kowalski)"
//                 readOnly={data.passengers?.[0]?.readOnly}
//               />
//             </Box>
//             <Box mb="30px">
//               <FormLabel color={"gray.500"}>Nationality</FormLabel>
//               <Input
//                 variant="flushed"
//                 name="nationality"
//                 value={data.passengers?.[0]?.nationality || ""}
//                 onChange={(e) =>
//                   handleChangePassenger(1, "nationality", e.target.value)
//                 }
//                 placeholder="United States"
//               />
//             </Box>
//             {/* <Box>
//                     <FormLabel color={"gray.500"}>Nationality</FormLabel>
//                     <Select variant="flushed">
//                       <option value="mr">Indonesia</option>
//                       <option value="mrs">Malaysia</option>
//                       <option value="mrs">Belanda</option>
//                       <option value="mrs">Jepang</option>
//                     </Select>
//                   </Box> */}
//           </FormControl>
//           {data?.passengers?.length > 1 && (
//             <Accordion mb="30px" allowMultiple>
//               {data?.passengers?.slice(1).map((passenger) => (
//                 <AccordionItem key={passenger.id}>
//                   <h2>
//                     <AccordionButton>
//                       <Box
//                         as="span"
//                         fontFamily="Lato"
//                         flex="1"
//                         textAlign="center"
//                         textTransform="capitalize"
//                       >
//                         {passenger?.name
//                           ? `${passenger?.type}${passenger?.name && " - "}${
//                               passenger?.name
//                             }`
//                           : `New Passenger ${passenger.id - 1}`}
//                       </Box>
//                       <AccordionIcon />
//                     </AccordionButton>
//                   </h2>
//                   <AccordionPanel pb={0}>
//                     <CardFlightDetail>
//                       <Flex mb="20px" justifyContent="flex-end">
//                         <Button
//                           variant="solid"
//                           size="sm"
//                           colorScheme="red"
//                           onClick={() => handleRemovePassenger(passenger.id)}
//                         >
//                           <FaTrashAlt />
//                         </Button>
//                       </Flex>
//                       <FormControl spacing={3} fontFamily={"Lato"} isRequired>
//                         <Box mb="30px">
//                           <FormLabel color={"gray.500"}>Type</FormLabel>
//                           <Select
//                             variant="flushed"
//                             onChange={(e) =>
//                               handleChangePassenger(
//                                 passenger.id,
//                                 "type",
//                                 e.target.value
//                               )
//                             }
//                           >
//                             <option value="adult">Adult</option>
//                             <option value="child">Child</option>
//                           </Select>
//                         </Box>
//                         {passenger?.type === "adult" && (
//                           <Box mb="30px">
//                             <FormLabel color={"gray.500"}>Title</FormLabel>
//                             <Select
//                               variant="flushed"
//                               onChange={(e) =>
//                                 handleChangePassenger(
//                                   passenger.id,
//                                   "title",
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="Mr.">Mr.</option>
//                               <option value="Mrs.">Mrs.</option>
//                             </Select>
//                           </Box>
//                         )}
//                         <Box mb="30px">
//                           <FormLabel color={"gray.500"}>Full Name</FormLabel>
//                           <Input
//                             variant="flushed"
//                             placeholder="Full name (ex. Mike Kowalski)"
//                             name="name"
//                             value={passenger?.name || ""}
//                             onChange={(e) =>
//                               handleChangePassenger(
//                                 passenger.id,
//                                 "name",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </Box>
//                         <Box mb="30px">
//                           <FormLabel color={"gray.500"}>Nationality</FormLabel>
//                           <Input
//                             variant="flushed"
//                             placeholder="United States"
//                             name="nationality"
//                             value={passenger?.nationality || ""}
//                             onChange={(e) =>
//                               handleChangePassenger(
//                                 passenger.id,
//                                 "nationality",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </Box>
//                       </FormControl>
//                     </CardFlightDetail>
//                   </AccordionPanel>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           )}
//           <Button
//             variant="ghost"
//             fontFamily="Lato"
//             onClick={handleAddPassenger}
//             w="full"
//           >
//             Add New Passenger
//           </Button>
//         </CardFlightDetail>
//       </Box>
//       <Box as="section">
//         <CardFlightDetail>
//           <Flex
//             px="28px"
//             pb="20px"
//             pt="34px"
//             alignItems="center"
//             justifyContent="space-between"
//             fontFamily="Lato"
//             borderBottom="1px solid #E6E6E6"
//           >
//             <Checkbox
//               gap={{ base: 0, md: "15px" }}
//               fontSize={{ base: "10px", md: "18px" }}
//               fontWeight="600"
//               color="black"
//               onChange={handleChangeTravelInsurance}
//               value={insurance}
//             >
//               Travel Insurance
//             </Checkbox>
//             <Text
//               fontSize={{ base: "17px", md: "18px" }}
//               fontWeight="700"
//               color="#2395FF"
//             >
//               {rupiah(data?.costs?.travel_insurance)}
//               <Text as="span" fontSize="14px" fontWeight="600" color="#6B6B6B">
//                 /pax
//               </Text>
//             </Text>
//           </Flex>
//           <Box px="28px" pb="34px" pt="20px">
//             <Text fontSize="14px" color="black">
//               Get travel compensation up to {rupiah(10000)}
//             </Text>
//           </Box>
//         </CardFlightDetail>
//       </Box>
//     </>
//   );
// };

const FlightDetails = ({
  ticket = {},
  passengers = [],
  cost = {},
  insurance = false,
}) => {
  const { isOpen: isOpenAccordion, onToggle } = useDisclosure();

  return (
    <Box mb="50px">
      <Flex alignItems="center" justifyContent="space-between" mb="25px">
        <CardFlightHeading color={{ base: "black", lg: "white" }}>
          Flight Details
        </CardFlightHeading>
      </Flex>
      <CardFlightDetail>
        <Box p="1.75rem" borderBottom="1px solid #E6E6E6">
          <Flex
            alignItems={"center"}
            gap={"12px"}
            justifyContent="space-between"
            fontFamily={"Poppins"}
          >
            <Image maxW="100px" src={ticket?.merchant_image} />
            <Text as={"p"} fontWeight={500}>
              {ticket?.merchant_name}
            </Text>
          </Flex>
          <Flex
            fontFamily={"Poppins"}
            fontSize={18}
            gap={"20px"}
            mt="1.875rem"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text fontWeight={500}>
              {ticket?.departure_city} ({ticket?.departure_country_code})
            </Text>
            {/* <Image src="/src/assets/flight.svg" /> */}

            <Box mt="4px">
              <FlightIcon />
            </Box>
            <Text fontWeight={500} align="right">
              {ticket?.arrival_city} ({ticket?.arrival_country_code})
            </Text>
          </Flex>
          <Flex
            fontFamily={"Poppins"}
            alignItems={"center"}
            justifyContent="flex-start"
            fontSize={14}
            gap={"20px"}
            mt="1.25rem"
            color={"#6B6B6B"}
          >
            <Text fontWeight={400} maxW="140px">
              {formatScheduleDate(ticket?.departure_schedule)}
            </Text>
            <Box bg={"gray.500"} h={2} w={2} borderRadius={"full"}></Box>
            <Text fontWeight={400}>
              {formatTimeFull(ticket?.departure_schedule)} -{" "}
              {formatTimeFull(ticket?.arrival_schedule)}
            </Text>
          </Flex>
          <Flex
            fontFamily="Poppins"
            gap="28px"
            justifyContent="flex-start"
            mt="1rem"
          >
            <Box>
              <Text fontSize="0.8rem" color="#A5A5A5">
                Class
              </Text>
              <Text fontSize="1rem" fontWeight="500" color="#595959">
                {ticket?.class}
              </Text>
            </Box>
            <Box>
              <Text fontSize="0.8rem" color="#A5A5A5">
                Gate
              </Text>
              <Text fontSize="1rem" fontWeight="500" color="#595959">
                {ticket?.gate}
              </Text>
            </Box>
          </Flex>
          <Box
            color={"#2395FF"}
            fontWeight={500}
            fontFamily={"Poppins"}
            mt="1.875rem"
            display="flex"
            justifyContent="space-between"
            gap="1rem"
          >
            <Flex flexDirection="column" gap="1rem">
              {ticket?.is_refund && (
                <Flex alignItems={"center"} gap={2}>
                  <CiCircleCheck color="#2395FF" size={24} />
                  <Text fontWeight={400}>Refundable</Text>
                </Flex>
              )}
              {ticket?.is_reschedule && (
                <Flex alignItems={"center"} gap={2}>
                  <CiCircleCheck color="#2395FF" size={24} />
                  <Text fontWeight={400}>Can reschedule</Text>
                </Flex>
              )}
            </Flex>
            <List
              display={{ base: "none", md: "flex" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              gap="12px"
              minW="100px"
            >
              {ticket?.is_luggage && (
                <Tooltip
                  fontFamily="Poppins"
                  label="Luggage"
                  placement="top"
                  openDelay={500}
                  bg="#979797"
                  rounded="10px"
                >
                  <ListItem color="#979797">
                    <VisuallyHidden>Luggage</VisuallyHidden>
                    <LuggageIcon />
                  </ListItem>
                </Tooltip>
              )}
              {ticket?.is_inflight_meal && (
                <Tooltip
                  fontFamily="Poppins"
                  label="Meal"
                  placement="top"
                  openDelay={500}
                  bg="#979797"
                  rounded="10px"
                >
                  <ListItem color="#979797">
                    <VisuallyHidden>Meal</VisuallyHidden>
                    <InFlightMealIcon />
                  </ListItem>
                </Tooltip>
              )}
              {ticket?.is_wifi && (
                <Tooltip
                  fontFamily="Poppins"
                  label="Wi-Fi"
                  placement="top"
                  openDelay={500}
                  bg="#979797"
                  rounded="10px"
                >
                  <ListItem color="#979797">
                    <VisuallyHidden>Wi-Fi</VisuallyHidden>
                    <WifiIcon />
                  </ListItem>
                </Tooltip>
              )}
            </List>
          </Box>
        </Box>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          fontFamily={"Poppins"}
          px="1.75rem"
          py="1.25rem"
        >
          <Text fontWeight={600} fontSize="14px">
            Total Payment
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Button
              variant={"unstyled"}
              onClick={onToggle}
              display="flex"
              alignItems="center"
              gap="1rem"
            >
              <Text fontWeight={600} fontSize="17px" color={"#2395FF"}>
                {/* $ 149,90 */}
                {rupiah(cost?.total_price)}
              </Text>
              {isOpenAccordion ? (
                <FaChevronUp color="#2395FF" size={20} />
              ) : (
                <FaChevronDown color="#2395FF" size={20} />
              )}
            </Button>
          </Flex>
        </Flex>
        <Collapse in={isOpenAccordion} animateOpacity>
          <CostDetails
            cost={cost}
            passengers={passengers}
            insurance={insurance}
            px={10}
          />
        </Collapse>
      </CardFlightDetail>
    </Box>
  );
};

const CostDetails = ({
  cost = {},
  passengers = [],
  insurance = false,
  ...props
}) => {
  return (
    <Box fontFamily={"Poppins"} {...props}>
      <Flex
        alignItems={"flex-start"}
        gap={3}
        w={"full"}
        justifyContent={"space-between"}
        color={"gray.500"}
        pr={"20px"}
      >
        <Text fontWeight={500} fontSize={14} maxW="130px">
          Ticket amount per 1 ticket
        </Text>
        <Text fontWeight={400} fontSize={14}>
          {rupiah(cost?.price)}
        </Text>
      </Flex>
      <Flex
        alignItems={"flex-start"}
        gap={3}
        w={"full"}
        justifyContent={"space-between"}
        color={"gray.500"}
        pr={"20px"}
        mt={2}
      >
        <Text fontWeight={500} fontSize={14} maxW="130px">
          Total Passenger(s)
        </Text>
        <Text fontWeight={400} fontSize={14}>
          {`${
            passengers?.filter((passenger) => passenger.type === "adult").length
          } Adult${
            passengers?.filter((passenger) => passenger.type === "adult")
              .length > 1
              ? "s"
              : ""
          }${
            passengers?.filter((passenger) => passenger.type === "child")
              .length > 0
              ? `, ${
                  passengers?.filter((passenger) => passenger.type === "child")
                    .length
                } Child`
              : ""
          }${
            passengers?.filter((passenger) => passenger.type === "child")
              .length > 1
              ? "s"
              : ""
          }`}
        </Text>
      </Flex>
      <Flex
        alignItems={"flex-start"}
        gap={3}
        w={"full"}
        justifyContent={"space-between"}
        color={"gray.500"}
        pr={"20px"}
        mt={2}
      >
        <Text fontWeight={500} fontSize={14} maxW="130px">
          Tax
        </Text>
        <Text fontWeight={400} fontSize={14}>
          {rupiah(cost?.tax)}
        </Text>
      </Flex>
      <Flex
        alignItems={"flex-start"}
        gap={3}
        w={"full"}
        justifyContent={"space-between"}
        color={"gray.500"}
        pr={"20px"}
        mt={2}
      >
        <Text fontWeight={500} fontSize={14} maxW="130px">
          Service fee
        </Text>
        <Text fontWeight={400} fontSize={14}>
          {rupiah(cost?.service_fee)}
        </Text>
      </Flex>
      {insurance && (
        <Flex
          alignItems={"flex-start"}
          gap={3}
          w={"full"}
          justifyContent={"space-between"}
          color={"gray.500"}
          pr={"20px"}
          mt={2}
        >
          <Text fontWeight={500} fontSize={14} maxW="130px">
            Travel Insurance
          </Text>
          <Text fontWeight={400} fontSize={14}>
            {rupiah(cost?.travel_insurance)}
          </Text>
        </Flex>
      )}
      <Text as={"small"} color={"red.400"} my={4} display={"inline-block"}>
        *The ticket price for both adults and childrens remains charged at 1
        ticket per seat
      </Text>
    </Box>
  );
};

export default FlightDetail;
