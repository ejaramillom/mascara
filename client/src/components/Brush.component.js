import React from 'react';
import '../App.css';
import { getBrushes } from "../middlewares/services";
import { useQuery } from "react-query";

const Brush = () => {
  const { isLoading, error, data } = useQuery("brushes", getBrushes);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }

  return (
    <div className="App">
      <header className="App-header">
      { data.map( element =>
        <li key = { element.brush }>{ element.brush }</li>
      )}
      </header>
    </div>
  );
}

export default Brush;
