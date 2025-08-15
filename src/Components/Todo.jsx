import React  from "react";
import { useState } from "react";
function Todo(){
    const [FormData,SetFormData] = useState([])
    const [completed,Setcompleted] = useState(false);
    const [InputVal,setInputVal] = useState({});
    function HandleChange(e){
      const {value} = e.target;
        const obj = {
            id:Date.now(),
            tsk: value
        }
        setInputVal(obj);
    }
function Delete(id){
  SetFormData((prev) => prev.filter((f) => f.id !== id));
}

    function HandleSubmit(e){
      e.preventDefault();
      SetFormData((prev)=>[...prev,InputVal]);
    }
    return (
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg border border-slate-700 mt-8">
           <form onSubmit = {HandleSubmit} className="m-4">
            <input 
            className="p-6 rounded-lg m-4 text-xl text-amber-50"
            type="text" 
            name="Task"
            value={InputVal.tsk || ""}
            placeholder="Enter Your Tasks"
            onChange={HandleChange}
             />
             <button type="submit" className="p-4 rounded-lg cursor-pointer bg-black">Add</button>
           </form>
           <br />
           {
            FormData.map((e)=>(
                <ul onClick={()=>Setcompleted((prev)=>!prev)} className="bg-slate-700 m-4 rounded-lg p-4 flex items-center justify-between transition-all duration-300 animate-fade-in" key={e.id}>
                    <li className={`${completed ? 'line-through' : ''}`}>{e.tsk}</li>
                   <button onClick={()=>Delete(e.id)} className="p-4 cursor-pointer">❌</button>
                </ul>
            ))
           }
        </div>
    )
}

export default  Todo;