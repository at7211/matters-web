import classNames from 'classnames'

import {
  IconCollection24,
  IconHashTag24,
  IconImage24,
  IconSettings24,
  Layout,
  TextIcon,
  Translate,
} from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import {
  SetCollectionProps,
  SetCoverProps,
  SetTagsProps,
  ToggleAccessProps,
} from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import { TEXT } from '~/common/enums'

import SetCover from '../SetCover'
import AccessDialog from './AccessDialog'
import styles from './styles.css'

import { SearchExclude } from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

export type BottomBarProps = {
  saving: boolean
  disabled: boolean
} & SetCoverProps &
  SetCollectionProps &
  SetTagsProps &
  ToggleAccessProps

/**
 * Editor toolbar that fixed on bottom to edit cover, tags and collection,
 * only used on mobile
 */
const BottomBar: React.FC<BottomBarProps> = ({
  cover,
  editCover,
  assets,
  refetchAssets,
  entityId,
  entityType,
  coverSaving,

  collection,
  editCollection,
  collectionSaving,

  tags,
  editTags,
  tagsSaving,

  circle,
  editAccess,
  accessSaving,
  accessType,
  license,
  canToggleCircle,

  saving,
  disabled,
}) => {
  const bottomBarClasses = classNames({
    'bottom-bar': true,
    'u-area-disable': disabled,
  })

  return (
    <section className={bottomBarClasses}>
      <Layout.FixedMain>
        <section className="content">
          <section className="inner">
            {/* Cover */}
            <SetCover.Dialog
              cover={cover}
              editCover={editCover}
              assets={assets}
              refetchAssets={refetchAssets}
              entityId={entityId}
              entityType={entityType}
              coverSaving={coverSaving}
            >
              {({ openDialog: openSetCoverDialog }) => (
                <button type="button" onClick={openSetCoverDialog}>
                  <TextIcon
                    icon={<IconImage24 size="md" />}
                    size="md-s"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate id="cover" />
                  </TextIcon>
                </button>
              )}
            </SetCover.Dialog>

            {/* Tags */}
            <SearchSelectDialog
              title="addTag"
              hint="hintAddTag"
              searchType="Tag"
              onSave={(nodes: SearchSelectNode[]) =>
                editTags(nodes as DigestTag[])
              }
              nodes={tags}
              saving={tagsSaving}
              createTag
            >
              {({ openDialog: openAddMyArticlesDialog }) => (
                <button type="button" onClick={openAddMyArticlesDialog}>
                  <TextIcon
                    icon={<IconHashTag24 size="md" />}
                    size="md-s"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate id="tag" />
                  </TextIcon>
                </button>
              )}
            </SearchSelectDialog>

            {/* Collection */}
            <SearchSelectDialog
              title="extendArticle"
              hint="hintEditCollection"
              searchType="Article"
              searchExclude={SearchExclude.blocked}
              onSave={(nodes: SearchSelectNode[]) =>
                editCollection(nodes as ArticleDigestDropdownArticle[])
              }
              nodes={collection}
              saving={collectionSaving}
            >
              {({ openDialog: openAddMyArticlesDialog }) => (
                <button type="button" onClick={openAddMyArticlesDialog}>
                  <TextIcon
                    icon={<IconCollection24 size="md" />}
                    size="md-s"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate id="extend" />
                  </TextIcon>
                </button>
              )}
            </SearchSelectDialog>

            {/* Circle & License */}
            <AccessDialog
              circle={circle}
              accessType={accessType}
              license={license}
              editAccess={editAccess}
              accessSaving={accessSaving}
              canToggleCircle={canToggleCircle}
            >
              {({ openDialog }) => (
                <button
                  aria-label={TEXT.zh_hant.articleManagement}
                  aria-haspopup="true"
                  onClick={openDialog}
                >
                  <TextIcon
                    icon={<IconSettings24 size="md" />}
                    size="md-s"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate zh_hant="管理" zh_hans="管理" en="Manage" />
                  </TextIcon>
                </button>
              )}
            </AccessDialog>
          </section>
        </section>
      </Layout.FixedMain>

      <style jsx>{styles}</style>
    </section>
  )
}

export default BottomBar
