import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '@/config/postsPerPage'
import { genPageMetadata } from '../seo'

import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import PageHeader from '@/components/partials/PageHeader'
import { TagLink } from '@/components/blog/PostSidebar/TagLink'
import BlogPostsSection from '@/components/blog/BlogPostSection'
import Pagination from '@/components/blog/Pagination'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'

import { LocaleTypes } from '../i18n/settings'
import { createTranslation } from '../i18n/server'

type PageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'blog')
  return genPageMetadata({
    title: t('tags'),
    description: t('tags'),
    params: { locale: locale },
  })
}

const tags = async ({ params: { locale } }: PageProps) => {
  const { t } = await createTranslation(locale, 'blog')
  const allPost = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allPost.filter((post) => post.draft === false && post.language === locale)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const currentPosts = filteredPosts.slice(0, POSTS_PER_PAGE)

  return (
    <>
        <ScrollTopAndComment scrollToComment={false} />
      <PageHeader title={t('Tags')} />
      <div className="mb-20  flex flex-col justify-center md:flex-row">
        <div className="top-0 ">
          <div className="rounded bg-theme-light p-6 dark:bg-darkmode-theme-light">
            <h3 className="mb-4 text-highlighted dark:text-darkmode-highlighted">
              {t('allposts')}
            </h3>
            <TagLink
              ulclassName="ml-1 space-y-4"
              liclassName="inline-block md:flex md:flex-col"
            />
          </div>
        </div>
        <div className="lg:col-8">
              <BlogPostsSection
                currentPosts={currentPosts}
                ulclassName="row"
                liclassName="mb-4 md:col-6"
              />
          <Pagination
            params={{ locale: locale }}
            section="categories"
            currentPage={1}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  )
}

export default tags
