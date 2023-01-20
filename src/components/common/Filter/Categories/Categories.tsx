import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    CategoryItemType,
    setCategoryActive,
} from '../../../../store/navigationSlice'
import { setCurrentPage } from '../../../../store/productsSlice'

const Categories: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const categoryRef = useRef<HTMLDivElement>(null)
    const [categoryShow, setCategoryShow] = useState<boolean>(false)
    const categoryShowChange = () => {
        if (categoryShow) {
            setCategoryShow(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setCategoryShow(true)
            document.body.addEventListener('click', bodyClick)
        }
    }
    const bodyClick = (e: MouseEvent) => {
        const _e = e as BodyClickType
        const path = _e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if (categoryRef.current && !path.includes(categoryRef.current)) {
            setCategoryShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    // смена категории
    const changeCategory = (item: string) => {
        dispatch(setCurrentPage(1))
        dispatch(setCategoryActive(item))
        setCategoryShow(false)
        document.body.removeEventListener('click', bodyClick)
    }

    return (
        <div ref={categoryRef} className="filter__category">
            <button onClick={categoryShowChange} className="category__mobile">
                <i className="bi bi-folder2-open"></i>
                <span>
                    {props.items?.map(
                        (item) =>
                            item.title === props.categoryActive && item.title
                    )}
                </span>
            </button>
            <div
                className={
                    categoryShow ? 'category__items show' : 'category__items'
                }
            >
                {props.items?.map((item) => {
                    return (
                        <button
                            key={item.id}
                            className={
                                item.title === props.categoryActive
                                    ? 'btn active'
                                    : 'btn'
                            }
                            onClick={() => changeCategory(item.title)}
                        >
                            {item.title}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default React.memo(Categories)

type PropsType = {
    items: CategoryItemType[]
    categoryActive: string
}

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event
