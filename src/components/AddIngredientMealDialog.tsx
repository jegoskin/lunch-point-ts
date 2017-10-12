import * as React from 'react';

import { Dialog, FlatButton, MenuItem, SelectField } from 'material-ui';


interface IAddIngredientMealDialogProps {
	ingredients: IIngredient[],
	feching: boolean,
	onResult: (selectedId: string) => void;
}
interface IAddIngredientMealDialogStats {
	open: boolean;
	selectedId: string
}

class AddIngredientMealDialog extends React.Component<IAddIngredientMealDialogProps, IAddIngredientMealDialogStats> {
	constructor (){
		super();
		this.state = this.getInitState();
	}

	getInitState: () => IAddIngredientMealDialogStats = () => ({
		open: false,
		selectedId: ''
	})

	sendResult = () => {
		let selectedId = this.state.selectedId;
		this.props.onResult(selectedId);
		this.hide();
	}
	
	show = () => {
		this.setState({open: true});
	};

	hide = () => {
		this.setState(this.getInitState());
	};

	private handleChange = (id: string) => {
		let newState = Object.assign({}, this.state, {selectedId: id});
		this.setState(newState);
	}

	private checkInput = () => {
		return (this.state.selectedId)? false : true;
	}
		
	render(){
		const actions = [
      <FlatButton
        label="Cancel"
        onClick={() => this.hide()}
			/>,
			<FlatButton
				label="Ok"
				primary={true}
				onClick={this.sendResult}
				disabled={this.checkInput()}
			/>
    ];

		return(
			<div>
				<Dialog
				contentStyle={{width: '40%', minWidth: '320px',}}
				title='Add'
				actions={actions}
				modal={true}
				open={this.state.open}
				>
				<SelectField 
					floatingLabelText="Ingrediences"
					maxHeight={200}
					fullWidth
					value={this.state.selectedId}
          onChange={(e, index, value) => this.handleChange(value)}
				>
					{	
						this.props.ingredients.map((item) => <MenuItem value={ item._id } key={ item._id } primaryText={ item.name } /> )
					}
				</SelectField>
			</Dialog>
			</div>
		)
	}
}

export default AddIngredientMealDialog;