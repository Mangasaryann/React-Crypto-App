import { Layout, Spin } from 'antd'
import { useContext } from 'react'
import CryptoContext from '../../../src/context/crypto-context'
import AppContent from '../AppContent'
import AppHeader from '../header/AppHeader'
import AppSidebar from './AppSidebar'

function AppLayout() {
	const { isLoading } = useContext(CryptoContext)
	if (isLoading) {
		return <Spin style={{ backgroundColor: '#000' }} fullscreen />
	}
	return (
		<Layout>
			<AppHeader />
			<Layout>
				<AppSidebar />
				<AppContent />
			</Layout>
		</Layout>
	)
}

export default AppLayout
