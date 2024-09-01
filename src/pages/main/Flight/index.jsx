import {
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
	Image,
	Input,
	List,
	ListItem,
	Select,
	Stack,
	Switch,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import FlightDetailHeader from '../../../components/module/FligthDetail/Header';
import { useState } from 'react';
import { IoIosWarning } from 'react-icons/io';
import CardFlightDetail from '../../../components/module/FligthDetail/Card';
import { CiCircleCheck } from 'react-icons/ci';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
	FlightIcon,
	HamburgerIcon,
	RestroomIcon,
	StarIcon,
	WifiIcon,
} from '../../../components/base/Icons';
import garudaIndonesiaLogo from '../../../assets/garuda-indonesia-logo.png';

function CardFlightHeading({ children, ...props }) {
	return (
		<Heading fontSize='24px' fontWeight='600' {...props}>
			{children}
		</Heading>
	);
}

const FlightDetail = () => {
	const [countryCode, setCountryCode] = useState('+62');
	const { isOpen, onToggle } = useDisclosure();
	const [form, setForm] = useState({
		fullname: 'Jhon Doe',
		email: 'example@gmail.com',
		phone: '812967127',
	});
	const FORM = [
		{
			label: 'Fullname',
			onChange: '',
			value: form?.fullname,
			type: 'text',
			name: 'name',
		},
		{
			label: 'Email',
			onChange: '',
			value: form?.email,
			type: 'email',
			name: 'email',
		},
	];
	const handleChange = e => {
		if (e?.target?.name === 'phone') {
			setForm({ ...form, phone: `${countryCode} + ${e.target.value}` });
		}
		setForm({ ...form, [e?.target?.name]: e?.target?.value });
	};
	return (
		<Box bg={'gray.200'} fontFamily='Poppins' pb='35px'>
			<FlightDetailHeader />
			<Container maxW='1226px' px='28px' position='relative'>
				<Grid
					gap='25px'
					gridTemplateColumns='repeat(12, minmax(0px, 1fr))'
					alignItems='start'
				>
					<Box
						flex='1'
						mt='-120px'
						display='grid'
						gap='50px'
						flexShrink='0'
						gridColumn={{ base: '1/span 12', lg: '1/span 8' }}
					>
						<Box as='section'>
							<Box mb='25px'>
								<CardFlightHeading color='white'>
									Contact Person Details
								</CardFlightHeading>
							</Box>
							<CardFlightDetail px={10} py={8}>
								<FormControl spacing={3} fontFamily={'Lato'} isRequired>
									{FORM?.map((item, i) => (
										<Box key={i} mb={5}>
											<FormLabel color={'gray.500'}>{item?.label}</FormLabel>
											<Input
												variant='flushed'
												value={item?.value}
												focusBorderColor='gray.400'
												type={item?.type}
												name={item?.name}
												onChange={e => handleChange(e)}
											/>
										</Box>
									))}
									<Flex
										alignItems={'end'}
										gap={3}
										borderBottom={'1px solid'}
										borderColor={'gray.400'}
									>
										<Box>
											<FormLabel color={'gray.500'}>Phone</FormLabel>
											<Select
												variant='flushed'
												w={70}
												fontSize={14}
												focusBorderColor='transparent'
												onChange={e => setCountryCode(e.target.value)}
											>
												<option value='+62'>+62</option>
												<option value='+63'>+63</option>
												<option value='+64'>+64</option>
											</Select>
										</Box>
										<Stack h={8} w={'2px'} bg={'gray.300'}></Stack>
										<Input
											py={2}
											variant='unstyled'
											placeholder='Phone number'
											focusBorderColor='transparent'
											type='text'
											border={'none'}
											borderColor='transparent'
											value={form?.phone}
											name='phone'
											onChange={e => handleChange(e)}
										/>
									</Flex>
								</FormControl>
								<Flex
									bg={'red.100'}
									w={'full'}
									py={4}
									px={10}
									mt={5}
									borderRadius={10}
									gap={5}
								>
									<IoIosWarning color='red' size={25} />
									<Text as='p'>Make sure the customer data is correct.</Text>
								</Flex>
							</CardFlightDetail>
						</Box>
						<Box as='section'>
							<Box mb='25px'>
								<CardFlightHeading color='black'>
									Passenger Details
								</CardFlightHeading>
							</Box>
							<CardFlightDetail px={10} py={8}>
								<Flex
									alignItems='center'
									justifyContent='space-between'
									mb='30px'
									rounded='10px'
									px='28px'
									py='12px'
									bgColor='#2395FF1A'
									fontFamily='Lato'
									color='#595959'
								>
									<Text>Passenger: 1 Adult</Text>
									<Flex alignItems='center' gap='15px'>
										<FormLabel htmlFor='same_as_contact_person' mb='0'>
											Same as contact person
										</FormLabel>
										<Switch id='same_as_contact_person' />
									</Flex>
								</Flex>
								<FormControl spacing={3} fontFamily={'Lato'} isRequired>
									<Box mb='30px'>
										<FormLabel color={'gray.500'}>Title</FormLabel>
										<Select variant='flushed'>
											<option value='mr'>Mr.</option>
											<option value='mrs'>Mrs.</option>
										</Select>
									</Box>
									<Box mb='30px'>
										<FormLabel>Full Name</FormLabel>
										<Input variant='flushed' placeholder='Mike Kowalski' />
									</Box>
									<Box>
										<FormLabel color={'gray.500'}>Nationality</FormLabel>
										<Select variant='flushed'>
											<option value='mr'>Indonesia</option>
											<option value='mrs'>Malaysia</option>
											<option value='mrs'>Belanda</option>
											<option value='mrs'>Jepang</option>
										</Select>
									</Box>
								</FormControl>
							</CardFlightDetail>
						</Box>
						<Box as='section'>
							<Box mb='25px'>
								<CardFlightHeading color='black'>
									Passenger Details
								</CardFlightHeading>
							</Box>
							<CardFlightDetail>
								<Flex
									px='28px'
									pb='20px'
									pt='34px'
									alignItems='center'
									justifyContent='space-between'
									fontFamily='Lato'
									borderBottom='1px solid #E6E6E6'
								>
									<Checkbox
										gap='15px'
										fontSize='18px'
										fontWeight='600'
										color='black'
									>
										Travel Insurance
									</Checkbox>
									<Text fontSize='18px' fontWeight='700' color='#2395FF'>
										$ 2,00
										<Text
											as='span'
											fontSize='14px'
											fontWeight='600'
											color='#6B6B6B'
										>
											/pax
										</Text>
									</Text>
								</Flex>
								<Box px='28px' pb='34px' pt='20px'>
									<Text fontSize='14px' color='black'>
										Get travel compensation up to $ 10.000,00
									</Text>
								</Box>
							</CardFlightDetail>
						</Box>
						<Flex
							alignItems='center'
							justifyContent='center'
							display={{ base: 'none', lg: 'flex' }}
						>
							<Button
								type='button'
								colorScheme='blue'
								py='28px'
								px='60px'
								fontSize='18px'
								fontWeight='700'
								color='white'
								boxShadow='0px 8px 10px 0px #2395FF4D'
							>
								Proceed to Payment
							</Button>
						</Flex>
					</Box>
					<Box
						mt={{ base: '0px', lg: '-120px' }}
						display={{ base: 'none', lg: 'grid' }}
						gridColumn={{ base: '1/span 12', lg: '9/span 4' }}
					>
						<Box mb='50px'>
							<Flex
								alignItems='center'
								justifyContent='space-between'
								mb='25px'
							>
								<CardFlightHeading color={{ base: 'black', lg: 'white' }}>
									Flight Details
								</CardFlightHeading>
							</Flex>
							<CardFlightDetail>
								<Box p='1.75rem' borderBottom='1px solid #E6E6E6'>
									<Flex
										alignItems={'center'}
										gap={'12px'}
										justifyContent='space-between'
										fontFamily={'Poppins'}
									>
										<Image src='/src/assets/garuda_indonesia.png' />
										<Text as={'p'} fontWeight={500}>
											Garuda Indonesia
										</Text>
									</Flex>
									<Flex
										fontFamily={'Poppins'}
										fontSize={18}
										gap={'20px'}
										mt='1.875rem'
										alignItems='center'
										justifyContent='space-between'
									>
										<Text fontWeight={500}>Medan (IDN) </Text>
										<Image src='/src/assets/flight.svg' />
										<Text fontWeight={500}>Medan (IDN) </Text>
									</Flex>
									<Flex
										fontFamily={'Poppins'}
										alignItems={'center'}
										justifyContent='space-between'
										fontSize={14}
										gap={'20px'}
										mt='1.25rem'
										color={'#6B6B6B'}
									>
										<Text fontWeight={400}>Sunday, 15 August 2020 </Text>
										<Box
											bg={'gray.500'}
											h={2}
											w={2}
											borderRadius={'full'}
										></Box>
										<Text fontWeight={400}>12:33 - 15:21</Text>
									</Flex>
									<Box
										color={'#2395FF'}
										fontWeight={500}
										fontFamily={'Poppins'}
										mt='1.875rem'
										display='grid'
										gap='1rem'
									>
										<Flex alignItems={'center'} gap={2}>
											<CiCircleCheck color='#2395FF' size={24} />
											<Text fontWeight={400}>Refundable</Text>
										</Flex>
										<Flex alignItems={'center'} gap={2}>
											<CiCircleCheck color='#2395FF' size={24} />
											<Text fontWeight={400}>Can reschedule</Text>
										</Flex>
									</Box>
								</Box>
								<Flex
									alignItems={'center'}
									justifyContent={'space-between'}
									fontFamily={'Poppins'}
									px='1.75rem'
									py='1.25rem'
								>
									<Text fontWeight={600} fontSize='1.125rem'>
										Total Payment
									</Text>
									<Flex alignItems={'center'} gap={2}>
										<Button
											variant={'unstyled'}
											onClick={onToggle}
											display='flex'
											alignItems='center'
											gap='1rem'
										>
											<Text
												fontWeight={600}
												fontSize='1.5rem'
												color={'#2395FF'}
											>
												$ 149,90
											</Text>
											{isOpen ? (
												<FaChevronUp color='#2395FF' size={20} />
											) : (
												<FaChevronDown color='#2395FF' size={20} />
											)}
										</Button>
									</Flex>
								</Flex>
								<Collapse in={isOpen} animateOpacity>
									<Box px={10} fontFamily={'Poppins'}>
										<Flex
											alignItems={'center'}
											gap={3}
											w={'full'}
											justifyContent={'space-between'}
											color={'gray.500'}
											pr={'20px'}
										>
											<Text fontWeight={400} fontSize={16}>
												Ticket amount per 1 ticket
											</Text>
											<Text fontWeight={400} fontSize={14}>
												$ 72,50
											</Text>
										</Flex>
										<Flex
											alignItems={'center'}
											gap={3}
											w={'full'}
											justifyContent={'space-between'}
											color={'gray.500'}
											pr={'20px'}
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
											alignItems={'center'}
											gap={3}
											w={'full'}
											justifyContent={'space-between'}
											color={'gray.500'}
											pr={'20px'}
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
											alignItems={'center'}
											gap={3}
											w={'full'}
											justifyContent={'space-between'}
											color={'gray.500'}
											pr={'20px'}
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
											as={'small'}
											color={'red.400'}
											mt={4}
											display={'inline-block'}
										>
											*The ticket price for both adults and childrens remains
											charged at 1 ticket per seat
										</Text>
									</Box>
								</Collapse>
							</CardFlightDetail>
						</Box>
						{/* ui buat seat */}
					</Box>
					<Box display={{ base: 'block', lg: 'none' }} gridColumn='1/-1'>
						<Flex
							alignItems='center'
							justifyContent='space-between'
							color='black'
							fontWeight='600'
							mb='2rem'
						>
							<Heading fontSize='1.125rem'>Flight Details</Heading>
							<Text fontSize='1rem'>View Details</Text>
						</Flex>
						<Box bgColor='white' rounded='0.5rem' overflow='hidden'>
							<Box px='1.25rem' py='2.5rem' borderBottom='1px solid #E6E6E6'>
								<Flex justifyContent='space-between' mb='1.5rem'>
									<Box>
										<Text fontSize='1.75rem' fontWeight='500' color='black'>
											IDN
										</Text>
										<Text fontSize='0.75rem' color='#6B6B6B'>
											12:33
										</Text>
									</Box>
									<Box mt='0.75rem'>
										<FlightIcon />
									</Box>
									<Box textAlign='right'>
										<Text fontSize='1.75rem' fontWeight='500' color='black'>
											JPN
										</Text>
										<Text fontSize='0.75rem' color='#6B6B6B'>
											12:33
										</Text>
									</Box>
								</Flex>
								<Flex
									alignItems='center'
									justifyContent='space-between'
									mb='1.875rem'
								>
									<Box>
										<Image src={garudaIndonesiaLogo} alt='Garuda Indonesia' />
									</Box>
									<Box>
										<Flex alignItems='center' gap='0.375rem' mb='0.75rem'>
											<StarIcon />
											<StarIcon />
											<StarIcon />
											<StarIcon />
											<StarIcon />
										</Flex>
										<Text>120k review</Text>
									</Box>
								</Flex>
								<Flex gap='20px' justifyContent='space-between'>
									<Box fontFamily='Lato'>
										<Text fontSize='0.75rem' color='#A5A5A5'>
											Code
										</Text>
										<Text fontSize='0.875rem' fontWeight='500' color='#595959'>
											AB-221
										</Text>
									</Box>
									<Box fontFamily='Lato'>
										<Text fontSize='0.75rem' color='#A5A5A5'>
											Class
										</Text>
										<Text fontSize='0.875rem' fontWeight='500' color='#595959'>
											Economy
										</Text>
									</Box>
									<Box fontFamily='Lato'>
										<Text fontSize='0.75rem' color='#A5A5A5'>
											Terminal
										</Text>
										<Text fontSize='0.875rem' fontWeight='500' color='#595959'>
											A
										</Text>
									</Box>
									<Box fontFamily='Lato'>
										<Text fontSize='0.75rem' color='#A5A5A5'>
											Gate
										</Text>
										<Text fontSize='0.875rem' fontWeight='500' color='#595959'>
											221
										</Text>
									</Box>
								</Flex>
							</Box>
							<Box
								px='1.25rem'
								pt='1.25rem'
								pb='1.875rem'
								shadow='0px 8px 27px 0px #0E3F6C30'
							>
								<Flex alignItems='center' justifyContent='space-between'>
									<Flex alignItems='center' gap='16px'>
										<Text
											as='span'
											fontWeight='700'
											fontSize='1.125rem'
											w='36px'
											aspectRatio='1/1'
											color='#2395FF'
											bgColor='#2395FF2E'
											rounded='100%'
											display='flex'
											alignItems='center'
											justifyContent='center'
										>
											2
										</Text>
										<Text fontSize='0.875rem' color='#979797'>
											Child
										</Text>
									</Flex>
									<Flex alignItems='center' gap='16px'>
										<Text
											as='span'
											fontWeight='700'
											fontSize='1.125rem'
											w='36px'
											aspectRatio='1/1'
											color='#2395FF'
											bgColor='#2395FF2E'
											rounded='100%'
											display='flex'
											alignItems='center'
											justifyContent='center'
										>
											4
										</Text>
										<Text fontSize='0.875rem' color='#979797'>
											Adult
										</Text>
									</Flex>
								</Flex>
							</Box>
						</Box>
					</Box>
					<Box
						display={{ base: 'block', lg: 'none' }}
						gridColumn='1/-1'
						mb='40px'
					>
						<Box mb='0.75rem'>
							<Heading fontSize='0.875rem' fontWeight='600'>
								Facilities
							</Heading>
						</Box>
						<List
							display='flex'
							alignItems='center'
							gap='0.75rem'
							flexWrap='wrap'
						>
							<ListItem
								px='1.25rem'
								py='1rem'
								bgColor='#6DDA6B'
								rounded='0.625rem'
								display='flex'
								alignItems='center'
								gap='20px'
								color='white'
							>
								<HamburgerIcon />
								<Text fontSize='0.875rem' fontWeight='600'>
									Snack
								</Text>
							</ListItem>
							<ListItem
								px='1.25rem'
								py='1rem'
								bgColor='#7861D7'
								rounded='0.625rem'
								display='flex'
								alignItems='center'
								gap='20px'
								color='white'
							>
								<WifiIcon />
								<Text fontSize='0.875rem' fontWeight='600'>
									Snack
								</Text>
							</ListItem>
							<ListItem
								px='1.25rem'
								py='1rem'
								bgColor='#E45D32'
								rounded='0.625rem'
								display='flex'
								alignItems='center'
								gap='20px'
								color='white'
							>
								<RestroomIcon />
								<Text fontSize='0.875rem' fontWeight='600'>
									Snack
								</Text>
							</ListItem>
						</List>
					</Box>
					<Box display={{ base: 'block', lg: 'none' }} gridColumn='1/-1'>
						<Flex alignItems='center' justifyContent='space-between' mb='30px'>
							<Text fontSize='0.875rem' fontWeight='500' color='#6B6B6B'>
								Total you'll pay
							</Text>
							<Text fontSize='1.5rem' fontWeight='600' color='#2395FF'>
								$ 145,00
							</Text>
						</Flex>
						<Flex>
							<Button
								type='submit'
								colorScheme='blue'
								py='28px'
								px='60px'
								fontSize='18px'
								fontWeight='700'
								color='white'
								boxShadow='0px 8px 10px 0px #2395FF4D'
								width='100%'
							>
								Book Flight
							</Button>
						</Flex>
					</Box>
				</Grid>
			</Container>
		</Box>
	);
};
export default FlightDetail;
