import React from 'react';
import Link from 'next/link';
import { LocaleTypes } from '@/app/[locale]/i18n/settings';

type PaginationProps = {
  section: string;
  currentPage: number;
  totalPages: number;
  params: { locale: LocaleTypes };
};

const Pagination = ({ section, currentPage, totalPages, params: { locale } }: PaginationProps) => {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  const linkStyles = "bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 border border-gray-300 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 inline-block m-0";
  const activeStyles = "bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 border border-gray-300 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 inline-block m-0";

  const generateLink = (pageNumber: number) => `/${locale}${section ? '/' + section : ''}${pageNumber > 1 ? `/page/${pageNumber}` : ''}`;

  const prevLink = hasPrevPage ? generateLink(currentPage - 1) : null;
  const nextLink = hasNextPage ? generateLink(currentPage + 1) : null;

  const pageList = [hasPrevPage ? currentPage - 1 : null, currentPage, hasNextPage ? currentPage + 1 : null].filter(Boolean);

  return (
    <>
      {totalPages > 1 && (
        <nav className="flex items-center justify-center space-x-3" aria-label="Pagination">
          {/* previous */}
          {prevLink ? (
            <Link href={prevLink} className={linkStyles}>
              <span className="sr-only">Previous</span>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="30" width="30">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            <span className="rounded px-1 py-1.5 text-light">
              <span className="sr-only">Previous</span>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="30" width="30">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                <span aria-current="page" className={activeStyles}>
                  {pagination}
                </span>
              ) : (
                <Link href={generateLink(pagination!)} passHref aria-current="page" className={linkStyles}>
                  {pagination}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {nextLink ? (
            <Link href={nextLink} className={linkStyles}>
              <span className="sr-only">Next</span>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="30" width="30">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            <span className="rounded px-1 py-1.5 text-light">
              <span className="sr-only">Next</span>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="30" width="30">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
