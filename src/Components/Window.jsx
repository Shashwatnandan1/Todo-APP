import React from 'react'
import { useState, useEffect } from 'react'
const window = () => {
    // useEffect is used to preform side effects like popup,fetching data,running a time based function etc
    // har render pey chalsaktahai
    // ekk baar render pey chale 
    // ki kise state change pey chale
    const [size,setSize] = useState(window.innerWidth);
    const Handlechange = ()=>{
      window.addEventListener('resize',()=>{
        setSize(window.innerWidth);
      })
    }
 useEffect(()=>{
     window.addEventListener('resize',Handlechange)
    return ()=>{
      window.removeEventListener('resize',Handlechange)
    }
   },[])


  return (
    <div>
     <h1 className='bg-amber-600 text-3xl font-serif'>Width of the Screen {size}</h1>
    </div>
  )
}

export default Window;