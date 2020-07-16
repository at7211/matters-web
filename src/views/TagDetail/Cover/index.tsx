import { IconHashTag, Img, TextIcon } from '~/components'

import TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

const TagCover = ({ content, cover }: { content: string; cover?: string }) => {
  const url = cover || TAG_COVER

  return (
    <div className="cover">
      <Img url={url} size="1080w" smUpSize="540w" />
      <div className="content">
        <TextIcon
          color="white"
          icon={<IconHashTag color="grey" size="md" />}
          size="lg"
          spacing={0}
          weight="md"
        >
          {content}
        </TextIcon>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default TagCover
