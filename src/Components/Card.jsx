import React from 'react'

const Card = ({res}) => {
  return (
       <div className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white h-[350px] flex flex-col">
    
      <div className="h-3/5">
        <img
         src={res.strMealThumb}
        />
      </div>


      <div className="h-2/5 p-4 flex flex-col justify-center">
        <div className="font-bold text-xl mb-2">{res.strMeal}</div>
        <p className="text-gray-700 text-base">
          {res.strMealThumb}
        </p>
      </div>

    </div>
  )
}

export default Card;