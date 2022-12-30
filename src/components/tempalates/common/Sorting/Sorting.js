import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSortActive } from '../../../../redux/productsFilterSlice'


const Sorting = props => {
    const sortRef = useRef()
    const dispatch = useDispatch()
    const [sortShow, setSortShow] = useState(false)

    const sortShowChange = () => {
        if(sortShow){
            setSortShow(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setSortShow(true)
            document.body.addEventListener('click', bodyClick)
        }
    }

    const changeSort = (e) => {
        dispatch(setSortActive(e.currentTarget.innerText))
        setSortShow(false)
        document.body.removeEventListener('click', bodyClick)
    }

    const bodyClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(!path.includes(sortRef.current)) {
            setSortShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }

    return  <div ref={sortRef} className='filter__sort sort'>
                <i className="bi bi-sort-down"></i> <span>Сортировка:</span> <button onClick={sortShowChange}>
                        { props.items?.map(item => item.isActive && item.title) }
                    </button>

                <div className={sortShow ? 'sort__items show' : 'sort__items'}>
                    { props.items?.map(item => <button key={item.id} onClick={changeSort}>{item.title}</button>) }
                </div>
            </div>
}

export default Sorting