import React from 'react'
import { useSelector } from 'react-redux'
import { storeSelector } from '../../../../store/products/storeSlice'
import Cloud from '../../../layout/Cloud/Product/Cloud'
import './Compare.scss'
import CompareItems from './CompareItems/CompareItems'

const Compare: React.FC = (props) => {
  const { compareItems } = useSelector(storeSelector)

  return (
    <>
      <Cloud />
      <div className="section compare">
        <div className="container">
          <div className="section__title">Товары для сравнения</div>
          <CompareItems compareItems={compareItems} />
        </div>
      </div>
    </>
  )
}

export default Compare
