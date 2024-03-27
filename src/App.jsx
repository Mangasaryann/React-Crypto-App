import AppLayout from '../components/layout/sidebar/AppLayout'
import { CryptoContextProvider } from './context/crypto-context'

const App = () => (
	<CryptoContextProvider>
		<AppLayout />
	</CryptoContextProvider>
)
export default App
