import { Metadata } from 'next'
import { genPageMetadata } from './seo'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'
import FAQ from '@/components/faq'
import siteMetadata from '@/config/siteMetadata'
import ImageFallback from '@/components/helpers/ImageFallback'
import NewsletterForm from '@/components/blog/NewsletterForm'

import { LocaleTypes } from './i18n/settings'
import { createTranslation } from './i18n/server'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import PostSidebar from '@/components/blog/PostSidebar'
import BlogPostsSection from '@/components/blog/BlogPostSection'
import PageHeader from '@/components/partials/PageHeader'
import { Button, Feature } from '@/types'
import { POSTS_PER_PAGE } from '@/config/postsPerPage'

interface HomeProps {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: HomeProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'headerlinks')
  return genPageMetadata({
    title: t('home'),
    description: t('home'),
    params: { locale: locale },
  })
}

const Home = ({ params: { locale } }: HomeProps) => {
  const homepage = getListPage(`homepage/${locale}/_index.md`)
  const { frontmatter } = homepage
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button }
    features: Feature[]
  } = frontmatter

  // Fetch and filter the blog posts
  const allPost = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allPost.filter((post) => post.draft === false && post.language === locale)
  const currentPosts = filteredPosts.slice(0, POSTS_PER_PAGE)

  return (
    <>
      
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div className="lg:col-8">
              <BlogPostsSection
                currentPosts={currentPosts}
                ulclassName="row"
                liclassName="mb-14 md:col-6"
              />
            </div>
            <PostSidebar params={{ locale: locale }} />
          </div>
        </div>
      </section>
      <FAQ />
    </>
  )
}

export default Home
