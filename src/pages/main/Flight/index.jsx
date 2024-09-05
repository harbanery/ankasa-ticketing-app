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
      },
    ],
    costs: {
      price: 0,
      tax: 0,
      service_fee: 0,
      travel_insurance: 0,
      total_price: 0,
    },
    selected_seats: [],
  });

  const [passengerIdCounter, setPassengerIdCounter] = useState(2);
  const [insurance, setInsurance] = useState(false);
  //   const [countryCode, setCountryCode] = useState("+62");
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
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

  const getCosts = () => {
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
      costs: {
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
      getCosts();
    }
  }, [data.ticket, data.passengers.length, insurance]);

  console.log(data?.ticket);
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
                            <Flex mb="20px" justifyContent="flex-end">
                              <Button
                                variant="solid"
                                size="sm"
                                colorScheme="red"
                                onClick={() =>
                                  handleRemovePassenger(passenger.id)
                                }
                              >
                                <FaTrashAlt />
                              </Button>
                            </Flex>
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
                    {rupiah(data?.costs?.travel_insurance)}
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
              cost={data?.costs}
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
              <CardFlightDetail w="full" p="12px">
                <Flex justifyContent="flex-end" alignItems="center">
                  {/* <Stack alignItems="center">
                    <Text fontSize={22} fontWeight={600} mr={5}>
                      1
                    </Text>
                    <Text fontSize={22} fontWeight={600} mr={5}>
                      2
                    </Text>
                  </Stack> */}
                  <Box
                    maxW="85%"
                    w="auto"
                    p="12px"
                    bg="white"
                    borderLeft="4px solid #C4C4C4"
                    borderRight="4px solid #C4C4C4"
                  >
                    <SeatsFlight
                      count_row={data?.ticket?.row_seats}
                      seats={data?.ticket?.seats}
                    />
                    {/* <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                      {data?.ticket?.seats?.map((seat, index) => (
                        <Tooltip
                          key={seat?.id}
                          fontFamily="Poppins"
                          label={seat?.code}
                          placement="top"
                          openDelay={200}
                          bg="#979797"
                          rounded="10px"
                        >
                          <IconButton
                            aria-label="Seat"
                            icon={<PiArmchairDuotone size={40} />}
                            variant="unstyled"
                            color={"#6B6B6B"}
                            _focus={{ boxShadow: "none" }}
                            _hover={{
                              color: "#2395FF",
                            }}
                          />
                        </Tooltip>
                      ))}
                      <Tooltip
                        fontFamily="Poppins"
                        label="Seat: 1-B"
                        placement="top"
                        openDelay={200}
                        bg="#979797"
                        rounded="10px"
                        isDisabled
                      >
                        <IconButton
                          aria-label="Seat"
                          icon={<PiArmchairDuotone size={40} />}
                          variant="unstyled"
                          color={"#C4C4C4"}
                          _focus={{ boxShadow: "none" }}
                          disabled
                        />
                      </Tooltip>
                      <Stack />
                      <IconButton
                        aria-label="Seat"
                        icon={<PiArmchairDuotone size={40} />}
                        variant="unstyled"
                        color={"#C4C4C4"}
                        _focus={{ boxShadow: "none" }}
                      />
                      <IconButton
                        aria-label="Seat"
                        icon={<PiArmchairDuotone size={40} />}
                        variant="unstyled"
                        color={"#C4C4C4"}
                        _focus={{ boxShadow: "none" }}
                      />
                    </Grid>
                    <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                      <Tooltip
                        fontFamily="Poppins"
                        label="Seat: 2-A"
                        placement="top"
                        openDelay={200}
                        bg="#979797"
                        rounded="10px"
                      >
                        <IconButton
                          aria-label="Seat"
                          icon={<PiArmchairDuotone size={40} />}
                          variant="unstyled"
                          color={"#C4C4C4"}
                          _focus={{ boxShadow: "none" }}
                        />
                      </Tooltip>
                      <Tooltip
                        fontFamily="Poppins"
                        label="Seat: 2-B"
                        placement="top"
                        openDelay={200}
                        bg="#979797"
                        rounded="10px"
                      >
                        <IconButton
                          aria-label="Seat"
                          icon={<PiArmchairDuotone size={40} />}
                          variant="unstyled"
                          color={"#C4C4C4"}
                          _focus={{ boxShadow: "none" }}
                        />
                      </Tooltip>
                      <Stack _focus={{ boxShadow: "none" }} />
                      <IconButton
                        aria-label="Seat"
                        icon={<PiArmchairDuotone size={40} />}
                        variant="unstyled"
                        color={"#C4C4C4"}
                        _focus={{ boxShadow: "none" }}
                      />
                      <IconButton
                        aria-label="Seat"
                        icon={<PiArmchairDuotone size={40} />}
                        variant="unstyled"
                        color={"#C4C4C4"}
                        _focus={{ boxShadow: "none" }}
                      />
                    </Grid> */}
                  </Box>
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
                pointerEvents="auto"
                onClick={onOpenModal}
                fontSize={{ base: "1rem", md: "22px" }}
              >
                View Details
              </Text>
              <ModalFlight
                isOpen={isOpenModal}
                onClose={onCloseModal}
                cost={data?.costs}
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
                {rupiah(data?.costs?.total_price)}
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

