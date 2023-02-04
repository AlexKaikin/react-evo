import React from 'react'

const ProductFullSkeleton: React.FC = (props) => {
  return (
    <div className="section product skeleton">
      <div className="container">
        <div className="product__img-container img">
          <div className="img__items">
            <div className="img__item"></div>
            <div className="img__item"></div>
            <div className="img__item"></div>
          </div>
          <div className="img__big"></div>
        </div>

        <div className="product__title-container">
          <div className="product__info info">
            <button>
              <i className="bi bi-bookmark"></i>
            </button>
            <button>
              <i className="bi bi-heart"></i>
            </button>

            <div className="info__rating">
              <span>рейтинг</span>
            </div>
          </div>

          <div className="product__title">Название</div>
          <div className="product__quantity">100 грамм</div>
          <div className="product__quantity quantity">
            <div className="quantity__title">Количество</div>
          </div>
          <div className="product__price price">
            <div className="price__title">Стоимость</div>
            <div className="price__number">цена 500</div>
          </div>
          <div className="product__add">
            <button className="btn">В корзину</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tab">
          <div className="tab__titles items">
            <button className="btn tab__title title-1">Описание</button>
            <button className="btn tab__title title-2">Характеристики</button>
            <button className="btn tab__title title-3">Отзывы</button>
          </div>

          <div className="tab__content content-1">
            <div className="product__text">Описание</div>
            <div className="product__text">Описание</div>
            <div className="product__text">Описание</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductFullSkeleton)
