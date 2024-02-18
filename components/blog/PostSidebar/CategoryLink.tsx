'use client'

import Link from 'next/link'
import categoryData from '@/config/data/category-data.json'
import { useParams, usePathname } from 'next/navigation'
import { humanize } from '@/lib/utils/textConverter'
import { sortData } from '@/lib/utils/sortData'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

export const CategoryLink = ({
  liclassName,
  ulclassName,
}: {
  liclassName?: string
  ulclassName?: string
}) => {
  const locale = useParams()?.locale as LocaleTypes
  const pathname = usePathname()
  const categoryCounts = categoryData[locale]
  const sortedCategories = sortData(categoryCounts)
  return (
    <ul className={ulclassName}>
      {sortedCategories.map((category: string) => (
        <li className={liclassName} key={category}>
         <Link
  className={`${
    pathname.includes(category) ? 'text-highlighted dark:text-darkmode-highlighted' : ''
  } inline-flex items-center rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
  href={`/${locale}/categories/${category}`}
>
  {`${humanize(category)} (${categoryCounts[category]})`}
</Link>

        </li>
      ))}
    </ul>
  )
}