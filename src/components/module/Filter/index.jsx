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
	Flex,
	Grid,
	List,
	ListItem,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Portal,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	VStack,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { FilterIcon } from '../../base/Icons';

function FilterItem({ item }) {
	const { label, value } = item;
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChange = value => {
		setSearchParams(prev => {
			console.log('prev > ', prev);
			return [...prev.entries(), ['facilities', value]];
		});
	};

	return (
		<Checkbox
			w='100%'
			flexDir='row-reverse'
			justifyContent='space-between'
			value={value}
			onChange={() => handleChange(value)}
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

export function FilterGroup({ label, items }) {
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

export function FilterListMobile() {
	return (
		<Popover>
			<PopoverTrigger>
				<Button
					rightIcon={<FilterIcon />}
					variant='ghost'
					fontSize='14px'
					fontWeight='500'
					justifyContent='space-between'
				>
					Filter
				</Button>
			</PopoverTrigger>
			<Portal>
				<PopoverContent mr='28px' pt='30px'>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverBody>
						<VStack>
							<FilterGroup label='Transit' items={TRANSIT_LIST} />
							<FilterGroup label='Facilities' items={FACILITY_LIST} />
							<FilterGroup label='Departure Time' items={DEPARTURE_TIME_LIST} />
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
												min={140}
												max={300}
												defaultValue={[160, 190]}
												step={5}
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
					</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>
	);
}
