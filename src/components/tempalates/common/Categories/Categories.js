import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategoryActive } from '../../../../redux/productsFilterSlice'
import { setCurrentPage } from '../../../../redux/productsSlice'


const Categories = props => {
    const dispatch = useDispatch()
    const categoryRef = useRef()
    const [categoryShow, setCategoryShow] = useState(false)
    const categoryShowChange = () => {
        if(categoryShow){
            setCategoryShow(false)
            document.body.removeEventListener('click', bodyClick)
        } else {
            setCategoryShow(true)
            document.body.addEventListener('click', bodyClick)
        }
    }
    const bodyClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath()) // for firefox browser
        if(!path.includes(categoryRef.current)) {
            setCategoryShow(false)
            document.body.removeEventListener('click', bodyClick)
        }
    }
    
    // смена категории
    const changeCategory = (e) => {
        dispatch(setCurrentPage(1))
        dispatch(setCategoryActive(e.currentTarget.innerText))
        setCategoryShow(false)
        document.body.removeEventListener('click', bodyClick)
    }

    return  <div ref={categoryRef} className='filter__category'>
                <button onClick={categoryShowChange} className='category__mobile'>
                    <i className="bi bi-folder2-open"></i> 
                    <span>{ props.items?.map(item => item.isActive && item.title) }</span>
                </button>
                    <div className={categoryShow ? 'category__items show': 'category__items' }>
                        { 
                            props.items?.map(item => {
                                return  <button key={item.id} className={ item.isActive ? 'btn active' : 'btn'}
                                            onClick={changeCategory}>{item.title}</button>
                            }) 
                        }
                    </div>
                
            </div>
}

export default Categories