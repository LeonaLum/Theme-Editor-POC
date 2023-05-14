import {useContext} from "react";
import { Istyle } from "../../types/globalTypes";
import StatesContext from "../../store/states-context";


export interface ButtonProps {
   content?: string;
   styleOptions?: Istyle;
   disabled?: boolean;
   onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => void | JSX.Element;
   type?: string;
   className?: string
}

export const Button = ({content, styleOptions, disabled, onClick, type, className}: ButtonProps) => {


  const statesContext = useContext(StatesContext);
  
 return (
   <button className={`button ${className}`}
           type={type ? "submit": "button"}
           style={styleOptions ? statesContext?.setStyle(styleOptions) : {}}
           disabled={disabled}
           onClick={onClick}>
    {content}
   </button>
 );
}