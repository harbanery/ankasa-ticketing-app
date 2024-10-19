export const optionToast = {
  variant: "top-accent",
  position: "top-right",
  duration: 5000,
  isClosable: true,
  containerStyle: {
    fontFamily: "Poppins",
  },
};

export const menu_lists = [
  {
    name: "Find Ticket",
    navigation: "/browse",
    required_token: false,
  },
  {
    name: "My Booking",
    navigation: "/profile/my-booking",
    required_token: true,
  },
];
