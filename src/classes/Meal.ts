class Meal implements IMeal {
	id: string;
	name: string;
	ingrediences: string[];

	constructor(dbEntity: IMeal) {
		if (dbEntity._id)
			this.id = dbEntity._id;
		this.name = dbEntity.name;
		this.ingrediences = dbEntity.ingrediences;
	}
	ingredientAdd(ingredientId: string): boolean {
		if (this.ingrediences.indexOf(ingredientId) > -1) {
			return false;
		} else {
			this.ingrediences.push(ingredientId);
			return true;
		}
	}
	json() {
		let result: IMeal = {
			name: this.name,
			ingrediences: this.ingrediences
		}
		if (this.id) result._id = this.id;
		return result;
	}
}
export default Meal;