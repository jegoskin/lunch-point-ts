import * as React from 'react';
import { 
	Table, 
	TableHeader, 
	TableRow, 
	TableHeaderColumn, 
	TableBody, 
	TableRowColumn, 
	LinearProgress, 
	FloatingActionButton, 
	IconButton,
} from 'material-ui';

import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import SortIcon from 'material-ui/svg-icons/content/sort';
import SortDescIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SortAscIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';

const fabStyle: React.CSSProperties = {
	margin: '0px',
	top: 'auto',
	right: '20px',
	bottom: '20px',
	left: 'auto',
	position: 'fixed',
	zIndex: 9999,
};
const tableIconsStyle: React.CSSProperties = {
	width: '96px',
	textAlign: 'right',
	overflow: 'visible',
}
const tableHeaderStyle: React.CSSProperties = {
	paddingRight: '0px',
}

interface IIngredientListProps {
	ingredients: IIngredient[],
	feching: boolean,
	onAdd: () => void;
	onDelete: (item: IIngredient) => void;
	onEdit: (item: IIngredient) => void;
}

interface IIngredientListState {
	cols: {
		id: {
			sort: number
		},
		name: {
			sort: number
		},
		isAlergen: {
			sort: number
		}
	}
}

class IngredientList extends React.Component<IIngredientListProps, IIngredientListState> {
	constructor(){
		super();
		this.state = { 
			cols: {
				id: {
					sort: 1
				},
				name: {
					sort: 0
				},
				isAlergen: {
					sort: 0
				}
			}
		}
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
	
	getList = () => {
		let sortKey = '';
		let array = this.props.ingredients.slice(0);
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

	render(){
		let list = this.getList();
		let tableBody = list.map((item, index) => <TableRow key={ index }>
				<TableRowColumn>{ item._id }</TableRowColumn>
				<TableRowColumn>{ item.name }</TableRowColumn>
				<TableRowColumn>{ item.isAlergen? 'ANO' : 'NE' }</TableRowColumn>
				<TableRowColumn style={tableIconsStyle}>
					<IconButton tooltip="Delete" tooltipPosition={ (list.length == index+1) ? 'top-center' : 'bottom-center'} onClick={() => this.props.onDelete(item)} ><DeleteIcon /></IconButton>
					<IconButton tooltip="Detail" tooltipPosition={ (list.length == index+1) ? 'top-center' : 'bottom-center'} onClick={() => this.props.onEdit(item)} ><EditIcon/></IconButton>
				</TableRowColumn>
			</TableRow>);
		return(
			<div>
				<FloatingActionButton style={fabStyle} mini onClick={this.props.onAdd}>
					<ContentAdd />
				</FloatingActionButton>
				<Table>
					<TableHeader
						displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
					>
						<TableRow>
							<TableHeaderColumn style={tableHeaderStyle}>
								<div style={{marginTop: '15px', float: 'left'}}>ID</div>
								<IconButton style={{float: 'right'}} onClick={() => this.handleColumnSortClick('id')}> { this.displaySort('id') }</IconButton>
							</TableHeaderColumn>
							<TableHeaderColumn style={tableHeaderStyle}>
								<div style={{marginTop: '15px', float: 'left'}}>Name</div>
								<IconButton style={{float: 'right'}} onClick={() => this.handleColumnSortClick('name')}> { this.displaySort('name') }</IconButton>
							</TableHeaderColumn>
							<TableHeaderColumn style={tableHeaderStyle}>
								<div style={{marginTop: '15px', float: 'left'}}>Alergen</div>
								<IconButton style={{float: 'right'}} onClick={() => this.handleColumnSortClick('isAlergen')}>	{ this.displaySort('isAlergen') }</IconButton>
							</TableHeaderColumn>
							<TableHeaderColumn style={tableIconsStyle}></TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} >
						{ this.props.feching? <TableRow><TableRowColumn><LinearProgress mode="indeterminate"/></TableRowColumn></TableRow> :  tableBody }
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default IngredientList;