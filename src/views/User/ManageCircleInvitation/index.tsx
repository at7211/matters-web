import { Head, Layout } from '~/components'

import CircleInvitationAddButton from './AddButton'
import InvitesFeed from './Invites'

const ManageCircleInvitation = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={
        <>
          <Layout.Header.Title id="manageCircleInvitation" />
          <CircleInvitationAddButton />
        </>
      }
    />

    <Head title={{ id: 'manageCircleInvitation' }} />

    <InvitesFeed />
  </Layout.Main>
)

export default ManageCircleInvitation
