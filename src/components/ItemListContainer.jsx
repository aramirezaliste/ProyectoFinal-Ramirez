import { useEffect, useState } from "react";
import { Item } from "./item";
import { Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom"
//import { useFetch } from "../hooks/useFetch";

import { db } from "../services/firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore";


export const ItemListContainer = () => {
	const [products, setProducts] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const { categoryName } = useParams();
	//const [url, setUrl] = useState(null)
	//const { data: products, isLoading, error } = useFetch(url)
	
	useEffect(() => {
		//useFetch
		// if (categoryName) {
		// 	setUrl(`https://fakestoreapi.com/products/category/${categoryName}`)
		// } else {
		// 	setUrl('https://fakestoreapi.com/products')
		// }

		//FIREBASE
		setIsLoading(true)
		const productTable = collection(db, "products")
		if(categoryName){
			const filter = where("category","==", categoryName)
			const productsByCategory = query(productTable, filter)
			getDocs(productsByCategory)
			.then((snapshot) => {
				const snapShotProducts = snapshot.docs.map((doc) => {
					const data = doc.data()
					const id = doc.id
					return { id: id, ...data }
				})
			setProducts(snapShotProducts)
			setIsLoading(false)
			})
		}else{
			getDocs(productTable)
			.then((snapshot) => {
				const snapShotProducts = snapshot.docs.map((doc) => {
					const data = doc.data()
					const id = doc.id
					return { id: id, ...data }
				})
			setProducts(snapShotProducts)
			setIsLoading(false)
			})
		}

	}, [categoryName])


	if (isLoading) {
		return (
			<Flex align='center' justify='center' h='30em'>
				<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.500' size='xl' />
			</Flex>
		)
	}
	else {
		return (
			<SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={1} mt='4.5em'>
				{products.map((product) => {
					return (
						<Item key={product.id} product={product} />
					)
				})
				}
			</SimpleGrid>
		)
	}

};
