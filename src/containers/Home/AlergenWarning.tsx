import * as React from 'react';
import { connect } from 'react-redux';
import { asyncListIngredient } from '../../actions/lunchTime';
import { RaisedButton } from 'material-ui';
import baseListChoose from '../../components/ListChoose';

type ListChoose = new () => baseListChoose<IIngredient>;
var ListChoose = baseListChoose;

const ingredientCompare = (a: IIngredient, b: IIngredient) => {
	if (a.name.toUpperCase() < b.name.toLocaleUpperCase()) return -1;
	else if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
	else return 0;
}

interface IAlergenWarningProps {
	ingredientsFetching: boolean;
	ingredients: IIngredient[],
	asyncListIngredient: () => void;
	onSubmit: (alergenWarning: IIngredient[]) => void;
	onCancle: () => void;
}

interface IAlergenWarningState {
}

class AlergenWarning extends React.Component<IAlergenWarningProps,IAlergenWarningState> {
	constructor(){
		super();
	}

	componentDidMount() {
		this.props.asyncListIngredient();
	}

	private listChoose: baseListChoose<IIngredient>

	render(){
		return(
			<div>
				<ListChoose ref={i => this.listChoose = i as baseListChoose<IIngredient>} data={this.props.ingredients.filter(item => item.isAlergen)} feching={this.props.ingredientsFetching} compare={ingredientCompare} />
				<RaisedButton label="Cancle" onClick={() => this.props.onCancle()} />
				<RaisedButton label="Submit" onClick={() => this.props.onSubmit(this.listChoose.getSelected())} primary={true}  />
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
}

export default connect<object, object, any>(mapStateToProps, mapDispatchToProps) (AlergenWarning);