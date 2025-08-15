import React, { useState } from 'react';

const Profile = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    isbool: false
  });

  function HandleChange(e) {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function HandleSubmit(e) {
    e.preventDefault();
    setData(prev => ({
      ...prev,
      isbool: true
    }));
    alert(`Hello, ${data.name}! Your form has been submitted.`);
  }

  function HandleReset() {
    setData({
      name: '',
      email: '',
      isbool: false
    });
  }

  return (
    <div className='w-[40%] p-5 h-auto rounded-lg shadow-lg bg-amber-50'>
      <form onSubmit={HandleSubmit} onReset={HandleReset} className='flex flex-col gap-2'>
        <div className='flex'>
          <input
            className="p-2 m-2 border-2 text-black rounded-lg text-xl"
            type="text"
            name='name'
            value={data.name}
            onChange={HandleChange}
            placeholder='Enter Your Name'
            required
          />
          <input
            className="p-2 m-2 border-2 text-black rounded-lg text-xl"
            type="email"
            name='email'
            value={data.email}
            onChange={HandleChange}
            placeholder='Enter Your Email'
            required
          />
        </div>
        <div className='m-10 flex gap-3.5'>
          <button className="p-4 rounded-lg w-md text-amber-300 cursor-pointer bg-black" type='submit'>Submit</button>
          <button className="p-4 rounded-lg w-md text-amber-300 cursor-pointer bg-black" type='reset'>Reset</button>
        </div>
      </form>

      {data.isbool && (
        <div className="mt-4 p-4 bg-white rounded shadow text-black">
          <ul>
            <li>Hello! {data.name}</li>
            <li>Your email is {data.email}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
