import { act, useReducer } from "react";

const Counter = () => {
  const initialstate = {count:0};
  
  const reducer = (state,action) =>{
    if(action.type === 'Inc'){
      return {...state,count:state.count+1};
    }else if(action.type === 'Dec'){
      return {...state,count:state.count<=0 ? 0 : state.count-1};
    }else if(action.type === 'setMax'){
      return {...state,count:action.payload}
    }else{
      return state;
    }
  }

  const [state,dispatch] = useReducer(reducer,initialstate);
  return (
  <div className="flex flex-col items-center p-8 space-y-16">
  <h1 className="text-3xl font-bold text-gray-800">{state.count}</h1>

  <div className="flex gap-4">
    <button onClick={()=>dispatch({type:'Inc'})} className="px-5 py-2 bg-green-500 cursor-pointer text-white rounded-lg hover:bg-green-600 transition">
      Increment
    </button>

    <button onClick={()=>dispatch({type:'Dec'})} className="px-5 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition">
      Decrement
    </button>

    <button onClick={()=>dispatch({type:'setMax',payload:100})} className="px-5 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition">
      set to max:100
    </button>
  </div>
</div>

  )
}

export default Counter;