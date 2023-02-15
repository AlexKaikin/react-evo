import { Formik, Form, Field } from 'formik'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { productsAdminAPI } from '../../../../../api/api'
import { navigationSelector } from '../../../../../store/navigation/navigationSlice'
import {
  ProductItemType,
  updateProduct,
} from '../../../../../store/admin/products/productsAdminSlice'
import { useAppDispatch } from '../../../../../store/store'
import Modal from '../../../../common/Modal/Modal'

const UpdateProductForm: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch()
  const { navigation } = useSelector(navigationSelector)
  const [imgUrl, setImgUrl] = useState(props.item.imgUrl)
  const [galleryUrl, setGalleryUrl] = useState<string[]>(props.item.galleryUrl)
  const imgRef = useRef(null)
  const galleryRef = useRef(null)
  const [publishedChecked, setPublishedChecked] = useState(props.item.published)

  const categories = navigation
    .find((item) => item.url === '/products')
    ?.filter.slice(1)

  const handleChangeFile = async (e: any) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await productsAdminAPI.uploadProductImg(formData)
      setImgUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('Ошибка загрузки изображения')
    }
  }

  const uploadImgClick = () => {
    // @ts-ignore
    if (imgRef.current) imgRef.current.click()
  }

  const onClickRemoveImage = () => {
    setImgUrl('')
  }

  const uploadGalleryClick = () => {
    // @ts-ignore
    if (galleryRef.current) galleryRef.current.click()
  }

  const addGalleryUrl = async (e: any) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await productsAdminAPI.uploadProductImg(formData)
      setGalleryUrl((arr) => [...arr, `${data.url}`])
    } catch (err) {
      console.warn(err)
      alert('Ошибка загрузки изображения')
    }
  }

  const galleryRemoveClick = (item: string) => {
    setGalleryUrl((arr) => arr.filter((i) => i !== item))
  }

  const publishedClick = () => {
    setPublishedChecked(!publishedChecked)
  }

  const formState: ProductItemType = {
    _id: props.item._id,
    id: props.item.id,
    title: `${props.item.title}`,
    category: `${props.item.category}`,
    price: props.item.price,
    quantity: props.item.quantity,
    text: props.item.text,
    imgUrl: props.item.imgUrl,
    galleryUrl: props.item.galleryUrl,
    rating: props.item.rating,
    volume: props.item.volume,
    volumeMeasurement: `${props.item.volumeMeasurement}`,
    currency: `${props.item.currency}`,
    property: {
      country: `${props.item.property.country}`,
      town: `${props.item.property.town}`,
      year: props.item.property.year,
    },
    published: props.item.published,
  }

  const formSubmit = (values: ProductItemType) => {
    values.imgUrl = imgUrl
    values.galleryUrl = galleryUrl
    values.published = publishedChecked
    dispatch(updateProduct(values))
    props.modaltoggle()
    props.updateComponent()
  }

  return (
    <Modal title="Обновить товар" modaltoggle={props.modaltoggle} full>
      <Formik
        initialValues={formState}
        validate={formValidate}
        onSubmit={formSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form create-product">
            <div className="form__left">
              <h3>Описание</h3>
              <div className="form__field">
                <label>Заголовок</label>
                <Field type="text" name="title" required />
              </div>

              <div className="form__select">
                <label>Категория</label>
                <Field type="text" name="category" as="select">
                  {categories?.map((item) => (
                    <option key={item.id} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form__field">
                <label>Цена, руб.</label>
                <Field type="number" name="price" required />
              </div>

              <div className="form__field">
                <label>Количество</label>
                <Field type="number" name="quantity" required />
              </div>

              <div className="hidden">
                <Field type="number" name="id" />
                <Field type="number" name="rating" />
                <Field type="number" name="volume" />
                <Field type="text" name="volumeMeasurement" />
                <Field type="text" name="currency" />
              </div>
            </div>
            <div className="form__right">
              <h3>Характеристики</h3>
              <div className="form__field">
                <label>Страна</label>
                <Field type="text" name="property.country" required />
              </div>

              <div className="form__field">
                <label>Город</label>
                <Field type="text" name="property.town" required />
              </div>

              <div className="form__field">
                <label>Год</label>
                <Field type="number" name="property.year" required />
              </div>
            </div>

            <div className="form__full">
              <div className="form__field">
                <label>Описание</label>
                <Field type="text" name="text" as="textarea" required />
              </div>
            </div>

            <div className="form__full">
              <div className="form__checkbox">
                <Field
                  type="checkbox"
                  name="published"
                  value={publishedChecked}
                  checked={publishedChecked}
                />
                <label onClick={publishedClick} className="form-check-label">
                  Опубликовать
                </label>
              </div>
            </div>

            <div className="form__left">
              <h3>Обложка</h3>

              {imgUrl && (
                <div className="img__item">
                  <div onClick={onClickRemoveImage} className="remove">
                    <i className="bi bi-trash3"></i>
                  </div>
                  <img
                    src={(process.env.REACT_APP_SERVER_URL || '') + imgUrl}
                    alt="фото"
                  />
                </div>
              )}
              <div onClick={uploadImgClick} className="btn btn-light">
                Загрузить фото
              </div>
              <input
                ref={imgRef}
                type="file"
                name="imgUrl"
                onChange={handleChangeFile}
                hidden
              />
            </div>

            <div className="form__right">
              <h3>Фотогалерея</h3>
              <div className="img__items">
                {galleryUrl &&
                  galleryUrl.map((item) => (
                    <div key={item} className="img__item">
                      <div
                        onClick={() => galleryRemoveClick(item)}
                        className="remove"
                      >
                        <i className="bi bi-trash3"></i>
                      </div>
                      <img
                        src={(process.env.REACT_APP_SERVER_URL || '') + item}
                        alt="фото"
                      />
                    </div>
                  ))}
              </div>
              <div onClick={uploadGalleryClick} className="btn btn-light">
                Загрузить фото
              </div>
              <input
                ref={galleryRef}
                type="file"
                name="galleryUrl"
                onChange={addGalleryUrl}
                hidden
              />
            </div>

            <div className="form__full">
              <button
                className="form__btn"
                type="submit"
                disabled={isSubmitting}
              >
                Отправить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default UpdateProductForm

const formValidate = (values: ProductItemType) => {
  const errors = {}
  return errors
}

type PropsType = {
  item: ProductItemType
  modaltoggle: () => void
  updateComponent: () => void
}
