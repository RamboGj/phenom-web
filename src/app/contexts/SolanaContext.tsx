/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { ReactNode, useCallback, useMemo } from 'react'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { Adapter } from '@solana/wallet-adapter-base'
import axios from 'axios'
import base58 from 'bs58'
import { getCookie, setCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'
import { useRouter } from 'next/navigation'

export function SolanaContextProvider({ children }: { children: ReactNode }) {
  const network = 'devnet' // Use 'mainnet-beta' for production
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  const { push } = useRouter()

  const autoSignIn = useCallback(async (adapter: Adapter) => {
    const jwt = getCookie(COOKIES_KEY.JWT)

    console.log('jwt', jwt)

    if (jwt) return true
    if (!('signIn' in adapter)) return true

    const output = await adapter.signIn()

    const signatureBase58 = base58.encode(output.signature)
    const publicKeyBase58 = base58.encode(output.account.publicKey)

    console.log('output', output)

    try {
      await axios('https://api.natoshi.app/v1/user/register', {
        method: 'POST',
        data: {
          walletAddress: publicKeyBase58,
          signature: signatureBase58,
          message: output.signedMessage.toString(),
        },
      }).then((res) => {
        setCookie(COOKIES_KEY.JWT, res.data.token, { maxAge: 60 * 60 * 24 })
        push('/setup')
      })
    } catch (err: any) {
      console.log('err', err.response.status)

      if (err.response.status === 409) {
        await axios('https://api.natoshi.app/v1/user/login', {
          method: 'POST',
          data: {
            walletAddress: publicKeyBase58,
            signature: signatureBase58,
            message: output.signedMessage.toString(),
          },
        }).then((res) => {
          setCookie(COOKIES_KEY.JWT, res.data.token, { maxAge: 60 * 60 * 24 })
          push('/')
        })
      }
    }

    return false
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect={autoSignIn}
        onError={(err) => console.log('ERRO', err)}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}