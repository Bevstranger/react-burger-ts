import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import style from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/api/auth';

export const ResetPassword = () => {
	const navigate = useNavigate();
	const [resetPassword] = useResetPasswordMutation();
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleCodeChange = (e) => {
		setCode(e.target.value);
	};

	const handleReset = (e) => {
		e.preventDefault();
		resetPassword({ password: password, token: code });
		navigate('/login');
	};

	return (
		<section className={`${style.wr} ${style.textCenter}`}>
			<form onSubmit={handleReset}>
				<p className='text text_type_main-medium mb-6 mt-20'>
					Восстановление пароля
				</p>
				<PasswordInput
					onChange={handlePasswordChange}
					value={password}
					name={'password'}
					extraClass='mb-6'
					autoComplete='off'
					label='Пароль'
				/>
				<Input
					onChange={handleCodeChange}
					value={code}
					name={'code'}
					extraClass='mb-6'
					autoComplete='off'
					label='Код из письма'
					placeholder='Введите код из письма'
				/>
				<Button type='primary' size='medium' htmlType='submit'>
					<p className='text text_type_main-default'>Сохранить</p>
				</Button>
			</form>
			<p className={`text text_type_main-default ${style.textCenter} mt-20`}>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</p>
		</section>
	);
};
