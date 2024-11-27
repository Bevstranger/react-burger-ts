import {
	Button,
	PasswordInput,
	Input,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.css';
import { useRegisterMutation } from '../services/api/auth';
import { useForm } from '../components/hooks/useForm';
import { useEffect } from 'react';

export function Register() {
	const navigate = useNavigate();

	const { values, handleChange } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const [register, { isSuccess }] = useRegisterMutation();

	const onRegister = async (e) => {
		e.preventDefault();
		await register(values);
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/');
		}
	}, [isSuccess, navigate]);

	return (
		<section className={`${style.wr} ${style.textCenter}`}>
			<form onSubmit={onRegister}>
				<p className='text text_type_main-medium mb-6 mt-20'>Регистрация</p>
				<Input
					onChange={handleChange}
					value={values.name}
					name={'name'}
					placeholder={'Имя'}
					extraClass='mb-6'
				/>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					extraClass='mb-6'
				/>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
					extraClass='mb-6'
				/>
				<Button type='primary' size='large' htmlType='submit'>
					<p className='text text_type_main-default'>Зарегистрироваться</p>
				</Button>
			</form>
			<p className={`text text_type_main-default ${style.textCenter} mt-20`}>
				Уже зарегистрированы? <Link to='/login'>Войти</Link>
			</p>
		</section>
	);
}
