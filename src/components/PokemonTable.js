import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

const sort = (array, comparator) => {
	const stabilizedArray = array.map((el, index) => [el, index]);
	stabilizedArray.sort((a, b) => {
		const sortOrder = comparator(a[0], b[0]);
		if (sortOrder !== 0) return sortOrder;
		return a[1] - b[1];
	});
	return stabilizedArray.map((el) => el[0]);
};

const descendingSort = (a, b, orderBy) => {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
};

const getComparator = (order, orderBy) => {
	return order === "desc"
		? (a, b) => descendingSort(a, b, orderBy)
		: (a, b) => -descendingSort(a, b, orderBy);
};

const headCells = [
	{
		id: "name",
		label: "Pokemon",
	},
	{ id: "height", label: "Height (dm)" },
	{ id: "weight", label: "Weight (hg)" },
	{ id: "abilities", label: "Abilities" },
];

const EnhancedTableHead = (props) => {
	const { classes, order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align='center'
						size='medium'
						padding='default'
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		top: 0,
		flexGrow: 1,
		width: "50%",
		height: "60%",
	},
	paper: {
		width: "100%",
	},
	table: {
		minWidth: 750,
	},
	title: {
		flex: "1 1 100%",
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
	tableCell: {
		fontSize: "8pt",
	},
}));

const PokemonTable = (data) => {
	const pokemonData = data.data;
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("name");
	const [page, setPage] = React.useState(0);
	// eslint-disable-next-line no-unused-vars
	const [rowsPerPage, setRowsPerPage] = React.useState(20);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableContainer>
					<Table
						// fontWeight='800'
						className={classes.table}
						aria-labelledby='tableTitle'
						size={"small"}
						aria-label='enhanced table'>
						<EnhancedTableHead
							classes={classes}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={pokemonData.length}
						/>
						<TableBody>
							{sort(pokemonData, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const labelId = `enhanced-table-${index}`;
									return (
										<TableRow hover key={row.name}>
											<TableCell
												className='table-column1'
												align='center'
												size='small'
												component='th'
												id={labelId}
												scope='row'
												padding='default'>
												{row.name.toUpperCase()}
												<img src={row.sprites.front_shiny} alt={row.name} />
											</TableCell>
											<TableCell className={classes.tableCell} align='center'>
												{row.height}
											</TableCell>
											<TableCell className={classes.tableCell} align='center'>
												{row.weight}
											</TableCell>
											<TableCell className={classes.tableCell} align='center'>
												{row.abilities.map(
													(r) => `${r.ability.name.toUpperCase()}, `,
												)}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					className='pagination'
					rowsPerPageOptions={20}
					component='div'
					count={pokemonData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
				/>
			</Paper>
		</div>
	);
};

export default PokemonTable;
