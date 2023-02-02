import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../../store/store'
import {
  CompareItemType,
  getCompare,
} from '../../../../../store/products/storeSlice'
import { getLocalStorage } from '../../../../../utils/utils'

const CompareItems: React.FC<PropsType> = ({ compareItems }) => {
  const dispatch = useAppDispatch()

  const deleteProductClick = (id: number) => {
    const compareItems: CompareItemType[] = getLocalStorage('compare') // запросить localStorage
    const findProduct = compareItems.find((item) => item.id === id) // проверить наличие товара в корзине
    findProduct && compareItems.splice(compareItems.indexOf(findProduct), 1)
    localStorage.setItem('compare', JSON.stringify(compareItems))
    dispatch(getCompare())
  }

  if (!compareItems.length) return <div>Товаров нет</div>

  return (
    <div className="compare__items">
      {compareItems?.map((item) => {
        return (
          <div key={item.id} className="compare__item product">
            <div className="product__img">
              <img
                src={(process.env.REACT_APP_SERVER_URL || '') + item.imgUrl}
                alt={item.title}
              />
            </div>
            <div className="product__title">
              <Link to={`/products/${item.id}`}>{item.title}</Link>
            </div>
            {item.property.country && (
              <div>Страна: {item.property.country}</div>
            )}
            {item.property.town && <div>Город: {item.property.town}</div>}
            {item.property.year && <div>Год: {item.property.year}</div>}

            <div className="product__text">
              {item.text.map((item) => (
                <p key={item.toString()}>{item}</p>
              ))}
            </div>
            <div className="product__delete delete">
              <button
                onClick={() => deleteProductClick(item.id)}
                className="delete__btn"
              >
                Удалить <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CompareItems

type PropsType = {
  compareItems: CompareItemType[]
}
