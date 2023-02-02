import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getProducts,
  ProductItemType,
  productsSelector,
  setCurrentPage,
} from '../../../../store/products/productsSlice'
import { useAppDispatch } from '../../../../store/store'
import { navigationSelector } from '../../../../store/navigation/navigationSlice'
import Filter from '../../../common/Filter/Filter'
import Pagination from '../../../common/Pagination/Pagination'
import './Products.scss'
import { CreateProductForm, DeleteProductForm, UpdateProductForm } from './Crud'
import Aside from '../../../layout/Aside/admin/Aside'

const Products: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const { productItems, currentPage, pagesCount, status } =
    useSelector(productsSelector)
  const { navigation, categoryActive, sortActive } =
    useSelector(navigationSelector)
  const categories =
    navigation.find((item) => item.url === '/products')?.filter || []
  const sortingItems =
    navigation.find((item) => item.url === '/products')?.sort || []

  const currentPageChange = (number: number) => dispatch(setCurrentPage(number))

  // показать/скрыть модальное окно создать товар
  const [createProductShow, setCreateProductShow] = useState<boolean>(false)
  const createModaltoggle = () => setCreateProductShow(!createProductShow)

  const [update, setUpdate] = useState(false)
  const updateComponent = () => setUpdate(true)

  useEffect(() => {
    dispatch(getProducts(categoryActive, sortActive, currentPage))
    window.scrollTo(0, 0)
    setUpdate(false)
  }, [dispatch, categoryActive, sortActive, currentPage, update])

  return (
    <div className="two">
      <Aside />
      <div className="section admin">
        <div className="container">
          <button
            onClick={() => setCreateProductShow(true)}
            className="btn btn-light p10"
          >
            Добавить товар
          </button>

          <Filter
            categories={categories}
            categoryActive={categoryActive}
            sortingItems={sortingItems}
            sortActive={sortActive}
          />

          <ProductItems
            items={productItems}
            status={status}
            updateComponent={updateComponent}
          />
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            currentPageChange={currentPageChange}
          />
        </div>
      </div>
      {createProductShow && (
        <CreateProductForm
          modaltoggle={createModaltoggle}
          updateComponent={updateComponent}
        />
      )}
    </div>
  )
}

export default Products

const ProductItems: React.FC<PropsType> = (props) => {
  const [productItem, setProductItem] = useState<ProductItemType | null>(null)
  // показать/скрыть модальное окно обновить товар
  const [updateProductShow, setUpdateProductShow] = useState<boolean>(false)
  const updateModaltoggle = () => setUpdateProductShow(!updateProductShow)
  const updateProduct = (item: ProductItemType) => {
    setUpdateProductShow(true)
    setProductItem(item)
  }

  // показать/скрыть модальное окно удалить товар
  const [deleteProductShow, setDeleteProductShow] = useState<boolean>(false)
  const deleteModaltoggle = () => setDeleteProductShow(!deleteProductShow)
  const deleteProduct = (item: ProductItemType) => {
    setDeleteProductShow(true)
    setProductItem(item)
  }

  if (props.status === 'error') {
    return (
      <>
        <div className="section__title">Произошла ошибка</div>
        <p>К сожалению, не удалось загрузить товары</p>
      </>
    )
  }
  if (props.status === 'loading') {
    return null
  }

  return (
    <div className="admin__items">
      <div className="admin__item item">
        <div className="item__title">Заголовок</div>
        <div>Количество, шт.</div>
        <div>Цена, руб.</div>
        <div></div>
        <div></div>
      </div>
      {props.items?.map((item) => {
        return (
          <div key={item.id} className="admin__item item">
            <div className="item__title">{item.title}</div>
            <div>{item.quantity}</div>
            <div>{item.price}</div>
            <button
              onClick={() => updateProduct(item)}
              className="btn btn-light p10"
            >
              Редактировать
            </button>
            <button
              onClick={() => deleteProduct(item)}
              className="btn btn-light p10"
            >
              Удалить
            </button>
          </div>
        )
      })}

      {updateProductShow && productItem && (
        <UpdateProductForm
          item={productItem}
          modaltoggle={updateModaltoggle}
          updateComponent={props.updateComponent}
        />
      )}
      {deleteProductShow && productItem && (
        <DeleteProductForm
          id={productItem.id}
          modaltoggle={deleteModaltoggle}
          updateComponent={props.updateComponent}
        />
      )}
    </div>
  )
}

type PropsType = {
  items: ProductItemType[]
  status: string
  updateComponent: () => void
}
