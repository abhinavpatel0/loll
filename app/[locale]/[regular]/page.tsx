import { Metadata } from 'next'
import siteMetadata from '@/config/siteMetadata'
import { maintitle } from '@/config/localeMetadata'
import { RegularPage } from '@/types'
import { getSinglePage } from '@/lib/contentParser'

import MDXContent from '@/components/helpers/MDXContent'
import PageHeader from '@/components/partials/PageHeader'

import { LocaleTypes } from '../i18n/settings'

type PageProps = {
  params: { regular: string; locale: LocaleTypes }
}



const RegularPages = ({ params: { regular, locale } }: PageProps) => {


  return (
    <>
      <section className="section">
        <div className="container">
          <div className="content">
           <h1>hnnnnnnnnnn</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default RegularPages
