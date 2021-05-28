import { useCallback, useEffect, useState } from "react";
import PokemonTable from "./components/PokemonTable";
import PokemonAppBar from "./components/PokemonAppBar";

function App() {
	const [data, setData] = useState([]);
	const [pokemon, setPokemon] = useState([]);
	const [isLoading, setLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState("");

	const fetchPokemon = useCallback(() => {
		fetch("https://pokeapi.co/api/v2/pokemon/?limit=60%22")
			.then((res) => res.json())
			.then((resJson) => {
				setPokemon(resJson.results);
			})
			.catch((error) => {
				// Set error
				setError(error);
			});
	}, []);

	useEffect(() => {
		fetchPokemon();
	}, [fetchPokemon]);

	useEffect(() => {
		const pokemonUrls = pokemon.map((p) => p.url);
		const pokemonAttributes = pokemonUrls.map((url) =>
			fetch(url, { method: "GET" }).then((res) => res.json()),
		);

		Promise.allSettled(pokemonAttributes).then((res) => {
			const attributes = res.map((p) => p.value);
			setData(attributes);
		});
	}, [pokemon]);

	useEffect(() => {
		if (data.length > 0) {
			setLoading(false);
		}
	}, [data]);

	return isLoading ? (
		<div className='app'>Loading...</div>
	) : (
		<div className='app'>
			<PokemonAppBar data={data} />
			<PokemonTable data={data} />
		</div>
	);
}

export default App;
