import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
	children?: ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			pt='10rem'
			h='100vh'
			bg='gray.800'
			gap='5rem'
		>
			{children}
		</Flex>
	);
}
