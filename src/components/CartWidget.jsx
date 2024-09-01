import React, { useContext } from "react";
import { IconButton, Box, useDisclosure, Badge } from "@chakra-ui/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartDrawer } from "./CartDrawer";
import { CartContext } from "../context/CartContext";

export const CartWidget = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const { count } = useContext(CartContext)

    return (
        <>
            <Box>
                <IconButton ref={btnRef} onClick={onOpen} isRound={true} variant="solid" colorScheme="purple" aria-label="Done" fontSize="20px" icon={<MdOutlineShoppingCart />} />
                <Badge colorScheme='red' position="relative" top="-15px" left="-20%" >
                    {count}
                </Badge>
                <CartDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef}/>
            </Box>
        </>
    );
};
