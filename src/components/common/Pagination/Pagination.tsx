import React from 'react'
import './Pagination.scss'
import cn from 'classnames'

const Pagination: React.FC<PropsType> = ({
  pagesCount,
  currentPage,
  currentPageChange,
}) => {
  const pages: number[] = [] // массив страниц

  const createPages = (
    pages: number[],
    pagesCount: number,
    currentPage: number
  ) => {
    if (pagesCount > 5) {
      if (currentPage > 4) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
          if (i === pagesCount) break
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
      }
    }
  }

  createPages(pages, pagesCount, currentPage) // заполняем массив страниц

  if (pages.length === 1) return null // если 1 страница то не показываем пагинацию

  return (
    <div className="pagination">
      {
        // стрелка назад
        currentPage > 1 && (
          <button
            onClick={() => currentPageChange(currentPage - 1)}
            className="page"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        )
      }
      {
        // страницы
        pages?.map((page) => (
          <button
            key={page}
            onClick={() =>
              currentPage !== page && currentPageChange(page)
            }
            className={cn('page', { active: currentPage === page })}
          >
            {page}
          </button>
        ))
      }
      {
        // стрелка вперёд
        currentPage < pagesCount && (
          <button
            onClick={() => currentPageChange(currentPage + 1)}
            className="page"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        )
      }
    </div>
  )
}

export default Pagination

type PropsType = {
  pagesCount: number
  currentPage: number
  currentPageChange: (number: number) => void
}
