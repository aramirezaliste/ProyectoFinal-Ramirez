import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [direction, setDirection] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { cart, emptyCart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmiting(true);

    const user = {
      name,
      email,
      direction,
    };

    const order = {
      cart,
      user,
    };

    const tablaRef = collection(db, "orders");
    addDoc(tablaRef, order).then((res) => {
      setOrderId(res.id);
    });
    setIsSubmiting(false);

    setDirection("");
    setName("");
    setEmail("");
    emptyCart();
  };

  if (orderId) {
    return (
      <Flex align='center' justify='center' direction='column'>
        <Text fontSize="lg" mb="10px">
          Muchas gracias por tu compra!
        </Text>
        <Text fontSize="lg" mb="10px">
          ORDEN: {orderId}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <Text fontSize="lg" mb="10px">
        Ingresar datos para finalizar tu Compra
      </Text>
      <form action="" method="" onSubmit={(e) => handleSubmit(e)}>
        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel>Direccion</FormLabel>
          <Input
            type="text"
            name="direction"
            onChange={(e) => setDirection(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="green" mt="4" disabled={isSubmiting}>
          FINALIZAR COMPRA
        </Button>
      </form>
    </Flex>
  );
};
