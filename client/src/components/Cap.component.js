import React from 'react';
import '../App.css';
import { getCaps } from "../middlewares/services";
import { useQuery } from "react-query";

const Cap = () => {
  const { isLoading, error, data } = useQuery("caps", getCaps);
  console.log(data);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
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

export default Cap;
