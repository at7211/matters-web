import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { IconHashTag16, IconProps, TextIcon, TextIconProps } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { DigestTag } from './__generated__/DigestTag'

interface TagProps {
  tag: DigestTag
  type?: 'list' | 'title' | 'inline' | 'plain'
  textSize?: 'sm' | 'sm-s'
  iconSize?: 'sm-s'
  active?: boolean
  disabled?: boolean
  hasCount?: boolean
  onClick?: () => void
}

const fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      # articles(input: { first: 0 }) {
      #   totalCount
      # }
    }
  `,
}

export const toDigestTagPlaceholder = (content: string) =>
  ({
    __typename: 'Tag',
    id: content,
    content,
    articles: {
      __typename: 'ArticleConnection',
      totalCount: 0,
    },
  } as DigestTag)

export const Tag = ({
  tag,
  type = 'list',
  textSize,
  iconSize,
  active,
  disabled,
  hasCount = true,
  onClick,
}: TagProps) => {
  const tagClasses = classNames({
    tag: true,
    [type]: type,
    active,
    disabled,
  })

  const path = toPath({
    page: 'tagDetail',
    id: tag.id,
  })

  let iconProps: IconProps = {}
  let textIconProps: TextIconProps = {}

  switch (type) {
    case 'list':
      iconProps = {
        color: 'grey',
      }
      textIconProps = {
        size: 'md',
        weight: 'normal',
        spacing: 'xxtight',
        color: 'black',
      }
      break
    case 'title':
      iconProps = {
        color: 'white',
        size: 'md',
      }
      textIconProps = {
        size: 'lg',
        weight: 'md',
        spacing: 0,
        color: 'white',
      }
      break
    case 'inline':
      iconProps = {
        color: active ? 'green' : 'grey',
      }
      textIconProps = {
        size: 'sm',
        weight: 'md',
        spacing: 0,
        color: active ? 'green' : 'grey-darker',
      }
      break
    case 'plain':
      iconProps = {
        size: iconSize || 'sm',
      }
      textIconProps = {
        size: 'sm-s',
        weight: 'normal',
        spacing: 'xxxtight',
        color: 'green',
      }
      break
  }

  // const tagCount = numAbbr(tag.articles.totalCount || 0)

  const Inner = () => (
    <>
      <TextIcon
        icon={<IconHashTag16 {...iconProps} />}
        {...textIconProps}
        size={textSize || textIconProps.size}
      >
        <span className="name">{tag.content}</span>
      </TextIcon>

      {/* {hasCount && type === 'list' && <span className="count">{tagCount}</span>} */}

      <style jsx>{styles}</style>
    </>
  )

  if (disabled) {
    return (
      <span className={tagClasses}>
        <Inner />
        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <Link {...path}>
      <a className={tagClasses} onClick={onClick}>
        <Inner />
        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Tag.fragments = fragments
