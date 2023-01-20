import React from 'react'
import { CategoryItemType, SortItemType } from '../../../store/navigationSlice'
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
                {categories && (
                    <Categories
                        items={categories}
                        categoryActive={categoryActive}
                    />
                )}
                {sortingItems && (
                    <Sorting items={sortingItems} sortActive={sortActive} />
                )}
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
