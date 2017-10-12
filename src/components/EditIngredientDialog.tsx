import * as React from 'react';

import { Dialog, FlatButton, TextField, Checkbox } from 'material-ui';


interface IEditIngredientDialogProps {
	onResult: (ingredient: IIngredient) => void;
}

interface IEditIngredientDialogState {
	open: boolean;
	ingredient: IIngredient;
}

class EditIngredientDialog extends React.Component<IEditIngredientDialogProps,IEditIngredientDialogState> {
	constructor() {
		super();
		this.state = this.getInitState();
	}

	private getInitState: () => IEditIngredientDialogState = () => ({
		open: false,
		ingredient: {
			name: '',
			isAlergen: false
		}
	})

	private handleChange = (name: string) => {
		let newState = Object.assign({}, this.state);
		newState.ingredient.name = name;
		this.setState(newState);
	}

	private handleCheck = (isChecked: boolean) => {
		let newState = Object.assign({}, this.state);
		newState.ingredient.isAlergen = isChecked;
		this.setState(newState);
	}
	
	private checkInputs = () => {
		return (this.state.ingredient.name)? false : true;
	}

	private sendResult = () => {
		let result = Object.assign({}, this.state.ingredient);
		this.props.onResult(result);
		this.hide();
	}

	show = (ingredient: IIngredient) => {
		this.setState({
			open: true,
			ingredient,
		});
	};

	hide = () => {
		this.setState(this.getInitState());
	};

	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        onClick={() => this.hide()}
			/>,
			<FlatButton
				label="Ok"
				primary={true}
				onClick={() => this.sendResult()}
				disabled={this.checkInputs()}
			/>
    ];

		return(
			<div>
			<Dialog
				title='Edit'
				actions={actions}
				modal={true}
				open={this.state.open}
			>
				<TextField
					floatingLabelText="Name"
					onChange={(e, newValue) => this.handleChange(newValue)}
					value={this.state.ingredient.name}
					fullWidth />
				<Checkbox
          label="Alergen"
					labelPosition="left"
					style={{marginTop:"15px"}}
					checked={this.state.ingredient.isAlergen}
					onCheck={(e, isChecked) => this.handleCheck(isChecked)}
        />
			</Dialog>
			</div>
		)
	}
}

export default EditIngredientDialog;