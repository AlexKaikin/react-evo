import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import {
  CartItemType,
  CompareItemType,
  FavoriteItemType,
  getCart,
  getCompare,
  getFavorites,
  storeSelector,
} from '../../../../../store/products/storeSlice'
import { useSelector } from 'react-redux'
import { getLocalStorage } from '../../../../../utils/utils'
import { useAppDispatch } from '../../../../../store/store'
import { ProductItemType } from '../../../../../store/products/productsSlice'

const FullProduct: React.FC<FullProductPropsType> = ({ productItem }) => {
  const { compareItems, favoritesItems } = useSelector(storeSelector) // получить товары для сранения, избранные

  const isCompare = compareItems.find((item) => item.id === productItem.id) // проверить есть ли товар в списке для сравнения
  const isFavorites = favoritesItems.find((item) => item.id === productItem.id) // проверить есть ли товар в избранных

  const [quantity, setQuantity] = useState(1) // для количества товара
  const [cost, setCost] = useState(productItem?.price) // стоимость товара

  // увеличить количество товара на 1
  const Increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
    setCost((prevCost) => prevCost + productItem.price)
  }

  // уменьшить количество товара на 1
  const Decriment = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
      setCost((prevCost) => prevCost - productItem.price)
    }
  }

  // проверка введённого значения в количество товара
  const quantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let number = +e.target.value
    if (Number.isNaN(number) || number < 1) {
      // если значение NaN или отрицательное, то
      setQuantity(1)
      setCost(productItem.price)
    }
  }

  // изменить количество товара через input
  const quantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(+e.target.value)) {
      // если значение не NaN, то...
      setQuantity(+e.target.value)
      setCost(productItem.price * +e.target.value)
    }
  }
  const info = useRef<HTMLDivElement>(null)

  // добавить товар для сравнения
  const compareClick = () => {
    const comapreItems: CompareItemType[] = getLocalStorage('compare') // запросить localStorage
    const findProduct = comapreItems.find((item) => item.id === productItem.id) // проверить наличие товара в сравнении
    const msgShow = (msg: string) => {
      // добавление сообщения на 5 секунд
      info.current?.insertAdjacentHTML('beforeend', msg)
      setTimeout(() => {
        if (info.current?.querySelector('.msg')) {
          let msgShow = info.current.querySelector('.msg')
          if (msgShow !== null) msgShow.outerHTML = ''
        }
      }, 5000)
    }

    if (findProduct) {
      comapreItems.splice(comapreItems.indexOf(findProduct), 1)
      const msg = '<p class="msg">Товар исключён из сравнения</p>' // сообщение о исключении
      msgShow(msg)
    } else {
      comapreItems.push(productItem)
      const msg = '<p class="msg">Товар добавлен для сравнения</p>' // сообщение о добавлении
      msgShow(msg)
    }
    localStorage.setItem('compare', JSON.stringify(comapreItems))
    dispatch(getCompare())
  }

  // добавить товар в избранное
  const favoritesClick = () => {
    const favoritesItems: FavoriteItemType[] = getLocalStorage('favorites') // запросить localStorage
    const findProduct = favoritesItems.find(
      (item) => item.id === productItem.id
    ) // проверить наличие товара в избранном
    const msgShow = (msg: string) => {
      // добавление сообщения на 5 секунд
      info.current?.insertAdjacentHTML('beforeend', msg)
      setTimeout(() => {
        if (info.current?.querySelector('.msg')) {
          let msgShow = info.current.querySelector('.msg')
          if (msgShow !== null) msgShow.outerHTML = ''
        }
      }, 5000)
    }

    if (findProduct) {
      favoritesItems.splice(favoritesItems.indexOf(findProduct), 1)
      const msg = '<p class="msg">Товар исключён из избранных</p>' // сообщение о исключении
      msgShow(msg)
    } else {
      favoritesItems.push(productItem)
      const msg = '<p class="msg">Товар добавлен в избранное</p>' // сообщение о добавлении
      msgShow(msg)
    }
    localStorage.setItem('favorites', JSON.stringify(favoritesItems))
    dispatch(getFavorites())
  }

  const addCartRef = useRef<HTMLDivElement>(null)

  // добавить товар в корзину
  const addCartClick = () => {
    const cartItems: CartItemType[] = getLocalStorage('cart') // запросить localStorage
    const findProduct = cartItems.find((item) => item.id === productItem.id) // проверить наличие товара в корзине
    const product = {
      // создание товара
      id: productItem.id,
      imgUrl: productItem.imgUrl,
      title: productItem.title,
      price: productItem.price,
      quantity: quantity,
      cost: cost,
    }
    if (!findProduct) {
      cartItems.push(product)
    } else {
      findProduct.quantity = quantity
      findProduct.cost = cost
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
    dispatch(getCart())

    // сообщение о добавлении
    const msg = '<p class="msg">Товар добавлен в корзину</p>'
    addCartRef.current?.insertAdjacentHTML('beforeend', msg)
    setTimeout(() => {
      if (addCartRef.current?.querySelector('.msg')) {
        let msgShow = addCartRef.current.querySelector('.msg')
        if (msgShow !== null) msgShow.outerHTML = ''
      }
    }, 5000)
  }

  // рейтинг товара
  let ratingStarFill: string[] = [] // полные звёзды
  let ratingStar: string[] = [] // пустые звезды
  if (productItem.rating > 0) {
    ratingStarFill = Array(productItem.rating).fill('ratingStarFill')
    if (productItem.rating < 5)
      ratingStar = Array(5 - productItem.rating).fill('ratingStar')
  }

  // Большая картинка товара
  const [imgActive, setImgActive] = useState(productItem.imgUrl)

  // Вкладки Описание, Характеристики, ОТзывы
  const [tabActive, setTabActive] = useState(1)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setImgActive(productItem.imgUrl)
  }, [productItem.imgUrl])

  return (
    <div className="section product">
      <div className="container">
        <div className="product__img-container img">
          <div className="img__items">
            <div
              className={cn('img__item', {
                active: imgActive === productItem.imgUrl,
              })}
            >
              <img
                onClick={() => setImgActive(productItem.imgUrl)}
                src={
                  (process.env.REACT_APP_SERVER_URL || '') + productItem.imgUrl
                }
                alt="Картинка не загрузилась"
              />
            </div>
            {productItem.galleryUrl?.map((item) => (
              <div
                key={item.toString()}
                className={cn('img__item', {
                  active: imgActive === item,
                })}
              >
                <img
                  onClick={() => setImgActive(item)}
                  src={(process.env.REACT_APP_SERVER_URL || '') + item}
                  alt="Картинка не загрузилась"
                />
              </div>
            ))}
          </div>
          <div className="img__big">
            <img
              src={(process.env.REACT_APP_SERVER_URL || '') + imgActive}
              alt="Картинка не загрузилась"
            />
          </div>
        </div>

        <div className="product__title-container">
          <div ref={info} className="product__info info">
            <button onClick={compareClick} className={isCompare && 'active'}>
              <i className="bi bi-bookmark"></i>
            </button>
            <button
              onClick={favoritesClick}
              className={isFavorites && 'active'}
            >
              <i className="bi bi-heart"></i>
            </button>

            <div className="info__rating">
              {ratingStarFill.length > 0 &&
                ratingStarFill.map((item, i) => (
                  <i key={i} className="bi bi-star-fill"></i>
                ))}
              {ratingStar.length > 0 &&
                ratingStar.map((item, i) => (
                  <i key={i} className="bi bi-star"></i>
                ))}
            </div>
          </div>

          <div className="product__title">{productItem.title}</div>
          <div className="product__quantity">
            {productItem.volume} {productItem.volumeMeasurement}
          </div>
          <div className="product__quantity quantity">
            <div className="quantity__title">Количество</div>
            <div className="quantity__content">
              <button onClick={Decriment}>
                <i className="bi bi-dash-lg"></i>
              </button>
              <input
                type="text"
                onBlur={quantityBlur}
                onChange={quantityChange}
                value={quantity}
                className="quantity__number"
                min="1"
                max="7"
              />
              <button onClick={Increment}>
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
          <div className="product__price price">
            <div className="price__title">Стоимость</div>
            <div className="price__number">{cost} руб.</div>
          </div>
          <div ref={addCartRef} className="product__add">
            <button className="btn" onClick={addCartClick}>
              В корзину
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tab">
          <div className="tab__titles items">
            <button
              onClick={() => setTabActive(1)}
              className={cn('btn btn-light tab__title title-1', {
                active: tabActive === 1,
              })}
            >
              Описание
            </button>
            <button
              onClick={() => setTabActive(2)}
              className={cn('btn btn-light tab__title title-2', {
                active: tabActive === 2,
              })}
            >
              Характеристики
            </button>
            <button
              onClick={() => setTabActive(3)}
              className={cn('btn btn-light tab__title title-3', {
                active: tabActive === 3,
              })}
            >
              Отзывы
            </button>
          </div>

          <div className="tab__content content-1">
            <div className="product__text">
              {tabActive === 1 &&
                productItem.text?.map((item) => (
                  <p key={item.toString()}>{item}</p>
                ))}
              {tabActive === 2 && (
                <div className="product__property">
                  {productItem.property.country && (
                    <div>Страна: {productItem.property.country}</div>
                  )}
                  {productItem.property.town && (
                    <div>Город: {productItem.property.town}</div>
                  )}
                  {productItem.property.year && (
                    <div>Год: {productItem.property.year}</div>
                  )}
                </div>
              )}
              {tabActive === 3 && 'Отзывов нет'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullProduct

type FullProductPropsType = {
  productItem: ProductItemType
}
