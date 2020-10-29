import React from 'react';
import '../App.css';
import { getBottles, getBrushes, getRods, getWipers, getCaps } from "../middlewares/services";
import { useQuery } from "react-query";

export const Bottle = () => {
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

export const Brush = () => {
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

export const Rod = () => {
  const { isLoading, error, data } = useQuery("rods", getRods);
  if (isLoading) return "Loading... ";
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

export const Wiper = () => {
  const { isLoading, error, data } = useQuery("wipers", getWipers);
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

export const Cap = () => {
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
