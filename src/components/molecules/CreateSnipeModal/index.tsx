import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { Switch } from '@/components/atoms/Switch'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useState } from 'react'
import { Label } from '@/components/atoms/Label'
import { ModalProps } from '@/@types/app'

export function CreateSnipeModal({ onClose }: ModalProps) {
  const [isMintRenounced, setIsMintRenounced] = useState<boolean>(false)
  const [isAutoSell, setIsAutoSell] = useState<boolean>(false)
  const [gasBid, setGasBid] = useState<string>('low')

  const gasBidMocks = [
    {
      title: 'Low',
      value: 'low',
    },
    {
      title: 'Medium',
      value: 'medium',
    },
    {
      title: 'High',
      value: 'high',
    },
    {
      title: 'Max',
      value: 'max',
    },
  ]

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-gray900/80" />
      <Dialog.Content className="fixed left-[50%] top-[50%] w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 text-purple50 focus:outline-none">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 opacity-0" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              CREATE SNIPE
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-purple500" />
          </Dialog.Close>
        </div>

        <div className="mt-4 h-px w-full bg-gray500" />

        <div className="mt-5 flex flex-col gap-y-6">
          <Input
            label="Minting address"
            id="minting"
            placeholder="Ox..."
            tooltipContent="label hello"
          />
          <div className="grid grid-cols-2 gap-x-8">
            <Input
              className="col-span-1"
              label="Quote amount"
              id="minting"
              placeholder="200 $SOL"
              tooltipContent="label hello"
            />
            <Input
              className="col-span-1"
              label="Minimum pool size"
              id="minting"
              placeholder="1.000 $SOL"
              tooltipContent="label hello"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="col-span-1 flex flex-col gap-3">
              <Label
                label={'Is mint renounced?'}
                tooltipContent="Place Cell description here."
              />
              <Switch
                checked={isMintRenounced}
                onClick={() => setIsMintRenounced((prev) => !prev)}
              />
            </div>

            <div>
              <Label
                label="Gas bid"
                tooltipContent="Place Cell description here."
              />

              <div className="mt-3 flex flex-wrap gap-3">
                {gasBidMocks.map(({ title, value }) => {
                  const isChecked = gasBid === value

                  return (
                    <div key={title} className="flex items-center gap-1">
                      <Checkbox.Root
                        onClick={() => setGasBid(value)}
                        checked={true}
                        className={`h-6 w-6 rounded-full border ${isChecked ? 'border-transparent bg-purple500' : 'border-gray500 '}`}
                        id={value}
                      />
                      <span className="text-sm font-medium text-purple50">
                        {title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label label="Auto sell" tooltipContent="Auto sell" />
            <Switch
              checked={isAutoSell}
              onClick={() => setIsAutoSell((prev) => !prev)}
            />
          </div>
          {isAutoSell ? (
            <div className="grid grid-cols-2 gap-8">
              <Input
                className="col-span-1"
                label="Sell delay"
                id="minting"
                placeholder="500ms"
                type="number"
                tooltipContent="hello tootltip"
              />
              <Input
                className="col-span-1"
                label="Sell retries"
                id="minting"
                placeholder="5"
                type="number"
                tooltipContent="hello tootltip"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-4">
          <Button variant="primary" onClick={onClose}>
            <Button.Label>Create</Button.Label>
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <Button.Label>Cancel</Button.Label>
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
