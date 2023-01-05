import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategoryActive } from '../../../../redux/filterSlice'
import { setCurrentPage } from '../../../../redux/productsSlice'


const Categories: React.FC<PropsType> = props => {
    
    const dispatch = useDispatch()
    const categoryRef = useRef<HTMLDivElement>(null)
    const [categoryShow, setCategoryShow] = useState<boolean>(false)
    const categoryShowChange = () => {
        if(categoryShow){
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
        if(categoryRef.current && !path.includes(categoryRef.current)) {
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

    return  <div ref={categoryRef} className='filter__category'>
                <button onClick={categoryShowChange} className='category__mobile'>
                    <i className="bi bi-folder2-open"></i> 
                    <span>
                        { props.items?.map(item => item.type === props.categoryActive && item.title) }
                    </span>
                </button>
                <div className={categoryShow ? 'category__items show': 'category__items' }>
                    { 
                        props.items?.map(item => {
                            return  <button key={item.id} className={ item.type === props.categoryActive ? 'btn active' : 'btn'}
                                        onClick={() => changeCategory(item.type)}>{item.title}</button>
                        }) 
                    }
                </div>
            </div>
}

export default Categories

type PropsType = {
    items: ItemType[],
    categoryActive: string
}

type ItemType = {
    id: number,
    title: string,
    type: string
}

type BodyClickType = MouseEvent & { path: Node[] } // добавить path в event