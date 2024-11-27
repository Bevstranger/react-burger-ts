import { createSlice } from '@reduxjs/toolkit';

interface IDataItem {
	_id: string;
	id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

const initialState: { data: { buns: IDataItem[]; ingredients: IDataItem[] } } =
	{
		data: {
			buns: [],
			ingredients: [],
		},
	};

export const constructSlice = createSlice({
	name: 'construct',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			if (action.payload.type === 'bun') {
				state.data.buns = [action.payload];
			} else {
				state.data.ingredients.push(action.payload);
			}
		},
		deleteIngredient: (state, action) => {
			state.data.ingredients = state.data.ingredients.filter(
				(item) => item.id !== action.payload
			);
		},
		reorderIngredients: (state, action) => {
			const { from: dragIndex, to: hoverIndex } = action.payload;
			const ingredients = state.data.ingredients;
			const [dragItem] = ingredients.splice(dragIndex, 1);
			ingredients.splice(hoverIndex, 0, dragItem);
		},
		resetIngredients: (state) => {
			state.data = {
				buns: [],
				ingredients: [],
			};
		},
	},
});

export const {
	addIngredient,
	deleteIngredient,
	reorderIngredients,
	resetIngredients,
} = constructSlice.actions;
