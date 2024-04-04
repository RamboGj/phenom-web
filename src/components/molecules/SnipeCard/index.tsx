import { Heading } from '@/components/atoms/Heading'
import { SnipeCell } from '@/components/atoms/SnipeCell'
import { Switch } from '@/components/atoms/Switch'
import { TrashButton } from '@/components/atoms/TrashButton'
import { ComponentProps, useState } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const snipeCard = tv({
  slots: {
    container: 'bg-gray900 rounded-xl border p-8',
    headerContainer: 'w-full flex items-center justify-between',
    actionsContainer: 'flex items-center gap-3',
    cellListContainer: 'grid grid-cols-5 gap-y-8 mt-6',
    cellItemContainer: 'col-span-1',
    titleStyle: 'text-purple50',
  },
  variants: {
    status: {
      default: {
        container: 'border-gray600 drop-shadow-md',
      },
      inactive: {
        container: 'border-transparent',
        title: 'text-gray600',
      },
      deprecated: {},
    },
  },
  defaultVariants: {
    status: 'default',
  },
})

interface SnipeCardProps
  extends VariantProps<typeof snipeCard>,
    ComponentProps<'div'> {
  title: string
  data: {
    title: string
    value: string
  }[]
  onOpenTurnOnModal: () => void
  onOpenDeleteModal: () => void
}

export function SnipeCard({
  title,
  data,
  status,
  className,
  onOpenDeleteModal,
  onOpenTurnOnModal,
  ...rest
}: SnipeCardProps) {
  const {
    actionsContainer,
    cellListContainer,
    container,
    headerContainer,
    cellItemContainer,
    titleStyle,
  } = snipeCard({ className, status })

  const [isOn, setIsOn] = useState<boolean>(false)

  function handleSwitch() {
    if (isOn) {
      setIsOn(false)
    } else {
      onOpenTurnOnModal()
    }
  }

  return (
    <div className={container()} {...rest}>
      <header className={headerContainer()}>
        <Heading className={titleStyle()} variant="h3">
          {title}
        </Heading>
        <div className={actionsContainer()}>
          <TrashButton onClick={onOpenDeleteModal} />
          <Switch checked={isOn} onClick={handleSwitch} />
        </div>
      </header>
      <ul className={cellListContainer()}>
        {data.map(({ title, value }) => {
          return (
            <li key={title} className={cellItemContainer()}>
              <SnipeCell title={title} value={value} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
