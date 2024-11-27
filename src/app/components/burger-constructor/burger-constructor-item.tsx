import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { deleteIngredient } from '../../services/constructSlice';
import { useDispatch } from 'react-redux';
import { useRef, FC } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

interface IConstItemProps {
	image: string;
	name: string;
	price: number;
	id: string;
	index: number;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface IDragItem {
	index: number;
	type: string;
}

const ConstItem: FC<IConstItemProps> = ({
	image,
	name,
	price,
	id,
	index,
	moveCard,
}) => {
	const dispatch = useDispatch();

	const ref = useRef<HTMLDivElement>(null);
	const [{ handlerId }, drop] = useDrop({
		accept: 'card',

		collect(monitor: DropTargetMonitor<IDragItem, void>) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item) {
			const { index: dragIndex } = item;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) return;
			moveCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: 'card',

		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<>
			<div
				className={'text text_type_main-default'}
				style={{ display: 'flex', alignItems: 'center', opacity }}
				ref={ref}
				data-handler-id={handlerId}>
				<span className={styles.draggable}>
					<DragIcon type='primary' />
				</span>
				<ConstructorElement
					text={name}
					price={price}
					thumbnail={image}
					handleClose={() => {
						dispatch(deleteIngredient(id));
					}}
				/>
			</div>
		</>
	);
};

export default ConstItem;
