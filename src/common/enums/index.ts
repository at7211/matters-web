export * from './route'
export * from './responsive'
export * from './analytics'
export * from './keyCodes'
export * from './text'
export * from './lang'
export * from './hardcode'
export * from './file'
export * from './errorCode'
export * from './externalLinks'
export * from './events'
export * from './time'
export * from './oauth'
export * from './storage'
export * from './payment'
export * from './url'
export * from './csp'
export * from './chart'

export const Z_INDEX = {
  GLOBAL_HEADER: 100,
  OVER_GLOBAL_HEADER: 101,
  UNDER_GLOBAL_HEADER: 99,
  STICKY_TABS: 110,
  OVER_STICKY_TABS: 111,
  BOTTOM_BAR: 150,
  OVER_BOTTOM_BAR: 151,
  DIALOG: 200,
  OVER_DIALOG: 201,
}

export const AGENT_HASH_PREFIX = 'v1__'

export const IMAGE_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

export const GQL_CONTEXT_PUBLIC_QUERY_KEY = 'publicQuery'

export const VERIFICATION_CODE_TYPES = {
  register: 'register',
  email_reset: 'email_reset',
  email_reset_confirm: 'email_reset_confirm',
  password_reset: 'password_reset',
  payment_password_reset: 'payment_password_reset',
}

export const COOKIE_TOKEN_NAME = '__token'
export const COOKIE_USER_GROUP = '__user_group'

export const MAX_ARTICLE_REVISION_COUNT = 4
export const MAX_ARTICLE_REVISION_DIFF = 50
