import { useContext } from 'react'

import { LanguageContext, Translate } from '~/components'

import { translate } from '~/common/utils'

import CIRCLE_DISCUSSION_WALL_SM from '@/public/static/images/circle-discussion-wall-sm.svg'
import CIRCLE_DISCUSSION_WALL from '@/public/static/images/circle-discussion-wall.svg'

import styles from './styles.css'

import { DiscussionPublic_circle } from './__generated__/DiscussionPublic'

type WallProps = {
  circle: DiscussionPublic_circle
}

const Wall = ({ circle }: WallProps) => {
  const { lang } = useContext(LanguageContext)
  const discussionCount = circle.discussionCount || 0
  const discussionThreadCount = circle.discussionThreadCount || 0

  return (
    <section
      className="wall"
      aria-label={translate({
        zh_hant: '成為圍爐一員，一起談天說地',
        zh_hans: '成为围炉一员，一起谈天说地',
        en: 'Subscribe circle and chat together!',
        lang,
      })}
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={CIRCLE_DISCUSSION_WALL} />

        <img src={CIRCLE_DISCUSSION_WALL_SM} />
      </picture>

      <section className="brief">
        {discussionThreadCount > 0 && (
          <p>
            <Translate
              zh_hant={`聽說目前共累積 ${discussionThreadCount} 串討論，${discussionCount} 則迴響`}
              zh_hans={`听说目前共累积 ${discussionThreadCount} 串讨论，${discussionCount} 则回响`}
            />
          </p>
        )}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Wall
