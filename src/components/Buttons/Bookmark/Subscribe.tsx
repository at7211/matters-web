import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import {
  Button,
  IconBookmark16,
  IconSize,
  LanguageContext,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ADD_TOAST } from '~/common/enums'
import { subscribePush, translate } from '~/common/utils'

import TOGGLE_SUBSCRIBE_ARTICLE from '../../GQL/mutations/toggleSubscribeArticle'

import { ToggleSubscribeArticle } from '~/components/GQL/mutations/__generated__/ToggleSubscribeArticle'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

interface SubscribeProps {
  articleId?: string
  size?: Extract<IconSize, 'md-s'>
  disabled?: boolean
  inCard?: boolean
}

const Subscribe = ({ articleId, size, disabled, inCard }: SubscribeProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [subscribe] = useMutation<ToggleSubscribeArticle>(
    TOGGLE_SUBSCRIBE_ARTICLE,
    {
      variables: { id: articleId, enabled: true },
      optimisticResponse: articleId
        ? {
            toggleSubscribeArticle: {
              id: articleId,
              subscribed: true,
              __typename: 'Article',
            },
          }
        : undefined,
    }
  )
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const push = data?.clientPreference.push

  const onClick = async () => {
    if (viewer.isFrozen) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="FORBIDDEN_BY_STATE" />,
          },
        })
      )
      return
    }

    await subscribe()

    // skip
    if (!push || !push.supported || push.enabled || !viewer.isAuthed) {
      return
    }

    // show toast to subscribe push
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate id="pushDescription" />,
          customButton: (
            <Button onClick={() => subscribePush()}>
              <Translate id="confirmPush" />
            </Button>
          ),
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
      aria-label={translate({
        zh_hant: '收藏',
        zh_hans: '收藏',
        en: 'Bookmark',
        lang,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      <IconBookmark16 size={size} />
    </Button>
  )
}

export default Subscribe
