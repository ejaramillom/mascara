import React from 'react';
import '../App.css';
import { getBottles } from "../middlewares/services";
import { useQuery } from "react-query";

export default function Bottle() {
  // const data = useFetch("/bottle");
  const { isLoading, error, data } = useQuery("bottles", getBottles);
  console.log(data);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops!" + error.message;
  }

  return (
    
    <div className="App">
      <header className="App-header">
      { data.map( element =>
        <li key = { element.name }>{ element.name }</li>

      )}
      </header>
    </div>

  );
}

//  if (!data) {
//   return <div>Loading...</div>;
// } else {
//   return (
//     <ul>
//       <li>{data.id}</li>
//     </ul>
//   )
// }