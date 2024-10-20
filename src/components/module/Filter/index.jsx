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
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { FilterIcon } from "../../base/Icons";
import { useEffect, useState } from "react";
import { rupiah } from "../../../utils/currency";

function FilterItem({ item, resetFlag, filterType }) {
  const { label, value } = item;
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(searchParams.getAll(filterType).includes(value));
  }, [searchParams, value, resetFlag, filterType]);
  // console.log("item",item);
  

  const handleChange = (value) => {
    const facilities = searchParams.getAll(filterType);

    if (facilities.includes(value)) {
      const newFacilities = facilities.filter((facility) => facility !== value);
      setSearchParams((prev) => {
        prev.delete(filterType);
        newFacilities.forEach((facility) =>
          prev.append(filterType, facility)
        );
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.append(filterType, value);
        return prev;
      });
    }
  };

  return (
    <Checkbox
      w="100%"
      flexDir="row-reverse"
      justifyContent="space-between"
      value={value}
      onChange={() => handleChange(value)}
      isChecked={checked} // Pastikan checkbox sinkron dengan search params
    >
      {label}
    </Checkbox>
  );
}

function FilterList({ items, resetFlag, filterType }) {
  return (
    <List>
      <ListItem>
        <CheckboxGroup>
          <VStack spacing="20px">
            {items.map((item) => (
              <FilterItem item={item} key={item.label} resetFlag={resetFlag} filterType={filterType} />
            ))}
          </VStack>
        </CheckboxGroup>
      </ListItem>
    </List>
  );
}

export function FilterGroup({ label, items, resetFlag, filterType }) {
  return (
    <Accordion w="100%" allowMultiple defaultIndex={[0, 1]}>
      <AccordionItem borderTop="0px">
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight="600"
              fontSize="16px"
            >
              {label}
            </Box>
            <AccordionIcon color="#2395FF" />
          </AccordionButton>
        </h2>

        <AccordionPanel>
          <FilterList items={items} resetFlag={resetFlag} filterType={filterType} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

const FACILITY_LIST = [
  { label: "Luggage", value: "is_luggage" },
  { label: "In-Flight Meal", value: "is_flight_meal" },
  { label: "Wi-fi", value: "is_wi-fi" },
];

const DEPARTURE_TIME_LIST = [
  { label: "00:00 - 06:00", value: "00:00 - 06:00" },
  { label: "06:00 - 12:00", value: "06:00 - 12:00" },
  { label: "12:00 - 18:00", value: "12:00 - 18:00" },
  { label: "18:00 - 00:00", value: "18:00 - 00:00" },
];

const ARRIVAL_TIME_LIST = [
  { label: "00:00 - 06:00", value: "00:00 - 06:00" },
  { label: "06:00 - 12:00", value: "06:00 - 12:00" },
  { label: "12:00 - 18:00", value: "12:00 - 18:00" },
  { label: "18:00 - 00:00", value: "18:00 - 00:00" },
];

const AIRLINE_LIST = [
  { label: "Garuda Indonesia", value: "Garuda Indonesia" },
  { label: "Air Asia", value: "Air Asia" },
  { label: "Lion Air", value: "Lion Air" },
];

export function FilterWrapper({ resetFlag }) {
  const [priceStart, setPriceStart] = useState(500000);
  const [priceEnd, setPriceEnd] = useState(500000);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSliderChange = (val) => {
    const [min, max] = val;
    setPriceStart(min);
    setPriceEnd(max);

    setSearchParams((prev) => {
      prev.set("priceStart", min);
      prev.set("priceEnd", max);
      return prev;
    });
  };
  return (
    <VStack>
      <FilterGroup
        label="Facilities"
        items={FACILITY_LIST}
        resetFlag={resetFlag}
        filterType="facilities"
      />
      <FilterGroup
        label="Departure Time"
        items={DEPARTURE_TIME_LIST}
        resetFlag={resetFlag}
        filterType="departure"
      />
      <FilterGroup
        label="Arrival Time"
        items={ARRIVAL_TIME_LIST}
        resetFlag={resetFlag}
        filterType="arrival"
      />
      <FilterGroup
        label="Airlines"
        items={AIRLINE_LIST}
        resetFlag={resetFlag}
        filterType="merchant"
      />
      <Accordion w="100%" allowMultiple defaultIndex={[0, 1]}>
        <AccordionItem border="0px">
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontWeight="600"
                fontSize="16px"
              >
                Ticket Price
              </Box>
              <AccordionIcon color="#2395FF" />
            </AccordionButton>
          </h2>

          <AccordionPanel>
            <Grid gap="15px">
              <Flex
                justifyContent="space-between"
                color="#6B6B6B"
                fontSize="12px"
              >
                <Text>Lowest</Text>
                <Text>Highest</Text>
              </Flex>
              <RangeSlider
                aria-label={["min", "max"]}
                min={500000}
                max={10000000}
                step={20}
                value={[priceStart, priceEnd]} // Sync slider with state
                onChange={handleSliderChange} // Update state and params on change
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Flex
                justifyContent="space-between"
                color="#2395FF"
                fontSize="16px"
                fontWeight="600"
              >
                <Text>{rupiah(priceStart)}</Text>
                <Text>{rupiah(priceEnd)}</Text>
              </Flex>
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}

export function FilterListMobile() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          rightIcon={<FilterIcon />}
          variant="ghost"
          fontSize="14px"
          fontWeight="500"
          justifyContent="space-between"
        >
          Filter
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent mr="28px" pt="30px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <FilterWrapper />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
