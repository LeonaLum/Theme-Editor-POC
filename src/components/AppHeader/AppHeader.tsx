import {useContext, useState} from "react"
import StatesContext from "../../store/states-context";
import { InputField } from "../InputField/InputField";

export interface HeaderProps {
}

export const AppHeader = () => {

  const context = useContext(StatesContext);


  const updateThemeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    context?.setThemeName(e.target.value)
    if(context?.themeName){
      if(context.themeName.length > 1){
        context?.setNoNewChanges(false)
      }
      else{
        context?.setNoNewChanges(true)
      }
    }
  }

  const isNameInput = true;
 
  return (
    <header className="app-header">
     <h1>
      <span className="sweet-logo" aria-label="Sweet Logo"></span>
      <div className="logo-border"></div>
      <div className="paint-icon"></div>
        Theme editor
     </h1>
     {context?.showComponent("name") &&
     <InputField placeHolder="Write Theme Name..."
                 isNameInput={isNameInput}
                 onChangeNameInput={(e) => updateThemeName(e)}
                 onBlur={(e) => updateThemeName(e)}
                 defaultValue={ context?.pickedTheme != null ? context.pickedTheme.name : ""}
                 className="input-themename"
    />
                 
     }
    </header>
  );
}
