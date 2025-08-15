import React from "react";
import { useState } from "react";
function MyForm (){
    const [formData,setformData] = useState({
        name: "",
        age: 0
    })
  function HandleChange(e){
        const {name , value} = e.target;
        
    setformData((prev)=>(
      {
        ...prev,
        [name]:value
      }
    ))
    }
      function HandleSubmit(e){
      e.preventDefault();
      console.log('Form data :', formData);
    }
    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <input 
                className="p-6 text-lg rounded-lg font-bold m-4"
                type="text" 
                placeholder="Enter Your Name"
                name="name"
                onChange={HandleChange}
                value={formData.name}
                
                />
                <input 
                className="p-6 text-lg rounded-lg font-bold m-4"
                type="number"
                placeholder="Enter your Age"
                name="age"
                value={formData.age}
                onChange={HandleChange}
                />
                <button type="submit" className="p-6 rounded-lg cursor-pointer bg-black m-5 text-white">Submit</button>
            </form>
        </div>
    )
}

export default MyForm;