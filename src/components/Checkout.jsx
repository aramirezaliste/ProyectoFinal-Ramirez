import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { Box, Button, Flex, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { CartDrawerTable } from "./CartDrawerTable"

export const Checkout = () => {
    const { cart, totalPrice } = useContext(CartContext)

    const [width, setWidth] = useState(window.innerWidth)

	const handleResize = () => {
		setWidth(window.innerWidth)
	}
	window.addEventListener('resize', handleResize)

    
    return (
        <Box display='flex'  mt='4.5em' flexDirection='column'>
            <Text fontSize='2xl' alignSelf='center'> Carrito</Text>
            <Flex m='10' flexDirection={ width < 800 ? 'column' : 'start'}>
                <TableContainer m='1' w={ width < 800 ? '100%' : '70%'}>
                    <Table size='sm' variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>PRODUCTO</Th>
                                <Th p='2' >CANT.</Th>
                                <Th p='2' isNumeric>PRECIO UNI.</Th>
                                <Th p='2' isNumeric>SUBTOTAL</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                cart.sort((a, b) => a.id - b.id).map((product) => {
                                    return (
                                        <CartDrawerTable key={product.id} product={product} />
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <Flex  w={ width < 800 ? '100%' : '30%'} flexDirection='column' alignContent='center' m='2' justify='center'>
                    <Flex justifyContent='space-around' m='5'>
                        <Text fontSize='2xl'>Total</Text > 
                        <Text fontSize='2xl'>US ${totalPrice.toFixed(2)}</Text>
                    </Flex>
                    <Button colorScheme="green" mt='4'>FINALIZAR COMPRA</Button>
                </Flex>
            </Flex>
        </Box>
    )
}