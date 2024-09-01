import { Box, Image, Text, Flex, Badge, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import '../styles/Item.css'

export const Item = ({ product }) => {
	const [count, setCount] = useState(1)
	const { id, title, price, category, description, image } = product;

	const { addToCart } = useContext(CartContext)

	const navigate = useNavigate();

	const increaseCount = () => {
		setCount(count + 1)
	}

	const decreaseCount = () => {
		if (count > 1) {
			setCount(count - 1)
		}
	}

	const addPorductAndCount = (product) => {
		const productAndCount = { ...product, 'count': count }
		addToCart(productAndCount)
	}

	return (
		<Box align='center' m='3'>
			<Flex borderWidth='1px' borderRadius='lg' height='100%' overflow='hidden' direction='column' align='center' justify='space-between'>
					<Flex direction='column' align='center' wrap='wrap'>
						<Image className='item-image' m='2' boxSize='15em' objectFit='contain' src={image} alt={title} onClick={() => navigate(`/detalle/${id}`)} />
						<Badge mt='3' borderRadius='full' px='2' colorScheme='purple'>
							<Link to={`/categoria/${category}`}>{category}</Link>
						</Badge>
					</Flex>
					<Flex direction='column' p='2' justify='flex-end' w='100%'>
						<Flex direction='column'>
							<Text as='cite'>{title}</Text>
							<Text fontSize='2xl' as='abbr' p='2'>US ${price}</Text>
						</Flex>
						<Flex align='center' justify='center' pb='2'>
							<Button size='sm' variant="solid" colorScheme="purple" mx='1' onClick={decreaseCount}>
								-
							</Button>
							<Box w='2em' h='2em' borderWidth='1px' borderRadius='lg' overflow='hidden' pt='1'>
								<Text color='purple.700'> {count}</Text>
							</Box>
							<Button size='sm' variant="solid" colorScheme="purple" ml='1' mr='3' onClick={increaseCount}>
								+
							</Button>
						</Flex>
						<Button variant="solid" colorScheme="purple" m='1' onClick={() => { addPorductAndCount(product) }}>
							Añadir al Carrito
						</Button>
						<Button variant="solid" colorScheme="purple" m='1'>
							<Link to={`/detalle/${id}`} >Ver Detalle </Link>
						</Button>
					</Flex>
		
			</Flex>
		</Box>



	);
};
