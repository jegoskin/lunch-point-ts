import api from '../api/api';

interface IServerResponse<T> {
	status: string;
	body: T
}

const API_COLLECTION = {
	ingredient: 'ingredient',
	meal: 'meal'
}

export const asyncListIngredient = (): FActionAsync<IIngredient[] | null> => ((dispach) => {
	dispach({
		type: 'INGREDIENT_LIST_FETCHING',
		payload: null
	})
	api.get(API_COLLECTION.ingredient)
		.then((result: IServerResponse<IIngredient[]>) => {
			dispach({
				type: 'INGREDIENT_LIST_SUCCESS',
				payload: result.body
			})
		})
})

export const asyncListMeal = (): FActionAsync<IMeal[] | null> => ((dispach) => {
	dispach({
		type: 'MEAL_LIST_FETCHING',
		payload: null
	})
	api.get(API_COLLECTION.meal)
		.then((result: IServerResponse<IMeal[]>) => {
			dispach({
				type: 'MEAL_LIST_SUCCESS',
				payload: result.body
			})
		})
})

export const asyncDetailMeal = (id: string): FActionAsync<IMeal | null> => ((dispach) => {
	dispach({
		type: 'MEAL_DETAIL_FETCHING',
		payload: null
	})
	api.get(API_COLLECTION.meal, id)
		.then((result: IServerResponse<IMeal>) => {
			dispach({
				type: 'MEAL_DETAIL_SUCCESS',
				payload: result.body
			})
		})
})

export const addIngredient = (newIngredient: IIngredient): FActionAsync<null> => ((dispach) => {
	dispach({
		type: 'INGREDIENT_ADD_FETCHING',
		payload: null
	})
	api.insert(API_COLLECTION.ingredient,newIngredient)
		.then((result: IServerResponse<IIngredient>) => {
			dispach({
				type: 'INGREDIENT_ADD_SUCCESS',
				payload: null
			})
			dispach(asyncListIngredient());
		})
})

export const deleteIngredient = (deletedIngredient: IIngredient): FActionAsync<null> => ((dispach) => {
	dispach({
		type: 'INGREDIENT_DELETE_FETCHING',
		payload: null
	})
	api.delete(API_COLLECTION.ingredient,deletedIngredient)
		.then((result: IServerResponse<IIngredient>) => {
			dispach({
				type: 'INGREDIENT_DELETE_SUCCESS',
				payload: null
			})
			dispach(asyncListIngredient());
		})
})

export const editIngredient = (newIngredient: IIngredient): FActionAsync<null> => ((dispach) => {
	dispach({
		type: 'INGREDIENT_EDIT_FETCHING',
		payload: null
	})
	api.update(API_COLLECTION.ingredient,newIngredient)
		.then((result: IServerResponse<IIngredient>) => {
			dispach({
				type: 'INGREDIENT_EDIT_SUCCESS',
				payload: null
			})
			dispach(asyncListIngredient());
		})
})

export const editMeal = (newMeal: IMeal): FActionAsync<null> => ((dispach) => {
	dispach({
		type: 'MEAL_EDIT_FETCHING',
		payload: null
	})
	api.update(API_COLLECTION.meal, newMeal)
		.then((result: IServerResponse<IMeal>) => {
			dispach({
				type: 'MEAL_EDIT_SUCCESS',
				payload: null
			})
			dispach(asyncDetailMeal(newMeal._id as string));
		})
})

export const deleteMeal = (deletedMeal: IMeal): FActionAsync<null> => ((dispach) => {
	dispach({
		type: 'MEAL_DELETE_FETCHING',
		payload: null
	})
	api.delete(API_COLLECTION.meal, deletedMeal)
		.then((result: IServerResponse<IMeal>) => {
			dispach({
				type: 'MEAL_DELETE_SUCCESS',
				payload: null
			})
			dispach(asyncListMeal());
		})
})

export const addMeal = (newMeal: IMeal): FActionAsync<null> => ((dispach) => {
	dispach({
		type: 'MEAL_ADD_FETCHING',
		payload: null
	})
	api.insert(API_COLLECTION.meal,newMeal)
		.then((result: IServerResponse<IMeal>) => {
			dispach({
				type: 'MEAL_ADD_SUCCESS',
				payload: null
			})
			dispach(asyncListMeal());
		})
})