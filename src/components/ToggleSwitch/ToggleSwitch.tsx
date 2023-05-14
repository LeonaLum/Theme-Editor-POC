import {useContext, useRef} from "react";
import { Istyle } from "../../types/globalTypes";
import StatesContext from "../../store/states-context";


export interface ToggleSwitchProps{
   forRef?: () => void
   onChange: () => void
}

export const ToggleSwitch = ({forRef, onChange}: ToggleSwitchProps) => {


  const statesContext = useContext(StatesContext);
  
 return (
   <input type="checkbox" 
          className="toggle-switch"
          ref={forRef}
          onChange={onChange}>
        
   </input>
 );
}