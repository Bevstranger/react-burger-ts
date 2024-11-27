/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { FC } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<{ onClose: () => void }> = ({ onClose }) => {
	return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
