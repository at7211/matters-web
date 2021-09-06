import { useQuery } from '@apollo/react-hooks'

import {
  Dialog,
  InfiniteList,
  QueryError,
  RowRendererProps,
  Spinner,
  Translate,
  useResponsive,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { analytics, mergeConnections } from '~/common/utils'

import { ARTICLE_DONATORS } from './gql'
import styles from './styles.css'

import {
  ArticleDonators,
  ArticleDonators_article_donations_edges,
} from './__generated__/ArticleDonators'
import { DonatorDialogArticle } from './__generated__/DonatorDialogArticle'

interface DonatorsDialogContentProps {
  article: DonatorDialogArticle
  closeDialog: () => void
}

const DonatorsDialogContent = ({
  article,
  closeDialog,
}: DonatorsDialogContentProps) => {
  const isSmallUp = useResponsive('sm-up')
  const { data, loading, error, fetchMore } = useQuery<ArticleDonators>(
    ARTICLE_DONATORS,
    { variables: { mediaHash: article.mediaHash } }
  )

  const connectionPath = 'article.donations'
  const { edges, pageInfo } = data?.article?.donations || {}

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const ListRow = ({
    index,
    datum,
  }: RowRendererProps<ArticleDonators_article_donations_edges>) => {
    const { node, cursor } = datum

    return (
      <div className="donator-item" key={cursor}>
        {node && (
          <UserDigest.Rich
            user={node}
            onClick={() => {
              analytics.trackEvent('click_feed', {
                type: 'donators',
                contentType: 'user',
                location: index,
                id: node.id,
              })
            }}
          />
        )}
        <style jsx>{styles}</style>
      </div>
    )
  }

  const loadMore = (callback: () => void) => {
    analytics.trackEvent('load_more', {
      type: 'donators',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        callback()
        return mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
      },
    })
  }

  const totalCount = data?.article?.donations.totalCount || 0

  // estimate a safe default height
  const calcContentMaxHeight = () => {
    if (window) {
      const dialogMaxHeight = window.innerHeight * 0.01 * 90
      const head = 1.5 + (isSmallUp ? 2 + 0.5 : 0.75 * 2)
      const spacing = 0.75 * 2
      return dialogMaxHeight - (head + spacing + 1) * 16
    }
    return
  }

  const defaultListMaxHeight = calcContentMaxHeight()

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant={`${totalCount} 人支持了作品`}
            zh_hans={`${totalCount} 人支持了作品`}
          />
        }
        closeDialog={closeDialog}
        closeTextId="close"
      />

      <Dialog.Content>
        <div className="dialog-donator-list">
          <InfiniteList
            data={edges}
            defaultListMaxHeight={defaultListMaxHeight}
            defaultRowHeight={70}
            loader={<Spinner />}
            loadMore={loadMore}
            renderer={ListRow}
            totalCount={totalCount}
          />
        </div>
        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default DonatorsDialogContent
