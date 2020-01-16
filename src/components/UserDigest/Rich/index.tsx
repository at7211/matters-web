import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Avatar } from '~/components/Avatar'
import UnblockButton from '~/components/Button/BlockUser/Unblock'
import { FollowButton } from '~/components/Button/Follow'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserDigestRichUser } from './__generated__/UserDigestRichUser'

/**
 * UeserDigest.Rich is a component for presenting user's avatar, display
 * name, description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.Rich user={user} />
 */

interface RichProps {
  user: UserDigestRichUser

  size?: 'sm' | 'lg'
  avatarBadge?: React.ReactNode

  hasFollow?: boolean
  hasUnblock?: boolean
}

const fragments = {
  user: gql`
    fragment UserDigestRichUser on User {
      id
      userName
      displayName
      info {
        description
      }
      status {
        state
      }
      ...AvatarUser
      ...FollowStateUser
      ...FollowButtonUser
      ...UnblockButtonUser
    }
    ${Avatar.fragments.user}
    ${FollowButton.State.fragments.user}
    ${FollowButton.fragments.user}
    ${UnblockButton.fragments.user}
  `
}

const Rich = ({
  user,

  size = 'lg',
  avatarBadge,

  hasFollow,
  hasUnblock
}: RichProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })
  const containerClass = classNames({
    container: true,
    [`size-${size}`]: !!size
  })
  // const isArchived = user?.status?.state === 'archived'

  return (
    <section className={containerClass}>
      <Link {...path}>
        <a className="avatar">
          <Avatar size={size === 'sm' ? 'lg' : 'xl'} />
          {avatarBadge && <span className="badge">{avatarBadge}</span>}
        </a>
      </Link>

      <section className="content">
        <header>
          <Link {...path}>
            <a className="name">{user.displayName}</a>
          </Link>
          <FollowButton.State user={user} />
        </header>

        <p className="description">{user.info.description}</p>
      </section>

      <section className="extra-button">
        {hasUnblock && <UnblockButton user={user} />}
        {hasFollow && <FollowButton user={user} />}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Rich.fragments = fragments

export default Rich
