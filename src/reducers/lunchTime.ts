const initState = (): ILunchTimeState=> ({
	mealList: [],
	mealListFetching: false,
	meal: undefined,
	mealFetching: false,
	mealEditFetching: false,
	ingredientList: [],
	ingredientListFetching: false,
	ingredientAddFetching: false,
	ingredientDeleteFetching: false,
	ingredientEditFetching: false,
	mealDeleteFetching: false,
	mealAddFetching: false,
}) 

const lunchTime = (state: ILunchTimeState = initState(), action: IAction<any>) => {
	let newState = Object.assign({},state);
	switch (action.type) {
		case 'INGREDIENT_LIST_FETCHING':
			newState.ingredientListFetching = true;
			break;
		case 'INGREDIENT_LIST_SUCCESS':
			newState.ingredientList = action.payload;
			newState.ingredientListFetching = false;
			break;
		case 'MEAL_LIST_FETCHING':
			newState.mealListFetching = true;
			break;
		case 'MEAL_LIST_SUCCESS':
			newState.mealList = action.payload;
			newState.mealListFetching = false;
			break;
		case 'MEAL_DETAIL_FETCHING':
			newState.mealFetching = true;
			break;
		case 'MEAL_DETAIL_SUCCESS':
			newState.mealFetching = false;
			newState.meal = action.payload;
			break;
		case 'MEAL_EDIT_FETCHING':
			newState.mealEditFetching = true;
			break;
		case 'MEAL_EDIT_SUCCESS':
			newState.mealEditFetching = false;
			break;
		case 'INGREDIENT_ADD_FETCHING':
			newState.ingredientAddFetching = true;
			break;
		case 'INGREDIENT_ADD_SUCCESS':
			newState.ingredientAddFetching = false;
			break;
		case 'INGREDIENT_DELETE_FETCHING':
			newState.ingredientDeleteFetching = true;
			break;
		case 'INGREDIENT_DELETE_SUCCESS':
			newState.ingredientDeleteFetching = false;
			break;
		case 'INGREDIENT_EDIT_FETCHING':
			newState.ingredientEditFetching = true;
			break;
		case 'INGREDIENT_EDIT_SUCCESS':
			newState.ingredientEditFetching = false;
			break;
		case 'MEAL_DELETE_FETCHING':
			newState.mealDeleteFetching = true;
			break;
		case 'MEAL_DELETE_SUCCESS':
			newState.mealDeleteFetching = false;
			break;
		case 'MEAL_ADD_FETCHING':
			newState.mealAddFetching = true;
			break;
		case 'MEAL_ADD_SUCCESS':
			newState.mealAddFetching = false;
			break;
	}
	return newState;
}

export default lunchTime;