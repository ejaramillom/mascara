import React from 'react';
import '../App.css';
import { getBottles } from "../middlewares/services";
import { useQuery } from "react-query";

const Bottle = () => {
  const { isLoading, error, data } = useQuery("bottles", getBottles);
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

export default Bottle;
