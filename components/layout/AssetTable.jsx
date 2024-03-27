import { Table } from 'antd'
import { useCrypto } from '../../src/context/crypto-context'

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Price $',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		sorter: (a, b) => a.amount - b.amount,
	},
]

function AssetTable() {
	const { assets } = useCrypto()
	return (
		<div style={{ marginTop: '20px' }}>
			<Table
				pagination={false}
				columns={columns}
				dataSource={assets.map(asset => ({
					key: asset.id,
					name: asset.name,
					price: asset.price,
					amount: asset.amount,
				}))}
			/>
		</div>
	)
}

export default AssetTable
