import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../redux/store'
import { getCompare, storeSelector } from '../../../../redux/storeSlice'
import { getLocalStorage } from '../../../../utils/utils'
import Store from '../../../layout/Store/Store'


const Compare: React.FC = props => {
    const { compareItems } = useSelector(storeSelector)

    return  <>
                 <Store />
                 <div className='section compare'>
                    <div className='container'>
                        <div className='section__title'>Товары для сравнения</div>
                        {
                            compareItems.length > 0
                                ? <div className='compare__items'><CompareItems compareItems={compareItems} /></div>
                                : <div className=''>Нет товаров</div>
                        }
                    </div>
                </div>
            </>
}

export default Compare

const CompareItems: React.FC<PropsType> = props => {
    const dispatch = useAppDispatch()

    // const quantityChange = () => {

    // }

    // const Increment = (id) => {
    //     const cartItems = JSON.parse(localStorage.getItem('cart')) || [] // запросить localStorage
    //     const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
    //     findProduct.quantity += 1
    //     findProduct.cost += findProduct.price
    //     localStorage.setItem('cart', JSON.stringify(cartItems))
    //     dispatch(getCart())
    // }

    // const Decriment = (id) => {
    //     const cartItems = JSON.parse(localStorage.getItem('cart')) || [] // запросить localStorage
    //     const findProduct = cartItems.find(item => item.id === id) // проверить наличие товара в корзине
    //     if(findProduct.quantity > 1){
    //         findProduct.quantity -= 1
    //         findProduct.cost -= findProduct.price
    //     }
    //     localStorage.setItem('cart', JSON.stringify(cartItems))
    //     dispatch(getCart())
    // }

    const deleteProductClick = (id: number) => {
        const compareItems: CompareItemType[] = getLocalStorage('compare') // запросить localStorage
        const findProduct = compareItems.find(item => item.id === id) // проверить наличие товара в корзине
        findProduct && compareItems.splice(compareItems.indexOf(findProduct), 1)
        localStorage.setItem('compare', JSON.stringify(compareItems))
        dispatch(getCompare())
    }

    return  <>
                {
                    props.compareItems?.map(item => {
                        return  <div key={item.id} className='compare__item product'>
                                    <div className='product__img'><img src={item.imgUrl} alt={item.title} /></div>
                                    <div className='product__title'><Link to={`/products/${item.id}`}>{item.title}</Link></div>
                                    { item.property.country && <div>Страна: {item.property.country}</div> }
                                    { item.property.town && <div>Город: {item.property.town}</div> }
                                    { item.property.year && <div>Год: {item.property.year}</div> }
                                    {/* <div className='product__quantity quantity'>
                                        <div className='quantity__content'>
                                            <button onClick={() => Decriment(item.id)}><i className="bi bi-dash-lg"></i></button> 
                                            <input type="text" onChange={quantityChange} value={item.quantity} className="quantity__number" min="1" max="7" />
                                            <button onClick={() => Increment(item.id)}><i className="bi bi-plus-lg"></i></button>
                                        </div>
                                        
                                    </div>
                                    <div className='product__cost'><span>{item.cost}</span> руб.</div> */}
                                    <div className='product__text'>{item.text.map(item => <p key={item.toString()}>{item}</p>)}</div>
                                    <div className='product__delete delete'>
                                        <button onClick={() => deleteProductClick(item.id)} className='delete__btn'>Удалить <i className="bi bi-x-lg"></i></button>
                                    </div>
                                </div>
                    })
                }
            </>
    
}

type PropsType = {
    compareItems: CompareItemType[] 
}

type CompareItemType = {
    id: number, 
    imgUrl: string,
    title: string,
    property: PropertyType,
    text: string[]
}

type PropertyType = {
    country: string,
    town: string,
    year: number,
}