import {createPortal} from "react-dom"
import {useContext} from "react";
import StatesContext from "../../store/states-context";
import { Button } from "../Button/Button";
import React from "react";
import { Overlay } from "../Overlay/Overlay";


export interface ModalProps {
   heading: string
   info: string
   buttons: {name: string, func(): void, className: string}[]
}

export const Modal = ({heading, info, buttons}: ModalProps) => {


  const context = useContext(StatesContext);

 if(context?.showModal == false) return null;
 return (
  <Overlay>
      <section className="modal-outer">
        <header className="modal-header"><h2>{heading}</h2></header>
        <div className="modal-body">
          <p>{info}</p>
        </div>
        <footer className="modal-footer">
          {
            buttons.map((button) => (
               <React.Fragment key={button.name}>
                 <Button content={button.name} 
                         className={button.className}
                         onClick={button.func}/>
               </React.Fragment>
            ))
          }
        </footer>
      </section>
    </Overlay>
 );
}