import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Td, Tr } from "@chakra-ui/react"

export const CartDrawerTable = ({ product }) => {
	const { removeFromCart, addToCart } = useContext(CartContext)

	const increasePorductAndCount = (product) => {
        const productAndCount = {...product, 'count': product.count + 1 }
        addToCart(productAndCount)
    }
	
	const decreasePorductAndCount = (product) => {
		if (product.count > 1) {
        const productAndCount = {...product, 'count': product.count - 1 }
        addToCart(productAndCount)
		}
    }

	return (
		<Tr fontSize='ms' key={product.id}>
			<Td>{product.title.slice(0, 35) + '...'}</Td>
			<Td p='1' className="cd-numbers">
				<Flex>
					<Button colorScheme='purple' size='sm' mr='1' onClick={() => decreasePorductAndCount(product)}>
						<MinusIcon boxSize={2} color="yellow.100" />
					</Button>
					<Box px='3' alignContent='center' border='1px' borderColor='gray.200' borderRadius='md' >
						{product.count}
					</Box>
					<Button colorScheme='purple' size='sm' ml='1' onClick={() => increasePorductAndCount(product)}>
						<AddIcon boxSize={2} color="yellow.100" />
					</Button>
				</Flex>
			</Td>
			<Td p='2' isNumeric className="cd-numbers">US ${product.price}</Td>
			<Td p='2' isNumeric className="cd-numbers">US ${(product.price * product.count).toFixed(2)}</Td>
			<Td>
				<Button colorScheme='purple' onClick={() => removeFromCart(product.id)}>
					<DeleteIcon />
				</Button>
			</Td>
		</Tr>
	)
}