const SeatsFlight = ({ count_row = 0, seats = [] }) => {
  // Function to split seats into rows and add spacing
  const arrangeSeats = (seats) => {
    const rows = [];
    const seatsPerRow = count_row; // You can adjust this for different numbers per row
    for (let i = 0; i < seats.length; i += seatsPerRow) {
      const rowSeats = seats.slice(i, i + seatsPerRow);
      console.log(`count_row = ${count_row} & rowseats = ${rowSeats.length}`);
      if (rowSeats.length == 4) {
        // Add a space in the middle if there are more than 2 seats in the row
        rows.push([rowSeats[0], rowSeats[1], null, rowSeats[2], rowSeats[3]]);
      } else if (rowSeats.length === 5) {
        // No space needed for rows with 2 seats or less
        rows.push([
          rowSeats[0],
          rowSeats[1],
          null,
          rowSeats[2],
          rowSeats[3],
          rowSeats[4],
        ]);
      } else if (rowSeats.length === 6) {
        // No space needed for rows with 2 seats or less
        rows.push([
          rowSeats[0],
          rowSeats[1],
          rowSeats[2],
          null,
          rowSeats[3],
          rowSeats[4],
          rowSeats[5],
        ]);
      } else if (rowSeats.length === 7) {
        // No space needed for rows with 2 seats or less
        rows.push([
          rowSeats[0],
          rowSeats[1],
          null,
          rowSeats[2],
          rowSeats[3],
          rowSeats[4],
          null,
          rowSeats[5],
          rowSeats[6],
        ]);
      } else if (rowSeats.length === 8) {
        // No space needed for rows with 2 seats or less
        rows.push([
          rowSeats[0],
          rowSeats[1],
          null,
          rowSeats[2],
          rowSeats[3],
          rowSeats[4],
          null,
          rowSeats[5],
          rowSeats[6],
          rowSeats[7],
        ]);
      } else if (rowSeats.length === 9) {
        // No space needed for rows with 2 seats or less
        rows.push([
          rowSeats[0],
          rowSeats[1],
          rowSeats[2],
          null,
          rowSeats[3],
          rowSeats[4],
          rowSeats[5],
          null,
          rowSeats[6],
          rowSeats[7],
          rowSeats[8],
        ]);
      } else if (rowSeats.length === 10) {
        // No space needed for rows with 2 seats or less
        rows.push([
          rowSeats[0],
          rowSeats[1],
          rowSeats[2],
          null,
          rowSeats[3],
          rowSeats[4],
          rowSeats[5],
          rowSeats[6],
          null,
          rowSeats[7],
          rowSeats[8],
          rowSeats[9],
        ]);
      } else {
        // No space needed for rows with 2 seats or less
        rows.push(rowSeats);
      }
    }
    return rows;
  };

  // Determine icon size dynamically based on the seat length for responsiveness
  const getIconSize = (length) => {
    if (length <= 4) return 40;
    if (length <= 6) return 30;
    return 20; // Default small size for larger seat arrays
  };

  const seatRows = arrangeSeats(seats);

  return (
    <Box w="full" p="12px" maxH="385px" overflowY="auto">
      {seatRows.map((row, rowIndex) => (
        <Grid
          key={rowIndex}
          templateColumns={`repeat(${
            count_row < 4
              ? count_row
              : count_row <= 6
              ? count_row + 1
              : count_row <= 10
              ? count_row + 2
              : 4
          }, 1fr)`} // 5 columns per row: 2 seats, 1 space, 2 seats
          gap={2}
          mb={4} // Margin between rows
        >
          {row.map((seat, seatIndex) =>
            seat ? (
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
                  icon={<PiArmchairDuotone size={20} />}
                  w="20px"
                  variant="unstyled"
                  color={"#6B6B6B"}
                  _focus={{ boxShadow: "none" }}
                  _hover={{
                    color: "#2395FF",
                  }}
                />
              </Tooltip>
            ) : (
              <Stack key={seatIndex} /> // Render empty space for null seats
            )
          )}
        </Grid>
      ))}
    </Box>
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
