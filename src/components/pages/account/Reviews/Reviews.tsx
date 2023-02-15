import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getReviewsProfile, reviewSelector, setCurrentPage } from '../../../../store/products/reviewsSlice'
import { useAppDispatch } from '../../../../store/store'
import Pagination from '../../../common/Pagination/Pagination'
import Aside from '../../../layout/Aside/profile/Aside'
import ReviewItems from './ReviewItems/ReviewItems'
import './Reviews.scss'

const Reviews: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const {reviewItems, pagesCount, currentPage} = useSelector(reviewSelector)
  const currentPageChange = (number: number) => dispatch(setCurrentPage(number))
  
  useEffect(() => {
    dispatch(getReviewsProfile(currentPage))
  }, [dispatch, currentPage])
  return (
    <div className="two">
      <Aside />
      <div className="section orders">
        <div className="container">
          <ReviewItems items={reviewItems} />
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
