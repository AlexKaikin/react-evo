import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSortActive } from '../../../../redux/filterSlice'


const Sorting: React.FC<PropsType> = props => {
    const sortRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const [sortShow, setSortShow] = useState<boolean>(false)

    const sortShowChange = () => {
        if(sortShow){
            setSortShow(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setSortShow(true)
            document.body.addEventListener('click', bodyClick)
        }
    }

    const changeSort = (item: any) => {
        dispatch(setSortActive(item))
        setSortShow(false)
        document.body.removeEventListener('click', bodyClick)
    }

    const bodyClick = (e: any) => {
        const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(!path.includes(sortRef.current)) {
            setSortShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    return  <div ref={sortRef} className='filter__sort sort'>
                <i className="bi bi-sort-down"></i> <span>Сортировка:</span> <button onClick={sortShowChange}>
                    { props.items?.map(item => item.type === props.sortActive && item.title) }
                    </button>

                <div className={sortShow ? 'sort__items show' : 'sort__items'}>
                    { props.items.length > 0 && props.items?.map(item => <button key={item.id} onClick={() => changeSort(item.type)}>{item.title}</button>) }
                </div>
            </div>
}

export default Sorting

type PropsType = {
    items: ItemType[],
    sortActive: string
}

type ItemType = {
    id: number,
    title: string,
    type: string
}