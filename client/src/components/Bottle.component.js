import React from 'react';
import '../App.css';
import { getBottles } from "../middlewares/services";
import { useQuery } from "react-query";

export default function Bottle() {
  const { data, isLoading, error } = useQuery("bottle", getBottles);
  if (isLoading) return "Loading...";
  if (error) return "Oops!";
  return (
    <div className="App">
      <header className="App-header">
         <h1> data[0].name </h1>
      </header>
    </div>


  );
}
