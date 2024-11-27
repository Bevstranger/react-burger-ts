import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGetUserQuery, useRefreshMutation } from '../../services/api/auth';

const ProtectedRouteElement = ({ onlyUnAuth = false, element }) => {
	const location = useLocation();
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');

	const [refreshTokenMutation, { data: refreshData }] = useRefreshMutation();

	const { data, error, refetch } = useGetUserQuery({
		skip: !accessToken,
	});

	const isAuthorized = Boolean(data?.user);

	useEffect(() => {
		if (
			error?.data?.message === 'jwt expired' &&
			refreshToken &&
			!refreshData?.success
		) {
			refreshTokenMutation({ token: refreshToken })
				.then((res) => {
					if (res?.data?.success) {
						localStorage.setItem('refreshToken', res?.data.refreshToken);
						localStorage.setItem('accessToken', res?.data.accessToken);

						refetch();
					}
				})
				.catch((err) => console.error('Failed to refresh token:', err));
		}
	}, [
		error,
		refetch,
		refreshData?.success,
		refreshToken,
		refreshTokenMutation,
	]);

	if (!onlyUnAuth && !isAuthorized) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && isAuthorized) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return element;
};

ProtectedRouteElement.propTypes = {
	onlyUnAuth: PropTypes.bool,
	element: PropTypes.element.isRequired,
};

export const OnlyAuth = (props) => <ProtectedRouteElement {...props} />;
export const OnlyUnAuth = (props) => (
	<ProtectedRouteElement onlyUnAuth {...props} />
);
