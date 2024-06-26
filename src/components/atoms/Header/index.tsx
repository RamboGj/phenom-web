'use client'

import Image from 'next/image'
import sanji from '@/assets/sanji-logo.svg'
import { usePathname, useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { SignOut } from '@phosphor-icons/react'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'

export function Header() {
  const pathname = usePathname()
  const { push } = useRouter()

  const isAuthRouter = pathname.includes('auth')

  const { disconnect } = useWallet()

  async function onDisconnect() {
    await disconnect()
    deleteCookie(COOKIES_KEY.JWT)
    deleteCookie(COOKIES_KEY.PUBLIC_KEY)
    push('/auth')
  }

  return (
    <header className="flex h-[72px] w-full justify-center border-b border-gray600">
      <nav
        className={`flex w-full max-w-[1592px] items-center px-4 lg:px-[50px] ${isAuthRouter ? 'justify-center' : 'justify-between'}`}
      >
        <Link href="/">
          <Image src={sanji} alt="Sanji logo" />
        </Link>
        {isAuthRouter ? null : (
          <button
            className="group flex items-center gap-3"
            onClick={onDisconnect}
          >
            <span className="hidden text-danger500 group-hover:text-danger600 lg:block">
              Sign out
            </span>
            <SignOut
              className="text-danger500 group-hover:text-danger600"
              size={24}
              weight="bold"
            />
          </button>
        )}
      </nav>
    </header>
  )
}
