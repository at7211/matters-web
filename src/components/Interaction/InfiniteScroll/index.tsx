import { Waypoint } from 'react-waypoint'

import { EOF, PullToRefresh, Spinner } from '~/components'

/**
 *  Usage:
 * ```jsx
 *   <InfiniteScroll
 *     hasNextPage={pageInfo.hasNextPage}
 *     loadMore={loadMore}
 *     loading={loading}
 *     Loader={
 *         <Spinner />
 *     }
 *   >
 *     {edges.map(el => (
 *         <Article
 *             item={el.node}
 *             key={`article-item-${el.cursor}`}
 *         />
 *     ))}
 * </InfiniteScroll>
 * ```
 */

interface Props {
  /**
   * Does the resource have more entities
   */
  hasNextPage: boolean

  /**
   * Callback to load more entities
   */
  loadMore: () => Promise<any>

  /**
   * A React component to act as loader
   */
  loader?: React.ReactNode

  /**
   * Refetch function to be called by Pull to Refresh
   */
  pullToRefresh?: () => any
}

export const InfiniteScroll: React.FC<Props> = ({
  hasNextPage,
  loader = <Spinner />,
  loadMore,
  pullToRefresh,
  children,
}) => {
  if (pullToRefresh) {
    return (
      <PullToRefresh refresh={pullToRefresh}>
        <>
          {children}
          {hasNextPage && <Waypoint onEnter={loadMore} />}
          {hasNextPage && loader}
          {!hasNextPage && <EOF />}
        </>
      </PullToRefresh>
    )
  }

  return (
    <>
      {children}
      {hasNextPage && <Waypoint onEnter={loadMore} />}
      {hasNextPage && loader}
      {!hasNextPage && <EOF />}
    </>
  )
}
