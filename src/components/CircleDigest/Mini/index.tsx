import classNames from 'classnames'
import React from 'react'

import { Card, CardProps, UserDigest } from '~/components'

import { toPath } from '~/common/utils'

import Counts from '../Counts'
import { fragments } from './gql'
import styles from './styles.css'

import { DigestMiniCircle } from './__generated__/DigestMiniCircle'

export type CircleDigestMiniProps = {
  circle: DigestMiniCircle
} & CardProps

const Mini = ({ circle, ...cardProps }: CircleDigestMiniProps) => {
  const { description, owner } = circle
  const path = toPath({
    page: 'userProfile',
    userName: owner.userName || '',
  })

  const containerClasses = classNames({
    container: true,
  })

  return (
    <Card {...path} spacing={[0, 0]} {...cardProps}>
      <section className={containerClasses}>
        <section className="content">
          <header>
            <UserDigest.Mini
              user={owner}
              avatarSize="sm"
              textSize="md-s"
              textWeight="md"
              nameColor="black"
              hasAvatar
              hasDisplayName
            />

            <section className="info">
              <Counts circle={circle} />
            </section>
          </header>

          {description && <p className="description">{description}</p>}
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedMiniType = React.MemoExoticComponent<
  React.FC<CircleDigestMiniProps>
> & {
  fragments: typeof fragments
}

const MemoizedMini = React.memo(Mini, ({ circle: prevCircle }, { circle }) => {
  return prevCircle.id === circle.id
}) as MemoizedMiniType

MemoizedMini.fragments = fragments

export default MemoizedMini
