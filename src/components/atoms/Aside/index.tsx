'use client'

import { Globe, Icon } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export interface AsideNavigationItemProps {
  title: string
  icon: Icon
  path: string
}

export function Aside() {
  const pathname = usePathname()

  const asideItems = [
    {
      title: 'Overview',
      icon: <Globe size={24} color="#524D48" />,
      activeIcon: <Globe size={24} color="#FFFFFF" />,
      path: '/dashboard/overview',
    },
    {
      title: 'Instances',
      icon: <Globe size={24} color="#524D48" />,
      activeIcon: <Globe size={24} color="#FFFFFF" />,
      path: '/dashboard/instances',
    },
  ]

  return (
    <aside className="flex h-screen w-[300px] flex-col border-b border-r border-gray500/10 bg-gray800/60 px-4 py-8">
      <ul className="flex flex-col gap-y-5">
        {asideItems.map(({ icon, title, path, activeIcon }) => {
          const isActive = pathname.includes(path)

          return (
            <li key={path}>
              <Link href={path}>
                <div
                  className={twMerge(
                    'flex h-[52px] w-[270px] items-center gap-3 rounded-[4px] px-4',
                    isActive ? 'bg-yellow600' : 'bg-gray900',
                  )}
                >
                  {isActive ? activeIcon : icon}
                  <span
                    className={twMerge(
                      isActive ? 'text-white' : 'text-gray500',
                    )}
                  >
                    {title}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}