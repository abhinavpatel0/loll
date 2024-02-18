import Link from 'next/link'
import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { maintitle } from '@/config/localeMetadata'
import tagData from '@/config/data/tag-data.json'
import { POSTS_PER_PAGE } from '@/config/postsPerPage'

import taxonomyFilter from '@/lib/utils/taxonomyFilter'
import { capitalizeFirstLetter } from '@/lib/utils/textConverter'

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

import PageHeader from '@/components/partials/PageHeader'
import { TagLink } from '@/components/blog/PostSidebar/TagLink'
import BlogPostsSection from '@/components/blog/BlogPostSection'
import Pagination from '@/components/blog/Pagination'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { createTranslation } from '@/app/[locale]/i18n/server'

type PageProps = {
  params: { locale: LocaleTypes; single: string; page?: number }
}

export async function generateMetadata({
  params: { locale, single },
}: PageProps): Promise<Metadata | undefined> {
  const title = capitalizeFirstLetter(single)
  const { t } = await createTranslation(locale, 'blog')

  return {
    title: title,
    description: t('tags'),
    openGraph: {
      title: title,
      description: t('tags'),
      url: './',
      siteName: maintitle[locale],
      images: siteMetadata.socialBanner,
      locale: locale,
      type: 'website',
    },
    twitter: {
      title: title,
      description: t('tags'),
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: siteMetadata.socialBanner,
    },
  }
}

// remove dynamicParams
export const dynamicParams = true

// generate static params
export const generateStaticParams = ({ params: { locale, single } }: PageProps) => {
  const tagCount = tagData[locale][single] || 0
  const totalPages = Math.ceil(tagCount / POSTS_PER_PAGE)
  const paths: { page: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    paths.push({
      page: i.toString(),
    })
  }

  return paths
}

const TagSingle = async ({ params: { locale, page, single } }: PageProps) => {
  const { t } = await createTranslation(locale, 'blog')
  const allPost = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allPost.filter((post) => post.draft === false && post.language === locale)
  const filterByTags = taxonomyFilter(filteredPosts, 'tags', single)
  const totalPages = Math.ceil(filterByTags.length / POSTS_PER_PAGE)
  const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = filterByTags.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <>
        <ScrollTopAndComment scrollToComment={false} />
      <PageHeader title={t('Tags')} />
      <div className="mb-20  flex flex-col justify-center md:flex-row">
        <div className="sticky top-0 ">
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

export default TagSingle
