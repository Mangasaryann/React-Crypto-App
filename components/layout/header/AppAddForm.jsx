import {
	Button,
	DatePicker,
	Divider,
	Flex,
	Form,
	InputNumber,
	Result,
	Select,
	Space,
	Typography,
} from 'antd'
import { useRef, useState } from 'react'
import { useCrypto } from '../../../src/context/crypto-context'

const validateMessages = {
	required: '${label} is required!',
	type: {
		number: '${label} in not valid number',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
}

function AppAddForm({ onClose }) {
	const { crypto, addAsset } = useCrypto()

	const [coin, setCoin] = useState(null)
	const [submitted, setSubmitted] = useState(false)
	const [form] = Form.useForm()
	const assetRef = useRef()
	if (submitted) {
		return (
			<Result
				status='success'
				title='New Asset Added'
				subTitle={`Added ${assetRef.current.amount} of ${coin.symbol} by price ${assetRef.current.price}`}
				extra={[
					<Button onClick={onClose} type='primary' key='console'>
						Close
					</Button>,
				]}
			/>
		)
	}
	if (!coin) {
		return (
			<Select
				onSelect={v => setCoin(crypto.find(c => c.id == v))}
				style={{ width: '100%' }}
				placeholder='Select coin'
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
		)
	}

	function onFinish(values) {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
		}
		assetRef.current = newAsset
		addAsset(newAsset)
		setSubmitted(true)
	}
	function handleAmountChange(value) {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		})
	}

	function handlePriceChange(value) {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(amount * value).toFixed(2),
		})
	}

	return (
		<>
			<Flex align='center' gap={10}>
				<img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
				<Typography.Title level={2} style={{ margin: 0 }}>
					{coin.name}
				</Typography.Title>
			</Flex>
			<Divider />
			<Form
				form={form}
				name='basic'
				style={{ width: '100%' }}
				initialValues={{
					price: +coin.price.toFixed(2),
				}}
				onFinish={onFinish}
				validateMessages={validateMessages}
			>
				<Form.Item
					label='Amount'
					name='amount'
					rules={[
						{
							required: true,
							type: 'number',
							min: 0,
						},
					]}
				>
					<InputNumber
						placeholder='Enter coin amount'
						onChange={handleAmountChange}
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item label='Price' name='price'>
					<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label='Date & Time' name='date'>
					<DatePicker showTime />
				</Form.Item>

				<Form.Item label='Total' name='total'>
					<InputNumber disabled style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item>
					<Button type='primary' style={{ width: '100%' }} htmlType='submit'>
						Add Asset
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default AppAddForm
