import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	calories: 0,
	proteins: 0,
	carbohydrates: 0,
	fat: 0,
	image_large: '',
};

export const ingredientsDetailsSlice = createSlice({
	name: 'ingredientsDetails',
	initialState,

	reducers: {
		setIngredientsDetails: (state, action) => {
			return {
				...action.payload,
			};
		},
	},
});

export const { setIngredientsDetails } = ingredientsDetailsSlice.actions;
