import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'
import { QueryResult } from 'react-apollo'

import { Spinner, TextIcon } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { Query } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Popover } from '~/components/Popper'

import { numAbbr } from '~/common/utils'
import ICON_DIRECTION from '~/static/icons/direction.svg?sprite'
import ICON_EXPAND_BRANCH from '~/static/icons/expand-branch.svg?sprite'

import { CollectedByArticle } from './__generated__/CollectedByArticle'
import styles from './styles.css'

export const ARTICLE_COLLECTION = gql`
  query Collection($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      collection(input: { first: null }) @connection(key: "articleCollection") {
        totalCount
        edges {
          node {
            id
            mediaHash
            ...DropdownDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Dropdown.fragments.article}
`

export const COLLECTED_BY = gql`
  query CollectedBy($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      collectedBy(input: { first: null })
        @connection(key: "articleCollectedBy") {
        totalCount
        edges {
          node {
            id
            mediaHash
            collection(input: { first: 0 }) {
              totalCount
            }
            ...DropdownDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Dropdown.fragments.article}
`

const CollectedByArticleItem = ({
  article,
  rootArticle
}: {
  article: any
  rootArticle: any
}) => {
  const [expand, setExpand] = useState(false)
  const collectionCount = _get(article, 'collection.totalCount', 0)

  return (
    <li className={`collected-by-item ${expand ? 'expand' : ''}`}>
      <div className="content">
        <ArticleDigest.Dropdown article={article} hasArchivedTooltip />

        {collectionCount > 0 && (
          <button onClick={() => setExpand(!expand)} type="button">
            <TextIcon
              icon={
                <Icon
                  id={ICON_EXPAND_BRANCH.id}
                  viewBox={ICON_EXPAND_BRANCH.viewBox}
                  size="small"
                />
              }
              size="xs"
              color="green"
              spacing="0"
            >
              <Translate
                zh_hant={expand ? '收起' : '展開'}
                zh_hans={expand ? '收起' : '展开'}
              />
            </TextIcon>
          </button>
        )}
      </div>

      {expand && collectionCount > 0 && (
        <Query
          query={ARTICLE_COLLECTION}
          variables={{ mediaHash: article.mediaHash }}
        >
          {({ data, loading, error }: QueryResult) => {
            if (loading) {
              return <Spinner />
            }

            const path = 'article.collection'
            const { edges } = _get(data, path, {})

            return (
              <ul className="sublist">
                {edges &&
                  edges.map(({ node }: { node: any }) => (
                    <li
                      key={node.id}
                      className={
                        rootArticle.mediaHash === node.mediaHash ? 'active' : ''
                      }
                    >
                      <ArticleDigest.Plain article={node} />
                    </li>
                  ))}
              </ul>
            )
          }}
        </Query>
      )}

      <style jsx>{styles}</style>
    </li>
  )
}

const CollectedBy = ({ article }: { article: any }) => (
  <div className="container">
    <Query query={COLLECTED_BY} variables={{ mediaHash: article.mediaHash }}>
      {({ data, loading, error }: QueryResult) => {
        if (loading) {
          return <Spinner />
        }

        const path = 'article.collectedBy'
        const { edges } = _get(data, path, {})

        return (
          <>
            <h3>
              <Translate
                zh_hant="關聯了本文的作品"
                zh_hans="关联了本文的作品"
              />
            </h3>

            <ul>
              {edges &&
                edges.map(({ node }: { node: any }) => (
                  <CollectedByArticleItem
                    key={node.id}
                    article={node}
                    rootArticle={article}
                  />
                ))}
            </ul>
          </>
        )
      }}
    </Query>

    <style jsx>{styles}</style>
  </div>
)

const CollectedByButton = ({
  article,
  popperPlacement = 'right',
  textPlacement = 'right'
}: {
  article: CollectedByArticle
  popperPlacement?: 'right' | 'top'
  textPlacement?: 'bottom' | 'right'
}) => {
  const collectedByCount = _get(article, 'collectedBy.totalCount', 0)

  if (collectedByCount <= 0) {
    return null
  }

  return (
    <Popover
      trigger="click"
      offset="40,0"
      content={<CollectedBy article={article} />}
      placement={popperPlacement}
    >
      <button type="button">
        <TextIcon
          icon={
            <Icon
              size="default"
              id={ICON_DIRECTION.id}
              viewBox={ICON_DIRECTION.viewBox}
            />
          }
          text={numAbbr(collectedByCount)}
          textPlacement={textPlacement}
          color="grey"
          weight="medium"
          size="xs"
          spacing={textPlacement === 'bottom' ? 'xxxtight' : 'xxtight'}
        />
      </button>
    </Popover>
  )
}

CollectedByButton.fragments = {
  article: gql`
    fragment CollectedByArticle on Article {
      id
      mediaHash
      collectedBy(input: { first: 0 }) @connection(key: "articleCollectedBy") {
        totalCount
      }
    }
  `
}

export default CollectedByButton
