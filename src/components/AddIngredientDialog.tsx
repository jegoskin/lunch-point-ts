import * as React from 'react';

import { Dialog, FlatButton, TextField, Checkbox } from 'material-ui';

interface IAddIngredientDialogProps {
		onResult: (ingredient: IIngredient) => void;
}

interface IAddIngredientDialogState {
	open: boolean;
	result: IIngredient;
}

class AddIngredientDialog extends React.Component<IAddIngredientDialogProps, IAddIngredientDialogState> {
	constructor() {
		super();
		this.state = this.getInitState();
	}

	getInitState: () => IAddIngredientDialogState = () => ({
		open: false,
		result: {
			name: '',
			isAlergen: false
		}
	})
	
	show = () => {
		this.setState({open: true});
	};

	hide = () => {
		this.setState(this.getInitState());
	};

	private sendResult = () => {
		let result = Object.assign({}, this.state.result);
		this.props.onResult(result);
		this.hide();
	}

	handleCheck = (isChecked: boolean) => {
		let newState = Object.assign({}, this.state);
		newState.result.isAlergen = isChecked;
		this.setState(newState);
	}

	handleChange = (name: string) => {
		let newState = Object.assign({}, this.state);
		newState.result.name = name;
		this.setState(newState);
	}

	checkInputs = () => {
		return (this.state.result.name)? false : true;
	}
	
	render() {

		const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.hide}
			/>,
			<FlatButton
				label="Ok"
				primary={true}
				onClick={this.sendResult}
				disabled={this.checkInputs()}
			/>
    ];

		return(
			<div>
			<Dialog
				title='Add'
				actions={actions}
				modal={true}
				open={this.state.open}
			>
				<TextField
					floatingLabelText="Name"
					onChange={(e, newValue) => this.handleChange(newValue)}
					value={this.state.result.name}
					fullWidth />
				<Checkbox
          label="Alergen"
					labelPosition="left"
					style={{marginTop:"15px"}}
					checked={this.state.result.isAlergen}
					onCheck={(e, isChecked) => this.handleCheck(isChecked)}
        />
			</Dialog>
			</div>
		)
	}
}

export default AddIngredientDialog;