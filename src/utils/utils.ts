export const getLocalStorage = (item: string) => {
    const data = localStorage.getItem(item)
    const dataType = data && JSON.parse(data)
    return data ? dataType : []
}
