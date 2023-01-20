import { Formik, Form, Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { navigationSelector } from '../../../../redux/navigationSlice'
import { createProduct, ProductItemType } from '../../../../redux/productsSlice'
import { useAppDispatch } from '../../../../redux/store'
import Modal from '../../../common/Modal/Modal'


const CreateProductForm: React.FC<PropsType> = props => {
    const dispatch = useAppDispatch()
    const { navigation } = useSelector(navigationSelector)
    const categories = navigation.find(item => item.url === '/products')?.filter.slice(1)
    const productId = new Date().getTime()
    const formState: ProductItemType = { id: productId, title: '', category: 'Красные', price: 0, text: [], imgUrl: '', galleryUrl: [], rating: 0,
        volume: 100, volumeMeasurement: 'грамм', currency: 'руб.', property: {country: '', town: '', year: 0} }
    

    return <Modal title='Добавить товар' modaltoggle={props.modaltoggle} full>
                <Formik
                    initialValues={formState}
                    validate={formValidate}
                    onSubmit={values => dispatch(createProduct(values))}
                    >
                    {({ isSubmitting }) => (
                        <Form className="form create-product">
                            <div className='form__left'>
                                <h3>Описание</h3>
                                <div className="form__field">
                                    <label>Заголовок</label>
                                    <Field type="text" name="title" required />
                                </div>

                                <div className="form__select">
                                    <label>Категория</label>
                                    <Field type="text" name="category" as="select">
                                        { categories?.map(item => <option key={item.id} value={item.title}>{item.title}</option>) }
                                    </Field>
                                </div>

                                <div className="form__field">
                                    <label>Цена, руб.</label>
                                    <Field type="number" name="price" required />
                                </div>

                                <div className='hidden'>
                                    <Field type="number" name="id" />
                                    {/* <Field type="text" name="imgUrl" />
                                    <Field type="text" name="galleryUrl" /> */}
                                    <Field type="number" name="rating" />
                                    <Field type="number" name="volume" />
                                    <Field type="text" name="volumeMeasurement" />
                                    <Field type="text" name="currency" />
                                </div>
                            </div>
                            <div className='form__right'>
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
                            
                            <div className='form__full'>
                                <div className="form__field">
                                    <label>Описание</label>
                                    <Field type="text" name="text" as="textarea" required />
                                </div>
                            </div>

                            <div className='form__left'>
                                <h3>Обложка</h3>
                                {/* <div className='img-wrapper'><img src={props.item.imgUrl} alt=''  /></div> */}
                                <input type="file" name="imgUrl" accept="image/png, image/jpeg" />
                            </div>

                            <div className='form__right'>
                                <h3>Фотогалерея</h3>
                                <div className='img-wrapper'>
                                    {/* {
                                        props.item.galleryUrl.map(item => <img key={item} src={item} alt='' />)
                                    } */}
                                </div>
                                <input type="file" name="galleryUrl" accept="image/png, image/jpeg" />
                            </div>
                            
                            <div className='form__full'>
                                <button className='form__btn' type="submit" disabled={isSubmitting}>Отправить</button>
                            </div>
                        </Form>
                    )}
                    </Formik>
            </Modal>
} 

export default CreateProductForm

const formValidate = (values: ProductItemType) => {
    const errors = {}
    return errors
}

type PropsType = {
    modaltoggle: () => void
}