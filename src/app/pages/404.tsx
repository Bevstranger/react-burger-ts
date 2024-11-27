import { NavLink } from 'react-router-dom';
import styles from './login.module.css';
export function NotFound404() {
	return (
		<div className={styles.textCenter}>
			<p className='text text_type_main-large mt-25 mb-6'>
				Такой страницы не существует
			</p>
			<NavLink to='/'>
				<p className='text text_type_main-medium'>Вернуться на главную</p>
			</NavLink>
		</div>
	);
}
