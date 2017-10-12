import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardMedia } from 'material-ui';
import { asyncListIngredient, addIngredient, deleteIngredient, editIngredient } from '../../actions/lunchTime';
import IngredientList from './IngredientList';
import AddIngredientDialog from '../../components/AddIngredientDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import EditIngredientDialog from '../../components/EditIngredientDialog'

interface IIngredientProps {
	ingredients: any;
	ingredientsFetching: boolean;
	ingredientAddFetching: boolean;
	ingredientDeleteFetching: boolean;
	ingredientEditFetching: boolean;
	asyncListIngredient: () => void;
	addIngredient: (ingredient: IIngredient) => void;
	editIngredient: (ingredient: IIngredient) => void;
	deleteIngredient: (ingredient: IIngredient) => void;
}
interface IIngredientState {}

class Ingredient extends React.Component<IIngredientProps, IIngredientState>{
	constructor() {
		super();
	}
	private dialog: AddIngredientDialog;
	private editDialog: EditIngredientDialog;
	private confirm: ConfirmDialog;

	componentDidMount() {
		this.props.asyncListIngredient();
	}

	private handleAddIngredient = (ingredient: IIngredient) => {
		this.props.addIngredient(ingredient);
	}

	private handleEditIngredient = (ingredient: IIngredient) => {
		this.props.editIngredient(ingredient);
	}

	private handleDeleteIngredient = (ingredient: IIngredient) => {
		this.confirm.show('Delete', `Are you sure you want to delete ${ingredient.name}?`, (result) => {
			if (result) {
				this.props.deleteIngredient(ingredient);
			}
		})
	}

	render(){
		return(
			<div>
				<Card style={{marginBottom: '60px'}}>
					<CardTitle title="Ingredients" />
					<CardMedia>
						<IngredientList
							feching={this.props.ingredientsFetching || this.props.ingredientAddFetching || this.props.ingredientDeleteFetching || this.props.ingredientEditFetching} 
							ingredients={this.props.ingredients}
							onDelete={this.handleDeleteIngredient}
							onAdd={() => this.dialog.show()}
							onEdit={(item) => this.editDialog.show(item)}
							/>
					</CardMedia>
				</Card>
				<AddIngredientDialog ref={i => this.dialog = i as AddIngredientDialog} onResult={this.handleAddIngredient}/>
				<ConfirmDialog ref={i => this.confirm = i as ConfirmDialog} />
				<EditIngredientDialog ref={i => this.editDialog = i as EditIngredientDialog} onResult={this.handleEditIngredient} />
			</div>
		)
	}
}

const mapStateToProps = (state: IAppState) => ({
	ingredients: state.lunchTime.ingredientList,
	ingredientsFetching: state.lunchTime.ingredientListFetching,
	ingredientAddFetching: state.lunchTime.ingredientAddFetching,
	ingredientDeleteFetching: state.lunchTime.ingredientDeleteFetching,
	ingredientEditFetching: state.lunchTime.ingredientEditFetching,
})

const mapDispatchToProps = {
	asyncListIngredient,
	addIngredient,
	deleteIngredient,
	editIngredient,
}

export default connect<object, object, any>(mapStateToProps, mapDispatchToProps)(Ingredient)