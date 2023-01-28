import axios from 'axios'
import { LoginType } from '../store/authSlice'
import { ProductItemType } from '../store/productsSlice'

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + '/',
  //withCredentials: true,
})

//мидолвара, проверят в каждом запросе есть ли токен
instance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
})

export const productsAPI = {
  getProducts(
    categoryActive: string,
    sortActive: string,
    currentPage: number,
    limitItems: number
  ) {
    const category =
      categoryActive === 'Все чаи' ? `` : `category=${categoryActive}&`
    const pagination = `_page=${currentPage}&_limit=${limitItems}`
    const sorting = (sortActive: string) => {
      switch (sortActive) {
        case 'priceDecrease':
          return `_sort=price&_order=desc&`
        case 'priceIncrease':
          return `_sort=price&_order=asc&`
        case 'pop':
          return `_sort=rating&_order=desc&`
        default:
          return `_sort=id&_order=desc&`
      }
    }

    return instance.get<ProductItemType[]>(
      `products/?${category + sorting(sortActive) + pagination}`
    )
  },

  getProduct(id: number) {
    return instance.get<ProductItemType>(`products/${id}`)
  },
  uploadProductImg(formData: any) {
    return instance.post('/upload', formData)
  },
  createProduct(data: ProductItemType) {
    return instance.post<ProductItemType>(`products/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  updateProduct(data: ProductItemType) {
    return instance.patch<ProductItemType>(`products/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  deleteProduct(id: number) {
    return instance.delete<ProductItemType>(`products/${id}`)
  },
}

export const searchAPI = {
  getSearchQuery(searchValue: string, currentPage: number, limitItems: number) {
    const pagination = `&_page=${currentPage}&_limit=${limitItems}`
    return instance.get<ProductItemType[]>(
      `products/?q=${searchValue + pagination}`
    )
  },
}

export const navigationhAPI = {
  getNavigation() {
    return instance.get<any>(`navigation`)
  },
}

export const authAPI = {
  register(values: LoginType) {
    return instance.post<any>(`auth/register`, values)
  },
  login(values: LoginType) {
    return instance.post<any>(`auth/login`, values)
  },
  getMe() {
    return instance.get<any>(`auth/me`)
  },
}
