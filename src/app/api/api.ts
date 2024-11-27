export const getData = async (url: string) => {
	const response = await fetch(url);
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const postData = async (
	url: string,
	data: { ingredients: string[] }
) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export const BASE_URL = 'https://norma.nomoreparties.space/api';
