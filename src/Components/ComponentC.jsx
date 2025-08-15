
import {data} from '../App';
import { useContext } from 'react';
const ComponentC = () => {
  const information = useContext(data);
  return (
    <div>
   <h1>My name is {information.name}</h1>
   <h2>My name is {information.age}</h2>
    </div>
  )
}

export default ComponentC;