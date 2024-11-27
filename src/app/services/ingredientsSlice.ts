import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData, BASE_URL } from '../api/api';

const URL = `${BASE_URL}/ingredients`;

export interface IIngredientState {
	data: IDataItem[];
	error: boolean;
	fetching: boolean;
	fetched: boolean;
}

interface IDataItem {
	_id: string;
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

// interface IIngredientObject {
//   type: string;
//   ingredients: IDataItem[];
// }

export const ingredientsRequest = createAsyncThunk(
	'ing/ingredientsRequest',
	async () => {
		const response = await getData(URL);
		return response.data;
	}
);

const initialState: IIngredientState = {
	data: [],
	error: false,
	fetching: false,
	fetched: false,
};

export const ingSlice = createSlice({
	name: 'ing',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(ingredientsRequest.fulfilled, (state, action) => {
			state.data = action.payload;
			state.fetching = false;
			state.fetched = true;
		}),
			builder.addCase(ingredientsRequest.pending, (state) => {
				state.fetching = true;
				state.fetched = false;
			}),
			builder.addCase(ingredientsRequest.rejected, (state) => {
				state.fetching = false;
				state.fetched = false;
				state.error = true;
			});
	},
});
