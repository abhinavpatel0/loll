'use client'

import Link from 'next/link'

import { Folder, User, Clock, Calendar, Tags } from './icons'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import { humanize, slugify } from '@/lib/utils/textConverter'

import ImageFallback from '../helpers/ImageFallback'
import { authorDefault } from '@/config/authorDefault'
import { Blog } from 'contentlayer/generated'

import { LocaleTypes } from '@/app/[locale]/i18n/settings'
import { useTranslation } from '@/app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import Tag from './Tags'
interface BlogCardProps {
  post: CoreContent<Blog>
}

const BlogCard = ({ post }: BlogCardProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'blog')
  if (!post) {
    return null
  }

  const { path, title, language, summary, image, authors, categories, tags, date, readingTime } =
    post
  const displayedTags = tags?.slice(0, 3) || []
  return (
    <article className={`overflow-hidden rounded-lg shadow-lg `}>
      <Link href={`/${locale}/blog/${path}`} aria-label={`${t('linkto')}${title}`}>
        <div className="relative">
          <ImageFallback
            className="h-72 w-full scale-100 transform object-cover blur-0 grayscale-0 duration-500 hover:scale-105"
            src={image}
            alt={title}
            width={445}
            height={230}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 sm:p-6 md:p-8">
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              <Link href={`/${locale}/blog/${path}`} aria-label={`${t('linkto')}${title}`}>
                {title}{' '}
              </Link>
            </h2>
            <div className="flex flex-wrap items-center text-sm text-gray-300">
              {displayedTags.map((tag: string, index: number) => (
                <Tag
                  key={index}
                  tag={tag}
                  locale={locale}
                  title={title}
                  t={t}
                  isLast={index === displayedTags.length - 1}
                />
              ))}
              {date && (
                <li className="mr-4 flex flex-row items-center">
                  <time dateTime={date} className="ml-2">
                    {formatDate(date, language)}
                  </time>
                </li>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default BlogCard
