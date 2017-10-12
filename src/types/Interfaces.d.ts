interface IIngredient {
	_id?: string;
	name: string;
	isAlergen: boolean;
}

interface IMeal {
	_id?: string;
	name: string;
	ingrediences: string[];
}