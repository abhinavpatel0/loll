import Link from 'next/link'
import { slug } from 'github-slugger'

interface TagProps {
  text: string
}

const Tag = ({ text }: TagProps) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className=" tags  inline-flex items-center rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
