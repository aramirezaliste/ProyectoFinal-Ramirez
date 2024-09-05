import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ItemCount } from "./ItemCount";
//import { useFetch } from "../hooks/useFetch"
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const ItemDetail = () => {
  const [count, setCount] = useState(1);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const [url, setUrl] = useState(null)
  //const { data: detail, isLoading } = useFetch(url)

  const { addToCart, isInCart } = useContext(CartContext);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      const productRef = doc(db, "products", id);
      getDoc(productRef)
        .then(res => {
          const data = res.data();
          const snapId = res.id;
          const productDetail = { id: snapId, ...data }
          setDetail(productDetail)
          setIsLoading(false)
        })
    }
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
            src={detail.image}
            alt={detail.title}
          />
          <Text as="b">{detail.title}</Text>
          <Badge mt="2" borderRadius="full" px="2" colorScheme="purple">
            <Link to={`/categoria/${detail.category}`}>{detail.category}</Link>
          </Badge>
        </Flex>
        <Box p="6">
          <Flex direction="column">
            <Text as="cite">{detail.description}</Text>
            <Text fontSize="2xl" as="abbr" m="2">
              US ${detail.price}
            </Text>
          </Flex>
          {!isInCart(detail.id) && (
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
