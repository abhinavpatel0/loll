'use client'

import Link from 'next/link'
import tagData from '@/config/data/tag-data.json'
import { useParams, usePathname } from 'next/navigation'
import { humanize } from '@/lib/utils/textConverter'
import { sortData } from '@/lib/utils/sortData'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

export const TagLink = ({
  liclassName,
  ulclassName,
}: {
  liclassName?: string
  ulclassName?: string
}) => {
  const locale = useParams()?.locale as LocaleTypes
  const pathname = usePathname()
  const tagCounts = tagData[locale]
  const sortedTags = sortData(tagCounts)
  return (
    <ul className={ulclassName}>
      {sortedTags.map((tag: string) => (
        <li className={liclassName} key={tag}>
          <Link
            className={`${
              pathname.includes(tag) ? 'text-highlighted dark:text-darkmode-highlighted' : ''
  } m-1 block inline-flex items-center rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
  href={`/${locale}/tags/${tag}`}
          >
            {`${humanize(tag)} (${tagCounts[tag]})`}
          </Link>
        </li>
      ))}
    </ul>
  )
}
