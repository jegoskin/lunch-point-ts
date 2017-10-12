class Ingredient implements IIngredient {
	_id: string;
	name: string;
	isAlergen: boolean;

	constructor(dbEntity: IIngredient) {
		if(dbEntity._id)
			this._id = dbEntity._id;
		this.name = dbEntity.name;
		this.isAlergen = dbEntity.isAlergen;
	}
	json() {
		let result: IIngredient = {
			name: this.name,
			isAlergen: this.isAlergen,
		}
		if (this._id) result._id = this._id;
		return result;
	}
}
export default Ingredient;