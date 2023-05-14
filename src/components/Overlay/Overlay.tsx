import {createPortal} from "react-dom"
import {useContext} from "react";
import StatesContext from "../../store/states-context";
import React from "react";


export interface OverlayProps {
  children: JSX.Element | null
}

export const Overlay = ({children}: OverlayProps) => {


  const context = useContext(StatesContext);

 if(context?.showModal == false) return null;
 if(context?.showOverlay == false) return null;

 return createPortal(
  <div className="overlay">
    {children}
   </div>, document.getElementById("root-modal-container") as HTMLElement
 );
}