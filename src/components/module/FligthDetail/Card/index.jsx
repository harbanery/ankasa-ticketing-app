import { Box } from '@chakra-ui/react';

const CardFlightDetail = ({ children, ...props }) => {
	return (
		<Box bg={'white'} borderRadius={15} {...props}>
			{children}
		</Box>
	);
};
export default CardFlightDetail;
