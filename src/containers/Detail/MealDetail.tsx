import * as React from 'react';
import { connect } from 'react-redux';
import { FloatingActionButton, LinearProgress, IconButton, Card, CardTitle, CardMedia, CircularProgress, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';
import ConfirmDialog from '../../components/ConfirmDialog';
import AddIngredientMealDialog from '../../components/AddIngredientMealDialog';
import EditMealDialog from '../../components/EditMealDialog';

import { asyncDetailMeal, asyncListIngredient, editMeal } from '../../actions/lunchTime';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EditIcon from 'material-ui/svg-icons/image/edit';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SortDescIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SortAscIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';

import Meal from '../../classes/Meal';

import { center  } from '../../constants/styles';

const tableIconsStyle: React.CSSProperties = {
	width: '48px',
	textAlign: 'right',
	overflow: 'visible',
}
const tableHeaderStyle: React.CSSProperties = {
	paddingRight: '0px',
}

const fabStyleAdd: React.CSSProperties = {
	margin: 0,
	top: 'auto',
	right: 20,
	bottom: 20,
	left: 'auto',
	position: 'fixed',
	zIndex: 9999,
};
const fabStyleEdit: React.CSSProperties = {
	margin: 0,
	top: 'auto',
	right: 70,
	bottom: 20,
	left: 'auto',
	position: 'fixed',
	zIndex: 9999,
};

interface IMealListProps {
	history: IHistory;
	meal: IMeal;
	ingrediences: IIngredient[];
	mealFetching: boolean;
	ingrediencesFetching: boolean;
	mealEditFetching: boolean;
	asyncDetailMeal: (id: string) => void;
	asyncListIngredient: () => void;
	onIngredientDelete: (item: IIngredient) => void;
	editMeal: (item: IMeal) => void;
}

interface IMealListState {
	cols: {
		name: {sort: number},
		isAlergen: {sort: number},
	}
}

class DetailMeal extends React.Component<IMealListProps, IMealListState> {
	constructor(){
		super();
		this.state = {
			cols: {
				name: { sort: 1 },
				isAlergen: { sort:0 },
			}
		}
		}

	private confirm: ConfirmDialog;
	addIngredientDialog: AddIngredientMealDialog;
	editMealDialog: EditMealDialog;
	
	componentDidMount() {
		let path = this.props.history.location.pathname;
		let id = path.substring(path.lastIndexOf('/') + 1);
		this.props.asyncDetailMeal(id);
		this.props.asyncListIngredient();
	}

	private onIngredientDelete = (ingredient: IIngredient) => {
		this.confirm.show('Delete', `Are you sure you want to delete ${ingredient.name}?`, (result) => {
			if (result) {
				let newMeal = Object.assign({}, this.props.meal);
				newMeal.ingrediences.splice(newMeal.ingrediences.findIndex(id => id == ingredient._id, 1));
				this.props.editMeal(newMeal);
			}
		})
	}

	private handleResult = (id: string) => {
		const meal = new Meal(this.props.meal);
		if(meal.ingredientAdd(id)){
			this.props.editMeal(meal.json());
		} else {
			alert('Did not work');
		}
	}

	private handleNameChange = (newName: string) => {
		const meal = new Meal(this.props.meal);
		meal.name = newName;
		this.props.editMeal(meal.json());
	}

	displaySort = (key: string) => {
		switch (this.state.cols[key].sort) {
			case -1:
				return <SortAscIcon />;
			case 0:
				return <SortIcon />;
			case 1:
				return <SortDescIcon />;
			default:
				break;
		}
		return null;
	}

	handleColumnSortClick = (key: string) => {
		let newState = Object.assign({}, this.state);
		Object.keys(newState.cols).forEach(objectKey => {
			if (objectKey == key) {
				switch (newState.cols[key].sort) {
				case -1:
					newState.cols[key].sort = 0;
					break;
				case 0:
					newState.cols[key].sort = 1;
					break;
				case 1:
					newState.cols[key].sort = -1;
					break;
				}
			} else {
				newState.cols[objectKey].sort = 0;
			}
		})
		this.setState(newState);
	}

	getList = (ingrediences: IIngredient[]) => {
		let sortKey = '';
		let array = ingrediences;
		Object.keys(this.state.cols).forEach(key => {
			if (this.state.cols[key].sort != 0)
			sortKey = key;
		});
		if (sortKey) {
			let dir = this.state.cols[sortKey].sort;
			array = array.sort((a, b) =>  {
				if (a[sortKey] < b[sortKey])
					return -1*dir;
				else if (a[sortKey] > b[sortKey])
					return 1*dir;
				else return 0;
			})
		} 
		return array;
	}

	render() {
		if (this.props.mealFetching || this.props.mealEditFetching) {
			return <CircularProgress style={center} thickness={6} size={80} />
		}
		let ingrediences: IIngredient[] = [];
		if (this.props.meal && this.props.ingrediences.length > 0)
			ingrediences = this.props.meal.ingrediences.map((id: string) => this.props.ingrediences.find((item) => item._id == id)) as IIngredient[];
		
		let list = this.getList(ingrediences);
		let tableIngrediences =	list.map((item, index) => <TableRow key={ index }>
			<TableRowColumn>{ item.name }</TableRowColumn>
			<TableRowColumn>{ item.isAlergen? 'ANO' : 'NE' }</TableRowColumn>
			<TableRowColumn style={tableIconsStyle}>
				<IconButton tooltip="Delete" tooltipPosition={ (list.length == index+1) ? 'top-center' : 'bottom-center'} onClick={() => this.onIngredientDelete(item)}><DeleteIcon /></IconButton>
			</TableRowColumn>
		</TableRow>);

		return(
			<div>
				<FloatingActionButton style={fabStyleAdd} mini onClick={() => this.addIngredientDialog.show()}>
					<ContentAdd />
				</FloatingActionButton>
				<FloatingActionButton secondary style={fabStyleEdit} mini onClick={() => this.editMealDialog.show(this.props.meal.name)}>
					<EditIcon />
				</FloatingActionButton>
				<Card style={{margin: '16px'}}>
					<CardTitle title={ this.props.meal && this.props.meal.name } />
					<CardMedia>
						<Table selectable={false}>
							<TableHeader
								displaySelectAll={false}
								adjustForCheckbox={false}
								enableSelectAll={false}
							>
								<TableRow>
									<TableHeaderColumn style={tableHeaderStyle}>
										<div style={{marginTop: '15px', float: 'left'}}>Name</div>
										<IconButton style={{float:'right'}} onClick={() => this.handleColumnSortClick('name')}>{this.displaySort('name')}</IconButton>
									</TableHeaderColumn>
									<TableHeaderColumn style={tableHeaderStyle}>
										<div style={{marginTop: '15px', float: 'left'}}>Alergen</div>
										<IconButton style={{float: 'right'}}  onClick={() => this.handleColumnSortClick('isAlergen')}>{ this.displaySort('isAlergen')}</IconButton>
									</TableHeaderColumn>
									<TableHeaderColumn  style={tableIconsStyle}></TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody displayRowCheckbox={false} >
							{ this.props.ingrediencesFetching?  <TableRow selectable={false}><TableRowColumn><LinearProgress mode="indeterminate"/></TableRowColumn></TableRow> : 	tableIngrediences} 
							</TableBody>
							</Table>
					</CardMedia>
				</Card>
				<ConfirmDialog ref={i => this.confirm = i as ConfirmDialog} />
				<AddIngredientMealDialog ref={i => this.addIngredientDialog = i as AddIngredientMealDialog} onResult={this.handleResult} ingredients={this.props.ingrediences} feching={this.props.mealFetching || this.props.ingrediencesFetching || this.props.mealEditFetching}/>
				<EditMealDialog ref={i => this.editMealDialog = i as EditMealDialog} onResult={this.handleNameChange}/>
			</div>
		)
	}
}

const mapStateToProps = (state: IAppState) => ({
	meal: state.lunchTime.meal,
	ingrediences: state.lunchTime.ingredientList,
	mealFetching: state.lunchTime.mealFetching,
	ingrediencesFetching: state.lunchTime.ingredientListFetching,
	mealEditFetching: state.lunchTime.mealEditFetching
})

const mapDispatchToProps = {
	asyncDetailMeal,
	asyncListIngredient,
	editMeal,
}

export default connect<object, object, any>(mapStateToProps, mapDispatchToProps)(DetailMeal)