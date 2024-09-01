import { ItemListContainer } from "./components/ItemListContainer";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { ItemDetail } from "./components/ItemDetail";
import { ErrorPage } from "./components/404Page";
import { CartContextProvider } from "./context/CartContext";
import { Checkout } from "./components/Checkout";

function App() {
	return (
		<CartContextProvider>

		<BrowserRouter>
			<NavBar />

			<Routes>
				<Route path="/" element={<ItemListContainer />} />
				<Route path="/categoria/:categoryName" element={<ItemListContainer />} />
				<Route path="/detalle/:id" element={<ItemDetail />} />
				<Route path="/cart/checkout" element={<Checkout />} />

				<Route path="*" element={<ErrorPage/>} />
			</Routes>

		</BrowserRouter>
		</CartContextProvider>
	);
}

export default App;
