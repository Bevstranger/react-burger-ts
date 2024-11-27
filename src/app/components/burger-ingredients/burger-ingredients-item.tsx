import PropTypes from 'prop-types';

import { FC } from 'react';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import { useDrag } from 'react-dnd';
// import { useAppDispatch } from '../../services/store';
// import { setIngredientsDetails } from '../../services/ingrenietsDetailsSlice';
import { Link, useLocation } from 'react-router-dom';

interface IItem {
	image: string;
	name: string;
	price: number;
	count: number;
	id: string;
}

const Item: FC<IItem> = (props) => {
	const location = useLocation();

	const { image, name, price, count, id } = props;
	// const dispatch = useAppDispatch();

	const [{ opacity }, dragRef] = useDrag({
		type: 'ingredients',
		item: { id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});
	// const [showModal, setShowModal] = useState(false);
	return (
		<>
			<Link
				to={`/ingredients/${id}`}
				state={{ background: location }}
				className={styles.link}>
				<div
					ref={dragRef}
					style={{ opacity }}
					// onClick={() => {
					// 	dispatch(setIngredientsDetails(props));
					// 	setShowModal(!showModal);
					// 	// navigate(`/ingredients/${id}`);
					// }}
					className={`text text_type_main-default mb-2 ${styles.item}`}>
					<Counter count={count} size='default' />
					<img
						className='ml-4 mr-4'
						src={image}
						alt={name}
						style={{ color: 'white' }}
					/>
					<div className={`mt-1 mb-1 ${styles.price}`}>
						<span className='text text_type_digits-default mr-2'>{price}</span>
						<CurrencyIcon type='primary' />
					</div>
					<p className={`text text_type_main-default ${styles.name}`}>{name}</p>
				</div>
			</Link>
		</>
	);
};

Item.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	count: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
};

export default Item;
