import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, List, Statistic, Tag } from 'antd'
// import { capitalize } from '../../../src/utils'

function AppSidebarCard(asset) {
	console.log(asset)

	return (
		<Card style={{ marginBottom: '1rem' }} bordered={false}>
			<Statistic
				title={asset.id}
				value={asset.totalAmount}
				precision={2}
				valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
				prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
				suffix='$'
			/>
			<List
				size='small'
				dataSource={[
					{
						title: 'Total profit:',
						value: asset.totalProfite,
						withTag: true,
					},
					{ title: 'Asset Amount:', value: asset.amount, isPlain: true },
					{ title: 'Difference:', value: asset.growPercent },
				]}
				renderItem={item => (
					<List.Item>
						<span>{item.title}</span>
						<span>
							{item.withTag && (
								<Tag color={asset.grow ? 'green' : 'red'}>
									{asset.growPercent}%
								</Tag>
							)}
						</span>
					</List.Item>
				)}
			/>
		</Card>
	)
}

export default AppSidebarCard
