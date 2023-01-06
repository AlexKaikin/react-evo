import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://json-server-react-evo.vercel.app/',
    withCredentials: true,
})

export const productsAPI = {
    getProducts(categoryActive: string, sortActive: string, currentPage: number, limitItems: number) {
        const category = categoryActive === 'all' ? `` : `category=${categoryActive}&`
        const pagination = `_page=${currentPage}&_limit=${limitItems}`
        const sorting = (sortActive: string) => {
            switch(sortActive) {
                case 'priceDecrease': return `_sort=price&_order=desc&`
                case 'priceIncrease': return `_sort=price&_order=asc&`
                case 'pop': return `_sort=rating&_order=desc&` 
                default: return `_sort=id&_order=desc&`
            }
        }

        return instance.get<ItemType[]>(`products/?${ category + sorting(sortActive) + pagination }`)
    },
    
    getProduct(id: number) {
        return instance.get<ItemType>(`products/${id}`)
    },
}

export const searchAPI = {
    getSearchQuery(searchValue: string, currentPage: number, limitItems: number){
        const pagination = `&_page=${currentPage}&_limit=${limitItems}`
        return instance.get<ItemType[]>(`products/?q=${searchValue + pagination}`)
    },
}

export const navigationhAPI = {
    getNavigation(){
        return instance.get<any>(`navigation`)
    },
}

type ItemType = {
    id: number,
    title: string,
    imgUrl: string,
    galleryUrl: string[],
    volume: number,
    volumeMeasurement: string,
    currency: string,
    price: number,
    category: string,
    rating: number,
    property: PropertyType,
    text: string[],
    cost: number,
    quantity: number,
  }
  
  type PropertyType = {
    country: string,
    town: string,
    year: number,
  }

//   type NavigateType = {

//   }