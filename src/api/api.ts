import axios from 'axios'
import { ProductItemType } from '../redux/productsSlice'

const instance = axios.create({
    baseURL: 'https://json-server-react-evo.vercel.app/',
    withCredentials: true,
})

export const productsAPI = {
    getProducts(categoryActive: string, sortActive: string, currentPage: number, limitItems: number) {
        const category = categoryActive === 'Все чаи' ? `` : `category=${categoryActive}&`
        const pagination = `_page=${currentPage}&_limit=${limitItems}`
        const sorting = (sortActive: string) => {
            switch(sortActive) {
                case 'priceDecrease': return `_sort=price&_order=desc&`
                case 'priceIncrease': return `_sort=price&_order=asc&`
                case 'pop': return `_sort=rating&_order=desc&` 
                default: return `_sort=id&_order=desc&`
            }
        }

        return instance.get<ProductItemType[]>(`products/?${ category + sorting(sortActive) + pagination }`)
    },
    
    getProduct(id: number) {
        return instance.get<ProductItemType>(`products/${id}`)
    },
    createProduct(data: any) {
        return instance.post<ProductItemType>(`products/`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    updateProduct(data: any) {
        return instance.patch<ProductItemType>(`products/`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    deleteProduct(id: number) {
        return instance.post<ProductItemType>(`products/`, id, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
}

export const searchAPI = {
    getSearchQuery(searchValue: string, currentPage: number, limitItems: number){
        const pagination = `&_page=${currentPage}&_limit=${limitItems}`
        return instance.get<ProductItemType[]>(`products/?q=${searchValue + pagination}`)
    },
}

export const navigationhAPI = {
    getNavigation(){
        return instance.get<any>(`navigation`)
    },
}
