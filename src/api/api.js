import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://json-server-react-evo.vercel.app/',
    withCredentials: true,
})

export const productsAPI = {
    getProducts(categoryActive, sortActive, currentPage, limitItems) {
        const category = categoryActive === 'all' ? `` : `category=${categoryActive}&`
        const pagination = `_page=${currentPage}&_limit=${limitItems}`
        const sorting = (sortActive) => {
            switch(sortActive) {
                case 'priceDecrease': return `_sort=price&_order=desc&`
                case 'priceIncrease': return `_sort=price&_order=asc&`
                case 'pop': return `_sort=rating&_order=desc&` 
                default: return `_sort=id&_order=desc&`
            }
        }

        return instance.get(`products/?${ category + sorting(sortActive) + pagination }`)
    },
    
    getProduct(id) {
        return instance.get(`products/${id}`)
    },
}

export const searchAPI = {
    getSearchQuery(searchValue, currentPage, limitItems){
        const pagination = `&_page=${currentPage}&_limit=${limitItems}`
        return instance.get(`products/?q=${searchValue + pagination}`)
    },
}