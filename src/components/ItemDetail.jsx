import { Box, Image, Text, Flex, Badge, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ItemCount } from "./ItemCount";

export const ItemDetail = () => {
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [count, setCount] = useState(1);

  const { addToCart, isInCart } = useContext(CartContext);

  const { id } = useParams();
  const { title, price, category, description, image } = detail;

  useEffect(() => {
    setIsloading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setDetail(data))
      .finally(setIsloading(false));
  }, [id]);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addPorductAndCount = (product) => {
    const productAndCount = { ...product, count: count };
    addToCart(productAndCount);
  };

  if (isLoading) {
    return (
      <Flex align="center" justify="center" h="30em">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Box align="center" m="3" mt="5em">
      <Box
        maxW="50em"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        align="center"
      >
        <Flex direction="column" align="center" wrap="wrap">
          <Image
            pt="10"
            boxSize="20em"
            objectFit="contain"
            src={image}
            alt={title}
          />
          <Text as="b">{title}</Text>
          <Badge mt="2" borderRadius="full" px="2" colorScheme="purple">
            <Link to={`/categoria/${category}`}>{category}</Link>
          </Badge>
        </Flex>
        <Box p="6">
          <Flex direction="column">
            <Text as="cite">{description}</Text>
            <Text fontSize="2xl" as="abbr" m="2">
              US ${price}
            </Text>
          </Flex>
          {!isInCart(id) && (
            <Flex align="center" justify="center">
              <ItemCount
                decreaseCount={decreaseCount}
                increaseCount={increaseCount}
                count={count}
              />
              <Button
                variant="solid"
                colorScheme="purple"
                onClick={() => {
                  addPorductAndCount(detail);
                }}
              >
                Añadir al Carrito
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
};
