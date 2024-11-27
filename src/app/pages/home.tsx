import { HTML5Backend } from 'react-dnd-html5-backend';
import Bur from '../components/burger-ingredients/Burger-Ingredients';
import Constructor from '../components/burger-constructor/Burger-Constructor';
import { DndProvider } from 'react-dnd';

export const Home = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<Bur />
			<Constructor />
		</DndProvider>
	);
};
