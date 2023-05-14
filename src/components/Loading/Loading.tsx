
import {useContext} from "react";
import StatesContext from "../../store/states-context";
import React from "react";


export interface LoadingProps {
  message?: string
}

export const Loading = ({message}: LoadingProps) => {


  const context = useContext(StatesContext);


 return (
   <div className="loading">
     <p>{message}</p>
   </div>
 );
}