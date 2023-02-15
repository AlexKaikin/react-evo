import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getReviewsAdmin,
  reviewsAdminSelector,
  setCurrentPage,
} from '../../../../store/admin/products/reviewsAdminSlice'
import { useAppDispatch } from '../../../../store/store'
import Pagination from '../../../common/Pagination/Pagination'
import Aside from '../../../layout/Aside/admin/Aside'
import ReviewItems from './ReviewItems/ReviewItems'
import './Reviews.scss'

const Reviews: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const { reviewItems, pagesCount, currentPage } =
    useSelector(reviewsAdminSelector)
  const currentPageChange = (number: number) => dispatch(setCurrentPage(number))

  const [update, setUpdate] = useState(false)
  const updateComponent = () => setUpdate(true)

  useEffect(() => {
    dispatch(getReviewsAdmin(currentPage))
    window.scrollTo(0, 0)
    setUpdate(false)
  }, [dispatch, currentPage, update])

  return (
    <div className="two">
      <Aside />
      <div className="section admin reviews">
        <div className="container">
          <ReviewItems items={reviewItems} updateComponent={updateComponent} />
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            currentPageChange={currentPageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Reviews
