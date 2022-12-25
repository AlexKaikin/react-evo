import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3004/',
    withCredentials: true,
})

export const productsAPI = {
    getProducts(categoryActive, sortActive) {
        const category = categoryActive === 'null' ? `` : `category=${categoryActive}&`

        switch(sortActive) {
            case 'priceDecrease':
                return instance.get(`products/?${category}_sort=price&_order=desc`)
          
            case 'priceIncrease':
                return instance.get(`products/?${category}_sort=price&_order=asc`)

            case 'pop':
                return instance.get(`products/?${category}_sort=rating&_order=desc`)
          
            default:
                return instance.get(`products/?${category}_sort=id&_order=desc`)
          }
    },
    getProduct(id) {
        return instance.get(`products/${id}`)
    }
}