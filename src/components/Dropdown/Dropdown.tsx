import {useContext} from "react";
import { Istyle } from "../../types/globalTypes";
import StatesContext from "../../store/states-context";


export interface DropdownProps {
   options: string[]
   id: string
   onChange?: (event:React.ChangeEvent<HTMLSelectElement>) => void
   defaultUnit?: string
   defaultAlternative?: string | string[]
   initialLoad?: boolean
   styleOptions?: Istyle
   onClick?: (event:React.MouseEvent<HTMLSelectElement>) => void
   className?: string
}

export const Dropdown = ({options, id, onChange, onClick, defaultUnit, defaultAlternative, initialLoad, styleOptions, className}: DropdownProps) => {


   const hello = () => {
      console.log("hello")
      return {}
   }


  const context = useContext(StatesContext);
  
 return (
   <select className={className ? `dropdown ${className}` : "dropdown"}
           id={id} 
           onChange={onChange} 
           onClick={onClick}
           defaultValue={defaultUnit ? defaultUnit : defaultAlternative}
           data-initial-load={"false"}
           ref={initialLoad == true ? (element) => context?.initialLoad(element) : () => {}}
           onFocus={onChange}
           style={styleOptions ? context?.setStyle(styleOptions) : hello()}
   >
      {options.map((option) => (
         <option key={option}>
           {option}
         </option>
      ))}
   </select>
 );
}