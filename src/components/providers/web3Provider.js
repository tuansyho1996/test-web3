'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, sepolia, bsc, arbitrum, optimism, base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
    appName: 'My Web3 App',
    projectId: '600ff3ccff8155148627a3e3d0690701', // Tạo tại https://cloud.walletconnect.com/
    chains: [mainnet, sepolia, bsc, arbitrum, optimism, base],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [bsc.id]: http(),
        [arbitrum.id]: http(),
        [optimism.id]: http(),
        [base.id]: http(),
    },
})

const queryClient = new QueryClient()

export default function Web3Provider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
