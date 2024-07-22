import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Fonts from './styles/fonts';
import { Container, Heading, Stack, Text } from '@chakra-ui/react';
import { createBrowserRouter } from 'react-router-dom';
import RootRouter from './routes/RootRouter';

function App() {
	return (
		<>
			<RootRouter />
		</>
	);
}

export default App;
