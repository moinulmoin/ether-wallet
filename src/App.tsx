import {
	Alert,
	AlertIcon,
	ChakraProvider,
	Heading,
	Link,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import AccountModal from './components/AccountModal';
import ConnectButton from './components/ConnectButton';
import Layout from './components/Layout';
import theme from './theme';

function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<ChakraProvider theme={theme}>
			<Alert
				variant='left-accent'
				status='info'
				sx={{
					width: 'max-content',
					position: 'absolute',
					right: 0,
					top: 0,
					marginTop: '2rem',
				}}
			>
				<AlertIcon />
				Use Rinkby Network to view wallet on etherscan!
			</Alert>
			<Layout>
				<Heading as='h1' size='xl' color='white' textAlign='center'>
					Ether Wallet
				</Heading>
				<ConnectButton handleOpenModal={onOpen} />
				<AccountModal isOpen={isOpen} onClose={onClose} />
				<Text color='white'>
					Thank for visiting. Made with 💖 by{' '}
					<Link
						href='https://moinulmoin.com'
						color='blue.500'
						_hover={{ border: 'none' }}
						_focus={{ border: 'none' }}
						isExternal
					>
						Moinul Moin
					</Link>
				</Text>
			</Layout>
		</ChakraProvider>
	);
}

export default App;
