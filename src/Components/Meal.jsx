
import { useState,useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const Meal = () => {
  const [val,setVal] = useState([]);
  const [isFetch,setIsFetch] = useState(false);

   useEffect(()=>{
    async function FetchData(){
     try{
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
    if(!response || !response.data || !response.data.meals){
      throw new Error(`404 not found`);
    }
    setVal(response.data.meals);
     }catch(err){
    console.log({Error:err});
     }
    }
    FetchData();
   },[]);

  return (
    <div >
  <button onClick={()=>(setIsFetch((prev)=>!prev))} className='w-1/2 translate-x-[800px] md:w-1/4 cursor-pointer m-4 bg-red-200 text-xl text-black font-extrabold p-4 rounded-lg hover:bg-red-300 transition'>
        Fetch
  </button>
  {
    isFetch && (
       <div  className="flex flex-wrap justify-around gap-6 p-4" >
      {
          val.map((e,id)=>(
            <Card key={id} res={e}/>
          ))
        }
    </div>
    )
  }
   
    </div>

  )
}

export default Meal;