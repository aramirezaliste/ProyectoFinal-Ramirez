import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { CartWidget } from "./CartWidget";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import '../styles/NavBar.css'
import { useFetch } from "../hooks/useFetch";

export const NavBar = () => {
	const [width, setWidth] = useState(window.innerWidth)
	const url = 'https://fakestoreapi.com/products/categories'

	const { data:categories } = useFetch(url)
	
	const handleResize = () => {
		setWidth(window.innerWidth)
	}
	window.addEventListener('resize', handleResize)

	if (width < 730) {
		return (
			<>
				<Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={3} bg="purple.100" className="nav-fixed" >
					<Menu >
						<MenuButton as={Button} size='sm' px='2' >
							<HamburgerIcon />
						</MenuButton>
						<MenuList >
							{categories && categories.map((category) => {
								return (
									<MenuItem key={category}><Link className='nav-cat' to={`/categoria/${category}` } >{category}</Link></MenuItem>
								)
							})}
							<MenuItem><Link to={`/`}>All Articles</Link></MenuItem>
						</MenuList>
					</Menu>
					<Text as='cite' color={"black"} fontSize='2xl'><Link to='/'>Brain Breaker</Link></Text>
					<CartWidget />
				</Flex>
			</>
		);
	} else {
		return (
			<>
				<Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={3} bg="purple.100" className="nav-fixed">
					<Text as='cite' color={"black"} fontSize='2xl'><Link to='/'>Brain Breaker</Link></Text>
					{categories && categories.map((category) => {
						return (
							<Link className='nav-cat' to={`/categoria/${category}`} key={category}>{category}</Link>
						)
					})}
					<Link to={`/`}>All Articles</Link>
					<CartWidget />
				</Flex>
			</>
		);
	}
};
