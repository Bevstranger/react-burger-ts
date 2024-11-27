import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef, useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './burger-ingredients.module.css';
import Item from './burger-ingredients-item';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

function BurgerIngredients() {
	const data = useSelector((state: RootState) => state.ing.data);
	const dataIng = useSelector(
		(state: RootState) => state.construct.data.ingredients
	);
	const dataBuns = useSelector((state: RootState) => state.construct.data.buns);

	const [current, setCurrent] = useState<string>('Булки');

	const bunRef = useRef<HTMLDivElement | null>(null);
	const sauceRef = useRef<HTMLDivElement | null>(null);
	const fillingRef = useRef<HTMLDivElement | null>(null);

	const buns = data.filter((item) => item.type === 'bun');
	const sauces = data.filter((item) => item.type === 'sauce');
	const fillings = data.filter((item) => item.type === 'main');

	const [bunInViewRef, bunInView] = useInView({ threshold: 0.5 });
	const [sauceInViewRef, sauceInView] = useInView({ threshold: 0.5 });
	const [fillingInViewRef, fillingInView] = useInView({ threshold: 0.5 });

	const handleScroll = useCallback(() => {
		if (bunInView) {
			setCurrent('Булки');
		} else if (sauceInView) {
			setCurrent('Соусы');
		} else if (fillingInView) {
			setCurrent('Начинки');
		}
	}, [bunInView, sauceInView, fillingInView]);

	return (
		<section className={styles.container}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
			<div className={styles.tabs}>
				<Tab
					value='Булки'
					active={current === 'Булки'}
					onClick={() =>
						bunRef.current?.scrollIntoView({ behavior: 'smooth' })
					}>
					Булки
				</Tab>
				<Tab
					value='Соусы'
					active={current === 'Соусы'}
					onClick={() =>
						sauceRef.current?.scrollIntoView({ behavior: 'smooth' })
					}>
					Соусы
				</Tab>
				<Tab
					value='Начинки'
					active={current === 'Начинки'}
					onClick={() =>
						fillingRef.current?.scrollIntoView({ behavior: 'smooth' })
					}>
					Начинки
				</Tab>
			</div>
			<div className={`mt-10 ${styles.ingredients}`} onScroll={handleScroll}>
				<WrapperGroup title='Булки' ref={bunRef} inViewRef={bunInViewRef}>
					{buns.map((data) => (
						<Item
							key={data._id}
							{...data}
							id={data._id}
							count={
								dataBuns?.filter((item) => item?._id === data._id).length === 1
									? 2
									: 0
							}
						/>
					))}
				</WrapperGroup>
				<WrapperGroup title='Соусы' ref={sauceRef} inViewRef={sauceInViewRef}>
					{sauces.map(({ name, _id, ...data }) => (
						<Item
							count={dataIng?.filter((item) => item?.name === name).length}
							key={_id}
							name={name}
							id={_id}
							{...data}
						/>
					))}
				</WrapperGroup>
				<WrapperGroup
					title='Начинки'
					ref={fillingRef}
					inViewRef={fillingInViewRef}>
					{fillings.map(({ name, _id, ...data }) => (
						<Item
							key={_id}
							name={name}
							id={_id}
							{...data}
							count={dataIng?.filter((item) => item?.name === name).length}
						/>
					))}
				</WrapperGroup>
			</div>
		</section>
	);
}

export default BurgerIngredients;

interface WrapperGroupProps {
	title: string;
	children: React.ReactNode;
	inViewRef: (node?: Element | null) => void;
}

const WrapperGroup = React.forwardRef<HTMLDivElement, WrapperGroupProps>(
	({ title, children, inViewRef }, ref) => (
		<div ref={ref}>
			<div ref={inViewRef} className='text text_type_main-medium'>
				{title}
			</div>
			<div className={`mb-10 mt-6 ${styles.list}`}>{children}</div>
		</div>
	)
);

WrapperGroup.displayName = 'WrapperGroup';
