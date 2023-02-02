import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import {
  setSortActive,
  SortItemType,
} from '../../../../store/navigation/navigationSlice'

const Sorting: React.FC<PropsType> = ({ items, sortActive }) => {
  const sortRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const [sortShow, setSortShow] = useState<boolean>(false)

  const sortShowChange = () => {
    if (sortShow) {
      setSortShow(false)
      document.body.removeEventListener('click', bodyClick)
    } else {
      setSortShow(true)
      document.body.addEventListener('click', bodyClick)
    }
  }

  const changeSort = (item: string) => {
    dispatch(setSortActive(item))
    setSortShow(false)
    document.body.removeEventListener('click', bodyClick)
  }

  const bodyClick = (e: MouseEvent) => {
    const _e = e as BodyClickType
    const path = _e.path || (e.composedPath && e.composedPath()) // for firefox browser
    if (sortRef.current && !path.includes(sortRef.current)) {
      setSortShow(false)
      document.body.removeEventListener('click', bodyClick)
    }
  }

  return (
    <div ref={sortRef} className="filter__sort sort">
      <i className="bi bi-sort-down"></i> <span>Сортировка:</span>{' '}
      <button onClick={sortShowChange}>
        {items?.map((item) => item.type === sortActive && item.title)}
      </button>
      <div className={cn('sort__items', { show: sortShow })}>
        {items.length > 0 &&
          items?.map((item) => (
            <button key={item.id} onClick={() => changeSort(item.type)}>
              {item.title}
            </button>
          ))}
      </div>
    </div>
  )
}

export default React.memo(Sorting)

type PropsType = {
  items: SortItemType[]
  sortActive: string
}

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event
