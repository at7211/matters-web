import gql from 'graphql-tag'
import getConfig from 'next/config'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'
import { QueryResult } from 'react-apollo'

import { LanguageContext, Modal, Spinner, Translate } from '~/components'
import { Query } from '~/components/GQL'
import OAuth from '~/components/OAuth'
import Throw404 from '~/components/Throw404'

import { TEXT } from '~/common/enums'
import {
  objectToGetParams,
  redirectToLogin,
  toReadableScope
} from '~/common/utils'

import styles from './styles.css'

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()
const OAUTH_AUTHORIZE_ENDPOINT = `${OAUTH_URL}/authorize`

const OAUTH_CLIENT_INFO = gql`
  query OAuthClientInfo($id: ID!) {
    oauthClient(input: { id: $id }) {
      id
      name
      avatar
      website
      scope
    }
  }
`

const OAuthAuthorize: React.FC<WithRouterProps> = ({ router }) => {
  const { lang } = useContext(LanguageContext)
  const qs = (router ? router.query : {}) as { [key: string]: any }
  const actionUrl = `${OAUTH_AUTHORIZE_ENDPOINT}${objectToGetParams(qs)}`
  const clientId = qs.client_id

  if (!clientId) {
    return <Throw404 />
  }

  return (
    <Query query={OAUTH_CLIENT_INFO} variables={{ id: clientId }}>
      {({ data, loading }: QueryResult) => {
        if (loading) {
          return (
            <main className="l-row">
              <OAuth.Box>
                <Spinner />
              </OAuth.Box>
            </main>
          )
        }

        if (!data || !data.oauthClient || !data.oauthClient.id) {
          return <Throw404 />
        }

        const { avatar, website, name, scope: scopes } = data.oauthClient

        return (
          <main className="l-row">
            <OAuth.Box
              avatar={avatar}
              title={
                <>
                  <a className="u-link-green" href={website} target="_blank">
                    {name}
                  </a>
                  <Translate
                    zh_hant=" 正在申請訪問你的 Matters 賬號數據："
                    zh_hans=" 正在申请访问你的 Matters 账号数据："
                  />
                </>
              }
              titleAlign="left"
            >
              <form action={actionUrl} method="post">
                <input type="hidden" name="client_id" value={qs.client_id} />
                {qs.state && (
                  <input type="hidden" name="state" value={qs.state} />
                )}
                {qs.scope && (
                  <input type="hidden" name="scope" value={qs.scope} />
                )}
                {qs.redirect_uri && (
                  <input
                    type="hidden"
                    name="redirect_uri"
                    value={qs.redirect_uri}
                  />
                )}
                <input type="hidden" name="response_type" value="code" />

                <section className="content">
                  <ul>
                    <li>
                      <Translate
                        zh_hant="讀取你的公開資料"
                        zh_hans="读取你的公开资料"
                      />
                    </li>
                    {scopes.map((scope: any) => {
                      const readableScope = toReadableScope({
                        scope,
                        lang
                      })

                      if (!readableScope) {
                        return null
                      }

                      return <li key={scope}>{readableScope}</li>
                    })}
                  </ul>

                  <hr />

                  <p className="switch-account">
                    <span>
                      <Translate zh_hant="不是你？" zh_hans="不是你？" />
                    </span>
                    <button
                      type="button"
                      onClick={redirectToLogin}
                      className="u-link-green"
                    >
                      <Translate zh_hant="切換賬戶" zh_hans="切换账户" />
                    </button>
                  </p>
                </section>

                <footer>
                  <Modal.FooterButton htmlType="submit" width="full">
                    <Translate
                      zh_hant={TEXT.zh_hant.agree}
                      zh_hans={TEXT.zh_hans.agree}
                    />
                  </Modal.FooterButton>
                </footer>
              </form>
            </OAuth.Box>
            <style jsx>{styles}</style>
          </main>
        )
      }}
    </Query>
  )
}

export default withRouter(OAuthAuthorize)
