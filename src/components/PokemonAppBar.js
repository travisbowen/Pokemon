import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
	},
	title: {
		flexGrow: 1,
	},
}));

const calcAverageWeight = (pokeArray) => {
	const weightArray = pokeArray.map((pokemon) => {
		return pokemon.weight;
	});
	const avg = weightArray.reduce((a, b) => a + b) / weightArray.length;
	return Math.round(avg);
};

const calcHighestExperience = (pokeArray) => {
	const expArray = pokeArray.map((pokemon) => {
		return pokemon.base_experience;
	});
	return Math.max(...expArray);
};

const PokemonAppBar = ({ data }) => {
	const classes = useStyles();
	const [pokemonData, setPokemonData] = useState([]);

	useEffect(() => {
		// console.log(data);
		setPokemonData(data);
	}, [data, pokemonData]);

	return (
		<div className={classes.root}>
			<AppBar position='sticky'>
				<Toolbar>
					<Typography variant='h3' className={classes.title}>
						PokeAPI
					</Typography>
					{pokemonData.length > 0 ? (
						<>
							<Typography variant='h5' className={classes.title}>
								{`Average Weight: ${calcAverageWeight(pokemonData)}`}
							</Typography>
							<Typography variant='h5' className={classes.title}>
								{`Highest Base Experience: ${calcHighestExperience(
									pokemonData,
								)}`}
							</Typography>
						</>
					) : null}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default PokemonAppBar;
