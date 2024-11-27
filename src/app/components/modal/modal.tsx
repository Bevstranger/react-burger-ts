import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css';

interface IModal {
	children: React.ReactNode;
	open: boolean;
	onClose: (value: boolean) => void;
	title?: string;
}

export const Modal: FC<IModal> = ({ children, open, onClose, title }) => {
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.code === 'Escape' || event.code === 'mouseDown') {
				onClose(false);
			}
		};

		const handleClickOutside = (event: MouseEvent): void => {
			if ((event.target as HTMLElement).closest(`.${styles.modal}`)) {
				return;
			}
			onClose(false);
		};

		document.addEventListener('keydown', handleEscapeKey);
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	if (!open) {
		return null;
	}

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			{
				<div className={styles.modal}>
					<div className={styles.details}>
						<div>
							<CloseIcon
								className={styles.iconClose}
								type='primary'
								onClick={() => {
									onClose(false);
								}}
							/>
						</div>
						{title && (
							<div className={`text text_type_main-large ${styles.title} `}>
								{title}
							</div>
						)}
						{children}
					</div>
				</div>
			}
		</>,
		document.getElementById('modal')!
	);
};
