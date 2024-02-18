import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Feature } from '@/types'
import { Check } from '@/components/navigation/icons'
import { genPageMetadata } from './seo'
import { getListPage } from '@/lib/contentParser'
import { markdownify } from '@/lib/utils/textConverter'
import FAQ from '@/components/faq'
import siteMetadata from '@/config/siteMetadata'
import ImageFallback from '@/components/helpers/ImageFallback'
import NewsletterForm from '@/components/blog/NewsletterForm'

import { LocaleTypes } from './i18n/settings'
import { createTranslation } from './i18n/server'

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

  return (
    <>
    
         
        <FAQ/>
              
        

    </>
  )
}

export default Home
