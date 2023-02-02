import React from 'react'
import {
  CategoryItemType,
  SortItemType,
} from '../../../store/navigation/navigationSlice'
import Categories from './Categories/Categories'
import Sorting from './Sorting/Sorting'
import './Filter.scss'

const Filter: React.FC<PropsType> = ({
  categories,
  categoryActive,
  sortingItems,
  sortActive,
}) => {
  return (
    <div className="section filter">
      <div className="container">
        <Categories items={categories} categoryActive={categoryActive} />
        <Sorting items={sortingItems} sortActive={sortActive} />
      </div>
    </div>
  )
}

export default React.memo(Filter)

type PropsType = {
  categories: CategoryItemType[]
  categoryActive: string
  sortingItems: SortItemType[]
  sortActive: string
}
