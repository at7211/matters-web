import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { Card, CardProps, Translate } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import { UnblockUserButton } from '~/components/Buttons/UnblockUser'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { UserDigestVerboseUserPrivate } from './__generated__/UserDigestVerboseUserPrivate'
import { UserDigestVerboseUserPublic } from './__generated__/UserDigestVerboseUserPublic'

/**
 * UeserDigest.Verbose is a component for presenting user's avatar, display
 * name, multi-line description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.Verbose user={user} />
 */
export type UserDigestVerboseProps = {
  user: UserDigestVerboseUserPublic & Partial<UserDigestVerboseUserPrivate>

  avatarSize?: 'md'
  nameTextSize?: 'md-s'
  descTextSize?: 'sm-s'
  descRowSize?: 2

  hasFollow?: boolean
  hasUnblock?: boolean
} & CardProps &
  AvatarProps

const Verbose = ({
  user,

  avatarSize = 'md',
  nameTextSize = 'md-s',
  descTextSize = 'sm-s',
  descRowSize = 2,

  hasFollow = true,
  hasUnblock,

  ...cardProps
}: UserDigestVerboseProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  const isArchived = user?.status?.state === 'archived'
  const containerClasses = classNames({
    container: true,
    disabled: isArchived,
  })
  const nameClasses = classNames({
    name: true,
    [`name-${nameTextSize}`]: true,
  })
  const descClasses = classNames({
    desc: true,
    [`desc-${descTextSize}`]: true,
    [`desc-row-${descRowSize}`]: true,
  })

  if (isArchived) {
    return (
      <Card spacing={['tight', 'tight']} {...cardProps}>
        <section className={containerClasses}>
          <span className="avatar">
            <Avatar size={avatarSize} />
          </span>

          <section className="content">
            <header>
              <span className={nameClasses}>
                <Translate id="accountArchived" />
              </span>
            </header>
          </section>

          <section className="extra-button">
            {hasUnblock && <UnblockUserButton user={user} />}
          </section>

          <style jsx>{styles}</style>
        </section>
      </Card>
    )
  }

  return (
    <Card {...path} spacing={['tight', 'tight']} {...cardProps}>
      <section className={containerClasses}>
        <Link {...path}>
          <a className="avatar">
            <Avatar size={avatarSize} user={user} />
          </a>
        </Link>

        <section className="content">
          <header>
            <Link {...path}>
              <a className={nameClasses}>{user.displayName}</a>
            </Link>
          </header>
        </section>

        <section className="extra-button">
          {hasUnblock && <UnblockUserButton user={user} />}
          {hasFollow && <FollowUserButton user={user} size="md-s" />}
        </section>
      </section>

      {user.info.description && (
        <section className={descClasses}>
          <p>{user.info.description}</p>
        </section>
      )}

      <style jsx>{styles}</style>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedVerboseType = React.MemoExoticComponent<
  React.FC<UserDigestVerboseProps>
> & {
  fragments: typeof fragments
}

const MemoizedVerbose = React.memo(Verbose, ({ user: prevUser }, { user }) => {
  return (
    prevUser.id === user.id &&
    prevUser.isFollowee === user.isFollowee &&
    prevUser.isFollower === user.isFollower &&
    prevUser.isBlocked === user.isBlocked
  )
}) as MemoizedVerboseType

MemoizedVerbose.fragments = fragments

export default MemoizedVerbose
