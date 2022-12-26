import React from 'react'


const Pagination = props => {
    const pagesCount = props.pagesCount
    const currentPage = props.currentPage
    const pages = []

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

    createPages(pages, pagesCount, currentPage)

    if(pages.length === 1) return null

    return  <div className='pagination'>
                { currentPage > 1 && <div onClick={() => props.setCurrentPage(currentPage - 1)} className='page'><i className="bi bi-chevron-left"></i></div> }
                { pages?.map(page => <div key={page} onClick={() => props.setCurrentPage(page)} className={currentPage === page ? 'page active' : 'page'}>{page}</div>) }
                { currentPage < pagesCount && <div onClick={() => props.setCurrentPage(currentPage + 1)} className='page'><i className="bi bi-chevron-right"></i></div> }
            </div>
}

export default Pagination