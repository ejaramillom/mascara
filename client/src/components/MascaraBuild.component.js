import React from 'react';
import Section from "react-bulma-components/lib/components/section";
import '../App.css';
import { useQuery } from "react-query";
import { getBuild} from "../middlewares/services";

const MascaraBuild = () => {
  const { isLoading, error, data } = useQuery("build", getBuild);
  if (isLoading) return "Loading...";
  if (error) return "Oops! ";
  return (
    <Section>
      { data.map( element =>
      <div>
        {element.bottle ?
          <div>
            <li key = { element.bottle.name }>{ element.bottle.name }</li>
            <li key = { element.bottle.thread }>{ element.bottle.thread } </li>
          </div>
          : "" }
        {element.brush ?
          <div>
            <li key = { element.brush.brush }>{ element.brush.brush }</li>
            <li key = { element.brush.type }>{ element.brush.type }</li>
          </div>
          : "" }
        {element.rod ?
          <div>
            <li key = { element.rod.name }>{ element.rod.name }</li>
            <li key = { element.rod.thread }>{ element.rod.thread }</li>
          </div>
          : "" }
      </div>
      )}
    </Section>
  )
};

export default MascaraBuild;
