import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Layout, List, Statistic, Tag } from 'antd'
import { useContext } from 'react'
import CryptoContext from '../../../src/context/crypto-context'
import { capitalize } from '../../../src/utils'

export default function AppSidebar() {
	const { assets } = useContext(CryptoContext)

	return (
		<Layout.Sider width='25%' style={{ padding: '1rem' }}>
			{assets.map(asset => (
				<Card key={asset.id} style={{ marginBottom: '1rem' }} bordered={false}>
					<Statistic
						title={capitalize(asset.id)}
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
									{item.isPlain && item.value}
								</span>
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	)
}
