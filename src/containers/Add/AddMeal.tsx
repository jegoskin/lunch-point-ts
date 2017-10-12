import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, CardMedia, CardTitle, CardActions, TextField, RaisedButton } from 'material-ui';
import { asyncListIngredient, addMeal } from '../../actions/lunchTime';
import baseListChoose from '../../components/ListChoose';

type ListChoose = new () => baseListChoose<IIngredient>;
var ListChoose = baseListChoose;

const ingredientCompare = (a: IIngredient, b: IIngredient) => {
	if (a.name.toUpperCase() < b.name.toLocaleUpperCase()) return -1;
	else if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
	else return 0;
}

interface IAddMealProps{
	ingredients: IIngredient[],
	asyncListIngredient: () => void;
	ingredientsFetching: boolean;
	navigate: (url: string) => void;
	addMeal: (meal: IMeal) => void;
}

interface IAddMealStats{
	newMeal: IMeal;
}

class AddMeal extends React.Component<IAddMealProps, IAddMealStats>{
	constructor(){
		super();
		this.state = this.getInitState();
	}

	private listChoose: baseListChoose<IIngredient>

	getInitState: () => IAddMealStats = () => ({
		newMeal: {
			name: '',
			ingrediences: [],
		}
	})

	componentDidMount() {
		this.props.asyncListIngredient();
	}

	private submit = () => {
		let newMeal = Object.assign({}, this.state.newMeal);
		newMeal.ingrediences = this.listChoose.getSelected().map(item => item._id) as string[];
		this.props.addMeal(newMeal);
		this.props.navigate('/');
	}

	private checkInputs = () => {
		return (this.state.newMeal.name)? false : true;
	}

	private handleChange = (name: string) => {
		let newState = Object.assign({}, this.state);
		newState.newMeal.name = name;
		this.setState(newState);
	}

	render(){
		return(
			<div>
				<Card style={{padding: 20,}}>
					<CardTitle title="Add new Meal" />
					<TextField 
						floatingLabelText="Meal Name" 
						value={this.state.newMeal.name}
						onChange={(e,newValue) => this.handleChange(newValue)}
					/>
					<CardMedia>
						<ListChoose ref={i => this.listChoose = i as baseListChoose<IIngredient>} data={this.props.ingredients} feching={this.props.ingredientsFetching} compare={ingredientCompare} />
					</CardMedia>
					<CardActions>
						<RaisedButton
							label="Cancel"
							onClick={() => this.props.navigate('/')}
						/>
						<RaisedButton 
							primary={true} 
							label="Save" 
							onClick={() => this.submit()}	
							disabled={this.checkInputs()}
						/>
					</CardActions>
				</Card>
			</div>
		)
	}
}

const mapStateToProps = (state: IAppState) => ({
	ingredients: state.lunchTime.ingredientList,
	ingredientsFetching: state.lunchTime.ingredientListFetching,
})

const mapDispatchToProps = {
	asyncListIngredient,
	addMeal,
	navigate: (url: string) => push(url),
}

export default connect<object, object, any>(mapStateToProps, mapDispatchToProps)(AddMeal);