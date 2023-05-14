import { Button } from "../Button/Button";
import { useContext } from "react";
import StatesContext from "../../store/states-context";

export interface FooterProps {

}

export const AppFooter = () => {

  const context = useContext(StatesContext);




  return (
    <footer className="app-footer">
      
        {context?.showComponent("back") &&
          <Button content={"BACK"}
                  onClick={() => context?.navBack()}
                  className="border-button"
                  />
        }
        {context?.showComponent("save") &&
          <Button content={"Save theme"}
                  type="submit"
                  disabled={context.noNewChanges}
                  onClick={() => context.saveTheme()}
                  className="primary-button"
                  /> 
        } 
        {context?.showComponent("load") &&
          <Button content={"Load theme"}
                  disabled={context.pickedTheme == null}
                  onClick={() => context.navigate("themeeditor/edittheme")}
                  className="primary-button"
                  /> 
        }    

        <Button content={"QUIT"}
                className="secondary-button"
                />
    </footer>
  );
}
