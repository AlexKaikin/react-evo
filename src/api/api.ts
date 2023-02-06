import axios from 'axios'
import { LoginType } from '../store/account/authSlice'
import { OrderItemType } from '../store/products/orderSlice'
import { ProductItemType } from '../store/products/productsSlice'

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
    query: string,
    categoryActive: string,
    sortActive: string,
    currentPage: number,
    limitItems: number
  ) {
    const q = query === '' ? `` : `q=${query}&`
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
      `products/?${q + category + sorting(sortActive) + pagination}`
    )
  },

  getProduct(id: number) {
    return instance.get<ProductItemType>(`products/${id}`)
  },
  
}

export const productsAdminAPI = {
  getProducts(
    query: string,
    categoryActive: string,
    sortActive: string,
    currentPage: number,
    limitItems: number
  ) {
    const q = query === '' ? `` : `q=${query}&`
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
      `admin/products/?${q + category + sorting(sortActive) + pagination}`
    )
  },

  getProduct(id: number) {
    return instance.get<ProductItemType>(`admin/products/${id}`)
  },
  uploadProductImg(formData: any) {
    return instance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  createProduct(data: ProductItemType) {
    return instance.post<ProductItemType>(`admin/products/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  updateProduct(data: ProductItemType) {
    return instance.patch<ProductItemType>(`admin/products/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  deleteProduct(id: number) {
    return instance.delete<ProductItemType>(`admin/products/${id}`)
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

export const ordersAPI = {
  getOrders() {
    return instance.get<any>(`orders`)
  },
  getOrdersAdmin() {
    return instance.get<any>(`admin/orders`)
  },
  createOrder(values: OrderItemType) {
    return instance.post<any>(`orders`, values)
  }
}
