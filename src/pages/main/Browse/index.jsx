import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Container,
	Flex,
	Grid,
	GridItem,
	HStack,
	Image,
	Link as ChakraLink,
	List,
	ListItem,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	StackDivider,
	Text,
	VisuallyHidden,
	VStack,
} from '@chakra-ui/react';
// import { Link as ReactRouterLink } from 'react-router-dom';
import {
	FilterIcon,
	FlighIcon,
	InFlightMealIcon,
	LuggageIcon,
	WifiIcon,
} from '../../../components/base/Icons';
import planeIcon from '../../../assets/plane-icon.svg';
import garudaIndonesiaLogo from '../../../assets/garuda-indonesia-logo.png';
import airAsiaLogo from '../../../assets/air-asia-logo.png';
import lionAirLogo from '../../../assets/lion-air-logo.png';

function SearchDestinationItem({ label, destination, textAlign }) {
	return (
		<Flex flexDir='column' gap='8px'>
			<Text fontSize={{ base: '10px', md: '12px' }} textAlign={textAlign}>
				{label}
			</Text>
			<Text fontSize={{ base: '14px', md: '16px' }} fontWeight='600'>
				{destination}
			</Text>
		</Flex>
	);
}

function SearchDestination() {
	return (
		<Flex alignItems='center' justifyContent='space-between' gap='24px'>
			<SearchDestinationItem
				destination='Medan (IDN)'
				label='From'
				textAlign='left'
			/>
			<Button colorScheme='#2395FF' variant='ghost'>
				<VisuallyHidden>Reverse</VisuallyHidden>
				<svg
					width='17'
					height='17'
					viewBox='0 0 17 17'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M16.6888 4.69033L13.8123 7.56688C13.6048 7.77437 13.3329 7.8781 13.0609 7.8781C12.789 7.8781 12.5171 7.77437 12.3096 7.56688C11.8947 7.15194 11.8947 6.47922 12.3096 6.06428L13.3724 5.00154H2.23291C1.64611 5.00154 1.17041 4.52584 1.17041 3.93904C1.17041 3.35225 1.64611 2.87654 2.23291 2.87654H13.3724L12.3096 1.81381C11.8947 1.39887 11.8947 0.726144 12.3096 0.311205C12.7246 -0.103735 13.3973 -0.103735 13.8123 0.311205L16.6888 3.18776C17.1037 3.60266 17.1037 4.27542 16.6888 4.69033ZM14.186 11.9984H3.62761L4.69037 10.9357C5.10528 10.5208 5.10528 9.84804 4.69037 9.4331C4.2754 9.01816 3.60271 9.01816 3.18773 9.4331L0.31118 12.3097C-0.103727 12.7246 -0.103727 13.3973 0.31118 13.8123L3.18773 16.6888C3.39522 16.8963 3.66712 17 3.93905 17C4.21099 17 4.48289 16.8963 4.69037 16.6888C5.10528 16.2739 5.10528 15.6011 4.69037 15.1862L3.62761 14.1235H14.186C14.7728 14.1235 15.2485 13.6478 15.2485 13.061C15.2485 12.4742 14.7728 11.9984 14.186 11.9984Z'
						fill='white'
					/>
				</svg>
			</Button>
			<SearchDestinationItem
				destination='Tokyo (JPN)'
				label='To'
				textAlign='right'
			/>
		</Flex>
	);
}

function SearchDetailItem({ detail }) {
	return (
		<Box as='li'>
			<Text
				fontSize={{ base: '10px', md: '12px' }}
				fontWeight='300'
				textTransform='capitalize'
			>
				{detail}
			</Text>
		</Box>
	);
}

function SearchDetail() {
	return (
		<HStack
			as='ul'
			divider={<StackDivider borderColor='gray.200' />}
			spacing={4}
			listStyleType='none'
		>
			<SearchDetailItem detail='Monday, 20 July 20' />
			<SearchDetailItem detail='6 Passenger' />
			<SearchDetailItem detail='Economy' />
		</HStack>
	);
}

