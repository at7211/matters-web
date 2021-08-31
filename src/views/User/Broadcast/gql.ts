import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

export const USER_BROADCAST = gql`
  query UserBroadcast($userName: String!) {
    user(input: { userName: $userName }) {
      id
      displayName
      ownCircles {
        id
        name
      }
    }
  }
`

export const BROADCAST_PUBLIC = gql`
  query UserBroadcastPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      # use alias to prevent overwriting <CircleProfile>'s
      circleIsMember: isMember @connection(key: "circleBroadcastIsMember")
      broadcast(input: { first: 10, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...ThreadCommentCommentPublic
            ...ThreadCommentCommentPrivate
          }
        }
      }
    }
  }
  ${ThreadComment.fragments.comment.public}
  ${ThreadComment.fragments.comment.private}
`

export const BROADCAST_PRIVATE = gql`
  query UserBroadcastPrivate($name: String!, $ids: [ID!]!) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      # use alias to prevent overwriting <CircleProfile>'s
      circleIsMember: isMember @connection(key: "circleBroadcastIsMember")
    }
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ThreadCommentCommentPrivate
      }
    }
  }
  ${ThreadComment.fragments.comment.private}
`
