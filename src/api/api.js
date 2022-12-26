import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3004/',
    withCredentials: true,
})

export const productsAPI = {
    getProducts(categoryActive, sortActive, currentPage, limitItems) {
        const category = categoryActive === 'null' ? `` : `category=${categoryActive}&`
        const pagination = `&_page=${currentPage}&_limit=${limitItems}`

        switch(sortActive) {
            case 'priceDecrease':
                return instance.get(`products/?${category}_sort=price&_order=desc${pagination}`)
          
            case 'priceIncrease':
                return instance.get(`products/?${category}_sort=price&_order=asc${pagination}`)

            case 'pop':
                return instance.get(`products/?${category}_sort=rating&_order=desc${pagination}`)
          
            default:
                return instance.get(`products/?${category}_sort=id&_order=desc${pagination}`)
          }
    },
    getSearchProducts(searchValue){
        return instance.get(`products/?q=${searchValue}`)
    },
    getProduct(id) {
        return instance.get(`products/${id}`)
    }
}