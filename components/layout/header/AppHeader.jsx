import { Button, Drawer, Layout, Modal, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useCrypto } from '../../../src/context/crypto-context'
import AppAddForm from './AppAddForm'
import AppCoinInfo from './AppCoinInfo'

const headerStyle = {
	width: '100%',
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
}

function AppHeader() {
	const [select, setSelect] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [open, setOpen] = useState(false)
	const [coin, setCoin] = useState(null)
	const { crypto } = useCrypto()

	useEffect(() => {
		const keypress = event => {
			if (event.key == '/') {
				setSelect(prev => !prev)
			}
		}
		document.addEventListener('keypress', keypress)
		return () => document.removeEventListener('keypress', keypress)
	}, [])

	function handleSelect(value) {
		setIsModalOpen(true)
		setCoin(crypto.find(c => c.id == value))
	}
	function onClose() {
		setOpen(false)
	}
	return (
		<Layout.Header style={headerStyle}>
			<Select
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect(prev => !prev)}
				style={{ width: '15%' }}
				value='press / to open'
				options={crypto.map(coin => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={option => (
					<Space>
						<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
							<img
								style={{ width: 25 }}
								src={option.data.icon}
								alt={option.data.label}
							/>
							<span>{option.data.label}</span>
						</div>
					</Space>
				)}
			/>
			<Button onClick={() => setOpen(true)} type='primary'>
				Add Asset
			</Button>
			<Modal
				open={isModalOpen}
				footer={null}
				onCancel={() => setIsModalOpen(false)}
			>
				<AppCoinInfo coin={coin} />
			</Modal>
			<Drawer
				destroyOnClose
				title='Add Asset'
				onClose={() => setOpen(false)}
				open={open}
			>
				<AppAddForm onClose={onClose} />
			</Drawer>
		</Layout.Header>
	)
}

export default AppHeader
