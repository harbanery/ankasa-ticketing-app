import { Box, Image, Stack } from '@chakra-ui/react';

const FlightDetailHeader = () => {
	return (
		<Stack
			bg='#2395FF'
			w={'full'}
			h='176px'
			padding={{ base: '', lg: '5px 0' }}
			borderBottomRadius={{ base: '', lg: '50px' }}
			overflow='hidden'
		>
			<Box position={'relative'}>
				<Image
					position={'absolute'}
					src='/src/assets/plane.png'
					alt='Logo'
					w={{ base: '100%', lg: '225px' }}
					h={{ base: 'auto', lg: '170px' }}
					transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
				/>
				{/* <Flex h={"170px"} px={"5%"} pt={"3%"}>
          <Text
            zIndex={1}
            color={"white"}
            fontFamily={"Poppins"}
            as={"b"}
            fontSize={24}
          >
            Contact Person Details
          </Text>
          <Spacer />
          <Flex
            h={{ base: "", lg: "40px" }}
            alignItems={"center"}
            pr={{ base: "", lg: "22%" }}
          >
            <Text
              zIndex={1}
              color={"white"}
              fontFamily={"Poppins"}
              as={"b"}
              fontSize={24}
            >
              Flight Details
            </Text>
          </Flex>
        </Flex> */}
			</Box>
		</Stack>
	);
};
export default FlightDetailHeader;
