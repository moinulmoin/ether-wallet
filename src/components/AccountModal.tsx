import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { useEthers, useTransactions } from '@usedapp/core';
import { useEffect, useState } from 'react';
import Identicon from './Identicon';

export default function AccountModal({ isOpen, onClose }: any) {
	const { account, deactivate } = useEthers();
	const [isCopied, setIsCopied] = useState(false);
	const { transactions } = useTransactions();

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 2500);
		}
	}, [isCopied]);

	function handleDeactivateAccount() {
		deactivate();
		onClose();
	}

	async function handleCopyAddress() {
		await navigator.clipboard.writeText(account as string);
		if (!isCopied) {
			setIsCopied(true);
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
			<ModalOverlay />
			<ModalContent
				background='gray.900'
				border='1px'
				borderStyle='solid'
				borderColor='gray.700'
				borderRadius='3xl'
			>
				<ModalHeader
					color='white'
					px={4}
					fontSize='lg'
					fontWeight='medium'
				>
					Account
				</ModalHeader>
				<ModalCloseButton
					color='white'
					fontSize='sm'
					_hover={{
						color: 'whiteAlpha.700',
					}}
				/>
				<ModalBody pt={0} px={4}>
					<Box
						borderRadius='3xl'
						border='1px'
						borderStyle='solid'
						borderColor='gray.600'
						px={5}
						pt={4}
						pb={2}
						mb={3}
					>
						<Flex
							justifyContent='space-between'
							alignItems='center'
							mb={3}
						>
							<Text color='gray.400' fontSize='sm'>
								Connected with MetaMask
							</Text>
							<Button
								variant='outline'
								size='sm'
								borderColor='blue.800'
								borderRadius='3xl'
								color='blue.500'
								fontSize='13px'
								fontWeight='normal'
								px={2}
								height='26px'
								_hover={{
									background: 'none',
									borderColor: 'blue.300',
									textDecoration: 'underline',
								}}
								onClick={handleDeactivateAccount}
							>
								Disconnect
							</Button>
						</Flex>
						<Flex alignItems='center' mt={2} mb={4} lineHeight={1}>
							<Identicon />
							<Text
								color='white'
								fontSize='xl'
								fontWeight='semibold'
								ml='2'
								lineHeight='1.1'
							>
								{account &&
									`${account.slice(0, 6)}...${account.slice(
										account.length - 4,
										account.length
									)}`}
							</Text>
						</Flex>
						<Flex alignContent='center' m={3}>
							<Button
								variant='ghost'
								color='gray.400'
								fontWeight='normal'
								fontSize='sm'
								_hover={{
									bg: 'none',
									color: 'whiteAlpha.800',
								}}
								_active={{
									bg: 'none',
								}}
								_focus={{
									bg: 'none',
									color: 'whiteAlpha.800',
								}}
								onClick={handleCopyAddress}
							>
								{isCopied ? (
									'Copied!'
								) : (
									<>
										<CopyIcon mr={1} />
										Copy Address
									</>
								)}
							</Button>
							<Link
								fontSize='sm'
								display='flex'
								alignItems='center'
								href={`https://rinkeby.etherscan.io/address/${account}`}
								isExternal
								color='gray.400'
								ml={6}
								_hover={{
									color: 'whiteAlpha.800',
									textDecoration: 'underline',
								}}
								_focus={{
									border: 'none',
								}}
							>
								<ExternalLinkIcon mr={1} />
								View on Explorer
							</Link>
						</Flex>
					</Box>
				</ModalBody>

				<ModalFooter
					justifyContent='end'
					background='gray.700'
					borderBottomLeftRadius='3xl'
					borderBottomRightRadius='3xl'
					p={6}
				>
					<Text
						color='white'
						textAlign='left'
						fontWeight='medium'
						fontSize='md'
					>
						{transactions.length !== 0
							? transactions.map((transaction) => (
									<div key={transaction.transaction.hash}>
										<span>{transaction.transaction}</span>
										<span>
											{transaction.transactionName}
										</span>
										<span>
											{transaction.transaction.hash}
										</span>
										<span>{transaction.submittedAt}</span>
									</div>
							  ))
							: 'Your transactions willl appear here...'}
					</Text>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
