import { NavLink } from 'react-router-dom';
import {
	Button,
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { ingredientsRequest } from '../../services/ingredientsSlice';

function AppHeader() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(ingredientsRequest());
	}, [dispatch]);

	return (
		<header className={styles.headerWrapper}>
			<nav className={styles.navWrapper}>
				<Button
					htmlType='button'
					type='secondary'
					extraClass={styles.buttonHeader}>
					<BurgerIcon type='primary' />
					<NavLink to='/'>
						<span className={styles.textSpan}>Конструктор</span>
					</NavLink>
				</Button>

				<Button
					htmlType='button'
					type='secondary'
					extraClass={styles.buttonHeader}>
					<ListIcon type='primary' />
					<span className={styles.textSpan}>Лента заказов</span>
				</Button>
			</nav>
			<div className={styles.logo}>
				<NavLink to='/'>
					<Logo />
				</NavLink>
			</div>
			<div className={styles.profile}>
				<Button
					htmlType='button'
					type='secondary'
					extraClass={styles.buttonProfile}>
					<ProfileIcon type='primary' />
					<NavLink to='/profile'>
						<span className={styles.textSpan}>Личный кабинет</span>
					</NavLink>
				</Button>
			</div>
		</header>
	);
}

export default AppHeader;
