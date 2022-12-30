import React from 'react'


const Pagination = props => {
    const pagesCount = props.pagesCount // количество страниц
    const currentPage = props.currentPage // ntreofz cnhfybwf
    const pages = [] // массив страниц

    const createPages = (pages, pagesCount, currentPage) => {
        if(pagesCount > 5) {
            if(currentPage > 4) {
                for (let i = currentPage-2; i <= currentPage+2; i++) {
                    pages.push(i)
                    if(i === pagesCount) break
                }
            } else {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i)
                    if(i === pagesCount) break
                }
            }
        }  else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }

    createPages(pages, pagesCount, currentPage) // заполняем массив страниц

    if(pages.length === 1) return null // если 1 страница то не показываем пагинацию

    return  <div className='pagination'>
                { // стрелка назад
                    currentPage > 1 &&  <button onClick={() => props.currentPageChange(currentPage - 1)} className='page'>
                                            <i className="bi bi-chevron-left"></i>
                                        </button>
                }
                { // страницы
                    pages?.map(page => <button key={page} onClick={() => currentPage !== page && props.currentPageChange(page)} className={currentPage === page ? 'page active' : 'page'}>{page}</button>) 
                }
                { // стрелка вперёд
                    currentPage < pagesCount && <button onClick={() => props.currentPageChange(currentPage + 1)} className='page'>
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                }
            </div>
}

export default Pagination