interface ILogsState {
	list: string[];
	lastLog?: string;
}

interface ILunchTimeState {
	mealList: IMeal[];
	mealListFetching: boolean;
	meal?: IMeal;
	mealFetching: boolean;
	mealEditFetching: boolean,
	ingredientList: IIngredient[];
	ingredientListFetching: boolean;
	ingredientAddFetching: boolean;
	ingredientDeleteFetching: boolean;
	ingredientEditFetching: boolean;
	mealDeleteFetching: boolean;
	mealAddFetching: boolean;
}

//Application State
interface IAppState {
	logs: ILogsState;
	lunchTime: ILunchTimeState
}
