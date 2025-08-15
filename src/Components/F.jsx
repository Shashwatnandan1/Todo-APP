import { useState,useEffect } from "react";

const F = () => {
  const optns = ['Male', 'Female', 'Gay', 'Ls', 'Binary', 'Others'];

  const [inputVal, setInputVal] = useState({
    Name: '',
    Email: '',
    Password: '',
    Gender: '',
  });

  const [data,setData] = useState([]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function HandleSubmit(e){
    e.preventDefault();
    setData((prev)=>[...prev,inputVal]);
    const obj = {
    Name: '',
    Email: '',
    Password: '',
    Gender: '',
    }
    setInputVal(obj);
  }

  useEffect(()=>{
     console.log(data);
  },[data])
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form  onSubmit={HandleSubmit}  className="w-[300px] p-4 border-2 rounded-lg shadow-md bg-white flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="Name" className="mb-1 font-medium">Name</label>
          <input
            id="Name"
            type="text"
            name="Name"
            value={inputVal.Name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="Email" className="mb-1 font-medium">Email</label>
          <input
            id="Email"
            type="email"
            name="Email"
            value={inputVal.Email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="Password" className="mb-1 font-medium">Password</label>
          <input
            id="Password"
            type="password"
            name="Password"
            value={inputVal.Password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="Gender" className="mb-1 font-medium">Gender</label>
          <select
            name="Gender"
            id="Gender"
            value={inputVal.Gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select your gender</option>
            {optns.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <button className="p-4 rounded-lg text-lg bg-amber-300 cursor-pointer" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default F;

