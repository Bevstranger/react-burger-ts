import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, BASE_URL } from '../api/api';
import { resetIngredients } from './constructSlice';

interface IOrderDetailsState {
	order: IOrderInfo | null;
	orderRequest: boolean;
	orderRequestError: boolean;
}

// {
//     "success": true,
//     "name": "Space бургер",
//     "order": {
//         "number": 1448
//     }
// }

interface IOrderInfo {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

const initialState: IOrderDetailsState = {
	order: null,
	orderRequest: false,
	orderRequestError: false,
};

export const postOrder = createAsyncThunk(
	'order/postOrder',
	async (orderDetails: string[], { dispatch }) => {
		const body = {
			ingredients: orderDetails,
		};
		return await postData(`${BASE_URL}/orders`, body).then((response) => {
			dispatch(resetIngredients());
			return response;
		});
	}
);

export const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(postOrder.pending, (state) => {
			state.orderRequest = true;
			state.orderRequestError = false;
		}),
			builder.addCase(postOrder.fulfilled, (state, action) => {
				if (action.payload && action.payload.order) {
					state.order = action.payload;
				} else {
					state.orderRequestError = true;
				}
				state.orderRequest = false;
			});
		builder.addCase(postOrder.rejected, (state) => {
			state.orderRequest = false;
			state.orderRequestError = true;
		});
	},
});
