'use client'

import Image from 'next/image'
import phenom from '@/assets/phantom-logo.png'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import { Footer } from '@/components/atoms/Footer'
import { Header } from '@/components/atoms/Header'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { push } = useRouter()

  return (
    <main className="w-full flex items-center flex-col min-h-screen">
      <Header />
      <div className="mt-[200px] flex-1">
        <div className="max-w-[465px] w-full flex flex-col items-center px-8 py-10 bg-gray700 border border-gray500 rounded-[24px]">
          <Heading variant="h2">Connect your wallet</Heading>
          <Paragraph className="mt-3 text-center mb-[100px]">
            Sign in with your phantom wallet in order to enter the dapp
          </Paragraph>

          <Button variant="ghost" onClick={() => push('/')}>
            <Button.Icon>
              <Image src={phenom} height={26} alt="Phantom Wallet Logo" />
            </Button.Icon>
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}