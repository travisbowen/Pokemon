import "./styles/app.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	const [data, setData] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		// GET request
		axios
			.get("https://pokeapi.co/api/v2/pokemon/?limit=60")
			.then((res) => {
				// handle success
				setData(res.data.results);
				console.log(res.data.results);
			})
			.catch((error) => {
				// handle error
				setError(error);
				console.log(error);
			});

		// Will only run once (like componentDidMount in classes)
	}, []);

	return (
		<div className='App'>
			<h1>Pokemon</h1>
		</div>
	);
}

export default App;
