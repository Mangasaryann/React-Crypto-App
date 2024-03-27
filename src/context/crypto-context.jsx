import { createContext, useContext, useEffect, useState } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../api'
import { percentDifferent } from '../utils'
const CryptoContext = createContext({
	assets: [],
	crypto: [],
	isLoading: false,
})

// eslint-disable-next-line react/prop-types
export function CryptoContextProvider({ children }) {
	const [isLoading, setIsLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [assets, setAssets] = useState([])
	function mapAssets(assets, result) {
		return assets.map(asset => {
			const coin = result.find(c => c.id == asset.id)
			return {
				grow: asset.price < coin.price,
				growPercent: percentDifferent(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfite: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset,
			}
		})
	}
	useEffect(() => {
		async function preload() {
			setIsLoading(true)
			const { result } = await fakeFetchCrypto()
			const assets = await fetchAssets()

			setCrypto(result)
			setAssets(mapAssets(assets, result))
			setIsLoading(false)
		}
		preload()
	}, [])

	function addAsset(newAsset) {
		setAssets(prev => mapAssets([...prev, newAsset], crypto))
	}

	return (
		<CryptoContext.Provider value={{ assets, crypto, isLoading, addAsset }}>
			{children}
		</CryptoContext.Provider>
	)
}

export default CryptoContext

export function useCrypto() {
	return useContext(CryptoContext)
}
