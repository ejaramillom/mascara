import React from 'react';
import '../App.css';
import { getBrushes } from "../middlewares/services";
import { useQuery } from "react-query";

export default function Brush() {
  const { isLoading, error, data } = useQuery("brushes", getBrushes);
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
