import { Layout, Typography } from 'antd'
import { useCrypto } from '../../src/context/crypto-context'
import AssetTable from './AssetTable'
import PortfolioChart from './PortfolioChart'

function AppContent() {
	const { assets, crypto } = useCrypto()
	const cryptoPriceMap = crypto.reduce((acc, v) => {
		acc[v.id] = v.price
		return acc
	}, {})
	return (
		<Layout.Content
			style={{
				textAlign: 'center',
				minHeight: 'calc(100vh - 60px)',
				backgroundColor: '#001529',
				padding: '1rem',
			}}
		>
			<Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
				Portfolio:{' '}
				<span>
					{assets
						.map(asset => asset.amount * cryptoPriceMap[asset.id])
						.reduce((agg, v) => (agg += v), 0)
						.toFixed(2)}
					$
				</span>
			</Typography.Title>
			<PortfolioChart />
			<AssetTable />
		</Layout.Content>
	)
}

export default AppContent
