import "./styles/app.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonTable from "./components/PokemonTable";
import PokemonAppBar from "./components/PokemonAppBar";

function App() {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let pokemonData = [];
		// Fetches limit of 60 pokemon
		const retrievePokemonData = () => {
			axios
				.get("https://pokeapi.co/api/v2/pokemon/?limit=60")
				.then((response) => response.data.results)
				.then((pokemon) => {
					for (const poke of pokemon) {
						fetchEachPokemon(poke);
					}
				})
				.then(setData(pokemonData))
				.then(setLoading(false))
				.catch((error) => {
					// Set error
					setError(error);
				});
		};

		// Fetches each pokemon
		const fetchEachPokemon = (poke) => {
			axios
				.get(poke.url)
				.then((response) => {
					pokemonData.push(response.data);
				})
				.catch((error) => {
					// Set error
					setError(error);
				});
		};

		// Only runs once
		retrievePokemonData();
	}, []);

	if (isLoading) {
		return <div className='app'>Loading...</div>;
	}
	return (
		<div className='app'>
			<PokemonAppBar data={data} />
			{/* <PokemonTable data={data} /> */}
		</div>
	);
}

export default App;
