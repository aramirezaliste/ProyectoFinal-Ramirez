import React, { useContext } from "react"
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { CartContext } from "../context/CartContext"
import '../styles/CartDrawer.css'
import { CartDrawerTable } from "./CartDrawerTable"
import { Link } from "react-router-dom"

export function CartDrawer({ isOpen, onClose, btnRef }) {

    const { cart } = useContext(CartContext)

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size='xl'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Carrito</DrawerHeader>

                    <DrawerBody>
                        {cart.length == 0 ?
                            <Text fontSize='2xl'>Carrito Vacio...</Text>
                            :
                            <TableContainer m='1'>
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
                                            cart.sort((a, b) => a.price - b.price).map((product) => {
                                                return (
                                                    <CartDrawerTable key={product.id} product={product} />
                                                )
                                            })
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button colorScheme='purple' onClick={onClose} ><Link to='/cart/checkout'>Finalizar compra</Link></Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}