import clsx from 'clsx';
import { useState } from 'react';
import s from './app.module.scss';
import reactLogo from './assets/react.svg';
import { ReactComponent as TypescriptLogo } from './assets/typescript.svg';
import {
	BurgerIcon,
	Button,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const App = () => {
	return (
		<>
			<nav
				style={{
					height: 50,
					color: 'white',
					display: 'flex',
					justifyContent: 'space-between',
					alignContent: 'center',
				}}>
				<Button
					htmlType='button'
					type='secondary'
					style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<BurgerIcon type='primary' />
					<span style={{ color: 'white' }}>(2024)</span>
				</Button>
				<Button
					htmlType='button'
					type='secondary'
					style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<ListIcon type='primary' />
					<span style={{ color: 'white', whiteSpace: 'nowrap' }}>
						Лента заказов
					</span>
				</Button>

				<Logo />

				<Button
					htmlType='button'
					type='secondary'
					style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<ProfileIcon type='primary' />
					<span style={{ color: 'white', whiteSpace: 'nowrap' }}>
						Личный кабинет
					</span>
				</Button>
			</nav>
		</>
	);
};
