import { Box, Button, Text } from "@chakra-ui/react";

export const ItemCount = ({decreaseCount, increaseCount, count}) => {
  return (
    <>
      <Button
        size="sm"
        variant="solid"
        colorScheme="purple"
        mx="1"
        onClick={decreaseCount}
      >
        -
      </Button>
      <Box
        w="2em"
        h="2em"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        pt="1"
      >
        <Text color="purple.700"> {count}</Text>
      </Box>
      <Button
        size="sm"
        variant="solid"
        colorScheme="purple"
        ml="1"
        mr="3"
        onClick={increaseCount}
      >
        +
      </Button>
    </>
  );
};
