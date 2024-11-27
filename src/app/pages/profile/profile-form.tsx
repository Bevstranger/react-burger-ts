import styles from '../login.module.css';
import {
	Input,
	PasswordInput,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { authApi, useUpdateUserMutation } from '../../services/api/auth';
import PropTypes from 'prop-types';
import { useForm } from '../../components/hooks/useForm';

export const ProfileFormLoading = () => {
	const { data, isSuccess } = authApi.endpoints.getUser.useQuery();
	return <>{!isSuccess ? <p>Loading...</p> : <ProfileForm data={data} />}</>;
};

export const ProfileForm = ({ data }) => {
	const [updateUser] = useUpdateUserMutation();
	const { values, handleChange, setValues } = useForm({
		name: data?.user?.name || '',
		email: data?.user?.email || '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUser(values);
	};

	const handleCancel = () => {
		setValues({
			name: data?.user?.name || '',
			email: data?.user?.email || '',
			password: '',
		});
	};

	return (
		<form
			className={`${styles.profileFormContainer} ml-15`}
			onSubmit={handleSubmit}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				icon='EditIcon'
				size={'default'}
				value={values.name}
				extraClass='mt-6'
				onChange={handleChange}
				name='name'
			/>
			<EmailInput
				type={'text'}
				placeholder={'E-mail'}
				icon='EditIcon'
				value={values.email}
				size={'default'}
				extraClass='mt-6'
				onChange={handleChange}
				name='email'
			/>
			<PasswordInput
				value={values.password}
				name={'password'}
				icon='EditIcon'
				extraClass='mt-6'
				onChange={handleChange}
			/>
			<div className={styles.profileFormButtons}>
				<Button
					htmlType='button'
					onClick={handleCancel}
					type='secondary'
					size='medium'
					extraClass='mt-6'>
					Отмена
				</Button>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-6'>
					Сохранить
				</Button>
			</div>
		</form>
	);
};

ProfileForm.propTypes = {
	data: PropTypes.shape({
		user: PropTypes.shape({
			name: PropTypes.string,
			email: PropTypes.string,
		}),
	}),
};
