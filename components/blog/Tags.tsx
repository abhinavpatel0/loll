/* eslint-disable prettier/prettier */
// Tag.tsx
import React from 'react'
import Link from 'next/link'
import { humanize, slugify } from '@/lib/utils/textConverter'

interface TagProps {
  tag: string
  locale: string
  title: string
  t: (key: string) => string
  isLast: boolean
}

const Tag: React.FC<TagProps> = ({ tag, locale, title, t, isLast }) => (
  <Link
  className=" tags  inline-flex items-center rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
  href={`/${locale}/tags/${slugify(tag)}`}
    aria-label={`${t('linkto')}${title}`}
  >
    {humanize(tag)}
    {!isLast && ', '}
  </Link>
)

export default Tag