function SearchHeader() {
	return (
		<Box
			backgroundColor='#2395FF'
			color='#FFF'
			bgImage={planeIcon}
			bgRepeat='no-repeat'
			bgPosition='bottom left'
			borderBottomLeftRadius='30px'
			borderBottomRightRadius='30px'
		>
			<Container maxW='1226px' px='28px'>
				<Flex
					flexDir={{ base: 'column', md: 'row' }}
					justifyContent={{ md: 'space-between' }}
					gap='24px'
					py={{ base: '24px', md: '54px' }}
				>
					<Flex alignItems='center' gap='20px'>
						<Box display={{ base: 'none', md: 'block' }}>
							<svg
								width='50'
								height='35'
								viewBox='0 0 50 35'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden
							>
								<path
									d='M6.29307 32.9371C6.78369 33.6656 7.47274 34.0788 8.19382 34.0777L18.3921 34.0586C19.1969 34.0571 19.9901 33.7973 20.7076 33.3003L43.4385 17.576C45.5275 16.1308 47.4001 14.068 48.6743 11.3661C50.1047 8.3331 50.2602 6.1382 49.6954 4.5876C49.1321 3.03594 47.7626 1.89642 45.1447 1.66425C42.8127 1.45765 40.4932 2.29472 38.4042 3.73882L30.7082 9.06261L13.6226 0.323454C13.4172 0.134803 13.1785 0.0243769 12.9313 0.00359444C12.6841 -0.017188 12.4373 0.052427 12.2164 0.205242L7.07978 3.75905C6.2462 4.3352 6.04464 5.85172 6.67588 6.79742L18.8803 17.2448L10.8172 22.8231L5.16497 18.9392C4.97023 18.8053 4.75514 18.7358 4.53706 18.7361C4.31898 18.7365 4.10401 18.8068 3.90952 18.9413L0.774426 21.1106C-0.0411833 21.6751 -0.256023 23.1469 0.339278 24.1011L6.29307 32.9371Z'
									fill='white'
								/>
							</svg>
						</Box>
						<Flex flexDir='column' gap='12px' flex='1'>
							<SearchDestination />
							<SearchDetail />
						</Flex>
					</Flex>
					<Box>
						<Button>Close</Button>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}

const FLIGHTS = [
	{
		id: 1,
		name: 'Garuda Indonesia',
		logo: {
			src: garudaIndonesiaLogo,
			alt: 'Garuda Indonesia',
		},
		from: {
			country_code: 'IDN',
			time: '12:33',
		},
		to: {
			country_code: 'JPN',
			time: '15:21',
		},
		estimation_time: '3 hours 11 minutes',
		price: '$ 214,00',
		facilities: [
			{ label: 'Luggage', icon: <LuggageIcon /> },
			{ label: 'In-flight Meal', icon: <InFlightMealIcon /> },
			{ label: 'Wifi', icon: <WifiIcon /> },
		],
	},
	{
		id: 2,
		name: 'Air Asia',
		logo: {
			src: airAsiaLogo,
			alt: 'Air Asia',
		},
		from: {
			country_code: 'IDN',
			time: '12:33',
		},
		to: {
			country_code: 'JPN',
			time: '15:21',
		},
		estimation_time: '3 hours 11 minutes',
		price: '$ 214,00',
		facilities: [
			{ label: 'Luggage', icon: <LuggageIcon /> },
			{ label: 'In-flight Meal', icon: <InFlightMealIcon /> },
			{ label: 'Wifi', icon: <WifiIcon /> },
		],
	},
	{
		id: 3,
		name: 'Lion Air',
		logo: {
			src: lionAirLogo,
			alt: 'Lion Air',
		},
		from: {
			country_code: 'IDN',
			time: '12:33',
		},
		to: {
			country_code: 'JPN',
			time: '15:21',
		},
		estimation_time: '3 hours 11 minutes',
		price: '$ 214,00',
		facilities: [
			{ label: 'Luggage', icon: <LuggageIcon /> },
			{ label: 'In-flight Meal', icon: <InFlightMealIcon /> },
			{ label: 'Wifi', icon: <WifiIcon /> },
		],
	},
	{
		id: 4,
		name: 'Garuda Indonesia',
		logo: {
			src: garudaIndonesiaLogo,
			alt: 'Garuda Indonesia',
		},
		from: {
			country_code: 'IDN',
			time: '12:33',
		},
		to: {
			country_code: 'JPN',
			time: '15:21',
		},
		estimation_time: '3 hours 11 minutes',
		price: '$ 214,00',
		facilities: [
			{ label: 'Luggage', icon: <LuggageIcon /> },
			{ label: 'In-flight Meal', icon: <InFlightMealIcon /> },
			{ label: 'Wifi', icon: <WifiIcon /> },
		],
	},
	{
		id: 5,
		name: 'Air Asia',
		logo: {
			src: airAsiaLogo,
			alt: 'Air Asia',
		},
		from: {
			country_code: 'IDN',
			time: '12:33',
		},
		to: {
			country_code: 'JPN',
			time: '15:21',
		},
		estimation_time: '3 hours 11 minutes',
		price: '$ 214,00',
		facilities: [
			{ label: 'Luggage', icon: <LuggageIcon /> },
			{ label: 'In-flight Meal', icon: <InFlightMealIcon /> },
			{ label: 'Wifi', icon: <WifiIcon /> },
		],
	},
	{
		id: 6,
		name: 'Lion Air',
		logo: {
			src: lionAirLogo,
			alt: 'Lion Air',
		},
		from: {
			country_code: 'IDN',
			time: '12:33',
		},
		to: {
			country_code: 'JPN',
			time: '15:21',
		},
		estimation_time: '3 hours 11 minutes',
		price: '$ 214,00',
		facilities: [
			{ label: 'Luggage', icon: <LuggageIcon /> },
			{ label: 'In-flight Meal', icon: <InFlightMealIcon /> },
			{ label: 'Wifi', icon: <WifiIcon /> },
		],
	},
];

function ViewDetails() {
	return (
		<Accordion color='#2395FF' allowToggle>
			<AccordionItem border='0px'>
				<h3>
					<AccordionButton gap='16px' fontWeight='600' px='4px'>
						<Text as='span'>View Details</Text>
						<AccordionIcon />
					</AccordionButton>
				</h3>
				<AccordionPanel bgColor='white'>
					<List display='grid' gap='8px'>
						<ListItem>Refundable</ListItem>
						<ListItem>Can reschedule</ListItem>
					</List>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

function FlightCard({ flight }) {
	const { facilities, price } = flight;
	return (
		<GridItem
			as='li'
			bgColor='white'
			rounded={{ base: 'unset', md: '15px' }}
			overflow='hidden'
			borderBottom={{ base: '1px solid #E6E6E6', md: 'unset' }}
			px={{ base: 'unset', md: '28px' }}
			py={{ base: '10px', md: '28px' }}
			display='flex'
			flexDir='column'
			alignItems={{ md: 'flex-start' }}
			position='relative'
		>
			<Flex alignItems='center' gap='30px' mb={{ base: '20px', md: '30px' }}>
				<Image
					src={garudaIndonesiaLogo}
					alt='Garuda Indonesia'
					display={{ base: 'none', md: 'block' }}
				/>
				<Text color='#595959' fontWeight='500'>
					Garuda Indonesia
				</Text>
			</Flex>
			<Box flex='1' w='100%' mb={{ base: '10px', md: '20px' }}>
				<Flex alignItems='center' justifyContent='space-between' mb='12px'>
					<Box>
						<Text
							fontSize='24px'
							color='black'
							fontWeight='500'
							lineHeight='1'
							mb='4px'
						>
							IDN
						</Text>
						<Text fontSize='14px' color='#6B6B6B'>
							12:33
						</Text>
					</Box>
					<Box mt='4px'>
						<FlighIcon />
					</Box>
					<Box>
						<Text
							fontSize='24px'
							color='black'
							fontWeight='500'
							lineHeight='1'
							mb='4px'
						>
							IDN
						</Text>
						<Text fontSize='14px' color='#6B6B6B'>
							12:33
						</Text>
					</Box>
					<Flex
						flexDir='column'
						alignItems='center'
						display={{ base: 'none', md: 'flex' }}
					>
						<Text fontSize='16px' color='#595959'>
							3 hours 11 minutes
						</Text>
						<Text fontSize='12px' color='#6B6B6B'>
							(1 Transit)
						</Text>
					</Flex>
					<List
						display={{ base: 'none', md: 'flex' }}
						alignItems='center'
						gap='10px'
					>
						{facilities.map(({ label, icon }) => {
							return (
								<ListItem key={label}>
									<VisuallyHidden>{label}</VisuallyHidden>
									{icon}
								</ListItem>
							);
						})}
					</List>
					<Flex align='center' gap='4px'>
						<Text fontSize='16px' fontWeight='500' color='#2395FF'>
							{price}
						</Text>
						<Text as='span' fontSize='14px' fontWeight='500' color='#6B6B6B'>
							/pax
						</Text>
					</Flex>
					<Box display={{ base: 'none', md: 'block' }}>
						<ChakraLink variant='blue'>Select</ChakraLink>
					</Box>
				</Flex>
			</Box>
			<Box display={{ base: 'none', md: 'block' }}>
				<ViewDetails />
			</Box>
		</GridItem>
	);
}

function FlighList() {
	return (
		<Grid as='ul' gap={{ base: '10px', md: '20px' }} listStyleType='none'>
			{FLIGHTS.map(flight => {
				return <FlightCard key={flight.id} flight={flight} />;
			})}
		</Grid>
	);
}

function FilterItem({ item }) {
	const { label, value } = item;
	return (
		<Checkbox
			w='100%'
			flexDir='row-reverse'
			justifyContent='space-between'
			value={value}
		>
			{label}
		</Checkbox>
	);
}

function FilterList({ items }) {
	return (
		<List>
			<ListItem>
				<CheckboxGroup>
					<VStack spacing='20px'>
						{items.map(item => (
							<FilterItem item={item} key={item.label} />
						))}
					</VStack>
				</CheckboxGroup>
			</ListItem>
		</List>
	);
}

function FilterGroup({ label, items }) {
	return (
		<Accordion w='100%' allowMultiple defaultIndex={[0, 1]}>
			<AccordionItem borderTop='0px'>
				<h2>
					<AccordionButton>
						<Box
							as='span'
							flex='1'
							textAlign='left'
							fontWeight='600'
							fontSize='16px'
						>
							{label}
						</Box>
						<AccordionIcon color='#2395FF' />
					</AccordionButton>
				</h2>

				<AccordionPanel>
					<FilterList items={items} />
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

const TRANSIT_LIST = [
	{ label: 'Direct', value: 0 },
	{ label: 'Transit', value: 1 },
	{ label: 'Transit 2+', value: 2 },
];

const FACILITY_LIST = [
	{ label: 'Luggage', value: 'luggage' },
	{ label: 'In-Flight Meal', value: 'in-flight meal' },
	{ label: 'Wi-fi', value: 'wi-fi' },
];

const DEPARTURE_TIME_LIST = [
	{ label: '00:00 - 06:00', value: '00:00 - 06:00' },
	{ label: '06:00 - 12:00', value: '06:00 - 12:00' },
	{ label: '12:00 - 18:00', value: '12:00 - 18:00' },
	{ label: '18:00 - 00:00', value: '18:00 - 00:00' },
];

const ARRIVAL_TIME_LIST = [
	{ label: '00:00 - 06:00', value: '00:00 - 06:00' },
	{ label: '06:00 - 12:00', value: '06:00 - 12:00' },
	{ label: '12:00 - 18:00', value: '12:00 - 18:00' },
	{ label: '18:00 - 00:00', value: '18:00 - 00:00' },
];

const AIRLINE_LIST = [
	{ label: 'Garuda Indonesia', value: 'Garuda Indonesia' },
	{ label: 'Air Asia', value: 'Air Asia' },
	{ label: 'Lion Air', value: 'Lion Air' },
];

export default function BrowsePage() {
	return (
		<Box as='section' bgColor={{ base: 'white', md: '#F5F6FA' }} pb='44px'>
			<SearchHeader />
			<Box mt='50px'>
				<Container maxW='1226px' px='28px'>
					<Flex gap='24px'>
						<Box display={{ base: 'none', md: 'block' }} flexBasis='300px'>
							<Flex
								alignItems='center'
								justifyContent='space-between'
								mb='25px'
							>
								<Text fontSize='24px' fontWeight='600'>
									Filter
								</Text>
								<Button
									fontSize='16px'
									fontWeight='600px'
									color='#2395FF'
									variant='ghost'
								>
									Reset
								</Button>
							</Flex>

							<Box bgColor='white' rounded='15px' p='30px'>
								<VStack>
									<FilterGroup label='Transit' items={TRANSIT_LIST} />
									<FilterGroup label='Facilities' items={FACILITY_LIST} />
									<FilterGroup
										label='Departure Time'
										items={DEPARTURE_TIME_LIST}
									/>
									<FilterGroup label='Arrival Time' items={ARRIVAL_TIME_LIST} />
									<FilterGroup label='Airlines' items={AIRLINE_LIST} />
									<Accordion w='100%' allowMultiple defaultIndex={[0, 1]}>
										<AccordionItem border='0px'>
											<h2>
												<AccordionButton>
													<Box
														as='span'
														flex='1'
														textAlign='left'
														fontWeight='600'
														fontSize='16px'
													>
														Ticket Price
													</Box>
													<AccordionIcon color='#2395FF' />
												</AccordionButton>
											</h2>

											<AccordionPanel>
												<Grid gap='15px'>
													<Flex
														justifyContent='space-between'
														color='#6B6B6B'
														fontSize='12px'
													>
														<Text>Lowest</Text>
														<Text>Highest</Text>
													</Flex>
													<RangeSlider
														aria-label={['min', 'max']}
														defaultValue={[100, 300]}
														step={1}
													>
														<RangeSliderTrack>
															<RangeSliderFilledTrack />
														</RangeSliderTrack>
														<RangeSliderThumb index={0} />
														<RangeSliderThumb index={1} />
													</RangeSlider>
													<Flex
														justifyContent='space-between'
														color='#2395FF'
														fontSize='16px'
														fontWeight='600'
													>
														<Text>$ 145,00</Text>
														<Text>$ 300,00</Text>
													</Flex>
												</Grid>
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
								</VStack>
							</Box>
						</Box>
						<Box flex='1'>
							<Flex
								alignItems='center'
								justifyContent='space-between'
								mb='25px'
							>
								<Box display={{ base: 'block', md: 'none' }}>
									<Text>6 flight found</Text>
								</Box>
								<Flex
									display={{ base: 'none', md: 'flex' }}
									alignItems='center'
									gap='8px'
								>
									<Text fontSize='24px' fontWeight='600'>
										Select Ticket
									</Text>
									<Text as='span' fontSize='14px' color='#6B6B6B'>
										(6 flight found)
									</Text>
								</Flex>
								<Box display={{ base: 'block', md: 'none' }}>
									<Button
										rightIcon={<FilterIcon />}
										variant='ghost'
										fontSize='14px'
										fontWeight='500'
										justifyContent='space-between'
									>
										Filter
									</Button>
								</Box>
								<Box display={{ base: 'none', md: 'block' }}>
									<Button
										rightIcon={<FilterIcon />}
										variant='ghost'
										fontSize='14px'
										fontWeight='500'
										justifyContent='space-between'
									>
										Sort by
									</Button>
								</Box>
							</Flex>

							<FlighList />
						</Box>
					</Flex>
				</Container>
			</Box>
		</Box>
	);
}
