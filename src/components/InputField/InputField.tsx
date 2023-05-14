import { Istyle } from "../../types/globalTypes";
import {useContext} from "react";
import StatesContext from "../../store/states-context";

export interface InputFieldProps {
  id?: string;
  type?: string;
  onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void
  onChangeNameInput?: (event:React.ChangeEvent<HTMLInputElement>) => void
  placeHolder?: string;
  defaultValue?: string[] | string;
  isNameInput?: boolean
  onBlur?: (event:React.ChangeEvent<HTMLInputElement>) => void | string
  onInput?: () => void
  maxLength?: number
  className?: string
}


export const InputField = ({id, type, onChange, onChangeNameInput, placeHolder, defaultValue,  isNameInput, onBlur, onInput, maxLength, className}:InputFieldProps) => {
  
  const context = useContext(StatesContext)




 return (
     <input type={type} 
            className={className ? `input-field ${className}` : "input-field"}
            id={id}
            defaultValue={defaultValue}
            onInput={onInput}
            onChange={!isNameInput ? onChange : onChangeNameInput}
            onBlur={isNameInput ? onBlur : onChangeNameInput}
            onFocus={isNameInput ? () => {} : onChange}
            // style={styleOptions ? context?.setStyle(styleOptions) : ""}
            placeholder={placeHolder}
            ref={(element) => context?.initialLoad(element)}
            data-initial-load={"false"}
            maxLength={maxLength ? maxLength : 30}/>
 );
}