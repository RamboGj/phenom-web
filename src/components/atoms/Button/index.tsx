'use client'

import { CircleNotch } from '@phosphor-icons/react'
import { ComponentProps, ReactNode } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  slots: {
    container:
      'w-full h-[42px] lg:h-[52px] w-full px-2 border rounded-lg hover:transtion-colors duration-300 group flex justify-center items-center',
    label: 'text-purple50 text-sm lg:text-lg font-bold drop-shadow-sm',
  },
  variants: {
    variant: {
      primary: {
        container:
          'bg-purple600 border-purple500 hover:bg-purple800 disabled:bg-purple800 disabled:border-transparent',
        label: 'group-disabled:text-gray300',
      },
      ghost: {
        container:
          'bg-transparent border-purple500 hover:border-purple200 disabled:border-gray500',
        label: 'group-disabled:text-gray500',
      },
      danger: {
        container:
          'bg-danger500 border-danger700 hover:bg-danger600 disabled:border-transparent disabled:bg-danger700',
        label: 'group-disabled:text-gray300',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {
  isLoading?: boolean
}

interface ButtonLabelProps
  extends VariantProps<typeof button>,
    ComponentProps<'span'> {}

function Button({
  variant,
  className,
  isLoading,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const { container } = button({ variant, className })

  return (
    <button disabled={isLoading || disabled} className={container()} {...rest}>
      {isLoading ? <CircleNotch className="animate-spin" /> : <>{children}</>}
    </button>
  )
}

function ButtonLabel({ variant, ...rest }: ButtonLabelProps) {
  const { label } = button({ variant })

  return <span className={label()} {...rest} />
}
function ButtonIcon({ children }: { children: ReactNode }) {
  return children
}

Button.Label = ButtonLabel
Button.Icon = ButtonIcon

export { Button }
