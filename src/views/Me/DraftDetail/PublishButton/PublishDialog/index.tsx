import { useState } from 'react'

import { Dialog } from '~/components'

import PublishContent from './PublishContent'

interface PublishDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BasePublishDialog = ({ children }: PublishDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <PublishContent closeDialog={close} />
      </Dialog>
    </>
  )
}

export const PublishDialog = (props: PublishDialogProps) => (
  <Dialog.Lazy mounted={<BasePublishDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
