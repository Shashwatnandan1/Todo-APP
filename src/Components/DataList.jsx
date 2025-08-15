import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  const id =   setInterval(getData(),1000);
    return ()=>{
      clearInterval(id);
    }
  
  }, []);

  return (
    <div>
      {
        data.map((e, id) => (
          <ul key={id}>
            <li>{e.id}</li>
            <li>{e.title}</li>
            <li>{e.body}</li>
          </ul>
        ))
      }
    </div>
  );
};

export default DataList;
