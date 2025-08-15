import { useRef } from "react";
import { useState,useEffect } from "react";

const Ref = () => {
  const [val,setVal] = useState({
    cnt:0,
    flag:false
  });

  const ipref = useRef(null);

  function Highlight(){
        ipref.current.focus();
      setVal((prev)=>({
        ...prev,
        flag:!prev.flag
      }))
    }

useEffect(()=>{
  let interval;
   if(val.flag){
    interval = setInterval(()=>{
     setVal((prev)=>({
      ...prev,
      cnt:prev.cnt+1
     }))
    },1000)
   }

   return ()=>{
    clearInterval(interval);
   }
},[val.flag])

  return (
    <div>
     <input 
     type="text"
     ref={ipref}
     placeholder="Highlight this text"
     value={val.cnt}
     className="text-xl text-center p-4 rounded-lg"
     readOnly
    />
    <button className="px-4 py-5 bg-lime-200 rounded-lg mx-4 cursor-pointer" onClick={Highlight}>
      {val.flag ? 'stop' : 'start'}
    </button>
    </div>
  )
}

export default Ref;