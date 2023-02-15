import React from 'react'

const Rating: React.FC<PropsType> = ({ number }) => {
  let ratingStarFill: string[] = [] // полные звёзды
  let ratingStar: string[] = [] // пустые звезды
  if (number > 0) {
    ratingStarFill = Array(number).fill('ratingStarFill')
    if (number < 5) ratingStar = Array(5 - number).fill('ratingStar')
  }
  return (
    <>
      {ratingStarFill.length > 0 &&
        ratingStarFill.map((item, i) => (
          <i key={i} className="bi bi-star-fill"></i>
        ))}
      {ratingStar.length > 0 &&
        ratingStar.map((item, i) => <i key={i} className="bi bi-star"></i>)}
    </>
  )
}

export default Rating

type PropsType = {
  number: number
}
