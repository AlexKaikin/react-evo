import { Formik, Form, Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { navigationSelector } from '../../../../store/navigationSlice'
import { ProductItemType, updateProduct } from '../../../../store/productsSlice'
import { useAppDispatch } from '../../../../store/store'
import Modal from '../../../common/Modal/Modal'

const UpdateProductForm: React.FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    const { navigation } = useSelector(navigationSelector)
    const categories = navigation
        .find((item) => item.url === '/products')
        ?.filter.slice(1)
    const formState: ProductItemType = {
        id: props.item.id,
        title: `${props.item.title}`,
        category: `${props.item.category}`,
        price: props.item.price,
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
    }

    const formSubmit = (values: ProductItemType) => {
        dispatch(updateProduct(values))
        props.modaltoggle()
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
                                        <option
                                            key={item.id}
                                            value={item.title}
                                        >
                                            {item.title}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            <div className="form__field">
                                <label>Цена, руб.</label>
                                <Field type="number" name="price" required />
                            </div>

                            <div className="hidden">
                                <Field type="number" name="id" />
                                <Field type="text" name="imgUrl" />
                                <Field type="text" name="galleryUrl" />
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
                                <Field
                                    type="text"
                                    name="property.country"
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <label>Город</label>
                                <Field
                                    type="text"
                                    name="property.town"
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <label>Год</label>
                                <Field
                                    type="number"
                                    name="property.year"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form__full">
                            <div className="form__field">
                                <label>Описание</label>
                                <Field
                                    type="text"
                                    name="text"
                                    as="textarea"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form__left">
                            <h3>Обложка</h3>
                            <div className="img-wrapper">
                                <img src={props.item.imgUrl} alt="" />
                            </div>
                            <input
                                type="file"
                                name="imgUrl"
                                accept="image/png, image/jpeg"
                            />
                        </div>

                        <div className="form__right">
                            <h3>Фотогалерея</h3>
                            <div className="img-wrapper">
                                {props.item.galleryUrl.map((item) => (
                                    <img key={item} src={item} alt="" />
                                ))}
                            </div>
                            <input
                                type="file"
                                name="imgUrl"
                                accept="image/png, image/jpeg"
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
}
