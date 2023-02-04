import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, themeSelector } from '../../../../store/theme/themeSlice'
import { getLocalStorage } from '../../../../utils/utils'

const Theme: React.FC = (props) => {
  const dispatch = useDispatch()
  const { theme } = useSelector(themeSelector)

  const themeChange = () => {
    if (theme === 'dark') {
      dispatch(setTheme('light'))
      localStorage.setItem('theme', JSON.stringify('light'))
    } else {
      dispatch(setTheme('dark'))
      localStorage.setItem('theme', JSON.stringify('dark'))
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme')
      ? getLocalStorage('theme').replace(/["]/g, '')
      : 'light'
    dispatch(setTheme(themeLocal))
  }, [dispatch])

  return (
    <div className="header__thema">
      <div onClick={themeChange} className="theme__btn">
        {theme === 'light' ? (
          <i className="bi bi-moon-fill"></i>
        ) : (
          <i className="bi bi-sun"></i>
        )}
      </div>
    </div>
  )
}

export default React.memo(Theme)
