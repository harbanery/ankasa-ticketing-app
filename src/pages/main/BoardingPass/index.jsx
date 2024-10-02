import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Flex, Skeleton, Stack } from "@chakra-ui/react";
import Slider from "react-slick";
import CardBookingPass from "../../../components/module/CardBookingPass";
import api from "../../../services/api";

const BoardingPassPage = () => {
  let { id } = useParams();
  const [boardingPass, setBoardingPass] = useState([]);
  const cardSliderRef = useRef(null);
  const cardSettings = {
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getBookingPass = async (id) => {
    try {
      const response = await api.get(`orders/${id}`);

      setBoardingPass(response?.data?.data);
    } catch (error) {
      console.error("Error fetching booking pass data", error);
    }
  };

  useEffect(() => {
    getBookingPass(id);
  }, []);

  return (
    <Stack bg="#2395FF" py={10} overflowX="hidden">
      {boardingPass?.length > 0 ? (
        <Slider ref={cardSliderRef} {...cardSettings}>
          {boardingPass?.map((ticket, index) => (
            <CardBookingPass key={index} ticket={ticket} />
          ))}
        </Slider>
      ) : (
        <SkeletonBookingPass />
      )}
    </Stack>
  );
};

const SkeletonBookingPass = () => {
  return (
    <Flex>
      <Skeleton
        w={{ base: "", lg: "900px" }}
        maxW={{ base: "auto", lg: "900px" }}
        h={{ base: "720px", md: "450px", lg: "540px" }}
        mx="auto"
        borderRadius={20}
        px={{ base: "20px", lg: "40px" }}
        py={{ base: 5, lg: 10 }}
      />
    </Flex>
  );
};

export default BoardingPassPage;
