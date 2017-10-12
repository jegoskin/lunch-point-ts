import * as React from 'react';
import { connect } from 'react-redux';
import { CardText, Checkbox, Card, CardTitle, CardMedia, FloatingActionButton } from 'material-ui';
import { push } from 'react-router-redux';
import { asyncListMeal, deleteMeal } from '../../actions/lunchTime';
import MealList from './MealList';
import AlergenWarning from './AlergenWarning';
import ConfirmDialog from '../../components/ConfirmDialog'
import InfoSnackbar from '../../components/InfoSnackbar'

import ContentAdd from 'material-ui/svg-icons/content/add';
import ShowDangerIcon from 'material-ui/svg-icons/alert/error';
import HideDangerIcon from 'material-ui/svg-icons/alert/error-outline';

const fabStyle: React.CSSProperties = {
	margin: 0,
	top: 'auto',
	right: 20,
	bottom: 20,
	left: 'auto',
	position: 'fixed',
	zIndex: 9999,
};

interface IHomeProps {
	meals: IMeal[];
	mealsFetching: boolean;
	selectedAlergenWarning: IIngredient[],
	asyncListIngredient: () => void;
	asyncListMeal: () => void;
	navigate: (url: string) => void;
	deleteMeal: (meal: IMeal) => void;
}

interface IHomeState {
	checkAlergenWarning: boolean,
	expanded: boolean,
	selectedAlergen: IIngredient[],
}

class Home extends React.Component<IHomeProps, IHomeState>{
	constructor() {
		super();
		this.state = {
			checkAlergenWarning: false,
			expanded: true,
			selectedAlergen: [],
		}
	}

	private confirm: ConfirmDialog;
	private snackbar: InfoSnackbar;

	componentDidMount() {
		this.props.asyncListMeal();
	}

	handleDetail = (id: string) => {
		this.props.navigate('/meal/detail/' + id);
	}

	handleDelete = (deletedMeal: IMeal) => {
		this.confirm.show('Delete', `Are you sure you want to delete ${deletedMeal.name}?`, (result) => {
			if (result) {
				this.props.deleteMeal(deletedMeal)
			}
		})
	}

	handleSubmitAlergenWarning = (selectedAlergenWarning: IIngredient[]) =>{
		if (selectedAlergenWarning.length == 0) {
			this.handleCancleAlergenWarning();
		} else {
			this.setState({checkAlergenWarning: true, expanded: true, selectedAlergen: selectedAlergenWarning});
			this.snackbar.show('Alergen warning is Active');
		};
	}

	handleCancleAlergenWarning = () =>{
		this.setState({checkAlergenWarning: false, expanded: true, selectedAlergen:[]});
		this.snackbar.show('Alergen warning is Disabled');
	}

	private handleCheckAlergenWarning = () => {
		let checkAlergen = this.state.checkAlergenWarning;
		let expand = this.state.expanded;
		let selectedAlergen = this.state.selectedAlergen;

		if (!checkAlergen && expand) {
			checkAlergen = true;
			expand = false;
		} else if (checkAlergen && !expand) {
			checkAlergen = false;
			expand = true;
		} else if (checkAlergen && expand) {
			this.handleCancleAlergenWarning();
			return;
		}

		let newState = Object.assign({}, this.state, {checkAlergenWarning: checkAlergen, expanded: expand, selectedAlergen: selectedAlergen});
		this.setState(newState);
	}

	render(){
		return(
			<div>
				<FloatingActionButton style={fabStyle} mini onClick={() => this.props.navigate('/meal/add/')} >
					<ContentAdd />
				</FloatingActionButton>
				<Card>
					<CardTitle title="Home" subtitle={						
						<Checkbox
							onClick = { () => this.handleCheckAlergenWarning() }
							checked = { this.state.checkAlergenWarning }
							checkedIcon = { <ShowDangerIcon /> }
							uncheckedIcon = { <HideDangerIcon /> }
							label = { this.state.checkAlergenWarning ? 'Alergen warning is Active' : 'Alergen warning is Disabled' }
							labelStyle = { this.state.checkAlergenWarning ? {color: '#03A9F4'} : {color: 'black'} }
						/>} />

						<CardText expandable={this.state.expanded}>
							<AlergenWarning 
								onSubmit={this.handleSubmitAlergenWarning}
								onCancle={() => this.handleCancleAlergenWarning()}
							/>
						</CardText>

					<CardMedia>
						<MealList meals={this.props.meals} selectedAlergen={this.state.selectedAlergen} fetching={this.props.mealsFetching} onDelete={this.handleDelete} onDetail={this.handleDetail} />
					</CardMedia>
				</Card>
				<ConfirmDialog ref={i => this.confirm = i as ConfirmDialog} />
				<InfoSnackbar ref={i => this.snackbar = i as InfoSnackbar} />
			</div>
		)
	}
}

const mapStateToProps = (state: IAppState) => ({
	meals : state.lunchTime.mealList,
	mealsFetching: state.lunchTime.mealListFetching,
	mealDeleteFetching: state.lunchTime.mealDeleteFetching,
})

const mapDispatchToProps = {
	asyncListMeal,
	deleteMeal,
	navigate: (url: string) => push(url)
}

export default connect<object, object, any>(mapStateToProps, mapDispatchToProps)(Home)