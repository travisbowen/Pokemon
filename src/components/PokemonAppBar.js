import React from "react";
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
	return Math.round(weightArray.reduce((a, b) => a + b) / weightArray.length);
};

const calcHighestExperience = (pokeArray) => {
	const expArray = pokeArray.map((pokemon) => {
		return pokemon.base_experience;
	});
	return Math.max(...expArray);
};

const PokemonAppBar = ({ data }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='fixed'>
				<Toolbar>
					<Typography variant='h3' className={classes.title}>
						PokeAPI
					</Typography>
					{data.length > 0 ? (
						<>
							<Typography variant='h5' className={classes.title}>
								{`Average Weight: ${calcAverageWeight(data)}`}
							</Typography>
							<Typography variant='h5' className={classes.title}>
								{`Highest Base Experience: ${calcHighestExperience(data)}`}
							</Typography>
						</>
					) : null}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default PokemonAppBar;
