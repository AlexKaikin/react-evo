import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  setCurrentPage,
  setQuery,
} from '../../../../../store/products/productsSlice'
import { useAppDispatch } from '../../../../../store/store'

const Search: React.FC<PropsType> = ({ query }) => {
  const [searchValue, setSearchValue] = useState<string>(query)

  const SearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    if (e.target.value === '') dispatch(setQuery(''))
  }

  const navigate = useNavigate()
  const searchRef = useRef<HTMLFormElement>(null)

  const searchClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    searchValue: string
  ) => {
    e.preventDefault()
    if (searchValue !== '') {
      setSearchValue(searchValue)
      navigate(`/products?q=${searchValue}`)
      dispatch(setQuery(searchValue))
      dispatch(setCurrentPage(1))
    } else {
      const error = '<p class="error">Пожалуйста, введите запрос</p>'
      searchRef.current?.insertAdjacentHTML('beforeend', error)
      setTimeout(() => {
        if (searchRef.current?.querySelector('.error')) {
          let msgShow = searchRef.current.querySelector('.error')
          if (msgShow !== null) msgShow.outerHTML = ''
        }
      }, 2000)
    }
  }

  const dispatch = useAppDispatch()
  const queryValue = new URLSearchParams(useLocation().search).get('q') || ''

  useEffect(() => {
    if (queryValue !== '') {
      dispatch(setQuery(queryValue))
      setSearchValue(queryValue)
    }
  }, [dispatch, queryValue])

  return (
    <div className="store__search">
      <form ref={searchRef} action="#" className="form">
        <input
          onChange={SearchValueChange}
          value={searchValue}
          type="text"
          placeholder="Найти товар..."
          required
        />
        <button
          onClick={(e) => searchClick(e, searchValue)}
          type="submit"
          className=""
        >
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  )
}

export default Search

type PropsType = {
  query: string
}
