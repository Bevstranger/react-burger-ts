import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import style from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../services/api/auth';

export const ForgotPassword = () => {
	const navigate = useNavigate();

	const [forgotPassword] = useForgotPasswordMutation();
	const [value, setValue] = useState('');

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const handleReset = async (e, value) => {
		e.preventDefault();
		await forgotPassword({ email: value });
		navigate('/reset-password');
	};

	return (
		<section className={`${style.wr} ${style.textCenter}`}>
			<form onSubmit={(e) => handleReset(e, value)}>
				<p className='text text_type_main-medium mb-6 mt-20'>
					Восстановление пароля
				</p>
				<EmailInput
					onChange={onChange}
					value={value}
					name={'email'}
					extraClass='mb-6'
				/>
				<Button type='primary' size='large' htmlType='submit'>
					<p className='text text_type_main-default'>Восстановить</p>
				</Button>
			</form>
			<p className={`text text_type_main-default ${style.textCenter} mt-20`}>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</p>
		</section>
	);
};
